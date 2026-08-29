import React, { useState } from 'react';
import { GraduationCap, Plus, BookOpen, CheckCircle } from 'lucide-react';
import { Button, Card, Badge, DataTable } from '../../components/common/UIComponents';
import { localStore } from '../../services/db';
import { TrainingCourse } from '../../types';

export const TrainingPage: React.FC = () => {
  const [courses] = useState<TrainingCourse[]>(localStore.training);

  const columns = [
    {
      header: 'Course Title',
      accessor: (t: TrainingCourse) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{t.title}</p>
          <p className="text-[10px] text-slate-400 font-medium">{t.description}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: (t: TrainingCourse) => <span className="text-xs font-semibold text-slate-700">{t.category}</span>
    },
    {
      header: 'Instructor',
      accessor: (t: TrainingCourse) => <span className="text-xs font-medium text-slate-600">{t.instructor}</span>
    },
    {
      header: 'Duration',
      accessor: (t: TrainingCourse) => <span className="text-xs font-bold text-brand-600 bg-orange-50 px-2 py-0.5 rounded-full">{t.duration}</span>
    },
    {
      header: 'Status',
      accessor: (t: TrainingCourse) => <Badge variant={t.status === 'Completed' ? 'green' : 'blue'} size="sm">{t.status}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Training & Development</h1>
          <p className="text-xs text-slate-400 font-medium">Create training programs and track employee course completion status.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Training Course
        </Button>
      </div>

      <DataTable data={courses} columns={columns} keyExtractor={(t) => t.id} />

    </div>
  );
};
