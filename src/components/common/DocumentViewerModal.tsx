import React, { useState } from 'react';
import { FileText, Printer, Download, CheckCircle2, XCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button, Badge, Modal } from './UIComponents';
import { HRDocument } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: HRDocument | null;
  onApproveStatus?: (docId: string, status: 'Approved' | 'Rejected', comment?: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  document: docItem,
  onApproveStatus,
}) => {
  const { role } = useAuth();
  const [adminComment, setAdminComment] = useState('');
  const [actionDone, setActionDone] = useState('');

  if (!isOpen || !docItem) return null;

  const docStatus = docItem.status || 'Approved';

  const handleApprove = () => {
    if (onApproveStatus) {
      onApproveStatus(docItem.id, 'Approved', adminComment);
      setActionDone('Document has been APPROVED and accepted by HR Admin.');
      setTimeout(() => setActionDone(''), 4000);
    }
  };

  const handleReject = () => {
    if (onApproveStatus) {
      onApproveStatus(docItem.id, 'Rejected', adminComment);
      setActionDone('Document has been REJECTED by HR Admin.');
      setTimeout(() => setActionDone(''), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Document Viewer - ${docItem.title}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Top Info Header */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-brand-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">{docItem.title}</h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {docItem.fileName} • {docItem.fileSize} • Uploaded on {docItem.uploadedAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="purple">{docItem.category}</Badge>
            <Badge 
              variant={
                docStatus === 'Approved' ? 'green' : 
                docStatus === 'Rejected' ? 'red' : 'orange'
              }
            >
              {docStatus}
            </Badge>
          </div>
        </div>

        {actionDone && (
          <div className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
            docStatus === 'Approved' || actionDone.includes('APPROVED')
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            <ShieldCheck className="w-4 h-4 shrink-0" />
            {actionDone}
          </div>
        )}

        {/* Formatted Document Reader Paper View */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6 font-serif text-slate-800 text-xs leading-relaxed max-h-[420px] overflow-y-auto">
          
          {/* Document Letterhead */}
          <div className="border-b-2 border-slate-800 pb-4 flex items-center justify-between font-sans">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐤</span>
              <div>
                <h2 className="font-black text-lg text-slate-900 tracking-tight">CanaryNest HRM Inc.</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Official Corporate Document</p>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <p className="font-bold">Doc Ref: CN-DOC-2025/089</p>
              <p>Effective Date: {docItem.uploadedAt}</p>
            </div>
          </div>

          {/* Document Content based on Category */}
          {docItem.category === 'Contract' ? (
            <div className="space-y-4">
              <h3 className="text-center text-sm font-bold uppercase tracking-widest font-sans text-slate-900 border-b border-slate-200 pb-2">
                EMPLOYMENT AGREEMENT & CONTRACT OF SERVICE
              </h3>

              <p>
                <strong>THIS AGREEMENT</strong> is made on <strong>{docItem.uploadedAt}</strong> by and between:
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-sans text-[11px]">
                <p><strong>EMPLOYER:</strong> CanaryNest HRM Inc., Canary Towers, Bandra Kurla Complex, Mumbai</p>
                <p className="mt-1"><strong>EMPLOYEE:</strong> {docItem.employeeName || 'Rahul Patil'} (QA Engineer, Quality Assurance Dept)</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold font-sans uppercase text-[11px] text-slate-900">1. Position & Scope of Work</h4>
                <p>
                  The Employee shall serve in the capacity of <strong>{docItem.employeeName ? 'QA Engineer' : 'Employee'}</strong> and perform duties related to quality assurance testing, automated benchmarks, continuous integration, and software delivery standards.
                </p>

                <h4 className="font-bold font-sans uppercase text-[11px] text-slate-900">2. Compensation & Benefits</h4>
                <p>
                  The Employee will receive an annual gross remuneration as specified in the official salary structure, payable in monthly installments on or before the last working day of each calendar month.
                </p>

                <h4 className="font-bold font-sans uppercase text-[11px] text-slate-900">3. Non-Disclosure & Confidentiality</h4>
                <p>
                  During the term of employment and thereafter, the Employee agrees to hold in strict confidence all proprietary software source code, trade secrets, employee records, and business methodologies of CanaryNest HRM Inc.
                </p>

                <h4 className="font-bold font-sans uppercase text-[11px] text-slate-900">4. Termination & Notice Period</h4>
                <p>
                  Either party may terminate this Contract by giving a 30-day written notice or salary in lieu thereof, subject to company policies.
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 font-sans">
                <div>
                  <div className="h-10 border-b border-slate-400 flex items-end pb-1 font-bold italic text-brand-600">
                    Sarah Jenkins (HR Director)
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Authorized HR Representative Signature</p>
                </div>
                <div>
                  <div className="h-10 border-b border-slate-400 flex items-end pb-1 font-bold italic text-slate-800">
                    {docItem.employeeName || 'Rahul Patil'}
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Employee Signature</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 font-sans text-xs">
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">
                VERIFIED OFFICIAL RECORD
              </h3>
              <p className="text-slate-600">
                This document is on file for <strong>{docItem.employeeName || 'Rahul Patil'}</strong>.
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                Uploaded File: {docItem.fileName} ({docItem.fileSize})
              </div>
            </div>
          )}

        </div>

        {/* HR Admin Accept / Reject Decision Panel */}
        {role === 'HR_ADMIN' && onApproveStatus && (
          <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                HR Admin Document Review & Approval
              </h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Status: {docStatus}</span>
            </div>

            <input
              type="text"
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              placeholder="Optional HR verification note or feedback comment..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />

            <div className="flex items-center justify-end gap-3 pt-1">
              <Button
                variant="danger"
                size="sm"
                icon={<XCircle className="w-4 h-4" />}
                onClick={handleReject}
              >
                Reject Document
              </Button>
              <Button
                variant="success"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={handleApprove}
              >
                Accept & Approve Document
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Utility Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-semibold">CanaryNest Official Contract Portal</span>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" icon={<Printer className="w-3.5 h-3.5" />} onClick={handlePrint}>
              Print
            </Button>
            <Button variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={handlePrint}>
              Download PDF
            </Button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
