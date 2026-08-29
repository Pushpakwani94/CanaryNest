import React, { useState } from 'react';
import { Search, Bell, Mail, Calendar as CalendarIcon, UserCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC<{ title?: string }> = () => {
  const { userProfile, role, demoLogin } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { title: 'New Leave Request', text: 'Priya Sharma applied for Casual Leave.', time: '10m ago' },
    { title: 'Expense Claim Submitted', text: 'Rahul Patil requested reimbursement for ₹1,850.', time: '1h ago' },
    { title: 'Payroll Ready', text: 'May 2025 payroll summary is ready.', time: '3h ago' },
  ];

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20 shadow-none">
      {/* Greeting Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          {role === 'HR_ADMIN' ? (
            <>Welcome back, Admin! 👋</>
          ) : (
            <>Good Morning, {userProfile?.displayName?.split(' ')[0] || 'Rahul'}! 👋</>
          )}
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          {role === 'HR_ADMIN' 
            ? "Here's what's happening in your organization today." 
            : "Have a productive and successful day ahead."}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global Search Input */}
        <div className="relative w-72 hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employees, leaves, documents..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition-all text-slate-700 placeholder-slate-400 font-medium"
          />
        </div>

        {/* Real Live Date Selector Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-xl text-xs font-semibold text-slate-600">
          <CalendarIcon className="w-3.5 h-3.5 text-brand-500" />
          <span>
            {new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              weekday: 'long',
            })}
          </span>
        </div>

        {/* Role Quick Switch Button (Only visible in HR Admin mode) */}
        {role === 'HR_ADMIN' && (
          <button
            onClick={() => demoLogin('EMPLOYEE')}
            title="Toggle view mode"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-brand-600 border border-brand-200 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Switch to Employee View</span>
          </button>
        )}

        {/* Bell Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-dropdown border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</h4>
                <span className="text-[10px] font-bold text-brand-500 bg-orange-50 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors">
                    <p className="text-xs font-bold text-slate-800">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{n.text}</p>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <img
            src={userProfile?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="hidden xl:block">
            <p className="text-xs font-extrabold text-slate-800 leading-tight">{userProfile?.displayName}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{role === 'HR_ADMIN' ? 'Super Admin' : 'QA Engineer'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
