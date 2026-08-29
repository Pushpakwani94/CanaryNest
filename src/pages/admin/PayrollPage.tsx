import React, { useState, useEffect } from 'react';
import { Wallet, Printer, Download, CheckCircle2, Play, FileText } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Payslip, PayrollRecord } from '../../types';

export const PayrollPage: React.FC = () => {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  useEffect(() => {
    const unsubPs = dataService.getPayslips(setPayslips);
    const unsubPr = dataService.getPayroll(setPayroll);
    return () => {
      if (typeof unsubPs === 'function') unsubPs();
      if (typeof unsubPr === 'function') unsubPr();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    {
      header: 'Employee Code',
      accessor: (p: Payslip) => <span className="font-extrabold text-slate-800 text-xs">{p.employeeCode}</span>
    },
    {
      header: 'Employee Name',
      accessor: (p: Payslip) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{p.employeeName}</p>
          <p className="text-[10px] text-slate-400 font-medium">{p.designation} • {p.department}</p>
        </div>
      )
    },
    {
      header: 'Month & Year',
      accessor: (p: Payslip) => <span className="text-xs font-semibold text-slate-700">{p.monthYear}</span>
    },
    {
      header: 'Net Salary (₹)',
      accessor: (p: Payslip) => <span className="text-xs font-black text-emerald-600">₹ {p.netSalary.toLocaleString()}</span>
    },
    {
      header: 'Status',
      accessor: (p: Payslip) => <Badge variant="green" size="sm">{p.status}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Payroll & Payslips</h1>
          <p className="text-xs text-slate-400 font-medium">Manage monthly salary processing, tax deductions, and employee payslips.</p>
        </div>
        <Button variant="primary" icon={<Play className="w-4 h-4" />}>
          Process May 2025 Payroll
        </Button>
      </div>

      {/* Summary KPI Banner */}
      <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              Current Cycle: May 2025
            </span>
            <h2 className="text-3xl font-black mt-3 text-white">₹ 48,75,000</h2>
            <p className="text-xs text-slate-300 font-medium mt-1">Total Net Payroll processed for 248 active employees.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div>
              <p className="text-[10px] text-slate-300 font-semibold uppercase">Gross Salary</p>
              <p className="text-sm font-extrabold text-emerald-400">₹ 55,00,000</p>
            </div>
            <div className="border-l border-white/20 pl-4">
              <p className="text-[10px] text-slate-300 font-semibold uppercase">Total Deductions</p>
              <p className="text-sm font-extrabold text-rose-400">₹ 6,25,000</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Payslips Table */}
      <DataTable
        data={payslips}
        columns={columns}
        keyExtractor={(p) => p.id}
        actions={(p) => (
          <Button
            variant="outline"
            size="sm"
            icon={<FileText className="w-3.5 h-3.5" />}
            onClick={() => setSelectedPayslip(p)}
          >
            View Payslip
          </Button>
        )}
      />

      {/* Detailed Printable Payslip Modal */}
      {selectedPayslip && (
        <Modal
          isOpen={Boolean(selectedPayslip)}
          onClose={() => setSelectedPayslip(null)}
          title={`Payslip - ${selectedPayslip.monthYear}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 print:p-6" id="printable-payslip">
            
            {/* Header */}
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

            {/* Employee Info Grid */}
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

            {/* Earnings & Deductions Breakdown */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Earnings */}
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

              {/* Deductions */}
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

            {/* Net Total Card */}
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Net Take Home Salary</p>
                <p className="text-[10px] text-emerald-600 font-medium">Paid via Direct Bank Transfer on {selectedPayslip.paymentDate}</p>
              </div>
              <h3 className="text-2xl font-black text-emerald-800">₹ {selectedPayslip.netSalary.toLocaleString()}</h3>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 print:hidden">
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
