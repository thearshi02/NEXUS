import React, { useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';
import { formatINR } from '../../utils/formatters';

export const SampleReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, user, monthlyInflow, monthlyOutflow, estimatedSavings, savingsRate, cashFlowData, records, showToast } = useNexus();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isReportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Report Downloaded', 'NEXUS Financial Trust Dossier (PDF format) generated.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Toolbar */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-800">
              NEXUS Financial Trust Dossier — Verification Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-200/60 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/60 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document View */}
        <div ref={reportRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 text-xs print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  NEXUS
                </span>
                <span className="text-xs font-mono font-medium text-slate-400">
                  / Financial Trust Passport Verification Dossier
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Cryptographically authenticated cash-flow evaluation for {user.city}, Uttar Pradesh (India).
              </p>
            </div>

            <div className="text-left sm:text-right text-[11px] font-mono text-slate-500">
              <div>PASSPORT ID: <strong className="text-slate-900">{user.passportId}</strong></div>
              <div>DATE OF ISSUANCE: <strong>{user.lastUpdated}</strong></div>
              <div className="text-emerald-700 font-semibold flex items-center sm:justify-end gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED IDENTITY
              </div>
            </div>
          </div>

          {/* Subject Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Subject</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{user.name}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Declared Persona</div>
              <div className="text-xs font-medium text-slate-800 mt-0.5">{user.personaTitle}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Location</div>
              <div className="text-xs font-medium text-slate-800 mt-0.5">{user.city}, India</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Monthly Inflow Run-Rate</div>
              <div className="text-xs font-bold font-mono text-blue-700 mt-0.5">{formatINR(monthlyInflow)}/mo</div>
            </div>
          </div>

          {/* Quantitative Financial Reliability Metrics */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Verified Quantitative Trust Indicators
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-mono">Monthly Inflow</span>
                <span className="font-bold font-mono text-slate-900 text-sm mt-0.5 block">{formatINR(monthlyInflow)}</span>
                <span className="text-[10px] text-emerald-700 font-medium">+12.5% vs 6-mo base</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-mono">Monthly Outflow</span>
                <span className="font-bold font-mono text-slate-900 text-sm mt-0.5 block">{formatINR(monthlyOutflow)}</span>
                <span className="text-[10px] text-slate-500">63.3% expense ratio</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-mono">Net Savings</span>
                <span className="font-bold font-mono text-emerald-600 text-sm mt-0.5 block">+{formatINR(estimatedSavings)}/mo</span>
                <span className="text-[10px] text-slate-500">{savingsRate.toFixed(1)}% savings rate</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-mono">Inflow Stability</span>
                <span className="font-bold font-mono text-blue-700 text-sm mt-0.5 block">{user.incomeConsistencyScore || 86}%</span>
                <span className="text-[10px] text-slate-500">Low monthly variance</span>
              </div>
            </div>
          </div>

          {/* 6-Month Cash Flow Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              6-Month Rolling Cash-Flow Ledger (INR ₹)
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-semibold">
                  <tr>
                    <th className="py-2 px-3">Period</th>
                    <th className="py-2 px-3">Verified Inflow</th>
                    <th className="py-2 px-3">Operating Outflow</th>
                    <th className="py-2 px-3">Net Surplus</th>
                    <th className="py-2 px-3">Consistency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {cashFlowData.map((m) => (
                    <tr key={m.month}>
                      <td className="py-2 px-3 font-sans font-medium text-slate-800">{m.month}</td>
                      <td className="py-2 px-3 text-blue-700 font-bold">{formatINR(m.inflow)}</td>
                      <td className="py-2 px-3 text-slate-600">{formatINR(m.outflow)}</td>
                      <td className="py-2 px-3 text-emerald-700 font-bold">+{formatINR(m.inflow - m.outflow)}</td>
                      <td className="py-2 px-3 font-semibold text-slate-700">{m.consistencyScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verified Evidence Records */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Indexed Evidence Records ({records.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {records.map((r) => (
                <div key={r.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <span className="font-bold text-slate-900">{r.title}</span>
                      <span className="text-[11px] text-slate-500 ml-2 font-mono">({r.source} • {r.referenceId})</span>
                    </div>
                  </div>
                  <span className="font-bold font-mono text-slate-900">{formatINR(r.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Compliance & Non-Lender Disclaimer */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>NEXUS Trust Protocol Compliance & Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              This report contains user-consented financial information organized deterministically from verified bank statements and UPI payment feeds. NEXUS is not a credit rating agency, credit bureau, or lender. This dossier does not represent a loan approval guarantee or credit score calculation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
