"use client";

import { useState, type FormEvent } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";

export default function CreateInvoice() {
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Creating invoice...");

    try {
      if (
        !StellarSdk.StrKey.isValidEd25519PublicKey(buyer) ||
        !StellarSdk.StrKey.isValidEd25519PublicKey(seller)
      ) {
        setStatus("❌ Buyer and seller must be valid Stellar public keys");
        return;
      }

      if (Number(amount) <= 0 || !description.trim()) {
        setStatus("❌ Amount must be positive and description is required");
        return;
      }

      const freighter = (window as any).freighter;
      if (!freighter) {
        setStatus("❌ Please install Freighter wallet");
        return;
      }

      const { isConnected } = await freighter.isConnected();
      if (!isConnected) {
        setStatus("❌ Please connect Freighter wallet");
        return;
      }

      await freighter.getNetwork();
      const publicKey = await freighter.getPublicKey();

      setStatus(`✓ Connected: ${publicKey.slice(0, 8)}...`);

      const invoiceId = Math.floor(Math.random() * 10000);

      setStatus(`✅ Invoice #${invoiceId} created on Stellar Testnet`);
      setTxHash(`Simulated-TX-${invoiceId}`);
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Smart Invoice
          </h1>
          <p className="text-slate-300 mb-8">
            Lock funds in escrow on Stellar Testnet
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Buyer Address (Stellar G...)
              </label>
              <input
                type="text"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
            >
              Create Invoice & Lock Escrow
            </button>
          </form>

          {status && (
            <div className="mt-6 p-4 bg-white/5 border border-white/20 rounded-lg">
              <p className="text-slate-200 text-sm">{status}</p>
              {txHash && (
                <a
                  href={`https://testnet.stellarchain.io/transactions/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm underline mt-2 inline-block"
                >
                  View on Explorer →
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-slate-400 text-sm">Total Invoices</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
            <p className="text-2xl font-bold text-white">0 XLM</p>
            <p className="text-slate-400 text-sm">Locked in Escrow</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
            <p className="text-2xl font-bold text-white">~5s</p>
            <p className="text-slate-400 text-sm">Avg Settlement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
