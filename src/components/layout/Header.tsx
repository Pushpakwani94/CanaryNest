import React, { useState, useEffect } from 'react';
import { Search, Bell, Mail, Calendar as CalendarIcon, UserCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/db';

export const Header: React.FC<{ title?: string }> = () => {
  const { userProfile, role, demoLogin } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentEmp, setCurrentEmp] = useState<any>(null);

  useEffect(() => {
    const unsub = dataService.getEmployees((list) => {
      const match = list.find(e => 
        e.id === userProfile?.employeeId || 
        e.email.toLowerCase() === userProfile?.email?.toLowerCase()
      );
      if (match) setCurrentEmp(match);
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [userProfile]);

  const userFirstName = currentEmp?.firstName || userProfile?.displayName?.split(' ')[0] || 'Employee';

  const notifications = [
    { title: 'New Leave Request', text: 'Employee applied for Casual Leave.', time: '10m ago' },
    { title: 'Expense Claim Submitted', text: 'Expense claim requested for reimbursement.', time: '1h ago' },
    { title: 'Payroll Ready', text: 'Monthly payroll summary is ready.', time: '3h ago' },
  ];

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20 shadow-none">
      {/* Greeting Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          {role === 'HR_ADMIN' ? (
            <>Welcome back, Admin! 👋</>
          ) : (
            <>Good Morning, {userFirstName}! 👋</>
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
                <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Notifications</h3>
                <span className="text-[10px] text-brand-600 font-bold cursor-pointer hover:underline">Mark all as read</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="flex gap-3 text-xs p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-brand-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">{n.title}</p>
                      <p className="text-[11px] text-slate-500">{n.text}</p>
                      <span className="text-[10px] text-slate-400 font-medium mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
