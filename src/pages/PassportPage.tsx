import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Download, 
  Lock, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  FileText,
  Clock,
  Sparkles,
  Info,
  HelpCircle
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { TrustPassportCard } from '../components/shared/TrustPassportCard';
import { formatINR } from '../utils/formatters';

export const PassportPage: React.FC = () => {
  const { user, records, monthlyInflow, monthlyOutflow, estimatedSavings, savingsRate, setIsShareModalOpen, setIsReportModalOpen, showToast } = useNexus();
  const [activeTab, setActiveTab] = useState<'card' | 'proofs' | 'preview'>('card');
  const [tokenCopied, setTokenCopied] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText('0x9a8f238b91c1074e2d837651a0b32948cde9103857102948cb91283749201a09');
    setTokenCopied(true);
    showToast('Ledger Proof Copied', 'Cryptographic verification root hash copied.', 'success');
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              NEXUS Financial Trust Passport
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
              Explainable Trust Profile
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your portable, user-controlled financial identity demonstrating cash-flow reliability for Indian freelancers and MSMEs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Passport</span>
          </button>
        </div>
      </div>

      {/* Navigation Segmented Tabs */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveTab('card')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'card'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Digital Trust Passport
        </button>
        <button
          onClick={() => setActiveTab('proofs')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'proofs'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Verified Financial Proofs
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'preview'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Institution View Preview
        </button>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'card' && (
        <div className="space-y-6">
          {/* Main Visual Passport Card */}
          <TrustPassportCard />

          {/* Explainable Indicators Detailed Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                How Your Trust Indicators Are Evaluated
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                NEXUS indicators are grounded purely in verifiable cash transactions and bank statements — never black-box credit scores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">1. Income Consistency Indicator</span>
                  <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">86/100 (Strong)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluates regularity, frequency, and source diversity of incoming payments over 6+ months. John Doe maintains continuous monthly payouts from Apex Fintech and Bangalore Design Studio.
                </p>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Derivation:</strong> Standard deviation of monthly inflows across UPI & IMPS feeds &lt; 8.5%.
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">2. Savings Behavior Indicator</span>
                  <span className="font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">82/100 (Disciplined)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Measures the proportion of net earnings retained as reserves vs spent immediately. Average monthly retention of {formatINR(estimatedSavings)} ({savingsRate.toFixed(1)}% savings rate).
                </p>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Derivation:</strong> (Monthly Net Savings / Total Monthly Inflow) × 100 benchmarked against 20% Indian freelancer baseline.
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">3. Expense Management Indicator</span>
                  <span className="font-mono text-slate-800 font-bold bg-slate-100 px-2 py-0.5 rounded">84/100 (Balanced)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calculates total monthly outflow against gross inflow. Rent (₹8,000) and utilities (₹1,098) represent only 20.2% of income, well under the 40% burden threshold.
                </p>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Derivation:</strong> Total Operating Expenses / Monthly Inflow with zero recorded overdraft penalties.
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">4. Financial Record Availability</span>
                  <span className="font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">100% (6 Records)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Availability of digitally signed bank statements (HDFC), GST filings (GSTR-4), and authenticated UPI statements verifying stated income.
                </p>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Derivation:</strong> 6 independent verification artifacts securely indexed with cryptographic checksums.
                </div>
              </div>
            </div>

            {/* Non-Lender Disclaimer Banner */}
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-950">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-blue-900">Explainable Financial Identity Guarantee: </strong>
                NEXUS does not issue credit scores or guarantee loan approvals. We organize verifiable financial behaviors into transparent, consent-controlled passports so you can share your real financial story with landlords, banks, or clients.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cryptographic Proofs */}
      {activeTab === 'proofs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Cryptographic Ledger Integrity
                </h3>
                <p className="text-xs text-slate-500">
                  Every connected record produces an immutable digital signature for verification.
                </p>
              </div>
              <button
                onClick={handleCopyHash}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{tokenCopied ? 'Hash Copied' : 'Copy Verification Hash'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>ROOT MERKLE HASH:</span>
                <span className="text-emerald-400">STATUS: VALIDATED (INDIA REGION)</span>
              </div>
              <div className="text-blue-300 break-all">
                0x9a8f238b91c1074e2d837651a0b32948cde9103857102948cb91283749201a09
              </div>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                BLOCK STAMP: 2026-10-03T04:15:00Z · ENCRYPTION: SHA-256 · CLIENT SCOPE: READ_ONLY · LOCALE: en-IN
              </div>
            </div>

            {/* Records Log Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                Indexed Evidence Records (INR ₹)
              </div>
              <div className="divide-y divide-slate-100">
                {records.map((r) => (
                  <div key={r.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 text-xs">{r.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {r.source} · {r.referenceId} · {r.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 text-xs tabular-nums">
                        {formatINR(r.amount)}
                      </span>
                      <div className="text-[10px] font-mono text-emerald-700 font-medium">Verified Proof</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Institutional View Preview */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                Read-Only Verifier Session
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                What HDFC Digital / Landlords See During Verification
              </h3>
            </div>
            <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded">
              Token: {user.passportId}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Applicant:</span>
              <span className="font-bold text-slate-900">{user.name} ({user.city}, India)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">6-Month Average Monthly Inflow:</span>
              <span className="font-mono font-bold text-blue-700">{formatINR(monthlyInflow)}/mo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Income Consistency Rating:</span>
              <span className="font-mono font-bold text-emerald-700">{user.incomeConsistencyScore || 86}% (High Stability)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Average Savings Rate:</span>
              <span className="font-mono font-bold text-slate-800">{savingsRate.toFixed(1)}% (+{formatINR(estimatedSavings)}/mo)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Banking Credentials / PAN / Aadhaar:</span>
              <span className="text-emerald-700 font-semibold">REDACTED / Zero Exposure (Consent Protected)</span>
            </div>
          </div>

          <div className="text-right pt-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Modify Sharing Permissions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
