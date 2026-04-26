"use client";

interface TransactionStatusProps {
  status:
    | "idle"
    | "awaiting_signature"
    | "submitting"
    | "confirming"
    | "success"
    | "error";
  txHash?: string;
  error?: string;
}

export function TransactionStatus({
  status,
  txHash,
  error,
}: TransactionStatusProps) {
  if (status === "idle") return null;

  const config = {
    awaiting_signature: {
      icon: "🔐",
      title: "Awaiting Wallet Signature",
      desc: "Please approve the transaction in Freighter",
      color: "border-blue-500/50 bg-blue-500/10",
    },
    submitting: {
      icon: "📤",
      title: "Submitting to Network",
      desc: "Broadcasting transaction to Stellar Testnet...",
      color: "border-purple-500/50 bg-purple-500/10",
    },
    confirming: {
      icon: "⏳",
      title: "Confirming Transaction",
      desc: "Waiting for network confirmation (~5 seconds)",
      color: "border-yellow-500/50 bg-yellow-500/10",
    },
    success: {
      icon: "✅",
      title: "Transaction Confirmed!",
      desc: "Your invoice has been created successfully",
      color: "border-green-500/50 bg-green-500/10",
    },
    error: {
      icon: "❌",
      title: "Transaction Failed",
      desc: error || "An error occurred",
      color: "border-red-500/50 bg-red-500/10",
    },
  };

  const style = config[status];

  return (
    <div
      className={`${style.color} backdrop-blur-lg border rounded-xl p-6 mt-6`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{style.icon}</div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">
            {style.title}
          </h3>
          <p className="text-slate-300 text-sm mb-3">{style.desc}</p>

          {status === "awaiting_signature" && (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <div className="animate-pulse w-2 h-2 bg-blue-400 rounded-full"></div>
              Check your Freighter extension
            </div>
          )}

          {status === "submitting" && (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
              Broadcasting...
            </div>
          )}

          {status === "confirming" && (
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 animate-progress"></div>
            </div>
          )}

          {status === "success" && txHash && (
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm underline mt-2"
            >
              View on Stellar Explorer →
            </a>
          )}

          {status === "error" && (
            <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-xs font-mono">{error}</p>
              <p className="text-slate-400 text-xs mt-2">Common fixes:</p>
              <ul className="text-slate-400 text-xs mt-1 space-y-1 list-disc list-inside">
                <li>Ensure you&apos;re on Stellar Testnet</li>
                <li>Check your XLM balance</li>
                <li>Refresh and try again</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
