# SHOTGUN BLAST — Private Payroll **Demo** Safe App

> **Privacy-first payroll for Web3 treasuries (prototype).**  
> Upload a CSV inside your **Gnosis Safe**, sign once, and Railgun shields your treasury and salary list.  
> **This is a *demo app* intended for UX/UI experimentation. Do not use with main-net funds in production.**

[Live demo](https://shotgunblast.wakeuplabs.io/) · Made with ❤️ by [WakeUp Labs](https://wakeuplabs.io)

## What this demo shows

| Feature | Demo behaviour |
|---------|----------------|
| **Safe-native UI** | Runs inside any Gnosis Safe as an iframe App. |
| **CSV batch import** | Drag-and-drop payroll data or add recipients manually. |
| **Transparent cost preview** | Displays total amount, Railgun shielding fees (0.25 % + 0.25 %) and gas estimate. |
| **One-click privacy flow** | Generates a single multisig transaction that *would* shield and fan-out payments (simulated). |
| **Privacy tiers** | *Basic* (instant) or *Enhanced* (±15 min random delay). |
| **Live progress tracker** | Simulated deposit → proof generation → unshield payouts. |
| **Audit receipts** | Downloadable CSV with (mock) tx hashes for accounting tests. |

## How to use the demo

1. **Open the Safe App** – Safe → Apps → *Load Custom App* → your local/Vercel URL.  
2. **Import payroll** – Upload `payroll.csv` (`recipient_address,amount,token_symbol?`).  
3. **Review & confirm** – Check totals, fees, select privacy tier.  
4. **Sign** – Safe modal shows a simulated `shield(total)` call.  
5. **Watch progress** – Demo animates deposit → proofs → payouts.  
6. **Download receipts** – CSV for audit / UX testing.

## Privacy flow (simulated)

1. The Safe **would** transfer the **aggregate amount** to `RailgunShield.deposit()`.  
2. The service **would** split the note, generate ZK proofs, and queue unshields.  
3. Recipients **would** see deposits from a Railgun relayer—no treasury link.

> **Demo-only note:** All calls are *mocked* against testnets / Tenderly; no real shielding occurs unless you plug in main-net RPC and the full Railgun stack.

*(Protocol fees for real deployments: **0.25 %** on shield + **0.25 %** on unshield, set by Railgun.)*

## Limitations

* Proof generator is a **mock**; replace with the real Railgun SDK for production.  
* UI/contract code **not audited**; expect bugs & edge cases.  
* Designed for UX research — optimise, refactor or re-secure before real money.

## 🪪 License
Released under the **MIT License**.  
This repository is **alpha software** — provided “as is”, without warranty. Use at your own risk.

## 📫 Contact

* x.com: **[@WakeUp_Labs](https://x.com/wakeuplabs)**  
* Email: **community@wakeuplabs.io**  
* Proposal discussion: (forum link TBA)

*Help us bring private payroll to every DAO.* 🚀
