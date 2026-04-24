import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-white mb-4">Nexura Protocol</h1>
        <p className="text-2xl text-slate-300 mb-6">
          Trustless Smart Invoice Ecosystem for SMEs
        </p>
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          Stop waiting 30-60 days for payment. Lock funds in escrow, earn yield
          while waiting, and receive instant settlements on delivery
          confirmation.
        </p>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Instant Liquidity</h3>
            <p className="text-slate-400 text-sm">
              No more 30-60 day payment delays
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-white font-semibold mb-2">Escrow Safety</h3>
            <p className="text-slate-400 text-sm">
              Funds secured until delivery verified
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-white font-semibold mb-2">Automated Payouts</h3>
            <p className="text-slate-400 text-sm">
              Smart contracts release funds automatically
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            Launch Dashboard →
          </Link>
          <Link
            href="/create-invoice"
            className="inline-block bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all"
          >
            Create Invoice
          </Link>
        </div>
      </div>
    </div>
  );
}
