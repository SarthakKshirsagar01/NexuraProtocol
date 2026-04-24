# Nexura Protocol — Architecture Document

## System Overview

Nexura Protocol is a trustless smart invoice ecosystem built on Stellar that solves the SME Inflation-Liquidity Trap by converting net-30/60 payment terms into instant, yield-bearing escrow contracts with automated bulk worker payouts.

---

## Layer Architecture

                        ┌──────────────────────────────┐
                        │        👤 User (Buyer/Seller) │
                        └──────────────┬───────────────┘
                                       │
                                       ▼
                        ┌──────────────────────────────┐
                        │     🌐 Frontend (Next.js)     │
                        │  - UI / Dashboard             │
                        │  - Invoice Creation           │
                        │  - Wallet Interaction         │
                        └──────────────┬───────────────┘
                                       │
                                       ▼
                        ┌──────────────────────────────┐
                        │ 🔐 Wallet Layer (Freighter)  │
                        │  - Transaction Signing       │
                        │  - Secure Auth               │
                        └──────────────┬───────────────┘
                                       │
                                       ▼

═══════════════════════════════════════════════════════════════
⚡ STELLAR BLOCKCHAIN (SOROBAN VM)
═══════════════════════════════════════════════════════════════
│
┌──────────────────────────────┼──────────────────────────────┐
│ │ │
▼ ▼ ▼

┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ 📄 InvoiceFactory │ │ 🔒 EscrowVault │ │ 🧾 OracleVerifier │
│----------------------│ │----------------------│ │----------------------│
│ - Create Invoice │ │ - Lock Funds │ │ - Verify Delivery │
│ - Store Metadata │ │ - Hold Escrow │ │ - 2/3 Multisig │
│ - Emit Events │ │ - Release Payment │ │ - Approval Logic │
└──────────┬───────────┘ └──────────┬───────────┘ └──────────┬───────────┘
│ │ │
└──────────────┬───────────┴──────────────┬───────────┘
▼ ▼

                ┌──────────────────────────────┐
                │ 💰 Token Layer               │
                │ - XLM                        │
                │ - USDC (SEP-41)              │
                └──────────────────────────────┘

## Invoice Lifecycle Flow

[1] Buyer creates invoice
│
▼
📄 InvoiceFactory Contract
│
▼
[2] Invoice stored on-chain + Event emitted
│
▼
[3] Buyer locks funds
│
▼
🔒 EscrowVault Contract
│
▼
[4] Oracle verifies delivery
│
▼
🧾 OracleVerifier (2/3 approvals)
│
▼
[5] Funds released to Seller
│
▼
💰 Seller receives payment

## Project Structure (Code-Level)

nexura-protocol/
│
├── contracts/
│ ├── invoice_factory/
│ ├── escrow_vault/
│ └── oracle_verifier/
│
├── frontend/
│ ├── app/
│ ├── hooks/
│ ├── components/
│ └── services/
│
├── docs/
│ ├── ARCHITECTURE.md
│ ├── FEEDBACK.md
│ └── DEPLOYMENT.md
│
└── README.md
