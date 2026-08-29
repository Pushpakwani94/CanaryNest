import React, { useState } from 'react';
import { Award, Star, CheckCircle2 } from 'lucide-react';
import { Card, Badge } from '../../components/common/UIComponents';
import { localStore } from '../../services/db';

export const MyPerformancePage: React.FC = () => {
  const reviews = localStore.performance.filter(p => p.employeeId === 'EMP00123' || p.employeeName.includes('Rahul'));

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Performance & Goals</h1>
        <p className="text-xs text-slate-400 font-medium">Review your self-appraisals, manager feedback, and assigned quarterly KPIs.</p>
      </div>

      {reviews.map((rev) => (
        <Card key={rev.id} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">{rev.cycle}</h3>
              <p className="text-xs text-slate-400 font-medium">Updated: {rev.updatedLast}</p>
            </div>
            <Badge variant="green">{rev.status}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl">
              <p className="text-xs font-bold text-amber-700">Self Rating</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-black text-amber-800">{rev.selfRating} / 5</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
              <p className="text-xs font-bold text-emerald-700">Manager Evaluation</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Star className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                <span className="text-2xl font-black text-emerald-800">{rev.managerRating || 5} / 5</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">Key Objectives & KPIs</h4>
            <div className="space-y-2">
              {rev.kpis.map((kpi, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="font-bold text-slate-800">{kpi.title}</span>
                  <Badge variant="green" size="sm">{kpi.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {rev.feedback && (
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs">
              <p className="font-bold text-blue-800">Manager Feedback:</p>
              <p className="text-blue-700 mt-0.5 leading-relaxed">{rev.feedback}</p>
            </div>
          )}
        </Card>
      ))}

    </div>
  );
};
