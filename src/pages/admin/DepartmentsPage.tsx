import React, { useState, useEffect } from 'react';
import { Building2, Plus, Users, UserCheck } from 'lucide-react';
import { Button, Card, Badge, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Department } from '../../types';

export const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    headName: '',
    description: '',
    employeeCount: 0,
    status: 'Active' as const,
  });

  useEffect(() => {
    const unsub = dataService.getDepartments(setDepartments);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addDepartment(formData);
    setIsAddModalOpen(false);
    setFormData({ name: '', code: '', headName: '', description: '', employeeCount: 0, status: 'Active' });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Departments</h1>
          <p className="text-xs text-slate-400 font-medium">Manage organizational departments and team leads.</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Department
        </Button>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => (
          <Card key={dept.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {dept.code}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base">{dept.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{dept.description}</p>
                  </div>
                </div>
                <Badge variant="green" size="sm">{dept.status}</Badge>
              </div>

              <div className="space-y-2 py-3 border-t border-slate-50 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400"><UserCheck className="w-3.5 h-3.5" /> Department Head</span>
                  <span className="font-bold text-slate-800">{dept.headName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400"><Users className="w-3.5 h-3.5" /> Active Members</span>
                  <span className="font-bold text-brand-600 bg-orange-50 px-2 py-0.5 rounded-full">{dept.employeeCount} Members</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Department"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Department Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Quality Assurance"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Department Code</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g. QA"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Department Head</label>
              <input
                type="text"
                required
                value={formData.headName}
                onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Department
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
