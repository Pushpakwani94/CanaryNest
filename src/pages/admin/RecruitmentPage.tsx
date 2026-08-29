import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Users, UserCheck } from 'lucide-react';
import { Button, Card, Badge, Modal, DataTable } from '../../components/common/UIComponents';
import { dataService, localStore } from '../../services/db';
import { JobPosting, Candidate } from '../../types';

export const RecruitmentPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>(localStore.recruitment);
  const [candidates, setCandidates] = useState<Candidate[]>(localStore.candidates);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: '',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    openings: 2,
    type: 'Full-Time' as const,
    status: 'Open' as const,
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobPosting = {
      ...formData,
      id: 'job_' + Date.now(),
      postedDate: new Date().toISOString().split('T')[0],
    };
    localStore.recruitment = [newJob, ...localStore.recruitment];
    setJobs([...localStore.recruitment]);
    setIsJobModalOpen(false);
  };

  const columns = [
    {
      header: 'Job Title',
      accessor: (j: JobPosting) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{j.jobTitle}</p>
          <p className="text-[10px] text-slate-400 font-medium">{j.department} • {j.location}</p>
        </div>
      )
    },
    {
      header: 'Openings',
      accessor: (j: JobPosting) => <span className="text-xs font-bold text-brand-600 bg-orange-50 px-2 py-0.5 rounded-full">{j.openings} Positions</span>
    },
    {
      header: 'Employment Type',
      accessor: (j: JobPosting) => <span className="text-xs font-semibold text-slate-600">{j.type}</span>
    },
    {
      header: 'Posted Date',
      accessor: (j: JobPosting) => <span className="text-xs text-slate-500 font-medium">{j.postedDate}</span>
    },
    {
      header: 'Status',
      accessor: (j: JobPosting) => <Badge variant={j.status === 'Open' ? 'green' : 'gray'} size="sm">{j.status}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Recruitment & Hiring</h1>
          <p className="text-xs text-slate-400 font-medium">Manage open position listings and talent acquisition pipeline.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setIsJobModalOpen(true)}>
          Post New Job
        </Button>
      </div>

      {/* Candidate Pipeline Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="text-center p-4 bg-blue-50/60 border-blue-100">
          <p className="text-xs font-bold text-blue-700">Candidates Applied</p>
          <h3 className="text-2xl font-black text-blue-800 mt-1">42</h3>
        </Card>
        <Card className="text-center p-4 bg-purple-50/60 border-purple-100">
          <p className="text-xs font-bold text-purple-700">Interviewing</p>
          <h3 className="text-2xl font-black text-purple-800 mt-1">12</h3>
        </Card>
        <Card className="text-center p-4 bg-emerald-50/60 border-emerald-100">
          <p className="text-xs font-bold text-emerald-700">Offered</p>
          <h3 className="text-2xl font-black text-emerald-800 mt-1">3</h3>
        </Card>
        <Card className="text-center p-4 bg-amber-50/60 border-amber-100">
          <p className="text-xs font-bold text-amber-700">Open Jobs</p>
          <h3 className="text-2xl font-black text-amber-800 mt-1">{jobs.filter(j => j.status === 'Open').length}</h3>
        </Card>
      </div>

      <DataTable
        data={jobs}
        columns={columns}
        keyExtractor={(j) => j.id}
      />

      <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title="Create New Job Listing">
        <form onSubmit={handleAddJob} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Job Title</label>
            <input
              type="text"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsJobModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Publish Job</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
