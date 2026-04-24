import { StatusBadge } from "./StatusBadge";

interface Invoice {
  id: number;
  buyer: string;
  seller: string;
  amount: number;
  status: "pending" | "locked" | "verified" | "paid";
  createdAt: string;
  dueDate: string;
  description: string;
}

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm">Invoice #{invoice.id}</p>
          <p className="text-white text-lg font-semibold mt-1">
            {invoice.description}
          </p>
        </div>
        <StatusBadge status={invoice.status} />
      </div>

      {/* Amount - BIG & BOLD */}
      <div className="mb-4">
        <p className="text-slate-400 text-xs mb-1">Amount</p>
        <p className="text-4xl font-bold text-white">
          {invoice.amount} <span className="text-2xl text-slate-400">XLM</span>
        </p>
        <p className="text-slate-500 text-sm mt-1">
          ≈ ${(invoice.amount * 0.12).toFixed(2)} USD
        </p>
      </div>

      {/* Buyer → Seller */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/10">
        <div>
          <p className="text-slate-400 text-xs mb-1">Buyer</p>
          <p className="text-white text-sm font-mono">
            {invoice.buyer.slice(0, 8)}...{invoice.buyer.slice(-4)}
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Seller</p>
          <p className="text-white text-sm font-mono">
            {invoice.seller.slice(0, 8)}...{invoice.seller.slice(-4)}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-2 h-2 rounded-full ${invoice.status === "paid" ? "bg-green-400" : "bg-blue-400"}`}
          ></div>
          <p className="text-xs text-slate-300">
            Created → Locked → Verified → Paid
          </p>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
            style={{
              width:
                invoice.status === "paid"
                  ? "100%"
                  : invoice.status === "locked"
                    ? "50%"
                    : "25%",
            }}
          ></div>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between text-xs text-slate-400 mb-4">
        <span>Created: {invoice.createdAt}</span>
        <span>Due: {invoice.dueDate}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white py-2 rounded-lg text-sm transition-all">
          View Details
        </button>
        {invoice.status === "locked" && (
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-sm font-semibold transition-all">
            Release Payment
          </button>
        )}
      </div>
    </div>
  );
}
