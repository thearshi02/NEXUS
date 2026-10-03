import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  AlertCircle,
  FileText,
  PieChart,
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
  PlusCircle,
  Calculator,
  Building2,
  Lock
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { MetricCard } from '../components/shared/MetricCard';
import { CashFlowChart } from '../components/shared/CashFlowChart';
import { InsightCard } from '../components/shared/InsightCard';
import { formatINR, formatIndianDate, formatPercentage } from '../utils/formatters';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    transactions,
    cashFlowData, 
    insights, 
    records, 
    monthlyInflow,
    monthlyOutflow,
    estimatedSavings,
    savingsRate,
    aiEngineMode,
    isAiRefreshing,
    refreshAiInsights,
    setIsShareModalOpen, 
    setIsReportModalOpen 
  } = useNexus();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Welcome back, {user.name}
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
              Demo Account
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your structured financial intelligence overview for {user.city}, Uttar Pradesh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => refreshAiInsights()}
            disabled={isAiRefreshing}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-60"
            title="Re-run AI financial intelligence analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isAiRefreshing ? 'animate-spin' : ''}`} />
            <span>{isAiRefreshing ? 'Analyzing...' : 'Refresh AI'}</span>
          </button>
          
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Sample Report</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Share Passport</span>
          </button>
        </div>
      </div>

      {/* Financial Identity Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {user.name}
                </h2>
                <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  {user.verificationStatus}
                </span>
                <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                  {user.city}, India
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {user.personaTitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-mono">
                <span>Passport ID: <strong className="text-slate-700">{user.passportId}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Income Range: <strong className="text-slate-700">{user.monthlyIncomeRange}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Last updated: {user.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Progress & CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:w-96">
            <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Trust Passport Completion</span>
                <span className="font-bold text-blue-700 font-mono tabular-nums">{user.profileCompletion}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${user.profileCompletion}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-1.5 flex items-center justify-between">
                <span>{records.length} of 6 records verified</span>
                <span className="text-emerald-700 font-semibold">Consent Ready</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/passport')}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
            >
              <span>View Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards (Values in INR ₹) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Monthly Income"
          value={formatINR(monthlyInflow)}
          subtext="Active freelance inflow (Demo)"
          trend={{ value: '+12.5%', isPositive: true, period: 'vs 3-mo avg' }}
          icon={<Wallet className="w-4 h-4 text-blue-600" />}
        />
        <MetricCard
          label="Monthly Expenses"
          value={formatINR(monthlyOutflow)}
          subtext="Rent, utilities & lifestyle"
          trend={{ value: '63.3%', isPositive: true, period: 'expense ratio' }}
          icon={<ArrowDownRight className="w-4 h-4 text-slate-500" />}
        />
        <MetricCard
          label="Estimated Savings"
          value={formatINR(estimatedSavings)}
          subtext="Liquid monthly surplus"
          trend={{ value: `+${formatINR(estimatedSavings)}`, isPositive: true, period: 'retained' }}
          icon={<PieChart className="w-4 h-4 text-emerald-600" />}
        />
        <MetricCard
          label="Savings Rate"
          value={formatPercentage(savingsRate)}
          subtext="Healthy Indian freelancer buffer"
          trend={{ value: '> 20%', isPositive: true, period: 'target met' }}
          icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
        />
      </div>

      {/* Cash Flow Chart & Trend */}
      <CashFlowChart data={cashFlowData} />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/transactions')}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl flex items-center gap-2.5 text-left text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
        >
          <PlusCircle className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Add / Edit Transactions</span>
        </button>
        <button
          onClick={() => navigate('/forecast')}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl flex items-center gap-2.5 text-left text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
        >
          <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>6-Month Forecast</span>
        </button>
        <button
          onClick={() => navigate('/privacy')}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl flex items-center gap-2.5 text-left text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
        >
          <Lock className="w-4 h-4 text-purple-600 shrink-0" />
          <span>Consent & Sharing</span>
        </button>
        <button
          onClick={() => navigate('/partner-portal')}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl flex items-center gap-2.5 text-left text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
        >
          <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Institution Portal</span>
        </button>
      </div>

      {/* Dual Column: AI Insights & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Financial Insights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  AI Financial Insights
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {aiEngineMode === 'gemini_ai' ? 'Gemini 2.0' : 'Deterministic Engine'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pattern explanations derived from authenticated UPI and bank transfers.
              </p>
            </div>
            <button
              onClick={() => navigate('/insights')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              All insights →
            </button>
          </div>

          <div className="space-y-3">
            {insights.slice(0, 3).map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>

          {/* Non-Lender Informational Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Informational Disclaimer:</strong> NEXUS is an explainable financial identity platform, not a credit bureau or lender. These insights do not guarantee credit or loan approval.
            </p>
          </div>
        </div>

        {/* Right Column: Recent Transactions & Health Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Recent Transactions
              </h3>
              <p className="text-xs text-slate-500">
                Live entries in Indian Rupees (₹)
              </p>
            </div>
            <button
              onClick={() => navigate('/transactions')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              View ledger →
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-3 hover:bg-slate-50/70 transition-colors flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <div className="text-xs font-semibold text-slate-800 truncate">
                    {tx.title}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                    <span className="font-medium text-slate-500">{tx.category}</span>
                    <span>•</span>
                    <span className="font-mono">{tx.paymentMethod}</span>
                    <span>•</span>
                    <span>{formatIndianDate(tx.date)}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xs font-bold font-mono ${tx.type === 'inflow' ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {tx.type === 'inflow' ? '+' : '-'}{formatINR(tx.amount)}
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">Settled</span>
                </div>
              </div>
            ))}
          </div>

          {/* Explainable Health Indicators Summary */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-400">
              Explainable Trust Indicators
            </h4>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700">Income Consistency</span>
                <span className="text-emerald-700 font-bold">86/100 (Strong)</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '86%' }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700">Savings Behavior</span>
                <span className="text-blue-700 font-bold">82/100 (Disciplined)</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700">Expense Management</span>
                <span className="text-slate-800 font-bold">84/100 (Balanced)</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
