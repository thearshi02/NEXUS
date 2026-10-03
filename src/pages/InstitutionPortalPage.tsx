import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  UserCheck, 
  Search, 
  ExternalLink,
  Save,
  Lock,
  Sparkles,
  Info,
  QrCode
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { ApplicantProfile } from '../types';
import { formatINR } from '../utils/formatters';

export const InstitutionPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { applicants, updateApplicantNotes, showToast } = useNexus();
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>(applicants[0].id);
  const [reviewStatus, setReviewStatus] = useState<'Under Evaluation' | 'Document Verified' | 'Needs Clarification'>('Under Evaluation');
  const [underwriterNotes, setUnderwriterNotes] = useState(applicants[0].notes || '');
  const [tokenSearch, setTokenSearch] = useState('');
  
  const [reviewerName] = useState('Ananya Sen');
  const [reviewerTitle] = useState('Senior Risk Officer, HDFC Digital Credit Desk');

  const selectedApplicant = applicants.find((a) => a.id === selectedApplicantId) || applicants[0];

  const handleSelectApplicant = (app: ApplicantProfile) => {
    setSelectedApplicantId(app.id);
    setUnderwriterNotes(app.notes || '');
  };

  const handleSaveNotes = () => {
    updateApplicantNotes(selectedApplicant.id, underwriterNotes);
  };

  const handleUpdateStatus = (status: 'Under Evaluation' | 'Document Verified' | 'Needs Clarification') => {
    setReviewStatus(status);
    showToast('Assessment State Updated', `Marked applicant ${selectedApplicant.fullName} as ${status}.`, 'info');
  };

  const handleLookupToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenSearch.trim()) return;
    const match = applicants.find(a => a.passportId.toLowerCase() === tokenSearch.trim().toLowerCase() || a.id.toLowerCase() === tokenSearch.trim().toLowerCase());
    if (match) {
      setSelectedApplicantId(match.id);
      setUnderwriterNotes(match.notes || '');
      showToast('Passport Located', `Found verified profile for ${match.fullName}.`, 'success');
    } else {
      showToast('Token Not Found', 'No active consent passport matched that token.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Top Institutional Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Return to NEXUS App</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-tight text-white block">
                NEXUS Institution & Verifier Portal
              </span>
              <span className="text-[10px] text-teal-400 font-mono block">
                HDFC DIGITAL CREDIT & LANDLORD VERIFICATION NETWORK
              </span>
            </div>
          </div>
        </div>

        {/* Reviewer Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white">{reviewerName}</div>
            <div className="text-[10px] text-slate-400">{reviewerTitle}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-teal-800 text-teal-200 border border-teal-500/40 flex items-center justify-center font-bold text-xs">
            AS
          </div>
        </div>
      </header>

      {/* Main Review Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Token Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <form onSubmit={handleLookupToken} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Consented Passport Token (e.g. DEMO-NX-84920)..."
                value={tokenSearch}
                onChange={(e) => setTokenSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Lookup Passport</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Consented Dossiers List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Consented Applicants ({applicants.length})
              </h3>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-mono font-bold">
                READ-ONLY
              </span>
            </div>

            <div className="space-y-2">
              {applicants.map((app) => {
                const isSelected = app.id === selectedApplicant.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleSelectApplicant(app)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all space-y-1.5 ${
                      isSelected
                        ? 'border-teal-600 bg-white shadow-sm ring-1 ring-teal-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{app.fullName}</div>
                        <div className="text-[11px] text-slate-500">{app.persona} • {app.city}</div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {app.verificationStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-mono">
                      <span>Inflow: <strong className="text-slate-900 font-semibold">{formatINR(app.monthlyAverageInflow)}/mo</strong></span>
                      <span>Token: {app.passportId}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Passport Assessment Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{selectedApplicant.fullName}</h2>
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Token: {selectedApplicant.passportId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedApplicant.persona} • {selectedApplicant.city}
                  </p>
                  <div className="text-[11px] text-teal-700 font-medium mt-1">
                    Purpose: {selectedApplicant.applicationPurpose}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Status:</span>
                  <select
                    value={reviewStatus}
                    onChange={(e) => handleUpdateStatus(e.target.value as any)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-hidden focus:border-teal-500"
                  >
                    <option value="Under Evaluation">Under Evaluation</option>
                    <option value="Document Verified">Document Verified</option>
                    <option value="Needs Clarification">Needs Clarification</option>
                  </select>
                </div>
              </div>

              {/* Quantitative Cash Flow Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Verified Monthly Inflow</span>
                  <div className="font-bold text-slate-900 font-mono text-sm mt-0.5">
                    {formatINR(selectedApplicant.monthlyAverageInflow)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">6-month verified avg</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Monthly Outflow</span>
                  <div className="font-bold text-slate-900 font-mono text-sm mt-0.5">
                    {formatINR(selectedApplicant.monthlyAverageOutflow)}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Operating expense</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Inflow Consistency</span>
                  <div className="font-bold text-blue-700 text-sm mt-0.5">
                    {selectedApplicant.incomeConsistencyRating}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Low volatility</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Verified Records</span>
                  <div className="font-bold text-emerald-700 font-mono text-sm mt-0.5">
                    {selectedApplicant.verifiedRecordsCount} Proofs
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">UPI & Bank statements</span>
                </div>
              </div>

              {/* Consented Fields Scope */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-800">Consented Data Scope:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApplicant.consentedDataFields.map((field, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                      ✓ {field}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-mono text-[11px]">
                    Zero PII / Passwords Exposed
                  </span>
                </div>
              </div>

              {/* Underwriter Notes & Review */}
              <div className="space-y-2 text-xs">
                <label className="font-bold text-slate-800 block">
                  Underwriter Assessment Notes
                </label>
                <textarea
                  rows={3}
                  value={underwriterNotes}
                  onChange={(e) => setUnderwriterNotes(e.target.value)}
                  placeholder="Record assessment notes for loan eligibility, apartment tenancy, or equipment leasing..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                />
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Assessment Notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
