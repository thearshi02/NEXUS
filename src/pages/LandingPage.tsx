import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Building2, 
  FileCheck, 
  ChevronDown, 
  HelpCircle,
  Eye,
  Sliders,
  Briefcase,
  GraduationCap,
  Store,
  Sparkles,
  Zap,
  Check,
  UserCheck
} from 'lucide-react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { LandingFooter } from '../components/layout/LandingFooter';
import { formatINR } from '../utils/formatters';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does NEXUS differ from legacy credit bureaus like CIBIL or Experian?',
      a: 'Traditional credit bureaus in India rely strictly on past loan history, credit card debt, and repayment tracks. If you are a freelancer, student, or gig worker without debt history, you are often labeled "credit invisible." NEXUS looks at real-time, verified cash-flow reliability: consistent UPI inflows, verified client retainers, and disciplined savings—shared strictly with your explicit consent.'
    },
    {
      q: 'Can landlords or lenders see my private bank passwords, PAN, or Aadhaar numbers?',
      a: 'Never. NEXUS enforces zero-knowledge data minimization. You choose the exact aggregated indicators (e.g., 6-month average monthly inflow, savings rate) and the specific institution permitted to see them. Your raw banking passwords, personal purchases, and identity keys are never exposed.'
    },
    {
      q: 'Does NEXUS approve loans or fabricate credit scores?',
      a: 'No. NEXUS is a financial intelligence and trust-profile platform, not a lender or credit bureau. We do not invent arbitrary credit scores or guarantee loan approvals. We structure explainable financial indicators from your real transactions so you can share your verified story with confidence.'
    },
    {
      q: 'Can I revoke access after applying for an apartment lease or equipment rental?',
      a: 'Yes, with one click. In your Privacy & Consent Center, every granted partner session generates a time-limited token that you can revoke immediately or set to expire in 24 hours, 7 days, or 30 days.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Connect Verified Feeds',
      description: 'Link your UPI merchant accounts, HDFC/ICICI bank statements, or Razorpay settlements via read-only, authenticated feeds.',
      icon: Briefcase
    },
    {
      step: '02',
      title: 'Analyze Cash-Flow Stability',
      description: 'NEXUS computes income consistency, operating outflow discipline, and savings rates across 3 to 12 months.',
      icon: TrendingUp
    },
    {
      step: '03',
      title: 'Generate Your Trust Passport',
      description: 'Receive a portable, explainable financial passport reflecting verified reliability without debt bias.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Share With Granular Consent',
      description: 'Grant time-bound, read-only verification access to landlords, fintech partners, or clients on your own terms.',
      icon: Lock
    }
  ];

  const userBenefits = [
    {
      category: 'Freelancers & Creators',
      desc: 'Demonstrate predictable monthly income from retainers and UPI payouts to landlords and financial institutions.',
      icon: Briefcase,
      metrics: 'Average ₹45k/mo verified run-rate'
    },
    {
      category: 'Students & Fellows',
      desc: 'Structure academic stipends, tutoring earnings, and scholarship grants to access student housing and laptop leases.',
      icon: GraduationCap,
      metrics: 'Stipend + skill income verification'
    },
    {
      category: 'Self-Employed Professionals',
      desc: 'Corroborate client contracts and GST acknowledgements to secure commercial leases and equipment financing.',
      icon: TrendingUp,
      metrics: 'GSTR-4 & invoice reconciliation'
    },
    {
      category: 'Small Businesses (MSMEs)',
      desc: 'Showcase healthy operating cash flow and point-of-sale customer settlement frequency without complex audited books.',
      icon: Store,
      metrics: 'Daily UPI QR settlement audits'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Core Headline */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI-Powered Financial Intelligence Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                Your Financial Story, Structured for Trust.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                NEXUS helps Indian freelancers, students, self-employed professionals, and small businesses organize their financial information into an explainable, user-controlled Financial Trust Passport.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/onboarding"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-500/20"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Explore Demo (John Doe)</span>
                </Link>
              </div>

              {/* Guarantees */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Indian Rupees (₹ INR)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Silent Sharing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No Fake Credit Scores</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Passport Preview Card */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                  <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                        N
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          Financial Trust Passport
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          ID: DEMO-NX-84920
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified
                    </span>
                  </div>

                  <div className="p-5 space-y-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="John Doe"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">John Doe</div>
                        <div className="text-[11px] text-slate-500">Independent Freelancer • Lucknow, India</div>
                        <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Passport Completion: 88%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Avg. Monthly Income</span>
                        <span className="font-bold font-mono text-slate-900 text-xs">₹45,000</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Monthly Expenses</span>
                        <span className="font-bold font-mono text-slate-800 text-xs">₹28,500</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Estimated Savings</span>
                        <span className="font-bold font-mono text-emerald-600 text-xs">₹16,500</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Savings Rate</span>
                        <span className="font-bold font-mono text-blue-700 text-xs">36.7%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-[11px] text-blue-900 space-y-1">
                      <div className="font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        AI Financial Pattern Insight
                      </div>
                      <p className="text-[10px] text-slate-600 leading-normal">
                        "Your food and dining expenses increased by 18% compared with the previous month. Review recent transactions to optimize discretionary spending."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Explainable Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How the Financial Trust Passport Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Four steps to transform unorganized UPI and banking transactions into a secure, verifiable financial profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div 
                  key={s.step} 
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-extrabold text-blue-600">
                      {s.step}
                    </span>
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tailored Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Built for Modern India
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Tailored for Every Non-Traditional Career Path
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Whether you are an independent developer in Lucknow or an MSME founder in Mumbai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.category} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{b.category}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
                    {b.metrics}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy & Zero Silent Sharing */}
      <section id="privacy" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800">
                <Lock className="w-3.5 h-3.5" />
                <span>USER-CONTROLLED CONSENT GOVERNANCE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Your Data Is Never Sold. Zero Silent Sharing.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                NEXUS guarantees that no financial data is transmitted to lenders, landlords, or external verifiers without your explicit cryptographic authorization. You decide which metrics to reveal and for how long.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <div className="font-bold text-xs text-white">Time-Bound Tokens</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Sessions automatically expire in 24h, 7d, or 30d.</div>
                </div>
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <div className="font-bold text-xs text-white">Instant One-Click Revocation</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Terminate access immediately at any time.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 bg-slate-800 border border-slate-700 rounded-2xl space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Privacy Transparency Checklist
                </div>
                <div className="space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>No raw bank passwords or net-banking credentials stored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>No telemarketing data feeds to 3rd party brokers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Full data export (JSON/CSV) available anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>One-click account erasure under Indian DPDP norms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Questions & Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Structure Your Financial Story?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Create your explainable Financial Trust Passport today. Explore the interactive demo as John Doe (Lucknow) without entering real data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/onboarding"
              className="w-full sm:w-auto px-6 py-3 bg-white text-blue-900 font-bold rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-sm"
            >
              Get Started with NEXUS
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3 bg-blue-700 text-white font-bold rounded-xl text-xs hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Explore Demo (John Doe)
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};
