import React, { useState, useEffect } from 'react';
import { Receipt, Plus, Upload } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { ExpenseClaim } from '../../types';

export const MyExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseClaim[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: 'Travel' as const,
    amount: 1200,
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    const unsub = dataService.getExpenses((allExp) => {
      const myExp = allExp.filter(e => e.employeeId === 'EMP00123' || e.employeeName?.includes('Rahul'));
      setExpenses(myExp);
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addExpense({
      employeeId: 'EMP00123',
      employeeName: 'Rahul Patil',
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
      description: formData.description,
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Category',
      accessor: (e: ExpenseClaim) => <span className="font-extrabold text-slate-800 text-xs">{e.category}</span>
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
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Expense Claims</h1>
          <p className="text-xs text-slate-400 font-medium">Submit travel, software, and business expenses for reimbursement.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Submit Expense Claim
        </Button>
      </div>

      <DataTable data={expenses} columns={columns} keyExtractor={(e) => e.id} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Expense Reimbursement Claim">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-semibold"
              >
                <option value="Travel">Travel</option>
                <option value="Meals">Meals</option>
                <option value="Software">Software</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Expense Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description & Purpose</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="State the purpose of this expense..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Claim</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
