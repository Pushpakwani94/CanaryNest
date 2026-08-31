import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, Calendar, Palmtree, 
  Wallet, UserPlus, Award, GraduationCap, FileText, 
  Receipt, HardDrive, Megaphone, Shield, CalendarDays, 
  BarChart3, UserCheck, ShieldAlert, Settings, HelpCircle, 
  LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/db';

export const Sidebar: React.FC = () => {
  const { role, userProfile, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/employees', label: 'Employees Directory', icon: Users },
    { path: '/admin/departments', label: 'Departments', icon: Building2 },
    { path: '/admin/attendance', label: 'Attendance Logs', icon: Calendar },
    { path: '/admin/leaves', label: 'Leave Requests', icon: Palmtree, badge: '1' },
    { path: '/admin/payroll', label: 'Payroll & Payslips', icon: Wallet },
    { path: '/admin/recruitment', label: 'Recruitment (ATS)', icon: UserPlus },
    { path: '/admin/performance', label: 'Performance Reviews', icon: Award },
    { path: '/admin/training', label: 'Training Programs', icon: GraduationCap },
    { path: '/admin/documents', label: 'Document Vault', icon: FileText },
    { path: '/admin/expenses', label: 'Expense Claims', icon: Receipt },
    { path: '/admin/assets', label: 'Asset Management', icon: HardDrive },
    { path: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    { path: '/admin/policies', label: 'Company Policies', icon: Shield },
    { path: '/admin/holidays', label: 'Holiday Calendar', icon: CalendarDays },
    { path: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { path: '/admin/roles', label: 'Roles & Security', icon: UserCheck },
    { path: '/admin/audit', label: 'Audit Logs', icon: ShieldAlert },
    { path: '/admin/settings', label: 'System Settings', icon: Settings },
  ];

  const employeeNavItems = [
    { path: '/employee', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employee/profile', label: 'My Profile', icon: Users },
    { path: '/employee/attendance', label: 'My Attendance', icon: Calendar },
    { path: '/employee/apply-leave', label: 'Apply for Leave', icon: Palmtree },
    { path: '/employee/leaves', label: 'My Leave History', icon: Palmtree },
    { path: '/employee/payslips', label: 'My Payslips', icon: Wallet },
    { path: '/employee/documents', label: 'My Documents', icon: FileText },
    { path: '/employee/performance', label: 'My Performance', icon: Award },
    { path: '/employee/training', label: 'My Training', icon: GraduationCap },
    { path: '/employee/expenses', label: 'My Expenses', icon: Receipt },
    { path: '/employee/announcements', label: 'Announcements', icon: Megaphone },
    { path: '/employee/policies', label: 'Company Policies', icon: Shield },
    { path: '/employee/holidays', label: 'Holiday Calendar', icon: CalendarDays },
    { path: '/employee/support', label: 'Help & Support', icon: HelpCircle },
    { path: '/employee/settings', label: 'Settings', icon: Settings },
  ];

  const navItems = role === 'HR_ADMIN' ? adminNavItems : employeeNavItems;

  const displayName = currentEmp ? `${currentEmp.firstName} ${currentEmp.lastName}` : (userProfile?.displayName || 'User');
  const userSubTitle = role === 'HR_ADMIN' ? 'Super Admin' : (currentEmp?.designation || 'Employee');
  const photo = currentEmp?.photoURL || userProfile?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-30 select-none">
      
      {/* Brand Logo Header */}
      <div className="h-20 px-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center text-white text-xl shadow-md shadow-brand-500/30 font-black">
          🐥
        </div>
        <div>
          <h1 className="font-black text-slate-900 text-lg tracking-tight leading-none">
            Canary<span className="text-brand-500">Nest</span>
          </h1>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            {role === 'HR_ADMIN' ? 'HR Management' : 'Employee Portal'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1 scrollbar-thin">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin' || item.path === '/employee'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {(item as any).badge && (
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {(item as any).badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={photo}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{displayName}</p>
              <p className="text-[10px] font-semibold text-slate-400 truncate uppercase">
                {userSubTitle}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>

    </aside>
  );
};
