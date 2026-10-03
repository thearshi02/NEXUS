import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Search,
  Filter,
  X,
  Calendar,
  Wallet,
  IndianRupee,
  Receipt,
  FileSpreadsheet,
  RotateCcw
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { FinancialTransaction, TransactionCategory, PaymentMethod, FilterState } from '../types';
import { formatINR, formatIndianDate } from '../utils/formatters';

const ALL_CATEGORIES: TransactionCategory[] = [
  'Freelance Payment',
  'Client Retainer',
  'Salary / Stipend',
  'Platform Inflow',
  'Rent & Housing',
  'Groceries & Food',
  'Utilities & Bills',
  'Software & Tools',
  'Coworking / Studio',
  'Transportation',
  'Dining & Outing',
  'Mobile & Internet',
  'Healthcare & Wellness',
  'Education & Skill',
  'Savings & Investments',
  'General Expense'
];

const ALL_PAYMENT_METHODS: PaymentMethod[] = [
  'UPI',
  'Net Banking',
  'IMPS / NEFT',
  'Debit Card',
  'Credit Card',
  'Cash',
  'Client Direct Payout'
];

export const TransactionsPage: React.FC = () => {
  const { 
    transactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    resetDemoData, 
    exportUserData,
    showToast 
  } = useNexus();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [datePreset, setDatePreset] = useState<'all' | '30d' | '90d' | 'this_month'>('all');

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<FinancialTransaction | null>(null);

  // Delete Confirmation Modal
  const [deletingTxId, setDeletingTxId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formType, setFormType] = useState<'inflow' | 'outflow'>('inflow');
  const [formCategory, setFormCategory] = useState<TransactionCategory>('Freelance Payment');
  const [formPaymentMethod, setFormPaymentMethod] = useState<PaymentMethod>('UPI');
  const [formSource, setFormSource] = useState<FinancialTransaction['source']>('UPI - Google Pay');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formCounterparty, setFormCounterparty] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingTx(null);
    setFormTitle('');
    setFormAmount('');
    setFormType('inflow');
    setFormCategory('Freelance Payment');
    setFormPaymentMethod('UPI');
    setFormSource('UPI - Google Pay');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormCounterparty('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (tx: FinancialTransaction) => {
    setEditingTx(tx);
    setFormTitle(tx.title);
    setFormAmount(tx.amount.toString());
    setFormType(tx.type);
    setFormCategory(tx.category);
    setFormPaymentMethod(tx.paymentMethod);
    setFormSource(tx.source);
    setFormDate(tx.date);
    setFormCounterparty(tx.counterparty || '');
    setFormNotes(tx.notes || '');
    setIsModalOpen(true);
  };

  // Submit Add / Edit
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formAmount);
    if (!formTitle.trim()) {
      showToast('Validation Error', 'Transaction title is required.', 'error');
      return;
    }
    if (isNaN(amountNum) || amountNum <= 0) {
      showToast('Validation Error', 'Please enter a valid amount in INR (₹).', 'error');
      return;
    }

    if (editingTx) {
      updateTransaction(editingTx.id, {
        title: formTitle.trim(),
        amount: amountNum,
        type: formType,
        category: formCategory,
        paymentMethod: formPaymentMethod,
        source: formSource,
        date: formDate,
        counterparty: formCounterparty.trim() || undefined,
        notes: formNotes.trim() || undefined,
      });
    } else {
      addTransaction({
        title: formTitle.trim(),
        amount: amountNum,
        type: formType,
        category: formCategory,
        paymentMethod: formPaymentMethod,
        source: formSource,
        date: formDate,
        status: 'settled',
        counterparty: formCounterparty.trim() || undefined,
        notes: formNotes.trim() || undefined,
        is_demo: false,
      });
    }

    setIsModalOpen(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deletingTxId) {
      deleteTransaction(deletingTxId);
      setDeletingTxId(null);
    }
  };

  // Filtered list
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          tx.title.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q) ||
          tx.paymentMethod.toLowerCase().includes(q) ||
          (tx.counterparty && tx.counterparty.toLowerCase().includes(q)) ||
          (tx.notes && tx.notes.toLowerCase().includes(q)) ||
          tx.referenceId.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Type
      if (selectedType !== 'all' && tx.type !== selectedType) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && tx.category !== selectedCategory) {
        return false;
      }

      // Payment method
      if (selectedMethod !== 'all' && tx.paymentMethod !== selectedMethod) {
        return false;
      }

      // Date Preset
      if (datePreset !== 'all') {
        const txTime = new Date(tx.date).getTime();
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        if (datePreset === '30d' && now - txTime > 30 * dayMs) return false;
        if (datePreset === '90d' && now - txTime > 90 * dayMs) return false;
      }

      return true;
    });
  }, [transactions, searchQuery, selectedType, selectedCategory, selectedMethod, datePreset]);

  // Dynamic KPI totals from filtered set
  const filteredInflow = filteredTransactions
    .filter(t => t.type === 'inflow')
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredOutflow = filteredTransactions
    .filter(t => t.type === 'outflow')
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredNet = filteredInflow - filteredOutflow;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Transactions & Cash Flow Ledger
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
              Live INR (₹) Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Full CRUD ledger tracking UPI, bank payouts, retainers, and living expenses for John Doe in Lucknow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportUserData('csv')}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Inflow</span>
          <div className="text-lg font-bold text-emerald-600 font-mono mt-0.5">
            +{formatINR(filteredInflow)}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Filtered period</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Outflow</span>
          <div className="text-lg font-bold text-slate-800 font-mono mt-0.5">
            -{formatINR(filteredOutflow)}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Operating expenses</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Net Balance</span>
          <div className={`text-lg font-bold font-mono mt-0.5 ${filteredNet >= 0 ? 'text-blue-700' : 'text-rose-600'}`}>
            {filteredNet >= 0 ? '+' : ''}{formatINR(filteredNet)}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Surplus retained</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Entries Count</span>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {filteredTransactions.length}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">All records editable</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, counterparty, reference ID, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Type Segment */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold shrink-0">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('inflow')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedType === 'inflow' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Inflows (+)
            </button>
            <button
              onClick={() => setSelectedType('outflow')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedType === 'outflow' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Outflows (-)
            </button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Payment Methods</option>
            {ALL_PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={datePreset}
            onChange={(e) => setDatePreset(e.target.value as any)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Dates</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || selectedMethod !== 'all' || datePreset !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedCategory('all');
                setSelectedMethod('all');
                setDatePreset('all');
              }}
              className="px-2.5 py-1.5 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Transaction / Counterparty</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Method & Source</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Receipt className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No transactions found</p>
                    <p className="text-[11px] mt-0.5">Try clearing your filters or add a new transaction.</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${tx.type === 'inflow' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {tx.type === 'inflow' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate">
                            {tx.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <span>{tx.counterparty || 'Self'}</span>
                            <span>•</span>
                            <span>{tx.referenceId}</span>
                          </div>
                          {tx.notes && (
                            <div className="text-[10px] text-slate-500 italic mt-0.5">
                              "{tx.notes}"
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                        {tx.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700">{tx.paymentMethod}</div>
                      <div className="text-[10px] text-slate-400">{tx.source}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {formatIndianDate(tx.date)}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className={`font-mono font-bold text-sm ${tx.type === 'inflow' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {tx.type === 'inflow' ? '+' : '-'}{formatINR(tx.amount)}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Settled</span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(tx)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit transaction"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingTxId(tx.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingTx ? 'Edit Transaction' : 'Record New Transaction'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5 text-xs">
              {/* Type Switcher */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('inflow')}
                    className={`py-2 rounded-lg font-bold border transition-colors ${
                      formType === 'inflow'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    + Income / Inflow
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('outflow')}
                    className={`py-2 rounded-lg font-bold border transition-colors ${
                      formType === 'outflow'
                        ? 'bg-rose-50 border-rose-500 text-rose-700'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    - Expense / Outflow
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Transaction Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Freelance Project Milestone or Monthly Rent"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Amount & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Amount in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="any"
                    placeholder="45000"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Date *</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category & Payment Method */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as TransactionCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  >
                    {ALL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Payment Method</label>
                  <select
                    value={formPaymentMethod}
                    onChange={(e) => setFormPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  >
                    {ALL_PAYMENT_METHODS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Counterparty */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Counterparty / Merchant (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Tech Ltd or Blinkit"
                  value={formCounterparty}
                  onChange={(e) => setFormCounterparty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Notes & Purpose</label>
                <textarea
                  rows={2}
                  placeholder="Add context for tax, invoice reconciliation, or passport indexation..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-2xs"
                >
                  {editingTx ? 'Save Changes' : 'Record Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTxId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Delete Transaction?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete this transaction from your history? This will recalculate your dashboard inflow and savings rate immediately.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingTxId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-2xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
