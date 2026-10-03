-- ============================================================================
-- NEXUS — Financial Trust Passport Database Schema (PostgreSQL / Supabase)
-- Tailored for Indian Freelancers, Students, Self-Employed, & Small Businesses
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT 'John Doe',
    email TEXT UNIQUE NOT NULL,
    city TEXT DEFAULT 'Lucknow',
    state TEXT DEFAULT 'Uttar Pradesh',
    country TEXT DEFAULT 'India',
    user_type TEXT CHECK (user_type IN ('student', 'freelancer', 'self_employed', 'small_business')) DEFAULT 'freelancer',
    persona_title TEXT DEFAULT 'Independent Software Engineer & Product Designer',
    monthly_income_range TEXT DEFAULT '₹30,000 – ₹60,000',
    passport_id TEXT UNIQUE DEFAULT ('DEMO-NX-' || floor(random() * 90000 + 10000)::text),
    verification_status TEXT DEFAULT 'Verified' CHECK (verification_status IN ('Verified', 'Pending Records', 'Under Review', 'Self-Reported')),
    profile_completion INTEGER DEFAULT 88 CHECK (profile_completion BETWEEN 0 AND 100),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('inflow', 'outflow')),
    category TEXT NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('UPI', 'Net Banking', 'IMPS / NEFT', 'Debit Card', 'Credit Card', 'Cash', 'Client Direct Payout')),
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    source TEXT DEFAULT 'UPI - Google Pay',
    counterparty TEXT,
    notes TEXT,
    status TEXT DEFAULT 'settled' CHECK (status IN ('settled', 'cleared', 'verified')),
    reference_id TEXT DEFAULT ('UPI/' || floor(random() * 9000000000 + 1000000000)::text),
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Financial Profiles Table (Explainable Indicators)
CREATE TABLE IF NOT EXISTS public.financial_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    monthly_income_average NUMERIC(14, 2) DEFAULT 45000.00,
    monthly_expense_average NUMERIC(14, 2) DEFAULT 28500.00,
    estimated_savings NUMERIC(14, 2) DEFAULT 16500.00,
    savings_rate NUMERIC(5, 2) DEFAULT 36.70,
    income_consistency INTEGER DEFAULT 86 CHECK (income_consistency BETWEEN 0 AND 100),
    savings_behavior INTEGER DEFAULT 82 CHECK (savings_behavior BETWEEN 0 AND 100),
    expense_management INTEGER DEFAULT 84 CHECK (expense_management BETWEEN 0 AND 100),
    record_availability_score INTEGER DEFAULT 100,
    verified_records_count INTEGER DEFAULT 6,
    last_computed_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AI Insights Table
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    insight_type TEXT NOT NULL CHECK (insight_type IN ('positive', 'neutral', 'recommendation', 'alert')),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
    metric_note TEXT,
    action_label TEXT,
    action_route TEXT,
    is_ai_generated BOOLEAN DEFAULT TRUE,
    model_confidence TEXT DEFAULT '96%',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Consent Records Table (Data Sharing Governance)
CREATE TABLE IF NOT EXISTS public.consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_name TEXT NOT NULL,
    recipient_type TEXT NOT NULL CHECK (recipient_type IN ('Lender', 'Landlord & Property Manager', 'Equipment Financing', 'Fintech Underwriting', 'MSME Credit Network')),
    data_category TEXT[] NOT NULL DEFAULT ARRAY['Monthly Cash Flow Range', 'Income Consistency Score'],
    purpose TEXT NOT NULL,
    consent_status TEXT NOT NULL DEFAULT 'active' CHECK (consent_status IN ('active', 'pending', 'revoked')),
    access_level TEXT DEFAULT 'Cash-Flow Summary' CHECK (access_level IN ('Full Passport', 'Income Verification Only', 'Cash-Flow Summary', 'Custom Fields')),
    consent_token TEXT UNIQUE DEFAULT ('NEX-CONSENT-' || upper(substr(md5(random()::text), 1, 10))),
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expiry_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days'),
    revoked_at TIMESTAMPTZ
);

-- 6. Cash Flow Forecast Records Table
CREATE TABLE IF NOT EXISTS public.forecast_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    forecast_month TEXT NOT NULL,
    estimated_income NUMERIC(14, 2) NOT NULL,
    estimated_expenses NUMERIC(14, 2) NOT NULL,
    estimated_balance NUMERIC(14, 2) NOT NULL,
    confidence_score INTEGER DEFAULT 88 CHECK (confidence_score BETWEEN 0 AND 100),
    assumptions TEXT[] NOT NULL DEFAULT ARRAY['Based on active retainer run-rate', 'Rent & utilities constant'],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Audit Logs Table (Immutable Logging)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR HIGH-PERFORMANCE QUERYING
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON public.transactions(category);
CREATE INDEX IF NOT EXISTS idx_consent_records_user_id ON public.consent_records(user_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_token ON public.consent_records(consent_token);
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON public.ai_insights(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forecast_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles Policy
CREATE POLICY "Users can view and update own profile"
    ON public.profiles
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Transactions Policy
CREATE POLICY "Users can manage own transactions"
    ON public.transactions
    FOR ALL
    USING (
        user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR is_demo = TRUE
    )
    WITH CHECK (
        user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    );

-- Financial Profiles Policy
CREATE POLICY "Users can read own financial profile"
    ON public.financial_profiles
    FOR ALL
    USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- AI Insights Policy
CREATE POLICY "Users can view own AI insights"
    ON public.ai_insights
    FOR ALL
    USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Consent Records Policy (User ownership + Token lookup for authorized institutions)
CREATE POLICY "Users manage own consent records"
    ON public.consent_records
    FOR ALL
    USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Verifiers can view active consent by token"
    ON public.consent_records
    FOR SELECT
    USING (consent_status = 'active' AND (expiry_date IS NULL OR expiry_date > NOW()));

-- ============================================================================
-- AUTOMATIC PROFILE PROVISIONING TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_profile_id UUID;
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email, city, user_type)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'John Doe'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'city', 'Lucknow'),
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'freelancer')
    )
    RETURNING id INTO new_profile_id;

    INSERT INTO public.financial_profiles (user_id)
    VALUES (new_profile_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SEED SCRIPT FOR DEMO IDENTITY: JOHN DOE (LUCKNOW, FREELANCER)
-- ============================================================================
DO $$
DECLARE
    demo_user_id UUID;
BEGIN
    -- Insert Demo Profile
    INSERT INTO public.profiles (
        full_name, email, city, state, country, user_type, persona_title,
        monthly_income_range, passport_id, verification_status, profile_completion
    ) VALUES (
        'John Doe', 'john.doe@nexusdemo.in', 'Lucknow', 'Uttar Pradesh', 'India',
        'freelancer', 'Independent Software Engineer & Product Designer',
        '₹30,000 – ₹60,000', 'DEMO-NX-84920', 'Verified', 88
    )
    ON CONFLICT (email) DO UPDATE SET updated_at = NOW()
    RETURNING id INTO demo_user_id;

    -- Financial Profile Seed
    INSERT INTO public.financial_profiles (
        user_id, monthly_income_average, monthly_expense_average,
        estimated_savings, savings_rate, income_consistency, savings_behavior,
        expense_management, record_availability_score, verified_records_count
    ) VALUES (
        demo_user_id, 45000.00, 28500.00, 16500.00, 36.70, 86, 82, 84, 100, 6
    ) ON CONFLICT (user_id) DO NOTHING;

    -- Seed Transactions (Indian Sample Data)
    INSERT INTO public.transactions (user_id, title, amount, transaction_type, category, payment_method, transaction_date, source, counterparty, notes, is_demo)
    VALUES
    (demo_user_id, 'Freelance Project Payment — Apex Fintech', 25000.00, 'inflow', 'Freelance Payment', 'UPI', CURRENT_DATE - INTERVAL '2 days', 'UPI - Google Pay', 'Apex Global Tech Ltd', 'Milestone 2 settlement', TRUE),
    (demo_user_id, 'Monthly Retainer — Bangalore Design Studio', 20000.00, 'inflow', 'Client Retainer', 'Net Banking', CURRENT_DATE - INTERVAL '5 days', 'HDFC Bank', 'Bangalore Design Studio LLP', 'Monthly UX maintenance', TRUE),
    (demo_user_id, 'Monthly Rent — Indira Nagar Studio', 8000.00, 'outflow', 'Rent & Housing', 'UPI', CURRENT_DATE - INTERVAL '7 days', 'UPI - PhonePe', 'Verma Properties Lucknow', 'Studio rent', TRUE),
    (demo_user_id, 'Grocery Shopping — Blinkit & Smart Bazaar', 3500.00, 'outflow', 'Groceries & Food', 'UPI', CURRENT_DATE - INTERVAL '8 days', 'UPI - Google Pay', 'Blinkit Commerce Pvt Ltd', 'Groceries & pantry', TRUE),
    (demo_user_id, 'Coworking Space — Lucknow Innovators Hub', 3500.00, 'outflow', 'Coworking / Studio', 'Net Banking', CURRENT_DATE - INTERVAL '11 days', 'HDFC Bank', 'Innovators Hub Gomti Nagar', 'Dedicated hot desk', TRUE),
    (demo_user_id, 'Dining & Food Delivery — Swiggy / Zomato', 2400.00, 'outflow', 'Dining & Outing', 'UPI', CURRENT_DATE - INTERVAL '13 days', 'UPI - PhonePe', 'Bundl Technologies (Swiggy)', 'Client dinner and takeout', TRUE),
    (demo_user_id, 'Cloud & Hosting Infrastructure — AWS & Vercel', 1450.00, 'outflow', 'Software & Tools', 'Debit Card', CURRENT_DATE - INTERVAL '15 days', 'HDFC Bank', 'Amazon Web Services India', 'Dev infrastructure', TRUE),
    (demo_user_id, 'Fuel & Metro Travel — Lucknow Metro UPI', 1200.00, 'outflow', 'Transportation', 'UPI', CURRENT_DATE - INTERVAL '18 days', 'UPI - Google Pay', 'UPMRC Lucknow Metro', 'Travel pass recharge', TRUE),
    (demo_user_id, 'Internet Broadband — JioFiber 300 Mbps', 799.00, 'outflow', 'Mobile & Internet', 'UPI', CURRENT_DATE - INTERVAL '23 days', 'UPI - Google Pay', 'Reliance Jio Infocomm', 'High-speed broadband', TRUE),
    (demo_user_id, 'Mobile Recharge — Airtel 5G Prepaid Plan', 299.00, 'outflow', 'Mobile & Internet', 'UPI', CURRENT_DATE - INTERVAL '25 days', 'UPI - PhonePe', 'Bharti Airtel Ltd', 'Monthly prepaid 5G', TRUE);

    -- Seed AI Insights
    INSERT INTO public.ai_insights (user_id, insight_type, category, title, description, severity, metric_note, action_label, action_route)
    VALUES
    (demo_user_id, 'alert', 'Anomaly Alert', 'Food & Dining Expenses Rose by 18%', 'Your food and dining expenses reached ₹2,400 this month, an 18% increase compared with previous month. Review your recent UPI transactions to moderate discretionary spending.', 'medium', '+18% vs Aug 2026', 'Review Dining Transactions', '/transactions?category=Dining%20%26%20Outing'),
    (demo_user_id, 'positive', 'Savings Action', 'Strong 36.7% Savings Rate Maintained', 'You retained ₹16,500 of your ₹45,000 monthly inflow into savings & liquid reserves. This exceeds the recommended 20% benchmark for independent Indian freelancers.', 'low', '₹16,500 saved', 'View Cash Flow Forecast', '/dashboard'),
    (demo_user_id, 'positive', 'Income Consistency', 'Fixed Monthly Overhead Stabilized at 31%', 'Essential recurring obligations (Rent, Broadband, Mobile, Studio) total ₹12,598, accounting for only 31.4% of total inflow, providing healthy financial breathing room.', 'low', '31.4% Fixed Overhead', 'View Financial Passport', '/passport');
END $$;
