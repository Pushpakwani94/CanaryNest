import React, { useState, useEffect } from 'react';
import { Wallet, Printer, Download, FileText } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Payslip } from '../../types';

export const MyPayslipsPage: React.FC = () => {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  useEffect(() => {
    const unsub = dataService.getPayslips((allPayslips) => {
      const myPayslips = allPayslips.filter(p => p.employeeId === 'EMP00123' || p.employeeName.includes('Rahul'));
      setPayslips(myPayslips);
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    {
      header: 'Month & Year',
      accessor: (p: Payslip) => <span className="font-extrabold text-slate-800 text-xs">{p.monthYear}</span>
    },
    {
      header: 'Net Salary (₹)',
      accessor: (p: Payslip) => <span className="text-xs font-black text-emerald-600">₹ {p.netSalary.toLocaleString()}</span>
    },
    {
      header: 'Payment Date',
      accessor: (p: Payslip) => <span className="text-xs text-slate-500 font-medium">{p.paymentDate}</span>
    },
    {
      header: 'Status',
      accessor: (p: Payslip) => <Badge variant="green" size="sm">{p.status}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Payslips</h1>
        <p className="text-xs text-slate-400 font-medium">View and download your monthly salary slips and earnings statements.</p>
      </div>

      <DataTable
        data={payslips}
        columns={columns}
        keyExtractor={(p) => p.id}
        actions={(p) => (
          <Button variant="outline" size="sm" icon={<FileText className="w-3.5 h-3.5" />} onClick={() => setSelectedPayslip(p)}>
            View & Print Payslip
          </Button>
        )}
      />

      {/* Printable Payslip Modal */}
      {selectedPayslip && (
        <Modal
          isOpen={Boolean(selectedPayslip)}
          onClose={() => setSelectedPayslip(null)}
          title={`My Payslip - ${selectedPayslip.monthYear}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 p-2">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white text-xl flex items-center justify-center font-black">
                  🐤
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-slate-800">CanaryNest HRM Inc.</h2>
                  <p className="text-xs text-slate-400">Salary Slip for {selectedPayslip.monthYear}</p>
                </div>
              </div>
              <Badge variant="green">{selectedPayslip.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <p className="text-slate-400 font-semibold">Employee Name</p>
                <p className="font-bold text-slate-800">{selectedPayslip.employeeName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Employee Code</p>
                <p className="font-bold text-slate-800">{selectedPayslip.employeeCode}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Designation</p>
                <p className="font-bold text-slate-800">{selectedPayslip.designation}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Department</p>
                <p className="font-bold text-slate-800">{selectedPayslip.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">Earnings</h4>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-600 font-medium">Basic Salary</span>
                  <span className="font-bold text-slate-800">₹ {selectedPayslip.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-600 font-medium">HRA</span>
                  <span className="font-bold text-slate-800">₹ {selectedPayslip.hra.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-600 font-medium">Special Allowances</span>
                  <span className="font-bold text-slate-800">₹ {selectedPayslip.allowances.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">Deductions</h4>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-600 font-medium">Provident Fund (PF)</span>
                  <span className="font-bold text-rose-600">₹ {selectedPayslip.pfDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-600 font-medium">Income Tax (TDS)</span>
                  <span className="font-bold text-rose-600">₹ {selectedPayslip.taxDeduction.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Net Take Home Salary</p>
                <p className="text-[10px] text-emerald-600 font-medium">Transferred on {selectedPayslip.paymentDate}</p>
              </div>
              <h3 className="text-2xl font-black text-emerald-800">₹ {selectedPayslip.netSalary.toLocaleString()}</h3>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" icon={<Printer className="w-4 h-4" />} onClick={handlePrint}>
                Print Payslip
              </Button>
              <Button variant="primary" icon={<Download className="w-4 h-4" />} onClick={handlePrint}>
                Download PDF
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
