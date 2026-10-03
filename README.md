# NEXUS — AI-Powered Financial Trust Passport

> **"Your Financial Story, Structured for Trust."**

NEXUS is an AI-powered financial intelligence and trust-profile platform designed specifically for Indian freelancers, students, self-employed professionals, and small businesses (MSMEs). It organizes financial activity (UPI settlements, client retainers, bank statements, and recurring living expenses) into a structured, explainable, and user-controlled financial profile.

---

## 🇮🇳 India-Focused Localization Standard
- **Currency**: Indian Rupee (`₹` INR) formatted according to the `en-IN` numbering system (e.g. `₹45,000`, `₹1,25,000.00`, `₹1.5L`).
- **Locale & Timezone**: `en-IN` / `Asia/Kolkata` (IST) with `DD MMM YYYY` date formatting.
- **Indian Financial Infrastructure**: Native support for UPI (Google Pay, PhonePe), Net Banking (HDFC, ICICI, SBI), GST (GSTR-4 / GSTR-1), and Razorpay merchant settlements.
- **Demo Identity**: Pre-seeded with **John Doe** (Independent Freelancer based in Lucknow, Uttar Pradesh).

---

## 🚀 Key Features

1. **Explainable Financial Trust Passport**:
   - Four quantitative pillars: **Income Consistency** (86/100), **Savings Behavior** (82/100), **Expense Management** (84/100), and **Record Availability** (100%).
   - Transparent mathematical derivations for each indicator without black-box credit score fabrication.
2. **AI-Powered Financial Intelligence**:
   - Powered by Gemini 2.0 with a high-precision deterministic rule-based engine fallback.
   - Anomaly detection (e.g., *"+18% Food & Dining outflow surge alert"*).
   - Interactive AI Financial Advisor Q&A assistant.
3. **Full Transaction CRUD Ledger**:
   - Add, edit, and delete income/expense transactions in Indian Rupees with category, payment method (UPI, IMPS, Cards), and counterparty metadata.
   - Live KPI recalculations (Inflow, Outflow, Net Balance, Savings Rate).
4. **6-Month Cash Flow Forecasting**:
   - Interactive forward-looking cash flow projections with scenario sliders (income surge/loss, expense frugality).
5. **Privacy & Consent Governance Center**:
   - Zero silent sharing: No data is shared without explicit, time-bound authorization.
   - Real-time grant and revoke controls for Indian lenders, landlords, and leasing partners.
   - Instant Data Export (JSON / CSV) and complete Right-to-Erasure workflow.
6. **Institution & Verifier Portal**:
   - Read-only lookup portal for verified underwriter reviews using Passport Tokens (e.g., `DEMO-NX-84920`).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, React Router v7
- **Backend**: Express API (`server.ts`) with Google GenAI SDK (`@google/genai`)
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) + Local-First Fallback
- **Deployment**: Vercel (Frontend) + Supabase (Database & Auth)

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional)* Add your `GEMINI_API_KEY` for live AI generation and `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` for live cloud database synchronization.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

*(Optional)* Run the backend AI server concurrently:
```bash
npm run server
```

---

## 🗄️ Supabase Database Setup

1. Open your [Supabase Dashboard](https://app.supabase.com) and create a new project.
2. Go to the **SQL Editor** and paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Click **Run** to execute the migration. This provisions:
   - Tables: `profiles`, `transactions`, `financial_profiles`, `ai_insights`, `consent_records`, `forecast_records`, `audit_logs`
   - Row Level Security (RLS) policies
   - Automatic user profile creation trigger
   - Seeded demo dataset for **John Doe** (Lucknow)

---

## 🌐 Deployment Instructions

### Deploying to Vercel
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. In Project Settings > **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `GEMINI_API_KEY`: Your Google Gemini API Key
4. Deploy!

---

## ⚖️ Compliance & Disclaimers
*NEXUS is an explainable financial intelligence platform and does not issue credit ratings, make credit underwriting guarantees, or offer SEBI-registered financial advisory services.*
