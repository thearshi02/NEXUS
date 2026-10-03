import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Download, 
  Trash2, 
  Key, 
  Save, 
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Globe,
  Database,
  RotateCcw,
  LogOut,
  Sliders
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { UserPersona } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, resetDemoData, exportUserData, deleteAccount, showToast } = useNexus();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city || 'Lucknow');
  const [state, setState] = useState(user.state || 'Uttar Pradesh');
  const [persona, setPersona] = useState<UserPersona>(user.persona);
  const [personaTitle, setPersonaTitle] = useState(user.personaTitle);
  const [incomeRange, setIncomeRange] = useState(user.monthlyIncomeRange || '₹30,000 – ₹60,000');

  // Security password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [upiSyncAlerts, setUpiSyncAlerts] = useState(true);
  const [consentQueryAlerts, setConsentQueryAlerts] = useState(true);
  const [monthlyDigestAlerts, setMonthlyDigestAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      city,
      state,
      persona,
      personaTitle,
      monthlyIncomeRange: incomeRange
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Validation Error', 'New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Validation Error', 'Passwords do not match.', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password Updated', 'Your authentication credentials have been securely updated.', 'success');
  };

  const handleLogout = () => {
    showToast('Logged Out', 'You have been securely signed out of NEXUS.', 'info');
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Account & Profile Settings
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
              en-IN Localization
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your personal verification credentials, localization preferences, and security keys.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Database & Sync Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
            isSupabaseConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
          }`}>
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>Database Sync Engine:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {isSupabaseConfigured ? 'Supabase PostgreSQL (Live)' : 'Local First + Supabase Sync Ready'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isSupabaseConfigured 
                ? 'All transactions and consent records are synced with Supabase PostgreSQL cloud.'
                : 'Running in high-speed local persistence mode. Add VITE_SUPABASE_URL to connect live cloud DB.'}
            </p>
          </div>
        </div>

        <button
          onClick={resetDemoData}
          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Demo Baseline</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                Demo User
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Passport Token: {user.passportId}
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Identity Verified (Aadhaar / PAN Match Level 3)</span>
            </div>
          </div>
        </div>

        {/* Profile Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Account Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              State & Country
            </label>
            <input
              type="text"
              value={`${state}, India`}
              disabled
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-medium text-slate-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              User Category
            </label>
            <select
              value={persona}
              onChange={(e) => {
                const newPersona = e.target.value as UserPersona;
                setPersona(newPersona);
                if (newPersona === 'freelancer') setPersonaTitle('Independent Software Engineer & Product Designer');
                if (newPersona === 'student') setPersonaTitle('Graduate Student & AI Researcher');
                if (newPersona === 'self_employed') setPersonaTitle('Digital Consultant & Creator');
                if (newPersona === 'small_business') setPersonaTitle('Specialty Retail & MSME Founder');
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="freelancer">Freelancer</option>
              <option value="student">Student</option>
              <option value="self_employed">Self-Employed Professional</option>
              <option value="small_business">Small Business (MSME)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Monthly Income Range (INR ₹)
            </label>
            <select
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
              <option value="₹30,000 – ₹60,000">₹30,000 – ₹60,000</option>
              <option value="₹60,000 – ₹1,20,000">₹60,000 – ₹1,20,000</option>
              <option value="₹1,20,000+">₹1,20,000+</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>

      {/* Localization Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Globe className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            India Localization & Currency Standard
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Primary Currency</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">Indian Rupee (₹ INR)</div>
            <span className="text-[11px] text-slate-500">en-IN formatting</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Date Standard</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">DD MMM YYYY</div>
            <span className="text-[11px] text-slate-500">e.g. 03 Oct 2026</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Timezone</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">Asia/Kolkata (IST)</div>
            <span className="text-[11px] text-slate-500">UTC +05:30</span>
          </div>
        </div>
      </div>

      {/* Password Management */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Key className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Security & Password Management
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Update Password
          </button>
        </div>
      </form>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Bell className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <div className="font-semibold text-slate-800">UPI Inflow & Payout Notifications</div>
              <div className="text-[11px] text-slate-500">Instant notification when a client payment is authenticated.</div>
            </div>
            <input 
              type="checkbox"
              checked={upiSyncAlerts}
              onChange={(e) => setUpiSyncAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <div className="font-semibold text-slate-800">Institution Consent Queries</div>
              <div className="text-[11px] text-slate-500">Alerts when an authorized lender or landlord queries your passport.</div>
            </div>
            <input 
              type="checkbox"
              checked={consentQueryAlerts}
              onChange={(e) => setConsentQueryAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <div className="font-semibold text-slate-800">Monthly Cash Flow Intelligence Digest</div>
              <div className="text-[11px] text-slate-500">Summary of savings rate, category variations, and upcoming forecasts.</div>
            </div>
            <input 
              type="checkbox"
              checked={monthlyDigestAlerts}
              onChange={(e) => setMonthlyDigestAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
