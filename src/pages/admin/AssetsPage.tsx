import React, { useState, useEffect } from 'react';
import { HardDrive, Plus } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { CompanyAsset } from '../../types';

export const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<CompanyAsset[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    assetCode: '',
    name: '',
    category: 'Laptop' as const,
    serialNumber: '',
    status: 'Available' as const,
  });

  useEffect(() => {
    const unsub = dataService.getAssets(setAssets);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addAsset(formData);
    setIsAddModalOpen(false);
  };

  const columns = [
    {
      header: 'Asset Code & Name',
      accessor: (a: CompanyAsset) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{a.name}</p>
          <p className="text-[10px] text-slate-400 font-medium">{a.assetCode} • SN: {a.serialNumber}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: (a: CompanyAsset) => <span className="text-xs font-semibold text-slate-700">{a.category}</span>
    },
    {
      header: 'Assigned To',
      accessor: (a: CompanyAsset) => (
        <span className="text-xs font-semibold text-slate-800">
          {a.assignedToEmployeeName || 'Unassigned (Available)'}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (a: CompanyAsset) => (
        <Badge variant={a.status === 'Allocated' ? 'green' : a.status === 'Available' ? 'blue' : 'yellow'} size="sm">
          {a.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Company Assets</h1>
          <p className="text-xs text-slate-400 font-medium">Track laptops, monitors, mobile devices, and hardware allocations.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Add New Asset
        </Button>
      </div>

      <DataTable data={assets} columns={columns} keyExtractor={(a) => a.id} />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Asset">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Asset Code</label>
              <input
                type="text"
                required
                value={formData.assetCode}
                onChange={(e) => setFormData({ ...formData, assetCode: e.target.value })}
                placeholder="e.g. AST-LAP-009"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Asset Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. MacBook Air M2 15''"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-semibold"
              >
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Mobile">Mobile</option>
                <option value="Peripheral">Peripheral</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Serial Number</label>
              <input
                type="text"
                required
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                placeholder="e.g. C02G123456"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Asset</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
