import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Card, Badge, DataTable } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Holiday } from '../../types';

export const HolidayCalendarPage: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const unsub = dataService.getHolidays(setHolidays);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

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
      accessor: (h: Holiday) => <span className="text-xs font-bold text-brand-600 bg-orange-50 px-2.5 py-1 rounded-full">{h.date}</span>
    },
    {
      header: 'Type',
      accessor: (h: Holiday) => <Badge variant="green" size="sm">{h.type}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Holiday Calendar 2025</h1>
        <p className="text-xs text-slate-400 font-medium">List of gazetted and restricted company holidays.</p>
      </div>

      <DataTable data={holidays} columns={columns} keyExtractor={(h) => h.id} />

    </div>
  );
};
