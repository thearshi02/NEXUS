import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Lock, 
  Building2, 
  Trash2, 
  AlertTriangle, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet,
  FileCode,
  FileText,
  AlertCircle,
  XCircle,
  Database
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { ConsentPartner } from '../types';

export const PrivacyPage: React.FC = () => {
  const { partners, records, transactions, revokeConsent, openConsentModal, exportUserData, deleteAccount, showToast } = useNexus();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const activePartners = partners.filter((p) => p.status === 'active');
  const revokedPartners = partners.filter((p) => p.status === 'revoked');

  const handleRevoke = (id: string, name: string) => {
    revokeConsent(id);
  };

  const storedDataCategories = [
    {
      category: 'Profile & Demographic Data',
      fields: ['Full Name (John Doe)', 'Email (john.doe@nexusdemo.in)', 'Location (Lucknow, UP)', 'User Persona (Freelancer)'],
      storage: 'Supabase PostgreSQL (Encrypted at Rest)',
      purpose: 'Identity structuring and dashboard localization'
    },
    {
      category: 'Transactions & Cash Flow Ledger',
      fields: [`${transactions.length} active transactions`, 'Inflow/Outflow amounts in INR (₹)', 'UPI & IMPS references', 'Category tags'],
      storage: 'Indexed Ledger Database',
      purpose: 'Computing savings rate, consistency index, and 6-month forecast'
    },
    {
      category: 'Verification Artifacts & Documents',
      fields: [`${records.length} documents indexed`, 'HDFC Statement PDF', 'GSTR-4 Portal Filing', 'Razorpay QR Settlement'],
      storage: 'Supabase Encrypted Storage',
      purpose: 'Corroborating self-declared income to institutional verifiers'
    },
    {
      category: 'Consent & Permission Tokens',
      fields: ['Active partner tokens', 'Granular field access scopes', 'Expiration timestamps (Asia/Kolkata)'],
      storage: 'Consent Protocol Store',
      purpose: 'Authorizing read-only queries from verified lenders and landlords'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Privacy & Consent Governance Center
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
              Zero Silent Sharing
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Explicit, user-controlled data sharing permissions for Indian institutions, lenders, and landlords.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportUserData('json')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => exportUserData('csv')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => openConsentModal(null)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Grant Institution Access</span>
          </button>
        </div>
      </div>

      {/* Protocol Guarantee Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>CORE NEXUS PROTOCOL RULE: ZERO SILENT SHARING</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            You retain absolute sovereignty over your financial identity.
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Unlike legacy credit bureaus that sell consumer inquiry histories and profile dossiers to third-party telemarketers, NEXUS never transmits financial data without explicit, time-limited customer authorization. Every session is granularly scoped and revocable in real time.
          </p>
        </div>
      </div>

      {/* Stored Data Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Stored Data Inventory & Categories
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            Total transparency on what is stored
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storedDataCategories.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{item.category}</span>
                <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                  {item.storage}
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                {item.fields.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                <strong>Purpose:</strong> {item.purpose}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Consented Institutions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Authorized Institutions ({activePartners.length})
            </h3>
            <p className="text-xs text-slate-500">
              Indian organizations currently possessing an active, read-only token to query specified passport indicators.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-xs shadow-2xs shrink-0">
                    {partner.logoText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{partner.name}</h4>
                    <span className="text-[11px] font-mono text-slate-500">{partner.type}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  Active
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {partner.purpose}
              </p>

              <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Scope:</span>
                  <span className="font-semibold text-slate-800">{partner.accessLevel}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Authorized Date:</span>
                  <span className="font-mono text-slate-700">{partner.grantedDate}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Expires:</span>
                  <span className="font-mono text-slate-700">{partner.expiryDate || '90 Days'}</span>
                </div>
                <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-200">
                  <span>Token:</span>
                  <span className="font-mono font-bold text-blue-700">{partner.consentToken || 'NEX-ACT-982'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => openConsentModal(partner)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Edit Permissions →
                </button>
                <button
                  onClick={() => handleRevoke(partner.id, partner.name)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Revoke Access</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revoked Partners History */}
      {revokedPartners.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Revocation Audit History ({revokedPartners.length})
            </h3>
            <p className="text-xs text-slate-500">
              Institutions whose access credentials have been permanently terminated.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {revokedPartners.map((partner) => (
              <div key={partner.id} className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-800">{partner.name}</div>
                    <div className="text-[11px] text-slate-500">{partner.purpose}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                  Access Terminated
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Deletion & Right to be Forgotten */}
      <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Right to Erasure & Account Deletion</span>
        </div>
        <p className="text-xs text-rose-700 leading-relaxed">
          You have the legal right under Indian DPDP Act guidelines to request complete purging of your financial transactions, profile records, and active verification tokens.
        </p>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
        >
          Request Complete Account Deletion
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Permanently Delete NEXUS Account?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This action is immediate and irreversible. All {transactions.length} transactions, {records.length} verification proofs, and active partner consent tokens will be permanently erased.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  deleteAccount();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-2xs"
              >
                Confirm Account Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
