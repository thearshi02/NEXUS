import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle2, 
  Building, 
  Calendar,
  AlertCircle 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';
import { FinancialRecord } from '../../types';

export const UploadRecordModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, addRecord, showToast } = useNexus();

  const [title, setTitle] = useState('');
  const [source, setSource] = useState<FinancialRecord['source']>('HDFC Bank');
  const [category, setCategory] = useState<FinancialRecord['category']>('Bank Statement');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('03 Oct 2026');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isUploadModalOpen) return null;

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) {
      showToast('Validation Error', 'Please supply a document title and amount in INR.', 'warning');
      return;
    }

    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('Invalid Amount', 'Please provide a valid positive monetary value in INR (₹).', 'warning');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      addRecord({
        title,
        source,
        category,
        amount: numAmount,
        date: date || '03 Oct 2026',
        verificationStatus: 'verified',
        confidenceLevel: 'High',
        fileFormat: fileName ? 'Encrypted PDF Statement' : 'Direct API Feed'
      });
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setTitle('');
      setAmount('');
      setFileName('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Authenticate Financial Record
              </h3>
              <p className="text-xs text-slate-500">
                Index proof of recurring income, GST filings, or bank statements into your Trust Passport.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Dropzone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-5 text-center transition-colors bg-slate-50/60">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.csv,.json,.png,.jpg"
              onChange={handleFileDrop}
            />
            <label htmlFor="file-upload" className="cursor-pointer block space-y-1.5">
              <FileText className="w-6 h-6 mx-auto text-slate-400" />
              <div className="font-semibold text-slate-700">
                {fileName ? fileName : 'Upload Digitally Signed e-Statement (PDF/CSV)'}
              </div>
              <p className="text-[10px] text-slate-400">
                Supports HDFC/ICICI statements, GSTIN acknowledgements, and UPI logs
              </p>
            </label>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Document / Statement Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HDFC Bank Primary Savings Statement (6 Months)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Verified Amount (INR ₹) *
              </label>
              <input
                type="number"
                required
                placeholder="45000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Issuance Date
              </label>
              <input
                type="text"
                placeholder="03 Oct 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Source Channel
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Razorpay">Razorpay Gateway</option>
                <option value="UPI Statements">UPI Statements (NPCI)</option>
                <option value="GST Portal">GST Portal (GSTR-4)</option>
                <option value="Client Contract">Client Contract</option>
                <option value="Invoicing Portal">Invoicing Portal</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Document Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="Bank Statement">Bank Statement</option>
                <option value="UPI Inflow Audit">UPI Inflow Audit</option>
                <option value="Client Invoice">Client Invoice</option>
                <option value="GST Filing">GST Filing</option>
                <option value="Tax Assessment">Tax Assessment</option>
                <option value="Income Certificate">Income Certificate</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-2xs transition-colors disabled:opacity-50"
            >
              {isUploading ? 'Indexing Document...' : 'Index & Verify Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
