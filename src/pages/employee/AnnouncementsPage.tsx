import React, { useState, useEffect } from 'react';
import { Megaphone, Pin } from 'lucide-react';
import { Card, Badge } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { Announcement } from '../../types';

export const EmployeeAnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const unsub = dataService.getAnnouncements(setAnnouncements);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Company Announcements</h1>
        <p className="text-xs text-slate-400 font-medium">Stay informed on important news, upcoming events, and workplace updates.</p>
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
                <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">{anc.content}</p>
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

    </div>
  );
};
