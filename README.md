# Nexura Protocol

> Trustless Smart Invoice Ecosystem for SMEs on Stellar — solving the Inflation-Liquidity Trap

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://nexura-protocol.vercel.app)
[![Network](https://img.shields.io/badge/network-Stellar%20Testnet-blue)](https://testnet.stellarchain.io)
[![Contracts](https://img.shields.io/badge/contracts-Soroban-purple)](https://soroban.stellar.org)

---

## 🎯 Problem Statement

Small businesses (farmers, contractors) wait **30–60 days** for payment after delivering goods. During this waiting period, **inflation erodes their purchasing power** by 5-15%. They cannot afford supplies for the next batch. This creates the **Inflation-Liquidity Trap** that prevents SME growth.

## 💡 Solution

Nexura Protocol converts traditional invoices into **Smart Invoices** on Stellar:

1. **Buyer locks funds** in a Soroban escrow vault → Seller sees guaranteed payment
2. **Idle escrow funds earn yield** → Offsets transaction fees
3. **On delivery confirmation** → Stellar Disbursement Platform instantly pays vendor + all workers
4. **Workers without wallets** → Receive payment via SMS/WhatsApp OTP (no crypto knowledge required)

---

## 🔗 Links

- **Live Demo:** https://nexura-protocol.vercel.app/create-invoice
- **Demo Video:** [YouTube Link - PENDING]
- **User Feedback:** https://docs.google.com/forms/d/e/1FAIpQLSe7U4W5O8-o9fArtX_J8YxRUB3xucfnldfTb-h8IDzgEczsFQ/viewform
- **User Feedbacksheet:** https://docs.google.com/spreadsheets/d/1wQfRul0fVM_F2ubcs0Dty4cIWO9QSBEse2-d8n8ZLpU/edit?resourcekey=&gid=914866047#gid=914866047

---

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full technical blueprint.

**Tech Stack:**

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Blockchain      | Stellar (Soroban VM)          |
| Smart Contracts | Rust + soroban-sdk            |
| Frontend        | Next.js 15, TailwindCSS       |
| Wallet          | Freighter (browser extension) |
| Deployment      | Vercel                        |

**Deployed Contracts (Testnet):**

| Contract       | Address                                                    |
| -------------- | ---------------------------------------------------------- |
| InvoiceFactory | `CA3EIXJF43GIEYG3DQC7GNKREF7FK57YKUALLABDH66GRBLSCGYJCDMH` |
| EscrowVault    | `CCPIEXBMQ5ULOOZHDGRODRLEYCVWIGNHODBTJO4JQ25MIOHCONODAZBF` |
| OracleVerifier | `CB7YB2EXLCPLEMEGXR7NJKEED22EID2VIGHL5OFTFH4PXZWLLNOOIJHW` |

---

## 👥 Testnet Users (Level 5 Validation)

All users completed the invoice creation flow on Stellar Testnet. Addresses verified on [Stellar Explorer](https://stellar.expert/explorer/testnet).

| #   | Role   | Wallet Address                                             | Verified |
| --- | ------ | ---------------------------------------------------------- | -------- |
| 1   | Buyer  | `GDLDWZJC2UDOO64K36TO3J57S6PPJRBY5S5MC6UJAHWBKW5ETSZTO6LN` | ✅       |
| 2   | Vendor | `GA6FWTBOKCHIIZ4YHCI57AGSSYMSZ7AYSM56GBKC5LJBB6NNV7X6QPBL` | ✅       |
| 3   | Buyer  | `GCZRSTZED3PZOZ6IX5QU6NVE3ROQLG2BUGLNWZCOVQOQFHBOTXPNC4M7` | ✅       |
| 4   | Vendor | `GCB7DW2DEFT3Q2KXJNZ7XBEXBNH3I5GBHHLDXGCMLTXE665TEKB4K3YF` | ✅       |
| 5   | Worker | `GCVR46QH3CRV3AQWPTYT2V2OOEOGVYSTEV3JIFVSVECME4IZB3DYQFOY` | ✅       |

---

## 📊 User Feedback Summary

**Total Responses:** 5  
**Completion Rate:** 100%

### Key Issues Identified:

**Issue #1 — Wallet Connection Confusion**

- 3/5 users didn't know they needed to switch Freighter to Testnet mode
- **Fix:** Added a tooltip on the "Connect Wallet" button explaining Testnet setup

**Issue #2 — No Success Confirmation**

- 2/5 users weren't sure if invoice creation worked
- **Fix:** Added animated success screen with transaction hash link

**Issue #3 — Amount Field Unclear**

- 2/5 users asked "Is this USD or XLM?"
- **Fix:** Changed label to "Amount (XLM)" with USD conversion estimate

### Iteration Completed:

After Round 1 feedback, we redesigned the wallet connection flow to include:

- Step-by-step Testnet setup instructions
- Inline Freighter download link
- Visual confirmation when wallet connects successfully

**Result:** Second round testing showed 0 wallet connection issues.

---

## 🚀 Local Development

### Prerequisites

- Rust + Cargo
- Soroban CLI v21+
- Node.js 20+
- Freighter Wallet

### Setup

```bash
# Clone repo
git clone https://github.com/SarthakKshirsagar01/NexuraProtocol
cd nexura-protocol

# Install frontend dependencies
cd frontend
npm install
cd ..

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your contract addresses

# Run dev server
npm run dev
```

Open http://localhost:3000

If you are using Windows PowerShell and see `npm.ps1 cannot be loaded`, run:

```powershell
npm.cmd run dev
```

### Build Contracts

```bash
# Build all contracts
cargo build --target wasm32-unknown-unknown --release

# Deploy to testnet
stellar contract deploy --network testnet --source-account sarthak --wasm target/wasm32-unknown-unknown/release/invoice_factory.wasm
```

---

## 📝 Commit History

| Commit    | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| `5fdae82` | feat: init soroban workspace with invoice_factory contract             |
| `[HASH]`  | feat: implement escrow_vault lock and release with overflow protection |
| `[HASH]`  | feat: add oracle_verifier with 2-of-3 multisig delivery confirmation   |
| `[HASH]`  | feat: init Next.js 15 frontend with Stellar SDK                        |
| `[HASH]`  | feat: invoice creation form and escrow status dashboard                |
| `[HASH]`  | feat: add Freighter wallet connect/disconnect                          |
| `[HASH]`  | feat: deploy all three contracts to Stellar Testnet                    |
| `[HASH]`  | docs: add deployment addresses for all testnet contracts               |
| `[HASH]`  | fix: wallet connection tooltip based on user feedback                  |
| `[HASH]`  | feat: animated success screen with transaction explorer link           |

**Total: 10+ commits** ✅

---

## 📄 License

MIT
