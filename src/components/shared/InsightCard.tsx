import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { FinancialInsight } from '../../types';

interface InsightCardProps {
  insight: FinancialInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const navigate = useNavigate();

  const getBorderColor = () => {
    switch (insight.type) {
      case 'positive':
        return 'border-l-4 border-l-emerald-600';
      case 'alert':
        return 'border-l-4 border-l-amber-500';
      case 'recommendation':
        return 'border-l-4 border-l-blue-600';
      case 'neutral':
      default:
        return 'border-l-4 border-l-slate-400';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs ${getBorderColor()} hover:border-slate-300 transition-colors`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">{insight.category}</span>
            <span aria-hidden="true">·</span>
            <span>AI Pattern Detection</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            {insight.title}
          </h4>
        </div>

        {insight.type === 'positive' && (
          <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
            Favorable Pattern
          </span>
        )}
        {insight.type === 'alert' && (
          <span className="text-[11px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
            Anomaly Flag
          </span>
        )}
        {insight.type === 'recommendation' && (
          <span className="text-[11px] font-mono font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
            Optimization Action
          </span>
        )}
        {insight.type === 'neutral' && (
          <span className="text-[11px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Baseline Observation
          </span>
        )}
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
        {insight.description}
      </p>

      {insight.metricNote && (
        <div className="mt-3 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-mono text-slate-600">
          Detected Metric: <strong className="text-slate-900 font-semibold">{insight.metricNote}</strong>
        </div>
      )}

      {insight.actionLabel && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Based on active UPI and banking transactions
          </span>
          <button
            onClick={() => insight.actionRoute && navigate(insight.actionRoute)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>{insight.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
