import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { LeaveRequest } from '../../types';

export const LeaveManagementPage: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const unsub = dataService.getLeaves(setLeaves);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const filteredLeaves = leaves.filter((l) =>
    filterStatus === 'ALL' || l.status === filterStatus
  );

  const handleAction = async (status: 'Approved' | 'Rejected') => {
    if (selectedLeave) {
      await dataService.updateLeaveStatus(selectedLeave.id, status, comment, 'Admin User');
      setSelectedLeave(null);
      setComment('');
    }
  };

  const columns = [
    {
      header: 'Employee',
      accessor: (l: LeaveRequest) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{l.employeeName}</p>
          <p className="text-[10px] text-slate-400 font-medium">Applied on {l.appliedOn}</p>
        </div>
      )
    },
    {
      header: 'Leave Type',
      accessor: (l: LeaveRequest) => <span className="text-xs font-semibold text-slate-700">{l.leaveType}</span>
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
      header: 'Reason',
      accessor: (l: LeaveRequest) => <span className="text-xs text-slate-500 font-medium max-w-xs truncate block">{l.reason}</span>
    },
    {
      header: 'Status',
      accessor: (l: LeaveRequest) => (
        <Badge
          variant={
            l.status === 'Approved' ? 'green' : 
            l.status === 'Pending' ? 'orange' : 'red'
          }
          size="sm"
        >
          {l.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Leave Management</h1>
          <p className="text-xs text-slate-400 font-medium">Review and process employee leave applications.</p>
        </div>
      </div>

      <Card className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {['ALL', 'Pending', 'Approved', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st} Requests
            </button>
          ))}
        </div>
      </Card>

      <DataTable
        data={filteredLeaves}
        columns={columns}
        keyExtractor={(l) => l.id}
        actions={(l) => (
          l.status === 'Pending' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedLeave(l)}
            >
              Review
            </Button>
          ) : (
            <span className="text-xs text-slate-400 font-medium">{l.approvedBy ? `By ${l.approvedBy}` : '--'}</span>
          )
        )}
      />

      {/* Review Modal */}
      {selectedLeave && (
        <Modal
          isOpen={Boolean(selectedLeave)}
          onClose={() => setSelectedLeave(null)}
          title="Review Leave Application"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 text-xs">
              <p><span className="text-slate-400 font-semibold">Employee:</span> <span className="font-bold text-slate-800">{selectedLeave.employeeName}</span></p>
              <p><span className="text-slate-400 font-semibold">Leave Type:</span> <span className="font-bold text-slate-800">{selectedLeave.leaveType}</span></p>
              <p><span className="text-slate-400 font-semibold">Dates:</span> <span className="font-bold text-slate-800">{selectedLeave.startDate} to {selectedLeave.endDate} ({selectedLeave.totalDays} Days)</span></p>
              <p><span className="text-slate-400 font-semibold">Reason:</span> <span className="text-slate-700 italic">{selectedLeave.reason}</span></p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">HR Review Comments</label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Optional notes for employee..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="danger"
                icon={<XCircle className="w-4 h-4" />}
                onClick={() => handleAction('Rejected')}
              >
                Reject Request
              </Button>
              <Button
                variant="success"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => handleAction('Approved')}
              >
                Approve Leave
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
