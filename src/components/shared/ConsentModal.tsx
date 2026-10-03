import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Clock, 
  Building2, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

export const ConsentModal: React.FC = () => {
  const { 
    isConsentModalOpen, 
    setIsConsentModalOpen, 
    activeConsentPartner, 
    grantConsent, 
    revokeConsent,
    showToast 
  } = useNexus();

  const [partnerName, setPartnerName] = useState(activeConsentPartner?.name || 'HDFC Digital Retail Lending');
  const [partnerType, setPartnerType] = useState(activeConsentPartner?.type || 'Lender');
  const [duration, setDuration] = useState('30_days');
  const [purpose, setPurpose] = useState(activeConsentPartner?.purpose || 'Evaluating credit line eligibility based on transparent cash flow patterns');
  const [selectedFields, setSelectedFields] = useState<string[]>([
    '6-Month Monthly Inflow & Outflow History',
    'Direct Platform Verification (UPI & HDFC Bank)',
    'Expense-to-Income Ratio Trend'
  ]);
  const [accessLevel, setAccessLevel] = useState<'Full Passport' | 'Income Verification Only' | 'Cash-Flow Summary' | 'Custom Fields'>('Cash-Flow Summary');

  if (!isConsentModalOpen) return null;

  const availableFields = [
    { id: 'f1', label: '6-Month Monthly Inflow & Outflow History', desc: 'Aggregated monthly cash figures without individual itemized personal spending line items.' },
    { id: 'f2', label: 'Direct Platform Verification (UPI & HDFC Bank)', desc: 'Digitally signed e-statements confirming independent freelance earnings in INR (₹).' },
    { id: 'f3', label: 'Expense-to-Income Ratio Trend', desc: 'Quarterly ratio proving operational cash-flow discipline.' },
    { id: 'f4', label: 'Liquid Savings & Reserve Buffer', desc: 'Confirmation of active 3+ months living expense reserve without disclosing raw balance.' },
  ];

  const toggleField = (label: string) => {
    if (selectedFields.includes(label)) {
      if (selectedFields.length > 1) {
        setSelectedFields(selectedFields.filter((f) => f !== label));
      } else {
        showToast('Required Field', 'At least one financial data field must be specified.', 'warning');
      }
    } else {
      setSelectedFields([...selectedFields, label]);
    }
  };

  const handleConfirm = () => {
    if (activeConsentPartner?.id) {
      showToast('Consent Renewed', `Access token updated for ${activeConsentPartner.name}.`, 'success');
    } else {
      grantConsent({
        name: partnerName,
        type: partnerType as any,
        logoText: partnerName.slice(0, 4).toUpperCase(),
        requestedFields: selectedFields,
        purpose,
        expiryDate: duration === '7_days' ? '10 Oct 2026' : duration === '30_days' ? '03 Nov 2026' : '03 Jan 2027',
        accessLevel
      });
    }
    setIsConsentModalOpen(false);
  };

  const handleRevoke = () => {
    if (activeConsentPartner?.id) {
      revokeConsent(activeConsentPartner.id);
    }
    setIsConsentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Consent-Based Data Sharing Authorization
              </h3>
              <p className="text-xs text-slate-500">
                You retain complete revocable control over your financial records.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConsentModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {!activeConsentPartner && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Recipient Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HDFC Digital Credit or Urban Landlords"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Institution Type
                </label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="Lender">Lender / Credit Desk</option>
                  <option value="Landlord & Property Manager">Landlord & Property Manager</option>
                  <option value="Equipment Financing">Equipment Financing</option>
                  <option value="Fintech Underwriting">Fintech Underwriting</option>
                  <option value="MSME Credit Network">MSME Credit Network</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Authorized Purpose
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Tenancy agreement cash-flow verification"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Access Level Scope
              </label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="Cash-Flow Summary">Cash-Flow Summary Only</option>
                <option value="Income Verification Only">Income Verification Only</option>
                <option value="Full Passport">Full Trust Passport</option>
                <option value="Custom Fields">Custom Scoped Fields</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Token Expiration Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="7_days">7 Days (Fast Assessment)</option>
                <option value="30_days">30 Days (Standard Evaluation)</option>
                <option value="90_days">90 Days (Quarterly Audit)</option>
              </select>
            </div>
          </div>

          {/* Scoped Data Fields */}
          <div className="space-y-2 pt-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Disclosed Data Categories (Zero-Knowledge Scoped)
            </label>
            <div className="space-y-2">
              {availableFields.map((field) => {
                const isSelected = selectedFields.includes(field.label);
                return (
                  <div
                    key={field.id}
                    onClick={() => toggleField(field.label)}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-start gap-2.5 ${
                      isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 accent-blue-600 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{field.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{field.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {activeConsentPartner ? (
            <button
              onClick={handleRevoke}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-xs transition-colors"
            >
              Revoke Consent Now
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsConsentModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-2xs transition-colors"
            >
              {activeConsentPartner ? 'Update Consent Token' : 'Grant Scoped Consent'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
