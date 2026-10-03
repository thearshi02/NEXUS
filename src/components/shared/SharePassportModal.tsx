import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  Lock, 
  ExternalLink 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';
import { formatINR } from '../../utils/formatters';

export const SharePassportModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, user, monthlyInflow, showToast } = useNexus();
  const [copied, setCopied] = useState(false);
  const [validity, setValidity] = useState('7_days');
  const [targetAudience, setTargetAudience] = useState('HDFC Digital Credit Desk');
  const [maskedView, setMaskedView] = useState(true);

  if (!isShareModalOpen) return null;

  const shareUrl = `${window.location.origin}/partner-portal?token=${user.passportId}&auth=demotoken_99a812&exp=${validity}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Secure Token Copied', 'Encrypted access link copied to your clipboard.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Share Financial Trust Passport
              </h3>
              <p className="text-xs text-slate-500">
                Generate a scoped, time-bound read-only verification token.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {/* Card Summary Badge */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                Passport Holder
              </div>
              <div className="text-sm font-bold text-white mt-0.5">{user.name}</div>
              <div className="text-xs font-mono text-blue-300 mt-0.5">
                {user.passportId} ({user.city}, India)
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                <ShieldCheck className="w-3.5 h-3.5" />
                {user.profileCompletion}% Complete
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Inflow: {formatINR(monthlyInflow)}/mo
              </div>
            </div>
          </div>

          {/* Scope Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Token Expiration
              </label>
              <select
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="24_hours">24 Hours (Fast Look)</option>
                <option value="7_days">7 Days (Recommended)</option>
                <option value="30_days">30 Days (Full Evaluation)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Recipient Organization
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="HDFC Digital Credit Desk">HDFC Digital Lending</option>
                <option value="Urban Landlord Alliance India">Urban Landlord Alliance</option>
                <option value="TechEquipment Lease Capital">TechEquipment Leasing</option>
                <option value="ICICI Fintech Partner">ICICI Fintech Underwriting</option>
              </select>
            </div>
          </div>

          {/* Masking Toggle */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">Zero-Knowledge Data Masking</div>
              <div className="text-[11px] text-slate-500">Hides raw bank account numbers and tax IDs while showing verified aggregates.</div>
            </div>
            <input 
              type="checkbox"
              checked={maskedView}
              onChange={(e) => setMaskedView(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Share Link Box */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Generated Scoped Sharing Link
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-700 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors shadow-2xs shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
