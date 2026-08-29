import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/UIComponents';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin, isLiveAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Auto redirect handled by role context / protected route
      const isRoleAdmin = email.includes('admin');
      navigate(isRoleAdmin ? '/admin' : '/employee');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'HR_ADMIN' | 'EMPLOYEE') => {
    demoLogin(role);
    navigate(role === 'HR_ADMIN' ? '/admin' : '/employee');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-dropdown border border-slate-100 overflow-hidden">
        
        {/* Left Brand Panel */}
        <div className="bg-gradient-to-br from-brand-500 via-orange-600 to-amber-500 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-white text-brand-600 text-3xl flex items-center justify-center shadow-lg mb-6">
              🐥
            </div>
            <h1 className="text-3xl font-black tracking-tight leading-tight">
              CanaryNest <br />HRM Portal
            </h1>
            <p className="text-white/80 text-sm mt-3 leading-relaxed font-medium">
              Unified Human Resource Management for Modern Enterprises. Manage attendance, payroll, leaves, recruitment & employee self-service seamlessly.
            </p>
          </div>

          <div className="space-y-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 my-6">
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Role-based Access Control (HR Admin & Employee)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Powered by Firebase Auth & Real-Time Firestore</span>
            </div>
          </div>

          <p className="text-[11px] text-white/60 font-semibold">
            © 2026 CanaryNest HRM Portal. All rights reserved.
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Sign In</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Select a quick demo role below or sign in with your credentials.
            </p>
          </div>

          {/* Quick Demo Selection Buttons */}
          <div className="mb-6 space-y-2.5 bg-orange-50/60 p-4 rounded-2xl border border-orange-100">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 mb-2">
              Instant One-Click Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('HR_ADMIN')}
                className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-brand-50 border border-brand-200 text-brand-700 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>HR Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('EMPLOYEE')}
                className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
              >
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>Employee</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@canarynest.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white text-slate-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white text-slate-800 font-medium"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Portal
            </Button>
          </form>

          <p className="text-[11px] text-center text-slate-400 font-medium mt-6">
            Authentication mode: <span className="font-bold text-slate-600">{isLiveAuth ? 'Firebase Auth (Live)' : 'Local / Demo Mode Active'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
