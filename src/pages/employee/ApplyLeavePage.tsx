import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Send, Palmtree, HeartPulse, Star, Clock } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { useAuth } from '../../context/AuthContext';

export const ApplyLeavePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [leaveType, setLeaveType] = useState<'Casual Leave' | 'Sick Leave' | 'Privilege Leave' | 'Comp Off'>('Casual Leave');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const empId = userProfile?.employeeId || 'EMP00123';
    const empName = userProfile?.displayName || 'Rahul Patil';

    await dataService.applyLeave({
      employeeId: empId,
      employeeName: empName,
      leaveType,
      startDate,
      endDate,
      totalDays: 2,
      reason,
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/employee/leaves');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Apply for Leave</h1>
        <p className="text-xs text-slate-400 font-medium">Submit leave application to your manager and HR for approval.</p>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-bold text-xs">
          ✅ Leave application submitted successfully! Redirecting to My Leaves...
        </div>
      )}

      {/* Leave Balance Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
          <p className="text-[11px] font-bold text-emerald-700">Casual Leave</p>
          <h4 className="text-xl font-black text-emerald-800">6.0</h4>
        </div>
        <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl text-center">
          <p className="text-[11px] font-bold text-rose-700">Sick Leave</p>
          <h4 className="text-xl font-black text-rose-800">4.0</h4>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-center">
          <p className="text-[11px] font-bold text-blue-700">Privilege Leave</p>
          <h4 className="text-xl font-black text-blue-800">10.0</h4>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl text-center">
          <p className="text-[11px] font-bold text-amber-700">Comp Off</p>
          <h4 className="text-xl font-black text-amber-800">2.0</h4>
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
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">End Date</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Reason for Leave</label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State clear reason for your leave request..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
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
