# Nexura Protocol — Architecture Document

## System Overview

Nexura Protocol is a trustless smart invoice ecosystem built on Stellar that solves the SME Inflation-Liquidity Trap by converting net-30/60 payment terms into instant, yield-bearing escrow contracts with automated bulk worker payouts.

---

## Layer Architecture

### Layer 1 — Stellar Blockchain (Soroban VM)

- **Network:** Stellar Testnet → Mainnet
- **Execution:** Soroban WASM runtime
- **Finality:** ~5 seconds
- **Fees:** ~0.00001 XLM per operation
- **Assets:** Native XLM + Circle USDC (SEP-41 standard)

### Layer 2 — Smart Contracts (Rust)

**InvoiceFactory** (`CA3EIXJF43GIEYG3DQC7GNKREF7FK57YKUALLABDH66GRBLSCGYJCDMH`)

- Entry point for all invoice creation
- `create_invoice(buyer, seller, amount, description)` → emits `InvoiceCreated` event
- Stores invoice metadata on-chain
- Authorization: requires buyer signature

**EscrowVault** (`CCPIEXBMQ5ULOOZHDGRODRLEYCVWIGNHODBTJO4JQ25MIOHCONODAZBF`)

- `lock(invoice_id, funds)` → transfers tokens to contract address
- `release(invoice_id)` → pays seller after verification
- **Security Features:**
  - Reentrancy guard using storage lock flag
  - Overflow protection with `checked_add` / `checked_mul`
  - Single-use release (cannot release twice)

**OracleVerifier** (`CB7YB2EXLCPLEMEGXR7NJKEED22EID2VIGHL5OFTFH4PXZWLLNOOIJHW`)

- `verify_delivery(invoice_id, verifier, approved)` → 2-of-3 multisig
- Only authorized verifiers can confirm delivery
- Threshold-based confirmation (default: 2 approvals required)

### Layer 3 — Frontend (Next.js 15)

**Separation of Concerns:**

- `app/` → Next.js App Router pages
- `hooks/useWallet.ts` → Freighter wallet integration
- `components/` → Reusable UI components (future)

**Wallet Integration:**

- Freighter browser extension via `@stellar/freighter-api`
- No seed phrase management in frontend
- Users sign transactions directly in Freighter

---

## Data Flow — Invoice Lifecycle
