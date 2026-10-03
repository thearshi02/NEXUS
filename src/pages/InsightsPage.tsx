import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight,
  Send,
  Bot,
  User,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { InsightCard } from '../components/shared/InsightCard';
import { formatINR } from '../utils/formatters';

export const InsightsPage: React.FC = () => {
  const { user, insights, transactions, aiEngineMode, isAiRefreshing, refreshAiInsights, showToast } = useNexus();
  const [askQuery, setAskQuery] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Hello John! I have reviewed your ₹45,000 monthly freelance cash flow in Lucknow. Your 36.7% savings rate is strong, and fixed overhead is low. What financial trends or passport indicators would you like me to explain?`
    }
  ]);
  const [isAsking, setIsAsking] = useState(false);

  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    const userText = askQuery.trim();
    setAiChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setAskQuery('');
    setIsAsking(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText, user, transactions }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiChatHistory(prev => [...prev, { role: 'assistant', text: data.answer }]);
      } else {
        throw new Error('Fallback to local assistant');
      }
    } catch (err) {
      // Local intelligent response fallback
      setTimeout(() => {
        let answer = `Based on your recent transactions, your net savings of ₹16,500/month provides a solid safety cushion. Your top expense category is Rent & Housing (₹8,000), followed by Groceries (₹3,500) and Coworking (₹3,500). To optimize your score further, keep your dining expenses within ₹2,000/month.`;
        if (userText.toLowerCase().includes('passport') || userText.toLowerCase().includes('completion')) {
          answer = `Your Trust Passport is currently at 88% completeness. You can reach 95%+ by uploading your Q3 GST Filing receipt or adding a 3rd client invoice reference in the Records tab.`;
        }
        setAiChatHistory(prev => [...prev, { role: 'assistant', text: answer }]);
      }, 600);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              AI Financial Intelligence & Insights
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {aiEngineMode === 'gemini_ai' ? 'Gemini 2.0 AI' : 'Rule-Based Engine'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Automated spending pattern detection, anomaly alerts, and cash-flow explanations tailored for {user.city}, India.
          </p>
        </div>

        <button
          onClick={() => refreshAiInsights()}
          disabled={isAiRefreshing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAiRefreshing ? 'animate-spin' : ''}`} />
          <span>{isAiRefreshing ? 'Analyzing Transactions...' : 'Re-Analyze Cash Flow'}</span>
        </button>
      </div>

      {/* Primary Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* AI Financial Assistant Interactive Query Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Ask NEXUS Financial Intelligence Advisor
              </h3>
              <p className="text-xs text-slate-500">
                Ask questions about your savings rate, category trends, or passport indicators.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            India Context Active (INR ₹)
          </span>
        </div>

        {/* Chat History */}
        <div className="space-y-3 max-h-72 overflow-y-auto p-2">
          {aiChatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  AI
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[85%] sm:max-w-[75%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-xs'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  JD
                </div>
              )}
            </div>
          ))}
          {isAsking && (
            <div className="flex gap-3 text-xs items-center text-slate-400">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span>NEXUS AI is synthesizing transaction patterns...</span>
            </div>
          )}
        </div>

        {/* Query Input */}
        <form onSubmit={handleSendQuestion} className="flex gap-2 pt-2 border-t border-slate-100">
          <input
            type="text"
            placeholder="e.g. How does my ₹16,500 savings rate compare to other Lucknow freelancers?"
            value={askQuery}
            onChange={(e) => setAskQuery(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!askQuery.trim() || isAsking}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
          <span>Quick queries:</span>
          <button
            type="button"
            onClick={() => setAskQuery('Why did my food & dining expenses rise by 18%?')}
            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            Dining +18% Anomaly
          </button>
          <button
            type="button"
            onClick={() => setAskQuery('How can I increase my Financial Trust Passport score?')}
            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            Improve Passport Score
          </button>
          <button
            type="button"
            onClick={() => setAskQuery('Explain my fixed vs variable overhead ratio.')}
            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            Fixed Overhead Ratio
          </button>
        </div>
      </div>

      {/* Safety & Compliance Notice */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Non-Advisory Notice:</strong> NEXUS AI provides descriptive behavioral analytics based strictly on your historical entries. It does not provide SEBI-registered investment advice, tax counseling, or loan guarantees.
        </p>
      </div>
    </div>
  );
};
