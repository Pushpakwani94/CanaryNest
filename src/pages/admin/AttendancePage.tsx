import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import { Button, Card, Badge, SearchBar, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { AttendanceRecord, Employee } from '../../types';

export const AttendancePage: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkInTime: '09:00 AM',
    checkOutTime: '06:00 PM',
    status: 'Present' as const,
    notes: 'Admin manual entry',
  });

  useEffect(() => {
    const unsubAtt = dataService.getAttendance(setAttendance);
    const unsubEmp = dataService.getEmployees(setEmployees);
    return () => {
      if (typeof unsubAtt === 'function') unsubAtt();
      if (typeof unsubEmp === 'function') unsubEmp();
    };
  }, []);

  const filteredAttendance = attendance.filter((a) =>
    a.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    a.date.includes(search)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const empObj = employees.find(e => e.id === formData.employeeId);
    await dataService.checkIn(formData.employeeId, empObj ? `${empObj.firstName} ${empObj.lastName}` : 'Employee');
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Employee Name',
      accessor: (r: AttendanceRecord) => (
        <span className="font-extrabold text-slate-800 text-xs">{r.employeeName}</span>
      )
    },
    {
      header: 'Date',
      accessor: (r: AttendanceRecord) => <span className="text-xs font-semibold text-slate-600">{r.date}</span>
    },
    {
      header: 'Check-In',
      accessor: (r: AttendanceRecord) => <span className="text-xs text-emerald-600 font-bold">{r.checkInTime}</span>
    },
    {
      header: 'Check-Out',
      accessor: (r: AttendanceRecord) => <span className="text-xs text-rose-500 font-bold">{r.checkOutTime || '--:--'}</span>
    },
    {
      header: 'Work Hours',
      accessor: (r: AttendanceRecord) => <span className="text-xs text-slate-700 font-bold">{r.workHours ? `${r.workHours} hrs` : 'In Progress'}</span>
    },
    {
      header: 'Status',
      accessor: (r: AttendanceRecord) => (
        <Badge
          variant={
            r.status === 'Present' ? 'green' : 
            r.status === 'Late' ? 'yellow' : 
            r.status === 'WFH' ? 'purple' : 'red'
          }
          size="sm"
        >
          {r.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Attendance Logs</h1>
          <p className="text-xs text-slate-400 font-medium">Track daily employee check-ins, check-outs, WFH, and work hours.</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Manual Clock-In Entry
        </Button>
      </div>

      <Card className="flex items-center gap-4 p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by employee name or date (YYYY-MM-DD)..." />
      </Card>

      <DataTable
        data={filteredAttendance}
        columns={columns}
        keyExtractor={(r) => r.id}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Manual Attendance Entry"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Select Employee</label>
            <select
              required
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-semibold"
            >
              <option value="">Choose Employee</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.employeeCode})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-semibold"
              >
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="WFH">WFH</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Entry
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
