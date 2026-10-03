import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles, 
  Sliders, 
  RotateCcw,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useNexus } from '../context/NexusContext';
import { formatINR, formatCompactINR } from '../utils/formatters';

export const ForecastPage: React.FC = () => {
  const { user, forecasts, updateForecastSimulation, monthlyInflow, monthlyOutflow } = useNexus();
  const [incomeSlider, setIncomeSlider] = useState(1.0);
  const [expenseSlider, setExpenseSlider] = useState(1.0);

  const handleIncomeChange = (val: number) => {
    setIncomeSlider(val);
    updateForecastSimulation(val, expenseSlider);
  };

  const handleExpenseChange = (val: number) => {
    setExpenseSlider(val);
    updateForecastSimulation(incomeSlider, val);
  };

  const resetSimulation = () => {
    setIncomeSlider(1.0);
    setExpenseSlider(1.0);
    updateForecastSimulation(1.0, 1.0);
  };

  // Prepare chart data combining historical & forecast
  const chartData = [
    { month: 'Apr 26', Inflow: 42000, Outflow: 26500, Balance: 15500, type: 'Historical' },
    { month: 'May 26', Inflow: 44000, Outflow: 27800, Balance: 16200, type: 'Historical' },
    { month: 'Jun 26', Inflow: 43500, Outflow: 27200, Balance: 16300, type: 'Historical' },
    { month: 'Jul 26', Inflow: 47000, Outflow: 29800, Balance: 17200, type: 'Historical' },
    { month: 'Aug 26', Inflow: 45000, Outflow: 28200, Balance: 16800, type: 'Historical' },
    { month: 'Sep 26', Inflow: 48500, Outflow: 30100, Balance: 18400, type: 'Historical' },
    ...forecasts.map(f => ({
      month: f.month.replace(' 20', ' '),
      Inflow: f.estimatedIncome,
      Outflow: f.estimatedExpenses,
      Balance: f.estimatedBalance,
      type: 'Projected'
    }))
  ];

  const totalProjectedSavings = forecasts.reduce((sum, f) => sum + f.estimatedBalance, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Cash Flow Forecast
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
              6-Month Forward Model
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explainable cash-flow trajectory calculated from your recurring client retainers and UPI run-rates in {user.city}.
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Current Monthly Inflow
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {formatINR(monthlyInflow)}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Active baseline run-rate</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Current Monthly Outflow
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {formatINR(monthlyOutflow)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Fixed + discretionary split
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            6-Month Projected Surplus
          </div>
          <div className="text-xl font-bold text-blue-700 mt-1">
            {formatINR(totalProjectedSavings)}
          </div>
          <div className="text-[11px] text-blue-600 mt-1 font-medium">
            Cumulative reserve accumulation
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Model Confidence
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-1">
            88% High
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Verified UPI & retainer contracts
          </div>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="p-5 bg-gradient-to-r from-blue-50/70 via-slate-50 to-white rounded-xl border border-blue-100/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Interactive Scenario Modeling
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Adjust assumptions to simulate career growth or budget changes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Projected Inflow Adjustment:</span>
              <span className="font-mono font-bold text-blue-700">
                {incomeSlider >= 1 ? `+${Math.round((incomeSlider - 1) * 100)}%` : `${Math.round((incomeSlider - 1) * 100)}%`}
              </span>
            </div>
            <input 
              type="range"
              min="0.7"
              max="1.5"
              step="0.05"
              value={incomeSlider}
              onChange={(e) => handleIncomeChange(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-30% (Contract Loss)</span>
              <span>Baseline (0%)</span>
              <span>+50% (New Clients)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Projected Outflow Adjustment:</span>
              <span className="font-mono font-bold text-slate-800">
                {expenseSlider >= 1 ? `+${Math.round((expenseSlider - 1) * 100)}%` : `${Math.round((expenseSlider - 1) * 100)}%`}
              </span>
            </div>
            <input 
              type="range"
              min="0.7"
              max="1.4"
              step="0.05"
              value={expenseSlider}
              onChange={(e) => handleExpenseChange(parseFloat(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-30% (Frugal Living)</span>
              <span>Baseline (0%)</span>
              <span>+40% (Surge Spend)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Historical vs Projected Cash Flow (INR ₹)
            </h3>
            <p className="text-xs text-slate-500">
              Solid bars represent past verified statements; shaded sections represent forward estimates.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs" />
              Inflow
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 bg-slate-400 rounded-xs" />
              Outflow
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              Net Monthly Balance
            </span>
          </div>
        </div>

        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(val: any) => [formatINR(Number(val)), '']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="Inflow" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Outflow" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Line type="monotone" dataKey="Balance" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assumptions Table & Disclaimers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Forward Month Projections Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-2.5">Month</th>
                  <th className="pb-2.5">Est. Inflow</th>
                  <th className="pb-2.5">Est. Outflow</th>
                  <th className="pb-2.5">Est. Surplus</th>
                  <th className="pb-2.5">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {forecasts.map((f) => (
                  <tr key={f.month} className="hover:bg-slate-50/60">
                    <td className="py-2.5 font-semibold text-slate-800">{f.month}</td>
                    <td className="py-2.5 font-medium text-blue-700">{formatINR(f.estimatedIncome)}</td>
                    <td className="py-2.5 font-medium text-slate-600">{formatINR(f.estimatedExpenses)}</td>
                    <td className="py-2.5 font-bold text-emerald-600">{formatINR(f.estimatedBalance)}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {f.confidenceScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>Forecasting Transparency</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>Assumes active retainers (Apex Fintech & BDS) continue on agreed terms.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>Calculated deterministically without black-box credit models.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>Inflation and seasonal adjustments applied per Indian urban benchmarks.</span>
            </li>
          </ul>

          <div className="pt-2 border-t border-slate-200">
            <p className="text-[11px] text-slate-400 leading-normal">
              <strong>Disclaimer:</strong> NEXUS projections are informational analytical models created for self-directed budgeting and consent-based sharing. They do not constitute guaranteed investment returns or loan underwriting promises.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
