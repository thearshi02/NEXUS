import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { MonthlyCashFlow } from '../../types';
import { formatINR, formatCompactINR } from '../../utils/formatters';

interface CashFlowChartProps {
  data: MonthlyCashFlow[];
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  const [filterMode, setFilterMode] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [timeRange, setTimeRange] = useState<'6m' | '3m'>('6m');

  const filteredData = timeRange === '3m' ? data.slice(-3) : data;

  const totalCumulativeNet = filteredData.reduce((acc, curr) => acc + (curr.inflow - curr.outflow), 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const inflow = payload.find((p: any) => p.dataKey === 'inflow')?.value || 0;
      const outflow = payload.find((p: any) => p.dataKey === 'outflow')?.value || 0;
      const net = inflow - outflow;

      return (
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1.5 min-w-[190px]">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
            {label}
          </div>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Recorded Inflow:</span>
            <span className="font-semibold text-blue-600 tabular-nums">{formatINR(inflow)}</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Recorded Outflow:</span>
            <span className="font-semibold text-slate-700 tabular-nums">{formatINR(outflow)}</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-700 font-medium">Net Addition:</span>
            <span className="font-bold text-emerald-700 tabular-nums">+{formatINR(net)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Monthly Cash-Flow Trajectory (INR ₹)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified monthly inflows vs. operating expenditures across UPI, bank accounts, and client retainers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Filter segmented buttons */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setFilterMode('inflow')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === 'inflow'
                  ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Inflow
            </button>
            <button
              onClick={() => setFilterMode('outflow')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === 'outflow'
                  ? 'bg-white text-slate-800 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Outflow
            </button>
          </div>

          {/* Time range selector */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                timeRange === '6m'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              6M
            </button>
            <button
              onClick={() => setTimeRange('3m')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                timeRange === '3m'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              3M
            </button>
          </div>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(v) => formatCompactINR(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            {(filterMode === 'all' || filterMode === 'inflow') && (
              <Bar 
                dataKey="inflow" 
                name="Inflow" 
                fill="#2563EB" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={36}
              />
            )}
            {(filterMode === 'all' || filterMode === 'outflow') && (
              <Bar 
                dataKey="outflow" 
                name="Outflow" 
                fill="#94A3B8" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={36}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Summary Notes */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
            <span className="font-medium text-slate-700">Gross Inflow (₹)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-400 inline-block" />
            <span className="font-medium text-slate-700">Operating Outflow (₹)</span>
          </div>
        </div>

        <div className="font-mono text-[11px] text-slate-500">
          Cumulative Net Additions: <strong className="text-emerald-700 font-semibold">+{formatINR(totalCumulativeNet)}</strong>
        </div>
      </div>
    </div>
  );
};
