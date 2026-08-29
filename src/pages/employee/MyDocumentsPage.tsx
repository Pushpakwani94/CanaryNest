import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { HRDocument } from '../../types';

export const MyDocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<HRDocument[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'ID Proof' as const,
    fileName: '',
    fileSize: '1.2 MB',
  });

  useEffect(() => {
    const unsub = dataService.getDocuments((allDocs) => {
      const myDocs = allDocs.filter(d => d.employeeId === 'EMP00123' || d.category === 'Company Policy' || d.employeeName?.includes('Rahul'));
      setDocuments(myDocs);
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addDocument({
      employeeId: 'EMP00123',
      employeeName: 'Rahul Patil',
      title: formData.title,
      category: formData.category,
      fileName: formData.fileName,
      fileSize: formData.fileSize,
      fileUrl: '#',
      uploadedBy: 'Rahul Patil',
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Document Name',
      accessor: (d: HRDocument) => (
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-brand-500 bg-orange-50 p-1.5 rounded-xl shrink-0" />
          <div>
            <p className="font-extrabold text-slate-800 text-xs">{d.title}</p>
            <p className="text-[10px] text-slate-400 font-medium">{d.fileName} ({d.fileSize})</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: (d: HRDocument) => <Badge variant="purple" size="sm">{d.category}</Badge>
    },
    {
      header: 'Date Uploaded',
      accessor: (d: HRDocument) => <span className="text-xs text-slate-500 font-medium">{d.uploadedAt}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Documents</h1>
          <p className="text-xs text-slate-400 font-medium">Access your employment contract, ID proofs, tax documents, and certificates.</p>
        </div>
        <Button variant="primary" icon={<Upload className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Upload Document
        </Button>
      </div>

      <DataTable
        data={documents}
        columns={columns}
        keyExtractor={(d) => d.id}
        actions={(d) => (
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Download
          </Button>
        )}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Personal Document">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Passport Copy 2025"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-semibold"
              >
                <option value="ID Proof">ID Proof</option>
                <option value="Certificate">Certificate</option>
                <option value="Tax">Tax Form</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">File Name</label>
              <input
                type="text"
                required
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                placeholder="e.g. Passport_Rahul.pdf"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Upload File</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
