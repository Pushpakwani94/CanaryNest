import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import { Button, Card, Badge, DataTable } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { LeaveRequest } from '../../types';
import { useNavigate } from 'react-router-dom';

export const MyLeavesPage: React.FC = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const unsub = dataService.getLeaves((allLeaves) => {
      // Filter for employee's own requests
      const myLeaves = allLeaves.filter(l => l.employeeId === 'EMP00123' || l.employeeName.includes('Rahul'));
      setLeaves(myLeaves);
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const columns = [
    {
      header: 'Leave Type',
      accessor: (l: LeaveRequest) => <span className="font-extrabold text-slate-800 text-xs">{l.leaveType}</span>
    },
    {
      header: 'Duration',
      accessor: (l: LeaveRequest) => (
        <span className="text-xs font-medium text-slate-600">
          {l.startDate} to {l.endDate} ({l.totalDays} Days)
        </span>
      )
    },
    {
      header: 'Applied On',
      accessor: (l: LeaveRequest) => <span className="text-xs text-slate-500 font-medium">{l.appliedOn}</span>
    },
    {
      header: 'Reason',
      accessor: (l: LeaveRequest) => <span className="text-xs text-slate-500 font-medium max-w-xs truncate block">{l.reason}</span>
    },
    {
      header: 'Status',
      accessor: (l: LeaveRequest) => (
        <Badge variant={l.status === 'Approved' ? 'green' : l.status === 'Pending' ? 'orange' : 'red'} size="sm">
          {l.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Leaves</h1>
          <p className="text-xs text-slate-400 font-medium">Track your historical leave applications and approval statuses.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => navigate('/employee/apply-leave')}>
          Apply Leave
        </Button>
      </div>

      <DataTable data={leaves} columns={columns} keyExtractor={(l) => l.id} />

    </div>
  );
};
