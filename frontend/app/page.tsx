import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <nav className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <Link href="/" className="text-white font-semibold">
            Nexura
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/metrics" className="text-slate-300 hover:text-white transition-colors">
              Metrics
            </Link>
            <Link href="/create-invoice" className="text-slate-300 hover:text-white transition-colors">
              Create Invoice
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="text-center max-w-5xl">
          <div className="inline-block bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-6">
            <p className="text-purple-300 text-sm font-semibold">
              Built on Stellar • Powered by Soroban
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Stop Waiting 30–60 Days
            <br />
            to Get Paid
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Small businesses wait <strong>30–60 days</strong> to get paid.
            During this time,{" "}
            <strong>inflation reduces their purchasing power</strong>.
          </p>

          <p className="text-xl sm:text-2xl text-white font-semibold mb-12 max-w-3xl mx-auto">
            Nexura solves this with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              instant, secure payments
            </span>{" "}
            using blockchain-based escrow.
          </p>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Complete Payment Flow
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
              <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  1. Create Invoice
                </h3>
                <p className="text-slate-400 text-sm">
                  Buyer creates invoice with amount and delivery terms
                </p>
              </div>

              <div className="hidden sm:block text-white text-2xl">→</div>

              <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-white font-semibold mb-2">2. Lock Funds</h3>
                <p className="text-slate-400 text-sm">
                  Funds secured in escrow smart contract
                </p>
              </div>

              <div className="hidden sm:block text-white text-2xl">→</div>

              <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  3. Verify Delivery
                </h3>
                <p className="text-slate-400 text-sm">
                  Buyer approval or oracle confirmation
                </p>
              </div>

              <div className="hidden sm:block text-white text-2xl">→</div>

              <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  4. Instant Payment
                </h3>
                <p className="text-slate-400 text-sm">
                  Seller receives funds automatically
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 sm:p-8 mb-12 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="text-left">
                <h3 className="text-white font-semibold text-lg mb-3">
                  Real-World Example
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  A farmer supplies 100kg of wheat to a retailer. Instead of
                  waiting 30 days, the retailer{" "}
                  <strong className="text-white">
                    locks 500 XLM in Nexura's escrow contract
                  </strong>
                  . The farmer delivers the goods, the delivery is verified via
                  oracle, and the farmer{" "}
                  <strong className="text-white">
                    receives instant payment
                  </strong>{" "}
                  — no waiting, no payment risk.
                </p>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              What Makes Nexura Different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-white font-semibold mb-2">
                  Escrow-Based Trust
                </h3>
                <p className="text-slate-400 text-sm">
                  Funds locked in smart contract, cannot be withdrawn without
                  approval
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-white font-semibold mb-2">
                  Instant Settlement
                </h3>
                <p className="text-slate-400 text-sm">
                  ~5 second finality on Stellar — traditional systems take 3-5
                  days
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-white font-semibold mb-2">
                  Bulk Worker Payouts
                </h3>
                <p className="text-slate-400 text-sm">
                  Pay vendor + all workers in one transaction via Stellar SDP
                </p>
              </div>
            </div>
            <p className="text-purple-300 text-sm mt-6 max-w-2xl mx-auto">
              Nexura combines escrow + instant settlement + bulk payouts — which
              traditional invoicing systems cannot do efficiently.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50 text-center"
            >
              Launch Dashboard →
            </Link>
            <Link
              href="/create-invoice"
              className="inline-block bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all text-center"
            >
              Create Test Invoice
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Deployed on Stellar Testnet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Smart Contract Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>~$0.00001 Network Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="py-20 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Three Roles, One System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Buyer</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Creates invoice</li>
                <li>• Locks funds in escrow</li>
                <li>• Verifies delivery</li>
                <li>• Releases payment automatically</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🧾</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Seller / Vendor
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Receives invoice</li>
                <li>• Delivers goods/services</li>
                <li>• Gets instant payment</li>
                <li>• No 30-60 day wait</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Verifier (Oracle)
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Confirms delivery</li>
                <li>• Multi-sig protection (2-of-3)</li>
                <li>• Triggers payment release</li>
                <li>• Dispute resolution (future)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Future Features */}
      <div className="py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-purple-400 font-bold mb-2">
                Phase 1 — MVP ✅
              </div>
              <ul className="text-slate-300 text-sm space-y-1 text-left">
                <li>• Smart contracts deployed</li>
                <li>• Basic UI</li>
                <li>• 5+ user testing</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-blue-400 font-bold mb-2">Phase 2 — Beta</div>
              <ul className="text-slate-300 text-sm space-y-1 text-left">
                <li>• Analytics dashboard</li>
                <li>• 30+ users</li>
                <li>• Feedback iteration</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-green-400 font-bold mb-2">
                Phase 3 — Production
              </div>
              <ul className="text-slate-300 text-sm space-y-1 text-left">
                <li>• Security audit</li>
                <li>• Mainnet deployment</li>
                <li>• Optional yield (future)</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-6">
            * Yield generation and compliance features (KYC/AML, USDC stablecoin
            support) planned for future phases
          </p>
        </div>
      </div>
    </div>
  );
}
