# Nexura Protocol — Architecture Document

## System Overview

Nexura Protocol is a trustless smart invoice ecosystem built on Stellar that solves the SME Inflation-Liquidity Trap by converting net-30/60 payment terms into instant, yield-bearing escrow contracts with automated bulk worker payouts.

---

## Layer Architecture

            👤 User (Buyer / Seller)
                     │
                     ▼
            🌐 Frontend (Next.js)
         (UI, Invoice, Dashboard)
                     │
                     ▼
          🔐 Wallet (Freighter)
         (Auth + Tx Signing)
                     │
                     ▼

=================================================
⚡ STELLAR (Soroban Smart Contracts)
=================================================
│
┌───────────────┼───────────────┐
│ │ │
▼ ▼ ▼

📄 InvoiceFactory 🔒 EscrowVault 🧾 OracleVerifier

---

Create Invoice Lock Funds Verify Delivery
Store Metadata Hold Escrow 2/3 Multisig
Emit Events Release Funds Approval Logic

     └───────────────┬───────────────┘
                     ▼
              💰 Token Layer
             (XLM + USDC)

## Invoice Lifecycle Flow

Buyer
│
▼
Create Invoice
│
▼
📄 InvoiceFactory
│
▼
Invoice Stored On-Chain
│
▼
Lock Funds
│
▼
🔒 EscrowVault
│
▼
Verify Delivery
│
▼
🧾 OracleVerifier (2/3)
│
▼
Release Payment
│
▼
Seller Receives Funds

## Project Structure (GitHub View)

```text
NexuraProtocol/
|-- contracts/
|   |-- escrow_vault/
|   |   |-- cargo.toml
|   |   |-- src/
|   |   |   `-- lib.rs
|   |   `-- test_snapshots/
|   |       `-- test/
|   |           |-- test_double_release_protection.1.json
|   |           `-- test_lock_and_release.1.json
|   |-- invoice_factory/
|   |   |-- Cargo.toml
|   |   |-- lib.rs
|   |   |-- src/
|   |   |   `-- lib.rs
|   |   `-- test_snapshots/
|   |       `-- test/
|   |           `-- test_create_invoice.1.json
|   `-- oracle_verifier/
|       |-- Cargo.toml
|       |-- src/
|       |   `-- lib.rs
|       `-- test_snapshots/
|           `-- test/
|               `-- test_multisig_verification.1.json
|-- docs/
|   |-- ARCHITECTURE.md
|   |-- DEPLOYMENT.md
|   `-- FEEDBACK.md
|-- frontend/
|   |-- app/
|   |   |-- create-invoice/
|   |   |   `-- page.tsx
|   |   |-- dashboard/
|   |   |   `-- page.tsx
|   |   |-- favicon.ico
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- InvoiceCard.tsx
|   |   |-- StatusBadge.tsx
|   |   |-- Toast.tsx
|   |   `-- TransactionStatus.tsx
|   |-- hooks/
|   |   |-- useToast.ts
|   |   `-- useWallet.ts
|   |-- public/
|   |   |-- file.svg
|   |   |-- globe.svg
|   |   |-- next.svg
|   |   |-- vercel.svg
|   |   `-- window.svg
|   |-- .gitignore
|   |-- AGENTS.md
|   |-- CLAUDE.md
|   |-- README.md
|   |-- eslint.config.mjs
|   |-- next.config.ts
|   |-- package-lock.json
|   |-- package.json
|   |-- postcss.config.js
|   |-- postcss.config.mjs
|   |-- tailwind.config.js
|   |-- tailwind.config.ts
|   `-- tsconfig.json
|-- .gitignore
|-- Cargo.lock
|-- Cargo.toml
|-- README.md
|-- package.json
`-- test_output.txt
```