import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Mail, KeyRound, Sparkles, CheckCircle2, User, Key } from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, updateUserProfile } = useNexus();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  const [email, setEmail] = useState('john.doe@nexusdemo.in');
  const [password, setPassword] = useState('nexusdemo123');
  const [fullName, setFullName] = useState('John Doe');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isForgotPassword) {
      setTimeout(() => {
        setLoading(false);
        showToast('Password Reset Sent', `Reset link sent to ${email}.`, 'info');
        setIsForgotPassword(false);
      }, 500);
      return;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        if (isSignUp) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                city: 'Lucknow',
                user_type: 'freelancer',
              }
            }
          });
          if (error) throw error;
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
        }
      } catch (err: any) {
        console.warn('Supabase Auth Notice (Falling back to local demo):', err.message);
      }
    }

    setTimeout(() => {
      setLoading(false);
      if (isSignUp) {
        updateUserProfile({ name: fullName, email });
        showToast('Account Initialized', 'Welcome to NEXUS! Proceeding to financial onboarding.', 'success');
        navigate('/onboarding');
      } else {
        showToast('Welcome back, John Doe', 'Signed into your Financial Trust Passport.', 'success');
        navigate('/dashboard');
      }
    }, 500);
  };

  const handleDemoSignIn = (persona: 'freelancer' | 'student' | 'self_employed' | 'small_business') => {
    if (persona === 'freelancer') {
      updateUserProfile({
        name: 'John Doe',
        email: 'john.doe@nexusdemo.in',
        persona: 'freelancer',
        personaTitle: 'Independent Software Engineer & Product Designer',
        city: 'Lucknow',
        state: 'Uttar Pradesh'
      });
    } else if (persona === 'student') {
      updateUserProfile({
        name: 'Rahul Verma',
        email: 'rahul.verma@nexusdemo.in',
        persona: 'student',
        personaTitle: 'Graduate Student & AI Tutor',
        city: 'Bengaluru',
        state: 'Karnataka'
      });
    } else if (persona === 'self_employed') {
      updateUserProfile({
        name: 'Priya Sharma',
        email: 'priya.sharma@nexusdemo.in',
        persona: 'self_employed',
        personaTitle: 'Digital Marketing & Strategy Consultant',
        city: 'Delhi',
        state: 'Delhi NCR'
      });
    } else {
      updateUserProfile({
        name: 'Amit Patel',
        email: 'amit.patel@nexusdemo.in',
        persona: 'small_business',
        personaTitle: 'Specialty Retail & Logistics Founder',
        city: 'Mumbai',
        state: 'Maharashtra'
      });
    }

    showToast('Demo Environment Initialized', `Signed in as demo ${persona.replace('_', ' ')}.`, 'info');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs shadow-blue-500/20">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            NEXUS
          </span>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          {isForgotPassword 
            ? 'Reset your password' 
            : isSignUp 
            ? 'Create your Financial Trust Passport' 
            : 'Sign in to NEXUS'}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Consent-governed financial intelligence for Indian professionals & MSMEs.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-8 space-y-5">
          {/* Quick 1-Click Demo Login Box */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-blue-900">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Explore Demo Identity
              </span>
              <span className="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">1-CLICK LOGIN</span>
            </div>
            <button
              type="button"
              onClick={() => handleDemoSignIn('freelancer')}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs text-center flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Explore as John Doe (Freelancer, Lucknow)</span>
            </button>
            <div className="grid grid-cols-3 gap-1 pt-1 text-[10px]">
              <button
                type="button"
                onClick={() => handleDemoSignIn('student')}
                className="p-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-600 font-medium truncate"
              >
                Rahul (Student)
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('self_employed')}
                className="p-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-600 font-medium truncate"
              >
                Priya (Consultant)
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('small_business')}
                className="p-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-600 font-medium truncate"
              >
                Amit (MSME)
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              or enter credentials
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {isSignUp && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@nexusdemo.in"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-700">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : isForgotPassword ? 'Send Reset Link' : isSignUp ? 'Create Passport Profile' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle between Login, Signup, and Forgot Password */}
          <div className="pt-2 text-center text-xs text-slate-500 space-y-1">
            {isForgotPassword ? (
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="font-semibold text-blue-600 hover:underline"
              >
                Back to Sign In
              </button>
            ) : isSignUp ? (
              <p>
                Already have a passport?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                New to NEXUS?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
