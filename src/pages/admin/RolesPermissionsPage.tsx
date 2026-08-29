import React from 'react';
import { ShieldCheck, UserCheck, Check, X } from 'lucide-react';
import { Card, Badge } from '../../components/common/UIComponents';

export const RolesPermissionsPage: React.FC = () => {
  const permissionsMatrix = [
    { feature: 'View Dashboard & Analytics', hrAdmin: true, employee: true },
    { header: 'Employee Directory & Management' },
    { feature: 'View All Employee Profiles', hrAdmin: true, employee: false },
    { feature: 'Create & Edit Employees', hrAdmin: true, employee: false },
    { feature: 'View Own Profile & Edit Contact Details', hrAdmin: true, employee: true },
    { header: 'Attendance & Leaves' },
    { feature: 'View Full Company Attendance Logs', hrAdmin: true, employee: false },
    { feature: 'Check-In / Check-Out Attendance', hrAdmin: true, employee: true },
    { feature: 'Approve or Reject Leave Requests', hrAdmin: true, employee: false },
    { feature: 'Apply For Leave', hrAdmin: true, employee: true },
    { header: 'Payroll & Expenses' },
    { feature: 'Process Monthly Company Payroll', hrAdmin: true, employee: false },
    { feature: 'Download Own Payslips', hrAdmin: true, employee: true },
    { feature: 'Approve Expense Reimbursements', hrAdmin: true, employee: false },
    { feature: 'Submit Expense Claims', hrAdmin: true, employee: true },
    { header: 'Administration & System Settings' },
    { feature: 'Create Broadcast Announcements', hrAdmin: true, employee: false },
    { feature: 'Manage HR Policies & Holiday Calendar', hrAdmin: true, employee: false },
    { feature: 'View Security Audit Logs', hrAdmin: true, employee: false },
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Roles & Permissions Matrix</h1>
        <p className="text-xs text-slate-400 font-medium">Access Control Matrix for HR_ADMIN and EMPLOYEE roles.</p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Feature / Module Access</th>
                <th className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 text-brand-600 bg-orange-50 px-3 py-1 rounded-full font-bold">
                    <ShieldCheck className="w-4 h-4" /> HR_ADMIN
                  </div>
                </th>
                <th className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-bold">
                    <UserCheck className="w-4 h-4" /> EMPLOYEE
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {permissionsMatrix.map((row, idx) => {
                if (row.header) {
                  return (
                    <tr key={idx} className="bg-slate-50/70 font-extrabold text-slate-800">
                      <td colSpan={3} className="px-6 py-2.5 uppercase tracking-wider text-[11px] text-slate-500">
                        {row.header}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 font-bold text-slate-800">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      {row.hrAdmin ? (
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 inline-flex items-center justify-center font-bold">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 inline-flex items-center justify-center font-bold">
                          <X className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      {row.employee ? (
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 inline-flex items-center justify-center font-bold">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 inline-flex items-center justify-center font-bold">
                          <X className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
