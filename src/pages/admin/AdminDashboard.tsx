import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, CalendarCheck, Clock, UserPlus, Wallet, 
  ArrowUpRight, ChevronRight, CheckCircle2, AlertCircle, 
  FileText, ShieldCheck, Megaphone, Plus, FileSpreadsheet,
  Settings as SettingsIcon, Database
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { StatCard, Card, Badge, Button } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Employee, LeaveRequest, ExpenseClaim } from '../../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [expenses, setExpenses] = useState<ExpenseClaim[]>([]);

  useEffect(() => {
    const unsubEmp = dataService.getEmployees(setEmployees);
    const unsubLve = dataService.getLeaves(setLeaves);
    const unsubExp = dataService.getExpenses(setExpenses);
    return () => {
      if (typeof unsubEmp === 'function') unsubEmp();
      if (typeof unsubLve === 'function') unsubLve();
      if (typeof unsubExp === 'function') unsubExp();
    };
  }, []);

  const pendingLeaves = leaves.filter(l => l.status === 'Pending');
  const pendingExpenses = expenses.filter(e => e.status === 'Pending');

  // Spline chart attendance data
  const attendanceTrendData = [
    { date: '01 May', Present: 160, Absent: 18, OnLeave: 30 },
    { date: '08 May', Present: 180, Absent: 15, OnLeave: 25 },
    { date: '15 May', Present: 175, Absent: 20, OnLeave: 32 },
    { date: '22 May', Present: 195, Absent: 12, OnLeave: 22 },
    { date: '28 May', Present: 186, Absent: 14, OnLeave: 28 },
  ];

  // Employee status pie chart data
  const statusPieData = [
    { name: 'Active', value: 200, color: '#10b981' },
    { name: 'Probation', value: 25, color: '#3b82f6' },
    { name: 'On Leave', value: 18, color: '#f59e0b' },
    { name: 'Inactive', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top 5 Stat KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Employees"
          value={employees.length > 0 ? employees.length : 248}
          trend="+12 this month"
          trendUp={true}
          icon={<Users className="w-5 h-5 text-orange-600" />}
          iconBgColor="bg-orange-50 text-orange-600"
        />
        <StatCard
          title="Present Today"
          value="186"
          subtitle="75% of total"
          icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="On Leave Today"
          value="28"
          subtitle="11% of total"
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="New Joinees"
          value="15"
          trend="+5 this month"
          trendUp={true}
          icon={<UserPlus className="w-5 h-5 text-purple-600" />}
          iconBgColor="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Total Payroll (May)"
          value="₹ 48,75,000"
          subtitle="Processed"
          icon={<Wallet className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Row 2: Charts and Leave Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Attendance Overview Area Chart */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Attendance Overview</h3>
              <p className="text-xs text-slate-400 font-medium">May 2025 Daily Trends</p>
            </div>
            <button 
              onClick={() => navigate('/admin/attendance')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View Report <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="Present" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" />
                <Area type="monotone" dataKey="Absent" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAbsent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2 pt-2 border-t border-slate-50 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"/> Present</span>
            <span className="flex items-center gap-1.5 text-rose-500"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"/> Absent</span>
            <span className="flex items-center gap-1.5 text-amber-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"/> On Leave</span>
          </div>
        </Card>

        {/* Employee Status Donut Chart */}
        <Card className="lg:col-span-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 text-base">Employee Status</h3>
            <button 
              onClick={() => navigate('/admin/employees')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View All
            </button>
          </div>
          <div className="h-52 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-slate-800">248</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="space-y-1.5 text-xs font-semibold pt-2 border-t border-slate-50">
            {statusPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="text-slate-800 font-bold">{item.value} ({Math.round((item.value/248)*100)}%)</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Leave Summary Card */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-base">Leave Summary</h3>
            <button 
              onClick={() => navigate('/admin/leaves')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-center">
              <p className="text-xs font-bold text-emerald-700">Casual Leave</p>
              <h4 className="text-2xl font-extrabold text-emerald-800 mt-1">126</h4>
              <p className="text-[10px] font-semibold text-emerald-600">Available</p>
            </div>
            <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl text-center">
              <p className="text-xs font-bold text-rose-700">Sick Leave</p>
              <h4 className="text-2xl font-extrabold text-rose-800 mt-1">84</h4>
              <p className="text-[10px] font-semibold text-rose-600">Available</p>
            </div>
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl text-center">
              <p className="text-xs font-bold text-blue-700">Privilege Leave</p>
              <h4 className="text-2xl font-extrabold text-blue-800 mt-1">96</h4>
              <p className="text-[10px] font-semibold text-blue-600">Available</p>
            </div>
            <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-2xl text-center">
              <p className="text-xs font-bold text-amber-700">Comp Off</p>
              <h4 className="text-2xl font-extrabold text-amber-800 mt-1">45</h4>
              <p className="text-[10px] font-semibold text-amber-600">Available</p>
            </div>
          </div>
          <Button 
            variant="primary" 
            className="w-full"
            onClick={() => navigate('/admin/leaves')}
          >
            Manage Leaves
          </Button>
        </Card>

      </div>

      {/* Row 3: Recent Employees + Pending Approvals + Last 7 Days Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Employees Table */}
        <Card className="lg:col-span-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-base">Recent Employees</h3>
            <button 
              onClick={() => navigate('/admin/employees')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {employees.slice(0, 5).map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100/60">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                    alt={emp.firstName}
                    className="w-9 h-9 rounded-full object-cover border border-white shadow-sm"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">{emp.firstName} {emp.lastName}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{emp.designation} • {emp.departmentName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={emp.status === 'Active' ? 'green' : 'orange'} size="sm">
                    {emp.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{emp.joiningDate}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base">Pending Approvals</h3>
              <button 
                onClick={() => navigate('/admin/leaves')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500 text-white">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Leave Requests</p>
                    <p className="text-[11px] text-slate-500 font-medium">Requires your approval</p>
                  </div>
                </div>
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                  {pendingLeaves.length > 0 ? pendingLeaves.length : 7}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500 text-white">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Expense Claims</p>
                    <p className="text-[11px] text-slate-500 font-medium">Requires your approval</p>
                  </div>
                </div>
                <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-extrabold text-xs flex items-center justify-center">
                  {pendingExpenses.length > 0 ? pendingExpenses.length : 5}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Document Requests</p>
                    <p className="text-[11px] text-slate-500 font-medium">Requires your approval</p>
                  </div>
                </div>
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/admin/leaves')}
          >
            Review All
          </Button>
        </Card>

        {/* Last 7 Days Activity */}
        <Card className="lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base">Last 7 Days Activity</h3>
            </div>
            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  🎯
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-700">Rohan Mehta marked attendance</p>
                  <p className="text-[10px] font-semibold text-slate-400">Today, 09:15 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  📝
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-700">Priya Sharma applied for leave</p>
                  <p className="text-[10px] font-semibold text-slate-400">Today, 08:45 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  💳
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-700">Payroll for May 2025 processed</p>
                  <p className="text-[10px] font-semibold text-slate-400">Yesterday, 06:30 PM</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/logs')}
            className="w-full text-center py-2 text-xs font-bold text-brand-600 hover:text-brand-700 border border-brand-200 rounded-xl mt-4 transition-colors"
          >
            View All Activity
          </button>
        </Card>

      </div>

      {/* Row 4: Quick Access Bar */}
      <Card>
        <h3 className="font-bold text-slate-800 text-sm mb-3">Quick Access Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          <button 
            onClick={() => navigate('/admin/employees')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <UserPlus className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">Add Employee</span>
          </button>

          <button 
            onClick={() => navigate('/admin/departments')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Plus className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">Add Department</span>
          </button>

          <button 
            onClick={() => navigate('/admin/attendance')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Clock className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">Mark Attendance</span>
          </button>

          <button 
            onClick={() => navigate('/admin/announcements')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Megaphone className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">Announcement</span>
          </button>

          <button 
            onClick={() => navigate('/admin/reports')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <FileSpreadsheet className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">Generate Report</span>
          </button>

          <button 
            onClick={() => navigate('/admin/settings')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Database className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">Backup Data</span>
          </button>

          <button 
            onClick={() => navigate('/admin/settings')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <SettingsIcon className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs font-bold">System Settings</span>
          </button>
        </div>
      </Card>

    </div>
  );
};
