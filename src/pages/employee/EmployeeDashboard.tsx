import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Calendar, FileText, Download, Wallet, Award, 
  GraduationCap, Receipt, ArrowRight, CheckCircle2, 
  Palmtree, HeartPulse, Star, Compass, Phone, Mail, MapPin, 
  Sparkles, Megaphone
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button, Card, Badge } from '../../components/common/UIComponents';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/db';
import { AttendanceRecord, LeaveBalance, Payslip, Announcement, Holiday } from '../../types';

export const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [activeAttendanceId, setActiveAttendanceId] = useState<string | null>('att_1');
  const [checkInTimeStr, setCheckInTimeStr] = useState('09:02 AM');
  
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance | null>(null);
  const [latestPayslip, setLatestPayslip] = useState<Payslip | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const unsubAtt = dataService.getAttendance(setAttendanceLogs);
    const unsubAnc = dataService.getAnnouncements(setAnnouncements);
    const unsubHol = dataService.getHolidays(setHolidays);
    const unsubPs = dataService.getPayslips((list) => {
      if (list.length > 0) setLatestPayslip(list[0]);
    });

    return () => {
      if (typeof unsubAtt === 'function') unsubAtt();
      if (typeof unsubAnc === 'function') unsubAnc();
      if (typeof unsubHol === 'function') unsubHol();
      if (typeof unsubPs === 'function') unsubPs();
    };
  }, []);

  const handleToggleAttendance = async () => {
    const empId = userProfile?.employeeId || 'EMP00123';
    const empName = userProfile?.displayName || 'Rahul Patil';

    if (isCheckedIn && activeAttendanceId) {
      await dataService.checkOut(activeAttendanceId);
      setIsCheckedIn(false);
    } else {
      const rec = await dataService.checkIn(empId, empName);
      setActiveAttendanceId(rec.id);
      setCheckInTimeStr(rec.checkInTime);
      setIsCheckedIn(true);
    }
  };

  const attendanceRingData = [
    { name: 'Present', value: 20, color: '#10b981' },
    { name: 'Absent', value: 1, color: '#ef4444' },
    { name: 'Late', value: 1, color: '#f59e0b' },
    { name: 'WFH', value: 1, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">

      {/* Row 1: Profile Summary + Attendance Check-In + Leave Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1. Employee Profile Card */}
        <Card className="lg:col-span-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={userProfile?.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'}
              alt="Rahul Patil"
              className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-800 tracking-tight truncate">
                  {userProfile?.displayName || 'Rahul Patil'}
                </h3>
                <Badge variant="green" size="sm">Active</Badge>
              </div>
              <p className="text-xs font-bold text-brand-600">QA Engineer</p>
              <p className="text-[11px] text-slate-400 font-medium truncate">Quality Assurance Department</p>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Employee ID:</span>
              <span className="font-extrabold text-slate-800">EMP00123</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Email:</span>
              <span className="font-bold text-slate-700 truncate">{userProfile?.email || 'rahul.patil@canarynest.com'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Phone:</span>
              <span className="font-bold text-slate-700">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Joining Date:</span>
              <span className="font-bold text-slate-700">12 Jan 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Location:</span>
              <span className="font-bold text-slate-700">Pune, Maharashtra</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/employee/profile')}
          >
            View Full Profile
          </Button>
        </Card>

        {/* 2. Attendance Overview Ring & Live Clock Widget */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 text-base">Attendance Overview</h3>
            <button
              onClick={() => navigate('/employee/attendance')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View Calendar
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            {/* Donut Ring */}
            <div className="w-36 h-36 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceRingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={58}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {attendanceRingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-800">20</span>
                <span className="text-[10px] font-bold text-slate-400">/ 23 Days</span>
              </div>
            </div>

            {/* Legend Stats */}
            <div className="space-y-1.5 text-xs font-semibold pr-2">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present
                </span>
                <span className="font-bold text-slate-800">20</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Absent
                </span>
                <span className="font-bold text-slate-800">1</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Late
                </span>
                <span className="font-bold text-slate-800">1</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> WFH
                </span>
                <span className="font-bold text-slate-800">1</span>
              </div>
            </div>
          </div>

          {/* Interactive Check-In/Out Bar */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between mt-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Last Check-In</p>
              <p className="text-sm font-black text-slate-800">{checkInTimeStr}</p>
              <p className="text-[10px] text-slate-400 font-semibold">28 May 2025</p>
            </div>
            <Button
              variant={isCheckedIn ? 'primary' : 'success'}
              size="md"
              onClick={handleToggleAttendance}
              icon={<Clock className="w-4 h-4" />}
            >
              {isCheckedIn ? 'Check-Out →' : 'Check-In →'}
            </Button>
          </div>
        </Card>

        {/* 3. Leave Balance Cards */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 text-base">Leave Balance</h3>
            <button
              onClick={() => navigate('/employee/leaves')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-1">
                <Palmtree className="w-3.5 h-3.5" /> Casual Leave
              </div>
              <h4 className="text-2xl font-black text-emerald-800">6.0</h4>
              <p className="text-[10px] font-semibold text-emerald-600">Days Available</p>
            </div>

            <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-2xl">
              <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold mb-1">
                <HeartPulse className="w-3.5 h-3.5" /> Sick Leave
              </div>
              <h4 className="text-2xl font-black text-rose-800">4.0</h4>
              <p className="text-[10px] font-semibold text-rose-600">Days Available</p>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl">
              <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
                <Star className="w-3.5 h-3.5" /> Privilege Leave
              </div>
              <h4 className="text-2xl font-black text-blue-800">10.0</h4>
              <p className="text-[10px] font-semibold text-blue-600">Days Available</p>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-2xl">
              <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold mb-1">
                <Clock className="w-3.5 h-3.5" /> Comp Off
              </div>
              <h4 className="text-2xl font-black text-amber-800">2.0</h4>
              <p className="text-[10px] font-semibold text-amber-600">Days Available</p>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full"
            icon={<Calendar className="w-4 h-4" />}
            onClick={() => navigate('/employee/apply-leave')}
          >
            Apply Leave
          </Button>
        </Card>

      </div>

      {/* Row 2: Quick Access Shortcuts Bar */}
      <Card>
        <h3 className="font-bold text-slate-800 text-sm mb-3">Quick Access Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          <button
            onClick={() => navigate('/employee/apply-leave')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Calendar className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Apply Leave</span>
          </button>

          <button
            onClick={() => navigate('/employee/payslips')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Wallet className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">My Payslips</span>
          </button>

          <button
            onClick={() => navigate('/employee/documents')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <FileText className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">My Documents</span>
          </button>

          <button
            onClick={() => navigate('/employee/attendance')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Clock className="w-5 h-5 text-brand-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Attendance</span>
          </button>

          <button
            onClick={() => navigate('/employee/expenses')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Receipt className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Expenses</span>
          </button>

          <button
            onClick={() => navigate('/employee/training')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <GraduationCap className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Training</span>
          </button>

          <button
            onClick={() => navigate('/employee/performance')}
            className="p-3 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-slate-700 hover:text-brand-600 group"
          >
            <Award className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Performance</span>
          </button>
        </div>
      </Card>

      {/* Row 3: Payslip Card + Announcements + Holiday Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* My Latest Payslip */}
        <Card className="lg:col-span-4 flex flex-col justify-between bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-base">My Latest Payslip</h3>
              <Badge variant="green" size="sm">Paid</Badge>
            </div>

            <div className="space-y-1 my-4">
              <p className="text-xs font-bold text-slate-400 uppercase">May 2025 Net Salary</p>
              <h2 className="text-3xl font-black text-slate-800">
                ₹ {latestPayslip ? latestPayslip.netSalary.toLocaleString() : '58,650'}
              </h2>
              <p className="text-[11px] text-slate-400 font-semibold">Payment Date: 31 May 2025</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            icon={<Download className="w-4 h-4 text-brand-500" />}
            onClick={() => navigate('/employee/payslips')}
          >
            Download Payslip PDF
          </Button>
        </Card>

        {/* Company Announcements */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-base">Company Announcements</h3>
              <button
                onClick={() => navigate('/employee/announcements')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((anc) => (
                <div key={anc.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100/60">
                  <div className="flex items-center gap-1.5">
                    <Megaphone className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <h4 className="text-xs font-extrabold text-slate-800 truncate">{anc.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{anc.content}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Holidays */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-base">Upcoming Holidays</h3>
              <button
                onClick={() => navigate('/employee/holidays')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                View Calendar
              </button>
            </div>

            <div className="space-y-3">
              {holidays.slice(0, 3).map((hol) => (
                <div key={hol.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100/60">
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-1.5 bg-white rounded-lg shadow-xs">{hol.icon || '🗓️'}</span>
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">{hol.title}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{hol.dayOfWeek}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-600 bg-orange-50 px-2.5 py-1 rounded-full">{hol.date}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>

      {/* Motivational Quote Banner Footer */}
      <Card className="bg-gradient-to-r from-orange-500 via-brand-500 to-amber-500 text-white p-6 rounded-2xl relative overflow-hidden shadow-brand-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🚀</span>
            <div>
              <h3 className="text-lg font-black text-white">Together we grow, together we succeed!</h3>
              <p className="text-xs text-white/90 font-medium">
                Great things in business are never done by one person. They're done by a team of people.
              </p>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
};
