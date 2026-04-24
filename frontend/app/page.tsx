import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Nexura Protocol</h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Trustless Smart Invoice Ecosystem for SMEs on Stellar
        </p>
        <p className="text-slate-400 mb-12 max-w-xl mx-auto">
          Convert net-30/60 payment terms into instant, yield-bearing escrow
          contracts with automated bulk worker payouts
        </p>
        <Link
          href="/create-invoice"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
        >
          Create Your First Invoice →
        </Link>
      </div>
    </div>
  );
}
