import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Send, Palmtree, HeartPulse, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common/UIComponents';
import { dataService, localStore } from '../../services/db';
import { useAuth } from '../../context/AuthContext';
import { LeaveBalance } from '../../types';

export const ApplyLeavePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [leaveType, setLeaveType] = useState<'Casual Leave' | 'Sick Leave' | 'Privilege Leave' | 'Comp Off'>('Casual Leave');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [balance, setBalance] = useState<LeaveBalance | null>(null);

  useEffect(() => {
    const empId = userProfile?.employeeId || 'EMP00123';
    const found = localStore.leaveBalances.find(b => b.employeeId === empId) || localStore.leaveBalances[0];
    if (found) setBalance(found);
  }, [userProfile]);

  const calcTotalDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const totalDays = calcTotalDays();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const empId = userProfile?.employeeId || 'EMP00123';
    const empName = userProfile?.displayName || 'Employee';

    await dataService.applyLeave({
      employeeId: empId,
      employeeName: empName,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/employee/leaves');
    }, 1500);
  };

  const clAvail = balance?.casualLeave?.available ?? 6.0;
  const slAvail = balance?.sickLeave?.available ?? 4.0;
  const plAvail = balance?.privilegeLeave?.available ?? 10.0;
  const coAvail = balance?.compOff?.available ?? 2.0;

  return (
    <div className="space-y-6 max-w-3xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Apply for Leave</h1>
        <p className="text-xs text-slate-400 font-medium">Submit leave application to your manager and HR for approval.</p>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          🎉 Leave application submitted successfully! Redirecting to My Leave History...
        </div>
      )}

      {/* Leave Balance Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-3 border rounded-2xl text-center transition-all ${leaveType === 'Casual Leave' ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300' : 'bg-emerald-50/60 border-emerald-100'}`}>
          <p className="text-[11px] font-bold text-emerald-700">Casual Leave</p>
          <h4 className="text-xl font-black text-emerald-800">{clAvail.toFixed(1)}</h4>
          <span className="text-[10px] text-emerald-600 font-semibold">Days Available</span>
        </div>
        <div className={`p-3 border rounded-2xl text-center transition-all ${leaveType === 'Sick Leave' ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300' : 'bg-rose-50/60 border-rose-100'}`}>
          <p className="text-[11px] font-bold text-rose-700">Sick Leave</p>
          <h4 className="text-xl font-black text-rose-800">{slAvail.toFixed(1)}</h4>
          <span className="text-[10px] text-rose-600 font-semibold">Days Available</span>
        </div>
        <div className={`p-3 border rounded-2xl text-center transition-all ${leaveType === 'Privilege Leave' ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-300' : 'bg-blue-50/60 border-blue-100'}`}>
          <p className="text-[11px] font-bold text-blue-700">Privilege Leave</p>
          <h4 className="text-xl font-black text-blue-800">{plAvail.toFixed(1)}</h4>
          <span className="text-[10px] text-blue-600 font-semibold">Days Available</span>
        </div>
        <div className={`p-3 border rounded-2xl text-center transition-all ${leaveType === 'Comp Off' ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300' : 'bg-amber-50/60 border-amber-100'}`}>
          <p className="text-[11px] font-bold text-amber-700">Comp Off</p>
          <h4 className="text-xl font-black text-amber-800">{coAvail.toFixed(1)}</h4>
          <span className="text-[10px] text-amber-600 font-semibold">Days Available</span>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Select Leave Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { type: 'Casual Leave', icon: Palmtree, color: 'text-emerald-600 bg-emerald-50' },
                { type: 'Sick Leave', icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
                { type: 'Privilege Leave', icon: Star, color: 'text-blue-600 bg-blue-50' },
                { type: 'Comp Off', icon: Clock, color: 'text-amber-600 bg-amber-50' },
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = leaveType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setLeaveType(item.type as any)}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                      isSelected
                        ? 'border-brand-500 bg-orange-50/60 text-brand-700 shadow-sm ring-2 ring-brand-400'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                    <span>{item.type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">End Date</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium text-slate-800"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
            <span className="font-bold text-slate-600">Calculated Leave Duration:</span>
            <span className="font-black text-brand-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-brand-200">
              {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Reason for Leave</label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State clear reason for your leave request..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium text-slate-800"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => navigate('/employee/leaves')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={<Send className="w-4 h-4" />}>
              Submit Application
            </Button>
          </div>
        </form>
      </Card>

    </div>
  );
};
