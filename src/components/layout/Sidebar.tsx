import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, Clock, CalendarDays, 
  Wallet, Briefcase, Award, GraduationCap, FileText, 
  Receipt, HardDrive, Megaphone, ShieldCheck, Calendar, 
  BarChart3, ShieldAlert, FileClock, Settings, HelpCircle, 
  LogOut, UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { userProfile, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  interface NavItem {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Employees', path: '/admin/employees', icon: Users },
    { label: 'Departments', path: '/admin/departments', icon: Building2 },
    { label: 'Attendance', path: '/admin/attendance', icon: Clock },
    { label: 'Leave Management', path: '/admin/leaves', icon: CalendarDays },
    { label: 'Payroll', path: '/admin/payroll', icon: Wallet },
    { label: 'Recruitment', path: '/admin/recruitment', icon: Briefcase },
    { label: 'Performance', path: '/admin/performance', icon: Award },
    { label: 'Training & Dev', path: '/admin/training', icon: GraduationCap },
    { label: 'Documents', path: '/admin/documents', icon: FileText },
    { label: 'Expense Management', path: '/admin/expenses', icon: Receipt },
    { label: 'Assets', path: '/admin/assets', icon: HardDrive },
    { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { label: 'Company Policies', path: '/admin/policies', icon: ShieldCheck },
    { label: 'Holiday Calendar', path: '/admin/holidays', icon: Calendar },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { label: 'Roles & Permissions', path: '/admin/roles', icon: ShieldAlert },
    { label: 'Audit Logs', path: '/admin/logs', icon: FileClock },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const employeeNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/employee', icon: LayoutDashboard },
    { label: 'My Profile', path: '/employee/profile', icon: UserCheck },
    { label: 'Attendance', path: '/employee/attendance', icon: Clock },
    { label: 'Apply Leave', path: '/employee/apply-leave', icon: CalendarDays },
    { label: 'My Leaves', path: '/employee/leaves', icon: CalendarDays, badge: '2' },
    { label: 'Payslips', path: '/employee/payslips', icon: Wallet },
    { label: 'My Documents', path: '/employee/documents', icon: FileText },
    { label: 'Performance', path: '/employee/performance', icon: Award },
    { label: 'Training', path: '/employee/training', icon: GraduationCap },
    { label: 'Expenses', path: '/employee/expenses', icon: Receipt, badge: '1' },
    { label: 'Announcements', path: '/employee/announcements', icon: Megaphone },
    { label: 'Company Policies', path: '/employee/policies', icon: ShieldCheck },
    { label: 'Holiday Calendar', path: '/employee/holidays', icon: Calendar },
    { label: 'Help & Support', path: '/employee/support', icon: HelpCircle },
    { label: 'Settings', path: '/employee/settings', icon: Settings },
  ];

  const navItems = role === 'HR_ADMIN' ? adminNavItems : employeeNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-30 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-50">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-brand-500 flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
          🐥
        </div>
        <div>
          <h1 className="font-black text-xl text-slate-800 tracking-tight leading-none">CanaryNest</h1>
          <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">
            {role === 'HR_ADMIN' ? 'HRM Admin Panel' : 'HRM Portal'}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
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
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {item.badge}
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
              src={userProfile?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={userProfile?.displayName}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{userProfile?.displayName || 'User'}</p>
              <p className="text-[10px] font-semibold text-slate-400 truncate uppercase">
                {role === 'HR_ADMIN' ? 'Super Admin' : 'Employee'}
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
