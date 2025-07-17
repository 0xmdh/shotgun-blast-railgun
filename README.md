# SHOTGUN BLAST — Private Payroll **Demo** Safe App

> **Privacy-first payroll for Web3 treasuries (prototype).**  
> Upload a CSV inside your **Gnosis Safe**, sign once, and Railgun shields your treasury and salary list.  
> **This is a *demo app* intended for UX/UI experimentation. Do not use with main-net funds in production.**

[Live demo](https://shotgunblast.wakeuplabs.io/) · Made with ❤️ by [WakeUp Labs](https://wakeuplabs.io)

---

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

> **Important:** The on-chain calls are executed only on test networks or within Tenderly simulations. Replace RPC + keys with test credentials.

