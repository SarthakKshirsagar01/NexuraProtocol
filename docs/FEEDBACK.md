# Nexura Protocol — User Feedback Documentation

## Methodology

5 users tested the Nexura Protocol MVP on Stellar Testnet. Each user:

1. Installed Freighter wallet and switched to Testnet
2. Connected wallet to the dApp
3. Created at least one test invoice
4. Provided feedback via Google Form

**Feedback Form:** https://docs.google.com/forms/d/e/1FAIpQLSe7U4W5O8-o9fArtX_J8YxRUB3xucfnldfTb-h8IDzgEczsFQ/viewform

---

## Testnet Users

| #   | Role   | Stellar Testnet Address                                    | Explorer Link                                                                                                    |
| --- | ------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1   | Buyer  | `GDHWXGMJVAYCHUWDATDMANHES3IFQOI2I5DNI7I43DZILSKSECBMQFOH` | [View](https://stellar.expert/explorer/testnet/account/GDHWXGMJVAYCHUWDATDMANHES3IFQOI2I5DNI7I43DZILSKSECBMQFOH) |
| 2   | Vendor | `GCB7DW2DEFT3Q2KXJNZ7XBEXBNH3I5GBHHLDXGCMLTXE665TEKB4K3YF` | [View](https://stellar.expert/explorer/testnet/account/GCB7DW2DEFT3Q2KXJNZ7XBEXBNH3I5GBHHLDXGCMLTXE665TEKB4K3YF) |
| 3   | Buyer  | `GA6FWTBOKCHIIZ4YHCI57AGSSYMSZ7AYSM56GBKC5LJBB6NNV7X6QPBL` | [View](https://stellar.expert/explorer/testnet/account/GA6FWTBOKCHIIZ4YHCI57AGSSYMSZ7AYSM56GBKC5LJBB6NNV7X6QPBL) |
| 4   | Vendor | `GCZRSTZED3PZOZ6IX5QU6NVE3ROQLG2BUGLNWZCOVQOQFHBOTXPNC4M7` | [View](https://stellar.expert/explorer/testnet/account/GCZRSTZED3PZOZ6IX5QU6NVE3ROQLG2BUGLNWZCOVQOQFHBOTXPNC4M7) |
| 5   | Worker | `GCVR46QH3CRV3AQWPTYT2V2OOEOGVYSTEV3JIFVSVECME4IZB3DYQFOY` | [View](https://stellar.expert/explorer/testnet/account/GCVR46QH3CRV3AQWPTYT2V2OOEOGVYSTEV3JIFVSVECME4IZB3DYQFOY) |

---

## Feedback Summary

### Issue #1 — Testnet Setup Confusion

**Users:** 3 out of 5  
**Feedback:** "I didn't know I needed to switch Freighter to Testnet mode"  
**Severity:** High — blocked initial wallet connection

**Action Taken:**  
Added a tooltip on the "Connect Wallet" button with step-by-step instructions:

- Download Freighter
- Switch to Testnet in settings
- Get free testnet XLM from Friendbot

### Issue #2 — No Visual Confirmation After Invoice Creation

**Users:** 2 out of 5  
**Feedback:** "I clicked submit but nothing happened. Did it work?"  
**Severity:** Medium — created uncertainty

**Action Taken:**  
Added an animated success screen showing:

- Invoice ID
- Transaction hash
- Direct link to Stellar Testnet Explorer

### Issue #3 — Amount Field Ambiguity

**Users:** 2 out of 5  
**Feedback:** "Is this amount in USD or XLM?"  
**Severity:** Low — caused confusion

**Action Taken:**  
Changed label from "Amount" to "Amount (XLM)" and added a helper text showing approximate USD value.

---

## Iteration Completed

**Primary iteration from feedback:** Wallet connection flow redesign (Issue #1)

Before iteration:

- Just a "Connect Wallet" button
- No guidance on Testnet setup
- 60% failure rate on first connection attempt

After iteration:

- Tooltip with Testnet instructions
- Inline link to Freighter download
- Visual indicator when Testnet is detected
- 0% failure rate in second round testing

**Result:** All 5 users in the second test group connected successfully on first try.

---

## User Satisfaction

**Would you use this for real business payments? (1-5 scale)**

- Average score: 4.2/5
- 3 users rated 5/5
- 2 users rated 3/5 (wanted mobile app first)

**Top Feature Requests:**

1. Mobile app (4 users)
2. Multi-language support (3 users)
3. Automatic USD/XLM conversion (2 users)
4. Email notifications when payment received (2 users)

---

## Next Steps

Based on feedback, Sprint 2 priorities:

1. Build mobile-responsive UI
2. Add Hindi/Marathi language toggle
3. Integrate real-time XLM/USD price feed
4. Deploy notification system via email/SMS
