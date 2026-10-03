import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  TrendingUp, 
  ReceiptText,
  FolderArchive, 
  KeyRound, 
  Settings, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calculator,
  X
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen = false, onClose }) => {
  const { user } = useNexus();
  const location = useLocation();
  const navigate = useNavigate();

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Trust Passport', path: '/passport', icon: ShieldCheck },
    { name: 'AI Insights', path: '/insights', icon: TrendingUp },
    { name: 'Transactions', path: '/transactions', icon: ReceiptText },
    { name: 'Cash Flow Forecast', path: '/forecast', icon: Calculator },
    { name: 'Financial Records', path: '/records', icon: FolderArchive },
    { name: 'Privacy & Consent', path: '/privacy', icon: KeyRound },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs shadow-blue-500/20">
              N
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                NEXUS
              </div>
              <div className="text-[10px] font-medium text-blue-600 tracking-wider uppercase">
                Trust Passport
              </div>
            </div>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Financial Identity
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Institutional Partner Portal Switcher */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Partner Network
            </div>
            <nav className="space-y-1">
              <NavLink
                to="/partner-portal"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Building2 className="w-4 h-4 text-teal-700 shrink-0" />
                <div className="flex-1 truncate">
                  <span>Institution Portal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </NavLink>

              <button
                onClick={() => {
                  navigate('/');
                  if (onClose) onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
              >
                <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Public Landing Page</span>
              </button>
            </nav>
          </div>

          {/* Trust Passport Status Widget */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Trust Passport
              </span>
              <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-2.5">
              Profile completion is at <strong className="text-slate-800 font-semibold">{user.profileCompletion}%</strong>. 6 verified Indian records.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2.5">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${user.profileCompletion}%` }}
              />
            </div>
            <button
              onClick={() => {
                navigate('/passport');
                if (onClose) onClose();
              }}
              className="w-full py-1.5 px-2.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-center shadow-2xs"
            >
              Inspect Passport
            </button>
          </div>
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-slate-900 truncate">
                  {user.name}
                </span>
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-medium">Demo</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {user.city}, India
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
