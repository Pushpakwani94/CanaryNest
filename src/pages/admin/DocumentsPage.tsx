import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Trash2, Plus } from 'lucide-react';
import { Button, Card, Badge, DataTable, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { HRDocument } from '../../types';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<HRDocument[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Contract' as const,
    fileName: '',
    fileSize: '1.5 MB',
    uploadedBy: 'HR Admin',
  });

  useEffect(() => {
    const unsub = dataService.getDocuments(setDocuments);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addDocument({
      ...formData,
      fileUrl: '#',
    });
    setIsUploadModalOpen(false);
  };

  const columns = [
    {
      header: 'Document Title',
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
      header: 'Uploaded By',
      accessor: (d: HRDocument) => <span className="text-xs font-semibold text-slate-700">{d.uploadedBy}</span>
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
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Document Vault</h1>
          <p className="text-xs text-slate-400 font-medium">Manage company policy documentation, contracts, and uploaded employee records.</p>
        </div>
        <Button variant="primary" icon={<Upload className="w-4 h-4" />} onClick={() => setIsUploadModalOpen(true)}>
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

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload Document">
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Employee Non-Disclosure Agreement"
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
                <option value="Contract">Contract</option>
                <option value="ID Proof">ID Proof</option>
                <option value="Certificate">Certificate</option>
                <option value="Tax">Tax Document</option>
                <option value="Company Policy">Company Policy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">File Name</label>
              <input
                type="text"
                required
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                placeholder="e.g. Contract_2025.pdf"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save File</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
