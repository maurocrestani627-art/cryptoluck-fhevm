# 🎲 CryptoLuck

> **The First Provably Fair Lottery Platform Powered by Fully Homomorphic Encryption**

CryptoLuck is a revolutionary lottery platform that eliminates the black-box problem in traditional gaming systems. By leveraging FHEVM (Fully Homomorphic Encryption Virtual Machine), we guarantee cryptographic fairness where trust is replaced by mathematics.

---

## 🌟 The Problem We Solve

Traditional lottery systems suffer from three critical issues:

1. **🎭 Black Box Operations**: Players have no way to verify if draws are truly random or manipulated
2. **⚖️ Trust Requirements**: You must blindly trust operators, despite countless fraud cases in history
3. **👁️ Privacy Violations**: Your participation data and winnings are fully exposed, creating security risks

**CryptoLuck changes this**: Fairness isn't a promise—it's a mathematical certainty.

---

## 💡 How It Works

### Fully Homomorphic Encryption (FHE)

CryptoLuck uses FHEVM to perform computations directly on encrypted data without ever decrypting it:

1. **🔒 Encrypted Submission**: Your guess is encrypted in your browser using FHE before touching the blockchain
2. **⚡ On-Chain Verification**: The smart contract compares your encrypted guess with the encrypted winning number—all while keeping both values secret
3. **🔓 Private Results**: Only you can decrypt your result. Winners are notified without revealing what they guessed

### Current Demo: Guess the Number

Our first game demonstrates the core technology:

- The winning number (888) is encrypted and stored on-chain from deployment
- Submit your encrypted guess (0-9999)
- The contract performs FHE comparison: `encrypted_guess == encrypted_winning_number`
- Decrypt your result privately: `1` = correct, `0` = wrong

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Install dependencies
pnpm install

# Install frontend dependencies
cd packages/nextjs
pnpm install

# Install contract dependencies
cd packages/hardhat
pnpm install
```

### Run Locally

```bash
# Start development server (from project root)
pnpm dev

# Or manually start Next.js
cd packages/nextjs
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Technical Architecture

### Smart Contract

- **Network**: Ethereum Sepolia Testnet
- **Contract Address**: `0xb8dc96013639591a4E9C98dbCd6B75d571FF8700`
- **FHEVM Version**: v0.9.1
- **Configuration**: `ZamaEthereumConfig`

**Key Features**:
- Pre-encrypted winning number stored on-chain
- FHE-based comparison without decryption
- Dual authorization model: `FHE.allowThis()` + `FHE.allow()`
- Zero-knowledge proof verification

[View on Etherscan →](https://sepolia.etherscan.io/address/0xb8dc96013639591a4E9C98dbCd6B75d571FF8700)

### Frontend

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom animations
- **Wallet Integration**: RainbowKit + Wagmi v2
- **FHEVM SDK**: Zama Relayer SDK v0.3.0-5 (CDN)
- **Encryption**: Client-side FHE encryption with zero-knowledge proofs

### Project Structure

```
zama-18/
├── packages/
│   ├── hardhat/          # Smart contracts (FHEVM v0.9)
│   │   ├── contracts/    # GuessNumber.sol
│   │   ├── scripts/      # Deployment scripts
│   │   └── hardhat.config.ts
│   └── nextjs/           # Frontend application
│       ├── app/          # Next.js 15 app directory
│       │   ├── page.tsx          # Landing page
│       │   └── play/page.tsx     # Game interface
│       ├── components/   # React components (Providers, etc.)
│       └── utils/        # Wallet utilities & contract ABI
└── README.md
```

---

## 🔒 Privacy & Security Guarantees

### Cryptographic Privacy

- **End-to-End Encryption**: Your guesses never exist in plaintext on-chain
- **Private Comparisons**: All operations happen inside encrypted space
- **User-Only Decryption**: Results are encrypted; only you hold the decryption key

### Verifiable Fairness

- **Open Source**: All smart contract code is public and auditable
- **Immutable Logic**: No hidden mechanisms or admin backdoors
- **On-Chain Verification**: Every operation is recorded on Ethereum

### FHEVM System Contracts (Sepolia)

```
ACL:              0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D
KMS:              0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A
Input Verifier:   0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0
Gateway:          0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478
Relayer:          https://relayer.testnet.zama.org
```

---

## 🎯 Business Model & Vision

### Revenue Streams

1. **Entry Fees**: Micro-fees per game (e.g., 0.001 ETH) with scale
2. **Premium Features**: Advanced analytics and priority access
3. **B2B Licensing**: White-label FHE fairness engine for casinos and gaming platforms
4. **Protocol Fees**: 2-5% on larger prize pools with full transparency

### Market Opportunity

- **$300B+ Global Lottery Market**: Ripe for disruption with trust-free technology
- **Regulatory Advantage**: Provable fairness helps navigate compliance in multiple jurisdictions
- **Web3 Gaming Boom**: Positioned at the intersection of blockchain gaming and privacy tech
- **Network Effects**: Each player increases prize pools, attracting more participants

### Long-Term Vision

CryptoLuck is building the **infrastructure for trustless, provably fair gaming at scale**. From lotteries to raffles, prize draws to prediction markets—any application requiring verifiable randomness can leverage our FHE-powered platform. We're establishing a technological moat through first-mover advantage in the FHEVM space.

---

## 🛠️ Development

### Compile Contracts

```bash
cd packages/hardhat
pnpm hardhat compile
```

### Deploy to Sepolia

```bash
cd packages/hardhat
PRIVATE_KEY=your_key SEPOLIA_RPC_URL=your_rpc pnpm hardhat run scripts/deploy.ts --network sepolia
```

### Build for Production

```bash
cd packages/nextjs
pnpm build
```

---

## 🌐 Live Demo

**Landing Page**: http://localhost:3000  
**Play Game**: http://localhost:3000/play

**Secret Winning Number**: 888 (encrypted on-chain)

---

## 📚 Resources

- **Zama FHEVM Docs**: https://docs.zama.org/fhevm
- **Smart Contract on Sepolia**: https://sepolia.etherscan.io/address/0xb8dc96013639591a4E9C98dbCd6B75d571FF8700
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **RainbowKit**: https://www.rainbowkit.com/
- **Next.js**: https://nextjs.org/

---

## ⚠️ Important Notes

### Multi-Wallet Extension Conflicts

If you encounter FHEVM initialization issues:
- Try using **incognito/private browsing mode**
- Disable other wallet extensions temporarily
- Clear browser cache and local storage

### Decryption Wait Times

- After submitting a guess, wait **10 seconds** for permission synchronization
- Decryption typically takes **30-60 seconds** (normal for FHE operations)
- If decryption fails, the app auto-retries up to 3 times

---

## 📄 License

MIT License - Open source and provably fair. Always.

---

## 🤝 Contributing

This is a demonstration project for the Zama FHEVM Developer Program. Contributions, feedback, and forks are welcome!

---

**Built with ❤️ using FHEVM v0.9**

*Making lottery games fair, one encrypted number at a time.*

