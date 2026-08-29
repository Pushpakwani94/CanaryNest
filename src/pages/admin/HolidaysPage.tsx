import React, { useState, useEffect } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button, Card, Badge, Modal, DataTable } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Holiday } from '../../types';

export const HolidaysPage: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    dayOfWeek: 'Friday',
    type: 'Gazetted' as const,
    icon: '🎉',
  });

  useEffect(() => {
    const unsub = dataService.getHolidays(setHolidays);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addHoliday(formData);
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Holiday Name',
      accessor: (h: Holiday) => (
        <div className="flex items-center gap-3">
          <span className="text-xl p-2 bg-orange-50 rounded-xl">{h.icon || '🗓️'}</span>
          <div>
            <p className="font-extrabold text-slate-800 text-xs">{h.title}</p>
            <p className="text-[10px] text-slate-400 font-medium">{h.dayOfWeek}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Date',
      accessor: (h: Holiday) => <span className="text-xs font-bold text-slate-700">{h.date}</span>
    },
    {
      header: 'Type',
      accessor: (h: Holiday) => <Badge variant="green" size="sm">{h.type}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Holiday Calendar</h1>
          <p className="text-xs text-slate-400 font-medium">Configure company holiday schedules for the calendar year.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Add Holiday
        </Button>
      </div>

      <DataTable data={holidays} columns={columns} keyExtractor={(h) => h.id} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Company Holiday">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Holiday Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Diwali Laxmi Pujan"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Date</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g. 20 Oct 2025"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Day of Week</label>
              <input
                type="text"
                value={formData.dayOfWeek}
                onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                placeholder="e.g. Monday"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Holiday</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
