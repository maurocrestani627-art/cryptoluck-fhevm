'use client';

import Link from 'next/link';

export default function LandingPage() {
  const playUrl = '/play';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎲</span>
              </div>
              <span className="text-white font-bold text-xl">CryptoLuck</span>
            </div>
            <Link href={playUrl}>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                Launch App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
              ✨ Powered by FHEVM v0.9
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The First
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Provably Fair
            </span>
            Lottery Platform
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience true transparency in lottery games. Every draw is verifiable, every result is cryptographically secured, and fairness is mathematically guaranteed through Fully Homomorphic Encryption.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={playUrl}>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
                🎮 Play Now
              </button>
            </Link>
            <a href="#how-it-works">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                📖 Learn More
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-400 text-sm">Provably Fair</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">∞</div>
              <div className="text-gray-400 text-sm">Privacy Preserved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
              <div className="text-gray-400 text-sm">Trust Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            The Problem with Traditional Lotteries
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-white mb-3">Black Box Operations</h3>
              <p className="text-gray-300 leading-relaxed">
                Traditional lottery systems operate behind closed doors. You deposit your money, they claim to draw numbers randomly, but you have no way to verify if the process is truly fair or manipulated.
              </p>
            </div>
            
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-white mb-3">Trust Issues</h3>
              <p className="text-gray-300 leading-relaxed">
                You must blindly trust the operator. History shows countless cases of lottery fraud, insider manipulation, and rigged draws that have cost participants millions while enriching corrupt operators.
              </p>
            </div>
            
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy Concerns</h3>
              <p className="text-gray-300 leading-relaxed">
                Your participation data, betting patterns, and winnings are fully exposed. This creates security risks, privacy violations, and makes you a target for attacks both digital and physical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Solution: Cryptographic Fairness
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              CryptoLuck leverages Fully Homomorphic Encryption (FHE) to create a lottery system where fairness isn&apos;t a promise—it&apos;s a mathematical certainty.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-white mb-4">What is FHEVM?</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Fully Homomorphic Encryption Virtual Machine (FHEVM) allows computations to be performed directly on encrypted data without ever decrypting it. This means:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Your guess remains completely private throughout the entire process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>The winning number is cryptographically sealed on-chain from day one</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>All comparisons happen inside encrypted space—no one can peek or manipulate</span>
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
              <ol className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</span>
                  <div>
                    <strong className="text-white">Encrypted Submission:</strong> You choose a number, and your browser encrypts it using FHE before sending it to the blockchain. No one—not even us—can see your guess.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</span>
                  <div>
                    <strong className="text-white">On-Chain Verification:</strong> The smart contract compares your encrypted guess with the encrypted winning number—all while keeping both values secret.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</span>
                  <div>
                    <strong className="text-white">Private Result:</strong> Only you can decrypt your result. Winners are notified without revealing what they guessed or how others performed.
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-3">🔐</div>
              <h4 className="text-lg font-bold text-white mb-2">Absolute Privacy</h4>
              <p className="text-gray-400 text-sm">Your guesses and results are encrypted end-to-end. Zero data leakage.</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="text-lg font-bold text-white mb-2">Verifiable Fairness</h4>
              <p className="text-gray-400 text-sm">Smart contract code is public and auditable. No hidden mechanisms.</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-lg font-bold text-white mb-2">Instant Results</h4>
              <p className="text-gray-400 text-sm">No waiting periods or delayed draws. Results are available immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Sustainable Business Model
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-white mb-4">Revenue Streams</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">Entry Fees:</strong> Small participation fees (e.g., 0.001 ETH) for each lottery draw. With scale, even micro-fees generate substantial revenue while keeping the game accessible.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">Premium Features:</strong> Advanced analytics, historical statistics, and priority access to special draws for power users willing to pay extra.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">B2B Licensing:</strong> License our FHE-powered fairness engine to existing online casinos, gaming platforms, and lottery operators who want to offer provably fair games.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">Protocol Fee:</strong> 2-5% protocol fee on prize pools for larger draws, similar to how traditional lotteries operate but with complete transparency about where fees go.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">Market Opportunity</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">$300B+ Global Lottery Market:</strong> Traditional lottery and gambling industries are ripe for disruption. Trust issues plague the sector, and our technology directly addresses this pain point.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">Regulatory Advantage:</strong> Provable fairness and transparency can help navigate regulatory hurdles in multiple jurisdictions, opening markets that are difficult for traditional operators.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">Web3 Gaming Boom:</strong> As blockchain gaming explodes, demand for verifiable randomness and fairness grows exponentially. We&apos;re positioned at the intersection of two megatrends.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">▸</span>
                  <div>
                    <strong className="text-white">Network Effects:</strong> Each new player increases the prize pool, attracting more players. Privacy guarantees mean users feel safe participating at scale.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Long-Term Vision</h3>
            <p className="text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              CryptoLuck isn&apos;t just about number guessing games. It&apos;s about building the infrastructure for <strong className="text-white">trustless, provably fair gaming</strong> at scale. From lotteries to raffles, from prize draws to prediction markets—any application requiring verifiable randomness and fairness can leverage our FHE-powered platform. As we expand to multiple game types, cross-chain deployments, and white-label solutions, we&apos;re building a moat through technological excellence and first-mover advantage in the FHEVM space.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience True Fairness?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the future of lottery. Play your first game in under 60 seconds.
          </p>
          <Link href={playUrl}>
            <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
              🎲 Launch CryptoLuck
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎲</span>
            </div>
            <span className="text-white font-bold text-lg">CryptoLuck</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Powered by FHEVM v0.9 | Built on Ethereum Sepolia Testnet
          </p>
          <p className="text-gray-500 text-xs">
            © 2024 CryptoLuck. Open source and provably fair. Always.
          </p>
        </div>
      </footer>
    </div>
  );
}

