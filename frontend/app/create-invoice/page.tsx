"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { TransactionStatus } from "@/components/TransactionStatus";
import Link from "next/link";

export default function CreateInvoice() {
  const { publicKey, connected, connect, disconnect, loading } = useWallet();
  const { toasts, showToast, removeToast } = useToast();

  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [txStatus, setTxStatus] = useState<
    | "idle"
    | "awaiting_signature"
    | "submitting"
    | "confirming"
    | "success"
    | "error"
  >("idle");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      showToast("Please connect your wallet first", "warning");
      return;
    }

    try {
      // Step 1: Awaiting signature
      setTxStatus("awaiting_signature");
      showToast("Check your Freighter wallet to sign the transaction", "info");

      // Simulate wallet signature delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 2: Submitting
      setTxStatus("submitting");
      showToast("Broadcasting transaction to Stellar Testnet...", "info");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3: Confirming
      setTxStatus("confirming");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Success
      const mockTxHash = `${Date.now()}${Math.random().toString(36).substring(7)}`;
      setTxHash(mockTxHash);
      setTxStatus("success");
      showToast(
        "Invoice created successfully! Funds locked in escrow.",
        "success",
      );

      // Reset form
      setTimeout(() => {
        setSeller("");
        setAmount("");
        setDescription("");
        setDueDate("");
        setTxStatus("idle");
      }, 5000);
    } catch (err: any) {
      setTxStatus("error");
      setError(err.message || "Transaction failed");
      showToast("Transaction failed. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <Link
              href="/dashboard"
              className="text-slate-400 hover:text-white text-sm mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <Link
              href="/metrics"
              className="text-slate-400 hover:text-white text-sm mb-2 ml-4 inline-block"
            >
              View Metrics
            </Link>
            <h1 className="text-3xl font-bold text-white">
              Create Smart Invoice
            </h1>
            <p className="text-slate-400 mt-1">
              Lock funds in secure escrow on Stellar
            </p>
          </div>
          {connected ? (
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 border border-green-500/50 px-4 py-2 rounded-lg">
                <p className="text-green-400 text-sm font-mono">
                  {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
                </p>
              </div>
              <button
                onClick={disconnect}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              {loading ? "Connecting..." : "Connect Freighter"}
            </button>
          )}
        </div>

        {/* Escrow Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="text-blue-400 font-semibold mb-1">
              Secure Escrow Protection
            </p>
            <p className="text-slate-300 text-sm">
              Your funds will be locked in a Soroban smart contract and{" "}
              <strong>cannot be withdrawn</strong> until delivery is verified by
              the oracle network.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Buyer (Your Wallet)
              </label>
              <input
                type="text"
                value={connected ? publicKey : "Connect wallet first"}
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-slate-400 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Seller Address (Stellar G...)
              </label>
              <input
                type="text"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Amount (XLM)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {amount && (
                  <p className="text-slate-400 text-xs mt-1">
                    ≈ ${(parseFloat(amount) * 0.12).toFixed(2)} USD
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="100kg wheat delivery to warehouse B"
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Network Fee Info */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center text-sm">
              <span className="text-slate-400">Network Fee</span>
              <span className="text-green-400">~0.00001 XLM (negligible)</span>
            </div>

            <button
              type="submit"
              disabled={!connected || txStatus !== "idle"}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {txStatus === "idle"
                ? connected
                  ? "🔒 Create Invoice & Lock Funds in Escrow"
                  : "Connect Wallet to Continue"
                : txStatus === "awaiting_signature"
                  ? "Awaiting Signature..."
                  : txStatus === "submitting"
                    ? "Submitting Transaction..."
                    : txStatus === "confirming"
                      ? "Confirming..."
                      : "Processing..."}
            </button>
          </form>

          <TransactionStatus status={txStatus} txHash={txHash} error={error} />
        </div>

        {/* Payment Lifecycle Preview */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span>🔄</span>
            Payment Lifecycle
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-400">1</span>
              </div>
              <p className="text-slate-300 text-xs">Created</p>
            </div>
            <div className="flex-1 h-0.5 bg-white/10"></div>
            <div className="text-center flex-1">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-400">2</span>
              </div>
              <p className="text-slate-300 text-xs">Funds Locked</p>
            </div>
            <div className="flex-1 h-0.5 bg-white/10"></div>
            <div className="text-center flex-1">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-yellow-400">3</span>
              </div>
              <p className="text-slate-300 text-xs">Verified</p>
            </div>
            <div className="flex-1 h-0.5 bg-white/10"></div>
            <div className="text-center flex-1">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400">4</span>
              </div>
              <p className="text-slate-300 text-xs">Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

