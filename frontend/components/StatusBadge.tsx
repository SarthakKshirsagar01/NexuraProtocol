type Status = "pending" | "locked" | "verified" | "paid" | "cancelled";

export function StatusBadge({ status }: { status: Status }) {
  const config = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    locked: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    verified: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    paid: "bg-green-500/20 text-green-400 border-green-500/50",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/50",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${config[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
