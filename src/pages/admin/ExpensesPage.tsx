import React, { useState, useEffect } from 'react';
import { Receipt, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button, Card, Badge, DataTable } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { ExpenseClaim } from '../../types';

export const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseClaim[]>([]);

  useEffect(() => {
    const unsub = dataService.getExpenses(setExpenses);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleUpdate = async (id: string, status: 'Approved' | 'Rejected') => {
    await dataService.updateExpenseStatus(id, status, 'Admin User');
  };

  const columns = [
    {
      header: 'Employee Name',
      accessor: (e: ExpenseClaim) => (
        <span className="font-extrabold text-slate-800 text-xs">{e.employeeName}</span>
      )
    },
    {
      header: 'Expense Category',
      accessor: (e: ExpenseClaim) => <span className="text-xs font-semibold text-slate-700">{e.category}</span>
    },
    {
      header: 'Date',
      accessor: (e: ExpenseClaim) => <span className="text-xs text-slate-500 font-medium">{e.date}</span>
    },
    {
      header: 'Amount (₹)',
      accessor: (e: ExpenseClaim) => <span className="text-xs font-black text-slate-800">₹ {e.amount.toLocaleString()}</span>
    },
    {
      header: 'Description',
      accessor: (e: ExpenseClaim) => <span className="text-xs text-slate-500 font-medium max-w-xs truncate block">{e.description}</span>
    },
    {
      header: 'Status',
      accessor: (e: ExpenseClaim) => (
        <Badge variant={e.status === 'Approved' ? 'green' : e.status === 'Pending' ? 'orange' : 'red'} size="sm">
          {e.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Expense Management</h1>
          <p className="text-xs text-slate-400 font-medium">Review and approve employee business expense reimbursement claims.</p>
        </div>
      </div>

      <DataTable
        data={expenses}
        columns={columns}
        keyExtractor={(e) => e.id}
        actions={(e) => (
          e.status === 'Pending' ? (
            <div className="flex items-center gap-2 justify-end">
              <Button variant="danger" size="sm" onClick={() => handleUpdate(e.id, 'Rejected')}>
                Reject
              </Button>
              <Button variant="success" size="sm" onClick={() => handleUpdate(e.id, 'Approved')}>
                Approve
              </Button>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium">{e.approvedBy ? `By ${e.approvedBy}` : '--'}</span>
          )
        )}
      />

    </div>
  );
};
