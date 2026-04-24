"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { InvoiceCard } from "@/components/InvoiceCard";
import Link from "next/link";

export default function Dashboard() {
  const { publicKey, connected, connect, disconnect } = useWallet();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  // Mock data - replace with real contract calls
  const mockInvoices = [
    {
      id: 1001,
      buyer:
        publicKey || "GDHWXGMJVAYCHUWDATDMANHES3IFQOI2I5DNI7I43DZILSKSECBMQFOH",
      seller: "GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      amount: 500,
      status: "locked" as const,
      createdAt: "2026-04-20",
      dueDate: "2026-05-20",
      description: "100kg wheat delivery",
    },
    {
      id: 1002,
      buyer:
        publicKey || "GDHWXGMJVAYCHUWDATDMANHES3IFQOI2I5DNI7I43DZILSKSECBMQFOH",
      seller: "GCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      amount: 1200,
      status: "paid" as const,
      createdAt: "2026-04-15",
      dueDate: "2026-05-15",
      description: "Construction materials",
    },
  ];

  const stats = {
    totalLocked: 500,
    activeInvoices: 1,
    pendingPayments: 0,
    completedPayments: 1,
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-slate-300 mb-8">Access your invoice dashboard</p>
          <button
            onClick={connect}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Connect Freighter Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Invoice Dashboard
            </h1>
            <p className="text-slate-400">
              Powered by Stellar • Secured by Soroban
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/20 px-4 py-2 rounded-lg">
              <p className="text-green-400 text-sm font-mono">
                {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
              </p>
            </div>
            <button
              onClick={disconnect}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm transition-all"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Role Toggle */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-2 inline-flex gap-2">
          <button
            onClick={() => setRole("buyer")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              role === "buyer"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            👤 Buyer View
          </button>
          <button
            onClick={() => setRole("seller")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              role === "seller"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🧾 Seller View
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 text-xl">💰</span>
            </div>
            <p className="text-slate-400 text-sm">Total Locked</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalLocked} XLM
          </p>
          <p className="text-slate-500 text-xs mt-1">
            ≈ ${(stats.totalLocked * 0.12).toFixed(2)} USD
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 text-xl">📄</span>
            </div>
            <p className="text-slate-400 text-sm">Active Invoices</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.activeInvoices}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-xl">⏳</span>
            </div>
            <p className="text-slate-400 text-sm">Pending</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.pendingPayments}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-xl">✅</span>
            </div>
            <p className="text-slate-400 text-sm">Completed</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.completedPayments}
          </p>
        </div>
      </div>

      {/* Primary Action */}
      <div className="max-w-7xl mx-auto mb-8">
        {role === "buyer" && (
          <Link
            href="/create-invoice"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            <span className="text-xl">+</span>
            Create New Invoice
          </Link>
        )}
      </div>

      {/* Invoices Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>

      {/* Trust Elements */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-3 gap-6 text-center">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4">
          <p className="text-2xl mb-2">🔒</p>
          <p className="text-white font-semibold mb-1">Secure Escrow</p>
          <p className="text-slate-400 text-xs">
            Funds locked in smart contract
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4">
          <p className="text-2xl mb-2">⚡</p>
          <p className="text-white font-semibold mb-1">Instant Settlement</p>
          <p className="text-slate-400 text-xs">
            ~5 second finality on Stellar
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4">
          <p className="text-2xl mb-2">🛡️</p>
          <p className="text-white font-semibold mb-1">
            Smart Contract Protected
          </p>
          <p className="text-slate-400 text-xs">Verified delivery required</p>
        </div>
      </div>
    </div>
  );
}
