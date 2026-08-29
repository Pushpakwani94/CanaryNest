import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Play } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common/UIComponents';
import { localStore } from '../../services/db';

export const MyTrainingPage: React.FC = () => {
  const [courses] = useState(localStore.training);

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Training Courses</h1>
        <p className="text-xs text-slate-400 font-medium">Complete assigned professional development and compliance courses.</p>
      </div>

      <div className="space-y-4">
        {courses.map((c) => (
          <Card key={c.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-800 text-base">{c.title}</h3>
                <Badge variant={c.status === 'In Progress' ? 'blue' : 'green'} size="sm">{c.status}</Badge>
              </div>
              <p className="text-xs text-slate-500 font-medium">{c.description}</p>
              <div className="flex items-center gap-4 pt-1 text-[11px] font-semibold text-slate-400">
                <span>Instructor: {c.instructor}</span>
                <span>•</span>
                <span>Duration: {c.duration}</span>
              </div>
            </div>
            <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
              Continue Course
            </Button>
          </Card>
        ))}
      </div>

    </div>
  );
};
