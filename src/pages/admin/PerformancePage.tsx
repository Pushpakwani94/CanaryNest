import React, { useState } from 'react';
import { Award, Plus, Star, CheckCircle } from 'lucide-react';
import { Button, Card, Badge, DataTable } from '../../components/common/UIComponents';
import { localStore } from '../../services/db';
import { PerformanceReview } from '../../types';

export const PerformancePage: React.FC = () => {
  const [reviews] = useState<PerformanceReview[]>(localStore.performance);

  const columns = [
    {
      header: 'Employee Name',
      accessor: (p: PerformanceReview) => (
        <span className="font-extrabold text-slate-800 text-xs">{p.employeeName}</span>
      )
    },
    {
      header: 'Appraisal Cycle',
      accessor: (p: PerformanceReview) => <span className="text-xs font-semibold text-slate-700">{p.cycle}</span>
    },
    {
      header: 'Self Rating',
      accessor: (p: PerformanceReview) => (
        <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {p.selfRating} / 5
        </span>
      )
    },
    {
      header: 'Manager Rating',
      accessor: (p: PerformanceReview) => (
        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" /> {p.managerRating || 'Pending'} {p.managerRating ? '/ 5' : ''}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (p: PerformanceReview) => <Badge variant="green" size="sm">{p.status}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Performance & Appraisals</h1>
          <p className="text-xs text-slate-400 font-medium">Manage performance review cycles, KPIs, and manager evaluation ratings.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Start Review Cycle
        </Button>
      </div>

      <DataTable data={reviews} columns={columns} keyExtractor={(p) => p.id} />

    </div>
  );
};
