import React from 'react';
import { BarChart3, Download, FileSpreadsheet, Users, Calendar, Wallet } from 'lucide-react';
import { Button, Card } from '../../components/common/UIComponents';

export const ReportsPage: React.FC = () => {
  const reports = [
    { title: 'Monthly Attendance Summary Report', desc: 'Detailed log of employee present, absent, WFH and late statistics.', icon: Calendar, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Leave Utilization Report', desc: 'Breakdown of casual, sick, and privilege leaves taken by department.', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { title: 'Payroll & Tax Deductions Report', desc: 'Gross salary, PF, TDS, and Net salary payouts summary.', icon: Wallet, color: 'text-purple-600 bg-purple-50' },
    { title: 'Headcount & Turnover Analytics', desc: 'Joinees, resignations, and department allocation trends.', icon: Users, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Reports & Analytics</h1>
        <p className="text-xs text-slate-400 font-medium">Export custom HR reports in CSV / Excel / PDF format.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((r, idx) => {
          const IconComp = r.icon;
          return (
            <Card key={idx} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${r.color} shrink-0`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">{r.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4 pt-3 border-t border-slate-50">
                <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                  Export CSV / Excel
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
};
