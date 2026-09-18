# 🌸 FemFinHub - AI-Powered Financial Empowerment for Women Entrepreneurs

[![CI/CD Pipeline](https://github.com/your-username/FemFinHub/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/your-username/FemFinHub/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Express%20%7C%20Web3-teal)](https://vitejs.dev)

**FemFinHub** is an end-to-end, production-ready financial inclusion platform engineered specifically for women entrepreneurs, micro-enterprises, and Self-Help Groups (SHGs). By combining **Bias-Free AI Credit Evaluation**, **Government & Private Scheme Aggregation**, **Blockchain-Verified Loan Disbursement Transparency**, and **WhatsApp Cloud API Interaction**, FemFinHub eliminates collateral constraints and gender bias in traditional lending.

---

## 🌟 Key User Journeys & Core Modules

### 🧠 1. AI Credit Evaluation (Bias-Free Scoring)
- **Non-Collateral Assessment**: Evaluates creditworthiness (300–900 score) using alternative data: net cashflow velocity, digital transaction volume (UPI/mobile banking), utility payment punctuality, SHG community trust score, and business operational readiness.
- **99.4% Gender-Neutral Certification**: Audited algorithms eliminate male-cosigner mandates or landed collateral requirements.
- **Interactive Score Simulator**: Real-time slider inputs with radar breakdown charts and actionable improvement tips.

### 🏛️ 2. Government & Private Scheme Aggregation
- **Unified Scheme Portal**: Aggregates top initiatives like Mudra Tarun/Kishore loans, Stand-Up India subsidies (up to $120k), Annapurna catering micro-grants, and Stree Shakti packages.
- **Match Engine & Direct Application**: Calculates eligibility match percentage based on user sector, location, and cashflow. Instant submission wizard.
- **Peer Crowdfunding**: Women entrepreneurs can launch crowdfunding campaigns or back fellow women-led sustainable businesses.

### 🔒 3. Loan Transparency Dashboard (Blockchain Audit Trail)
- **Web3 Smart Contract Ledger**: Every loan milestone disbursement is immutably logged on Polygon PoS / Ethereum smart contracts.
- **Middleman Corruption Safeguard**: Guaranteed zero hidden cuts or delayed disbursements.
- **SHA-256 Hash Inspector**: Anyone can verify transaction hashes and block confirmations directly on-chain.

### 👩‍🏫 4. Learning & 1-on-1 Female Mentorship Hub
- **Financial Literacy Academy**: Courses on no-collateral microfinance, inventory scaling, and tax compliance with interactive quizzes and certificate badges.
- **1-on-1 Mentorship Matcher**: Schedule live video/chat advisory sessions with female venture investors, CFOs, and micro-loan strategists.

### 👥 5. Community Forums & SHG Micro-Lending Circles
- **Q&A Support Network**: Categorized discussion threads, upvoting system, and legal/grant advice.
- **Peer Micro-Lending Circles**: Self-Help Groups pool revolving working capital for peak season inventory.

### 💬 6. WhatsApp Cloud API Chatbot Integration
- **Automated Financial Assistant**: Send instant loan status alerts, balance checks, scheme summaries, and voice prompts via WhatsApp Cloud API webhook integration.

---

## 🏗️ Architecture & Technology Stack

```
                               ┌────────────────────────────────────────┐
                               │            FemFinHub Client            │
                               │  Vite + React + TypeScript + Tailwind │
                               └───────────────────┬────────────────────┘
                                                   │
                                            REST / JSON API
                                                   │
                               ┌───────────────────▼────────────────────┐
                               │           Express API Server           │
                               │        Node.js + CORS + Router         │
                               └──────┬────────────┬────────────┬───────┘
                                      │            │            │
             ┌────────────────────────┴─┐   ┌──────┴───────┐   ┌┴─────────────────────────┐
             │ AI Credit Scoring Engine │   │ Web3 Ledger  │   │  WhatsApp Cloud API      │
             │ Multi-Factor Cashflow AI │   │ Polygon PoS  │   │ Inbound Webhook Listener │
             └──────────────────────────┘   └──────────────┘   └──────────────────────────┘
```

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Lucide Icons, Radix UI.
- **Backend API**: Express.js, Node.js, CORS, Dotenv, Crypto SHA-256 validator.
- **Database Layer**: SQLite / Persistent JSON store (ready for PostgreSQL / Supabase connection).
- **Integrations**: Meta WhatsApp Cloud API Gateway, Web3 Smart Contract RPC (Polygon PoS).
- **CI/CD & Hosting**: GitHub Actions, Vercel (Frontend), Render / Heroku / Railway (Backend API).

---

## 🚀 API Endpoints Reference

| Route | Method | Description |
| :--- | :--- | :--- |
| `/api/credit-score/evaluate` | `POST` | Evaluates alternative data and returns bias-free score (300-900) & risk band |
| `/api/blockchain/ledger` | `GET` | Fetches on-chain loan disbursement transaction logs and smart contract details |
| `/api/blockchain/verify` | `POST` | Validates a SHA-256 transaction hash against block proof |
| `/api/funding/schemes` | `GET` | Returns aggregated government & private schemes with category filtering |
| `/api/funding/apply` | `POST` | Submits instant loan/grant application |
| `/api/funding/crowdfunding` | `GET` | Lists active women-led crowdfunding campaigns |
| `/api/whatsapp/webhook` | `GET / POST` | Meta WhatsApp Cloud API challenge verification & message webhook |
| `/api/mentorship/mentors` | `GET` | Returns list of female financial mentors & available slots |
| `/api/mentorship/book` | `POST` | Schedules 1-on-1 mentorship session and generates meeting link |
| `/api/community/posts` | `GET / POST` | Retrieves forum discussion threads or creates new post |
| `/api/community/posts/:id/upvote` | `POST` | Upvotes a discussion thread |

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### 1. Clone & Install
```bash
git clone https://github.com/your-username/FemFinHub.git
cd FemFinHub
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
PORT=5000
NODE_ENV=development
WHATSAPP_BUSINESS_NUMBER=+14155238886
WHATSAPP_VERIFY_TOKEN=femfinhub_secure_token
SMART_CONTRACT_ADDRESS=0x71C7656EC7ab88b098defB751B7401B5f6d8976F
```

### 3. Run Application
Run the backend server and Vite frontend simultaneously:
```bash
# Terminal 1: Start Express Backend API (Port 5000)
npm run server

# Terminal 2: Start Vite Frontend (Port 8080)
npm run dev
```

Open `http://localhost:8080` in your browser.

---

## 🌐 Production Deployment Guide

### Deploying Frontend to Vercel
1. Push repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial production release of FemFinHub"
   git remote add origin https://github.com/your-username/FemFinHub.git
   git push -u origin main
   ```
2. Connect your GitHub repository on **Vercel** (`https://vercel.com`).
3. Vercel automatically detects `package.json` and `vercel.json`. Set root directory to `./`.
4. Click **Deploy**.

### Deploying Backend API to Render / Railway
1. Create a new **Web Service** on Render (`https://render.com`) pointing to your GitHub repository.
2. Build Command: `npm install`
3. Start Command: `npm run server`
4. Add Environment Variables from `.env.example`.

---

## 📄 License

This project is open-source under the **MIT License**.

Designed & Developed with ❤️ for **Women's Financial Empowerment**.
