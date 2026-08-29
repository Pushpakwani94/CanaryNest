import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Search, Filter, Edit, Trash2, Eye, Mail, 
  Phone, Building2, Calendar, MapPin, CheckCircle, XCircle 
} from 'lucide-react';
import { 
  Button, Card, Badge, SearchBar, Modal, DataTable, ConfirmDialog 
} from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Employee, Department } from '../../types';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    departmentId: '',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: 650000,
    location: 'Mumbai, Maharashtra',
    status: 'Active' as const,
    initialPassword: 'Canary@123',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });

  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; pass: string } | null>(null);

  useEffect(() => {
    const unsubEmp = dataService.getEmployees(setEmployees);
    const unsubDept = dataService.getDepartments(setDepartments);
    return () => {
      if (typeof unsubEmp === 'function') unsubEmp();
      if (typeof unsubDept === 'function') unsubDept();
    };
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(search.toLowerCase());
    
    const matchesDept = selectedDept === 'ALL' || emp.departmentId === selectedDept;
    const matchesStatus = selectedStatus === 'ALL' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find(d => d.id === formData.departmentId);
    const generatedCode = 'EMP' + Math.floor(100 + Math.random() * 900);
    const created = await dataService.addEmployee({
      ...formData,
      employeeCode: generatedCode,
      departmentName: deptObj ? deptObj.name : 'General',
    });
    setCreatedCredentials({
      email: created.email,
      pass: created.initialPassword || 'Canary@123',
    });
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      await dataService.deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      designation: '',
      departmentId: '',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: 650000,
      location: 'Mumbai, Maharashtra',
      status: 'Active',
      initialPassword: 'Canary@123',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
  };

  const columns = [
    {
      header: 'Employee Name',
      accessor: (emp: Employee) => (
        <div className="flex items-center gap-3">
          <img
            src={emp.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
            alt={emp.firstName}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div>
            <p className="font-extrabold text-slate-800 text-xs">{emp.firstName} {emp.lastName}</p>
            <p className="text-[11px] text-slate-400 font-medium">{emp.employeeCode} • {emp.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      accessor: (emp: Employee) => <span className="text-xs font-semibold text-slate-700">{emp.departmentName}</span>
    },
    {
      header: 'Designation',
      accessor: (emp: Employee) => <span className="text-xs text-slate-600 font-medium">{emp.designation}</span>
    },
    {
      header: 'Joining Date',
      accessor: (emp: Employee) => <span className="text-xs text-slate-500 font-medium">{emp.joiningDate}</span>
    },
    {
      header: 'Status',
      accessor: (emp: Employee) => (
        <Badge 
          variant={
            emp.status === 'Active' ? 'green' : 
            emp.status === 'Probation' ? 'blue' : 
            emp.status === 'On Leave' ? 'orange' : 'red'
          }
          size="sm"
        >
          {emp.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Employees Directory</h1>
          <p className="text-xs text-slate-400 font-medium">Manage and view all {employees.length} employees in the organization.</p>
        </div>
        <Button
          variant="primary"
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Employee
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="flex flex-col md:flex-row items-center gap-4 p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, code, email..." />
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 text-slate-700"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 text-slate-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Probation">Probation</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </Card>

      {/* Data Table */}
      <DataTable
        data={filteredEmployees}
        columns={columns}
        keyExtractor={(item) => item.id}
        actions={(emp) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => {
                setSelectedEmployee(emp);
                setIsViewModalOpen(true);
              }}
              title="View Profile"
              className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setEmployeeToDelete(emp)}
              title="Delete Record"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Designation</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Department</label>
              <select
                required
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-semibold"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Annual CTC (₹)</label>
              <input
                type="number"
                required
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Initial Password for Login</label>
            <input
              type="text"
              required
              value={formData.initialPassword}
              onChange={(e) => setFormData({ ...formData, initialPassword: e.target.value })}
              placeholder="e.g. Canary@123"
              className="w-full px-3 py-2 text-xs bg-orange-50 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-bold text-brand-700"
            />
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Employee will use this initial password to log in for the first time.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Employee
            </Button>
          </div>
        </form>
      </Modal>

      {/* Created Credentials Success Modal Banner */}
      {createdCredentials && (
        <Modal
          isOpen={Boolean(createdCredentials)}
          onClose={() => setCreatedCredentials(null)}
          title="🎉 Employee Account Created!"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 font-medium">
              The employee record and login account have been successfully created with the following credentials:
            </p>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl space-y-2 text-xs">
              <p><span className="text-slate-400 font-semibold uppercase">Login Email:</span> <span className="font-extrabold text-slate-800">{createdCredentials.email}</span></p>
              <p><span className="text-slate-400 font-semibold uppercase">Initial Password:</span> <span className="font-extrabold text-brand-600">{createdCredentials.pass}</span></p>
              <p><span className="text-slate-400 font-semibold uppercase">Role Access:</span> <span className="font-extrabold text-emerald-600">EMPLOYEE PORTAL</span></p>
            </div>

            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setCreatedCredentials(null)}>
                Got It
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Employee Detail Modal */}
      {selectedEmployee && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Employee Profile Details"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <img
                src={selectedEmployee.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                alt={selectedEmployee.firstName}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <h3 className="text-lg font-black text-slate-800">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                <p className="text-xs font-bold text-brand-600">{selectedEmployee.designation}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="green" size="sm">{selectedEmployee.departmentName}</Badge>
                  <span className="text-[10px] font-bold text-slate-400">ID: {selectedEmployee.employeeCode}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Email</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedEmployee.email}</p>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Phone</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedEmployee.phone}</p>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Joining Date</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedEmployee.joiningDate}</p>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Annual Salary</span>
                <p className="font-bold text-slate-800 mt-0.5">₹ {selectedEmployee.salary.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee Record"
        message={`Are you sure you want to delete ${employeeToDelete?.firstName} ${employeeToDelete?.lastName}? This action cannot be undone.`}
      />

    </div>
  );
};
