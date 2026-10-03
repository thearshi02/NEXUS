import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Building, 
  Lock, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Store,
  Sparkles,
  MapPin,
  IndianRupee,
  Target
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { UserPersona } from '../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, showToast } = useNexus();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState(user.name || 'John Doe');
  const [email, setEmail] = useState(user.email || 'john.doe@nexusdemo.in');
  const [selectedPersona, setSelectedPersona] = useState<UserPersona>(user.persona || 'freelancer');
  const [city, setCity] = useState(user.city || 'Lucknow');
  const [state, setState] = useState(user.state || 'Uttar Pradesh');
  const [incomeRange, setIncomeRange] = useState('₹30,000 – ₹60,000');
  const [goals, setGoals] = useState<string[]>(['Build verifiable freelance history', 'Apartment tenancy agreement']);
  const [connectedSources, setConnectedSources] = useState<string[]>(['UPI - Google Pay', 'HDFC Bank']);
  const [generating, setGenerating] = useState(false);

  const personaOptions = [
    {
      id: 'freelancer',
      title: 'Freelancer & Consultant',
      subtitle: 'Client retainers, Upwork/Fiverr payouts, UPI direct settlements',
      icon: Briefcase
    },
    {
      id: 'student',
      title: 'Student & Academic Fellow',
      subtitle: 'Stipends, assistantships, tutoring income, scholarship grants',
      icon: GraduationCap
    },
    {
      id: 'self_employed',
      title: 'Self-Employed Professional',
      subtitle: 'Direct client contracts, professional fees, GST invoices',
      icon: TrendingUp
    },
    {
      id: 'small_business',
      title: 'Small Business / MSME Owner',
      subtitle: 'Point-of-sale QR, Razorpay gateway, vendor invoicing',
      icon: Store
    },
  ];

  const indianCities = [
    { name: 'Lucknow', state: 'Uttar Pradesh' },
    { name: 'Bengaluru', state: 'Karnataka' },
    { name: 'New Delhi', state: 'Delhi NCR' },
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Pune', state: 'Maharashtra' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Jaipur', state: 'Rajasthan' },
    { name: 'Ahmedabad', state: 'Gujarat' },
  ];

  const sourceOptions = [
    { name: 'UPI - Google Pay / PhonePe', desc: 'Direct QR merchant settlements & daily customer inflows' },
    { name: 'HDFC / ICICI / SBI Banking', desc: 'Encrypted net-banking cash-flow aggregates' },
    { name: 'Razorpay Payment Gateway', desc: 'SaaS, digital product, and client invoice checkout logs' },
    { name: 'GST Portal (GSTR-4 / GSTR-1)', desc: 'Official government filing acknowledgements' },
    { name: 'Client Invoicing & Contracts', desc: 'Signed independent service contractor agreements' }
  ];

  const goalOptions = [
    'Build verifiable freelance cash flow history',
    'Apartment tenancy lease approval without traditional ITR barrier',
    'Workstation & equipment zero-deposit leasing',
    'Transparent cash-flow sharing with fintech credit networks',
    'Track personal savings rate & optimize discretionary spending'
  ];

  const toggleSource = (source: string) => {
    if (connectedSources.includes(source)) {
      setConnectedSources(connectedSources.filter((s) => s !== source));
    } else {
      setConnectedSources([...connectedSources, source]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter((g) => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName.trim() || !email.trim()) {
        showToast('Required Fields', 'Please enter your legal name and email.', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (connectedSources.length === 0) {
        showToast('Source Required', 'Select at least one source feed.', 'warning');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      setGenerating(true);
      const personaMatch = personaOptions.find(p => p.id === selectedPersona);
      updateUserProfile({
        name: fullName,
        email,
        city,
        state,
        persona: selectedPersona,
        personaTitle: personaMatch ? personaMatch.title : 'Freelancer',
        monthlyIncomeRange: incomeRange
      });

      setTimeout(() => {
        setGenerating(false);
        showToast('Passport Activated', `Welcome, ${fullName}! Your Financial Trust Passport is live in ${city}.`, 'success');
        navigate('/dashboard');
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress Bar & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              N
            </div>
            <span className="text-lg font-bold text-slate-900">NEXUS Onboarding</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Structure Your Financial Story for Trust
          </h1>
          <p className="text-xs text-slate-500">
            Step {step} of 4 • Explainable profile setup for Indian users
          </p>

          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto mt-3">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* STEP 1: Basic Identity & Persona */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Select Your Financial Persona & Details
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  How do you generate your primary cash flow?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-semibold text-slate-700">Select User Category *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {personaOptions.map((p) => {
                    const Icon = p.icon;
                    const isSelected = selectedPersona === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPersona(p.id as UserPersona)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{p.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{p.subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Income Tier */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Location & Monthly Income Tier
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Helps benchmark cost-of-living and rent-to-income indicators for Indian cities.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Primary Indian City
                  </label>
                  <select
                    value={`${city}, ${state}`}
                    onChange={(e) => {
                      const [c, s] = e.target.value.split(', ');
                      setCity(c);
                      setState(s);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  >
                    {indianCities.map((item) => (
                      <option key={item.name} value={`${item.name}, ${item.state}`}>
                        {item.name} ({item.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Average Monthly Gross Inflow Range (INR ₹)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['₹15,000 – ₹30,000', '₹30,000 – ₹60,000', '₹60,000 – ₹1,20,000', '₹1,20,000+'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setIncomeRange(tier)}
                        className={`p-3 rounded-xl border text-center font-semibold transition-colors ${
                          incomeRange === tier
                            ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Verification Channels */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Select Financial Feeds & Proof Channels
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select the accounts you plan to corroborate. We seed demo records for selected sources.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {sourceOptions.map((src) => {
                  const isChecked = connectedSources.includes(src.name);
                  return (
                    <div
                      key={src.name}
                      onClick={() => toggleSource(src.name)}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${
                        isChecked ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 accent-blue-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{src.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{src.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Financial Goals & Activation */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  What Are Your Primary Financial Objectives?
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  NEXUS tailors your Trust Passport indicators based on your sharing needs.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {goalOptions.map((g) => {
                  const isChecked = goals.includes(g);
                  return (
                    <div
                      key={g}
                      onClick={() => toggleGoal(g)}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center gap-3 ${
                        isChecked ? 'border-blue-600 bg-blue-50/50 text-blue-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="font-medium">{g}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero data is shared without your explicit, time-limited token consent.</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={generating}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
            >
              <span>{step === 4 ? (generating ? 'Initializing Passport...' : 'Activate Financial Passport') : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
