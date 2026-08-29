import React, { useState } from 'react';
import { ShieldCheck, Plus, FileText } from 'lucide-react';
import { Button, Card, Badge, DataTable } from '../../components/common/UIComponents';
import { localStore } from '../../services/db';
import { CompanyPolicy } from '../../types';

export const PoliciesPage: React.FC = () => {
  const [policies] = useState<CompanyPolicy[]>(localStore.policies);

  const columns = [
    {
      header: 'Policy Title',
      accessor: (p: CompanyPolicy) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{p.title}</p>
          <p className="text-[10px] text-slate-400 font-medium">{p.description}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: (p: CompanyPolicy) => <Badge variant="purple" size="sm">{p.category}</Badge>
    },
    {
      header: 'Version',
      accessor: (p: CompanyPolicy) => <span className="text-xs font-bold text-brand-600 bg-orange-50 px-2 py-0.5 rounded-full">{p.version}</span>
    },
    {
      header: 'Effective Date',
      accessor: (p: CompanyPolicy) => <span className="text-xs text-slate-500 font-medium">{p.effectiveDate}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Company Policies</h1>
          <p className="text-xs text-slate-400 font-medium">HR Policies, workplace regulations, and official handbooks.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add New Policy
        </Button>
      </div>

      <DataTable data={policies} columns={columns} keyExtractor={(p) => p.id} />

    </div>
  );
};
