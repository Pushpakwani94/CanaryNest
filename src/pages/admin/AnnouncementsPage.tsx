import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Pin } from 'lucide-react';
import { Button, Card, Badge, Modal } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Announcement } from '../../types';

export const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'High' as const,
    category: 'General',
    targetAudience: 'All' as const,
    authorName: 'HR Admin',
    isPinned: false,
  });

  useEffect(() => {
    const unsub = dataService.getAnnouncements(setAnnouncements);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addAnnouncement(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Announcements</h1>
          <p className="text-xs text-slate-400 font-medium">Broadcast company-wide news, events, and important updates.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Create Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((anc) => (
          <Card key={anc.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {anc.isPinned && <Pin className="w-4 h-4 text-brand-500 fill-brand-500" />}
                  <h3 className="font-extrabold text-slate-800 text-base">{anc.title}</h3>
                  <Badge variant={anc.priority === 'High' ? 'red' : 'blue'} size="sm">{anc.priority} Priority</Badge>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{anc.content}</p>
                <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-slate-400">
                  <span>By {anc.authorName}</span>
                  <span>•</span>
                  <span>{anc.createdAt}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Broadcast Announcement">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Annual Town Hall Meeting 2025"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Content</label>
            <textarea
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter announcement text..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Broadcast Now</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
