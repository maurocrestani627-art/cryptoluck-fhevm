'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BrowserProvider, ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/utils/contract';
import { getWalletProvider } from '@/utils/wallet';
import Link from 'next/link';

// FHEVM v0.9 Configuration (7 required parameters)
const FHEVM_CONFIG = {
  chainId: 11155111, // Sepolia
  aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
  kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
  inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
  verifyingContractAddressDecryption: '0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478',
  verifyingContractAddressInputVerification: '0x483b9dE06E4E4C7D35CCf5837A1668487406D955',
  gatewayChainId: 10901,
  relayerUrl: 'https://relayer.testnet.zama.org',
};


export default function PlayPage() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [fhevmInstance, setFhevmInstance] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  
  const [guessNumber, setGuessNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [canDecrypt, setCanDecrypt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Prevent duplicate initialization
  const isInitializingRef = useRef(false);

  // Initialize FHEVM when wallet is connected
  useEffect(() => {
    if (!isConnected || !address || !walletClient || isInitializingRef.current || fhevmInstance) {
      return;
    }

    const initFhevm = async () => {
      isInitializingRef.current = true;
      setIsInitializing(true);
      setInitError(null);

      try {
        // Wait for relayerSDK to load
        if (!(window as any).relayerSDK) {
          throw new Error('Relayer SDK not loaded. Please refresh the page.');
        }

        // Initialize SDK first
        await (window as any).relayerSDK.initSDK();

        // Get wallet provider with multiple fallbacks
        let provider = getWalletProvider();
        
        if (!provider) {
          provider = walletClient;
        }
        
        if (!provider) {
          throw new Error('No wallet provider found');
        }

        // Create FHEVM instance with 7 required parameters
        const instance = await (window as any).relayerSDK.createInstance({
          ...FHEVM_CONFIG,
          network: provider,
        });

        setFhevmInstance(instance);
        console.log('✅ FHEVM initialized successfully');
      } catch (e: any) {
        setInitError(e.message || 'Failed to initialize FHEVM');
        console.error('❌ FHEVM init failed:', e);
        isInitializingRef.current = false; // Allow retry on failure
      } finally {
        setIsInitializing(false);
      }
    };

    initFhevm();
  }, [isConnected, address, walletClient, fhevmInstance]);

  // Handle guess submission
  const handleSubmitGuess = async () => {
    if (!fhevmInstance || !walletClient || !address) return;
    
    const num = parseInt(guessNumber);
    if (isNaN(num) || num < 0 || num > 9999) {
      setError('Please enter a valid number between 0 and 9999');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);
    setCanDecrypt(false);

    try {
      // 1. Encrypt the guess
      const input = fhevmInstance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add32(num);
      const encryptedInput = await input.encrypt();
      
      const handle = encryptedInput.handles[0];
      const proof = encryptedInput.inputProof;

      // 2. Submit to contract
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      console.log('📤 Submitting encrypted guess...');
      const tx = await contract.submitGuess(handle, proof);
      console.log('⏳ Waiting for transaction confirmation...');
      await tx.wait();
      console.log('✅ Transaction confirmed!');

      // Enable decryption after successful submission
      setCanDecrypt(true);

    } catch (e: any) {
      setError(e.message || 'Failed to submit guess');
      console.error('❌ Error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle result decryption
  const handleDecryptResult = async () => {
    if (!fhevmInstance || !walletClient || !address) return;

    setIsDecrypting(true);
    setError(null);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // 1. Get encrypted result handle
      console.log('🔍 Fetching encrypted result...');
      const encryptedHandle = await contract.getMyResult();
      console.log('📦 Encrypted handle:', encryptedHandle);

      // 2. Generate keypair for decryption
      const keypair = fhevmInstance.generateKeypair();
      
      // 3. Prepare decryption parameters
      const handleContractPairs = [
        { handle: encryptedHandle, contractAddress: CONTRACT_ADDRESS }
      ];
      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = "10";
      const contractAddresses = [CONTRACT_ADDRESS];
      
      // 4. Create EIP-712 signature message
      const eip712 = fhevmInstance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays
      );
      
      // 5. Sign with user wallet (remove EIP712Domain)
      const typesWithoutDomain = { ...eip712.types };
      delete typesWithoutDomain.EIP712Domain;
      
      console.log('✍️ Requesting signature...');
      const signature = await signer.signTypedData(
        eip712.domain,
        typesWithoutDomain,
        eip712.message
      );
      console.log('✅ Signature received');
      
      // 6. Call userDecrypt to decrypt the result
      console.log('🔓 Decrypting result...');
      
      const decryptedResults = await fhevmInstance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace("0x", ""),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays
      );
      
      const decryptedValue = decryptedResults[encryptedHandle];
      console.log('✅ Decryption succeeded:', decryptedValue, 'type:', typeof decryptedValue);
      
      // Convert to number (may be BigInt from FHEVM)
      const numericResult = Number(decryptedValue);
      console.log('📊 Numeric result:', numericResult);
      
      setResult(numericResult);
      setCanDecrypt(false);
      
    } catch (e: any) {
      setError(e.message || 'Failed to decrypt result');
      console.error('❌ Decryption failed:', e);
      setCanDecrypt(true); // Allow retry
    } finally {
      setIsDecrypting(false);
    }
  };

  // Reset game
  const handleReset = () => {
    setGuessNumber('');
    setResult(null);
    setError(null);
    setCanDecrypt(false);
  };

  // Wallet not connected state
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎲</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">CryptoLuck</h1>
            <p className="text-gray-400">Connect your wallet to start playing</p>
          </div>
          <ConnectButton />
          <Link href="/" className="block mt-6 text-purple-400 hover:text-purple-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // FHEVM initializing state
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Initializing FHEVM...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  // FHEVM initialization error state
  if (initError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-white mb-2">Initialization Failed</h2>
          <p className="text-gray-300 mb-4">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Main game interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎲</span>
          </div>
          <span className="text-white font-bold text-xl">CryptoLuck</span>
        </Link>
        <ConnectButton />
      </nav>

      {/* Game Container */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Game Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🎯 Guess the Number
            </h1>
            <p className="text-gray-400">
              The secret number is <span className="text-purple-400 font-bold">888</span>
              <br />
              <span className="text-sm">(Encrypted on-chain with FHE)</span>
            </p>
          </div>

          {/* Result Display */}
          {result !== null && (
            <div className={`mb-8 p-6 rounded-2xl text-center ${
              result === 1 
                ? 'bg-green-500/20 border border-green-500/50' 
                : 'bg-red-500/20 border border-red-500/50'
            }`}>
              <div className="text-5xl mb-3">{result === 1 ? '🎉' : '😔'}</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {result === 1 ? 'Correct!' : 'Wrong Guess'}
              </h2>
              <p className="text-gray-300">
                {result === 1 
                  ? 'Congratulations! You guessed the right number!' 
                  : 'Try again with a different number!'}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          )}

          {/* Input Form */}
          {result === null && (
            <>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Enter your guess (0-9999):
                </label>
                <input
                  type="number"
                  value={guessNumber}
                  onChange={(e) => setGuessNumber(e.target.value)}
                  placeholder="888"
                  disabled={isSubmitting || canDecrypt}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-xl text-center focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  min="0"
                  max="9999"
                />
              </div>

              {/* Submit Button */}
              {!canDecrypt && (
                <button
                  onClick={handleSubmitGuess}
                  disabled={isSubmitting || !guessNumber}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    '🔒 Encrypt & Submit'
                  )}
                </button>
              )}

              {/* Decrypt Button */}
              {canDecrypt && (
                <button
                  onClick={() => handleDecryptResult()}
                  disabled={isDecrypting}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/50"
                >
                  {isDecrypting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Decrypting...
                    </span>
                  ) : (
                    '🔓 Decrypt & View Result'
                  )}
                </button>
              )}
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">ℹ️</span>
              How it works:
            </h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Your guess is encrypted using FHE before leaving your browser</li>
              <li>• The contract compares encrypted values without decrypting them</li>
              <li>• Only you can decrypt your result with your private key</li>
              <li>• All operations are verifiable on-chain</li>
            </ul>
          </div>
        </div>

        {/* Multi-wallet Warning */}
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-amber-400 mb-1">
                Multi-Wallet Conflict Notice
              </p>
              <p className="text-xs text-amber-300/80 leading-relaxed">
                If you encounter issues such as FHEVM initialization failure, please try using incognito mode or a fresh browser environment to avoid multi-wallet extension conflicts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

