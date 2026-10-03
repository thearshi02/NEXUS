import React, { useState, useMemo } from 'react';
import { 
  FolderArchive, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ShieldCheck, 
  FileText, 
  Download, 
  AlertCircle,
  Search,
  Filter,
  X,
  ExternalLink
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { FinancialRecord } from '../types';
import { formatINR } from '../utils/formatters';

export const RecordsPage: React.FC = () => {
  const { records, deleteRecord, setIsUploadModalOpen, showToast } = useNexus();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<FinancialRecord | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.category)));
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          rec.title.toLowerCase().includes(q) ||
          rec.source.toLowerCase().includes(q) ||
          rec.category.toLowerCase().includes(q) ||
          rec.referenceId.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedCategory !== 'all' && rec.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [records, searchQuery, selectedCategory]);

  const totalVerifiedAmount = records
    .filter(r => r.verificationStatus === 'verified')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Verified Financial Records
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
              {records.length} Documents Indexed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cryptographically anchored bank statements, GST acknowledgements, and UPI logs validating John Doe's income.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Record</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Total Audited Inflow
          </span>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">
            {formatINR(totalVerifiedAmount)}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">100% corroborated proofs</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Verification Integrity
          </span>
          <div className="text-xl font-bold text-emerald-700 font-mono mt-1">
            Level 3 (Max)
          </div>
          <span className="text-[11px] text-slate-500">Zero self-declared discrepancies</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Primary Feed Channels
          </span>
          <div className="text-xl font-bold text-blue-700 font-mono mt-1">
            HDFC • GSTIN • Razorpay
          </div>
          <span className="text-[11px] text-slate-500">Direct encrypted integrations</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records by title, source, or reference ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Document Types</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-2.5 py-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Records Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecords.map((rec) => (
          <div 
            key={rec.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">
                      {rec.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {rec.source} • <span className="font-mono">{rec.date}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                  rec.verificationStatus === 'verified'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {rec.verificationStatus === 'verified' ? 'Verified Proof' : 'Self Reported'}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">CUMULATIVE VALUE</span>
                  <span className="font-bold font-mono text-slate-900 text-sm">
                    {formatINR(rec.amount)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">FILE / FORMAT</span>
                  <span className="font-medium text-slate-600 text-[11px]">
                    {rec.fileFormat || 'Direct API Sync'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
                Ref: {rec.referenceId}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    showToast('Document Downloaded', `Downloaded verified receipt for ${rec.title}.`, 'info');
                  }}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Download receipt copy"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteRecord(rec.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  title="Remove record from passport"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
