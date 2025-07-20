# 🛡️ Safe Wallet Project

Secure. Automated. Multichain. Built for the next generation of onchain coordination.

> Think of this as your Safe vault command center — wired into Slack, GitHub, and whatever the DAO gods throw at you.

---

## 🔧 Features

- 🔐 Safe-compatible wallet logic (Arbitrum, Ethereum, etc.)
- 📡 Slack alert integration for transaction proposals
- 💬 GitHub Actions + Slack/Discord hooks (fully customizable)
- 🧠 Owner + threshold detection
- 🧾 Dynamic transaction builder (ETH, tokens, contract calls)
- 🌐 Dashboard frontend for proposal management

---

## 🪄 Project Structure

```bash
.
├── README.md                      # Project overview (this file)
├── .env                           # Contains SAFE_ADDRESS + SLACK_WEBHOOK
├── requirements.txt               # Python deps (requests, dotenv, etc.)
│
├── notify_slack.py                # Sends Slack notifications via webhook
│
├── scripts/                       # Automation scripts
│   ├── check_safe_balance.py      # Checks Safe balance (to be expanded)
│   ├── create_safe_proposal.py    # Draft Safe proposal from CLI
│   └── init_config.py             # Setup environment and webhook
│
├── utils/                         # Helper modules
│   ├── safe_sdk.py                # Interacts with Safe SDK
│   └── slack_utils.py             # Slack formatting + sending
│
├── dashboard/                     # Frontend Safe dashboard (HTML/CSS/TS)
│   ├── index.html
│   ├── style.css
│   └── dashboard.js
│
├── .github/
│   └── workflows/
│       └── safe_proposal.yml      # GitHub Action to notify Slack + trigger Safe proposals
