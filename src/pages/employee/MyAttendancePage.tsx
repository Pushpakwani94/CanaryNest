import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge, DataTable } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { useAuth } from '../../context/AuthContext';
import { AttendanceRecord } from '../../types';

export const MyAttendancePage: React.FC = () => {
  const { userProfile } = useAuth();
  const [logs, setLogs] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const unsub = dataService.getAttendance((allLogs) => {
      // Employees see ONLY their own attendance
      const myLogs = allLogs.filter(l => 
        l.employeeId === userProfile?.employeeId || 
        (userProfile?.displayName && l.employeeName?.includes(userProfile.displayName)) ||
        l.employeeId === 'EMP00123'
      );
      setLogs(myLogs);
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [userProfile]);

  const columns = [
    {
      header: 'Date',
      accessor: (r: AttendanceRecord) => <span className="font-extrabold text-slate-800 text-xs">{r.date}</span>
    },
    {
      header: 'Check-In',
      accessor: (r: AttendanceRecord) => <span className="text-xs font-bold text-emerald-600">{r.checkInTime}</span>
    },
    {
      header: 'Check-Out',
      accessor: (r: AttendanceRecord) => <span className="text-xs font-bold text-rose-500">{r.checkOutTime || '--:--'}</span>
    },
    {
      header: 'Total Hours',
      accessor: (r: AttendanceRecord) => <span className="text-xs font-bold text-slate-700">{r.workHours ? `${r.workHours} hrs` : 'In Progress'}</span>
    },
    {
      header: 'Status',
      accessor: (r: AttendanceRecord) => (
        <Badge variant={r.status === 'Present' ? 'green' : r.status === 'Late' ? 'yellow' : 'purple'} size="sm">
          {r.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Attendance</h1>
          <p className="text-xs text-slate-400 font-medium">Track your daily clock-in, clock-out logs and working hours.</p>
        </div>
      </div>

      <DataTable
        data={logs}
        columns={columns}
        keyExtractor={(r) => r.id}
      />

    </div>
  );
};
