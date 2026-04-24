"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";

export default function CreateInvoice() {
  const { publicKey, connected, connect, disconnect, loading } = useWallet();
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }

    setStatus("Creating invoice on Stellar Testnet...");

    // Simulate contract call (replace with real Soroban contract call in production)
    setTimeout(() => {
      const invoiceId = Math.floor(Math.random() * 10000);
      setStatus(
        `✅ Invoice #${invoiceId} created! Buyer: ${publicKey.slice(0, 8)}...`,
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Wallet Connection Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Create Smart Invoice
          </h1>
          {connected ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <div className="bg-green-500/20 border border-green-500/50 px-4 py-2 rounded-lg w-full sm:w-auto">
                <p className="text-green-400 text-xs sm:text-sm font-mono break-all">
                  {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
                </p>
              </div>
              <button
                onClick={disconnect}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm transition-all w-full sm:w-auto"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 w-full sm:w-auto"
            >
              {loading ? "Connecting..." : "Connect Freighter"}
            </button>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 sm:p-8 border border-white/20">
          <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
            Lock funds in escrow on Stellar Testnet
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Buyer (Your Wallet)
              </label>
              <input
                type="text"
                value={connected ? publicKey : "Connect wallet first"}
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-slate-400 font-mono text-xs sm:text-sm break-all"
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

            <button
              type="submit"
              disabled={!connected}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {connected
                ? "Create Invoice & Lock Escrow"
                : "Connect Wallet to Continue"}
            </button>
          </form>

          {status && (
            <div className="mt-6 p-4 bg-white/5 border border-white/20 rounded-lg">
              <p className="text-slate-200 text-sm break-words">{status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
