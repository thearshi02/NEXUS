import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Share2, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';
import { UserPersona } from '../../types';

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
  title: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  onOpenMobileMenu, 
  title, 
  subtitle 
}) => {
  const { 
    user, 
    updateUserPersona, 
    setIsShareModalOpen, 
    setIsUploadModalOpen,
    resetDemoData,
    showToast 
  } = useNexus();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const personas: { id: UserPersona; title: string; subtitle: string }[] = [
    { id: 'freelancer', title: 'Independent Software Engineer', subtitle: 'Lucknow • ₹45k/mo UPI & Retainers' },
    { id: 'student', title: 'Graduate Student & Tutor', subtitle: 'Bengaluru • ₹22k/mo Stipend & Tutoring' },
    { id: 'self_employed', title: 'Digital Consultant & Creator', subtitle: 'Delhi • ₹85k/mo GST & Invoices' },
    { id: 'small_business', title: 'Specialty Retail & MSME Owner', subtitle: 'Mumbai • ₹1.8L/mo Razorpay & UPI' },
  ];

  const notifications = [
    {
      id: 'notif-1',
      title: 'Consent Token Queried',
      desc: 'HDFC Digital Lending verified your 6-month UPI cash flow summary.',
      time: '14m ago',
      icon: CheckCircle2,
      color: 'text-blue-600'
    },
    {
      id: 'notif-2',
      title: 'UPI Inflow Settled',
      desc: 'Apex Fintech milestone settlement of ₹25,000 received via Google Pay.',
      time: '3h ago',
      icon: Sparkles,
      color: 'text-teal-600'
    },
    {
      id: 'notif-3',
      title: 'Quarterly Record Milestone',
      desc: '90 consecutive days of balanced cash flow recorded in Lucknow.',
      time: '1d ago',
      icon: Clock,
      color: 'text-amber-600'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast('Search query indexed', `Filtered views matching "${searchQuery}"`, 'info');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left zone: Mobile toggle & Breadcrumb/Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden focus:outline-hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate tracking-tight">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Demo Data
            </span>
          </div>
          {subtitle && (
            <p className="hidden sm:block text-xs text-slate-500 truncate font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Middle zone: Live search */}
      <div className="hidden lg:block w-72 mx-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search transactions, UPI, partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </form>
      </div>

      {/* Right zone: Persona switch + Quick actions + Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs transition-colors hidden xl:flex items-center gap-1"
          title="Reset sample financial data to baseline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px]">Reset Demo</span>
        </button>

        {/* Persona Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            title="Switch demo persona to test alternative financial identity views"
          >
            <span className="hidden sm:inline text-slate-400 font-normal">Persona:</span>
            <span className="font-semibold text-slate-800 max-w-[120px] truncate">
              {user.persona.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showPersonaMenu && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs"
              onMouseLeave={() => setShowPersonaMenu(false)}
            >
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch Indian Persona
              </div>
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    updateUserPersona(p.id, p.title);
                    setShowPersonaMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 flex flex-col transition-colors ${
                    user.persona === p.id ? 'bg-blue-50/70 text-blue-900' : 'text-slate-700'
                  }`}
                >
                  <span className="font-semibold text-xs">{p.title}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">{p.subtitle}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upload Record Quick Action */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors"
        >
          <Upload className="w-3.5 h-3.5 text-slate-500" />
          <span>Upload Record</span>
        </button>

        {/* Share Passport CTA */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share Passport</span>
          <span className="sm:hidden">Share</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-hidden"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div 
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50"
              onMouseLeave={() => setShowNotifications(false)}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Activity & Audits</span>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Mark read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-2.5 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-start gap-2.5">
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${n.color}`} />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-slate-800">{n.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-normal">{n.desc}</div>
                          <div className="text-[10px] text-slate-400 mt-1 font-mono">{n.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
