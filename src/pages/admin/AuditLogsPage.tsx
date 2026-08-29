import React, { useState, useEffect } from 'react';
import { FileClock, Shield, User } from 'lucide-react';
import { Card, Badge, DataTable } from '../../components/common/UIComponents';
import { dataService } from '../../services/db';
import { AuditLog } from '../../types';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const unsub = dataService.getAuditLogs(setLogs);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const columns = [
    {
      header: 'Action',
      accessor: (l: AuditLog) => (
        <Badge variant="orange" size="sm">{l.action}</Badge>
      )
    },
    {
      header: 'Performed By',
      accessor: (l: AuditLog) => (
        <div>
          <p className="font-extrabold text-slate-800 text-xs">{l.performedBy}</p>
          <p className="text-[10px] text-slate-400 font-medium">{l.performedByEmail}</p>
        </div>
      )
    },
    {
      header: 'Details & Changes',
      accessor: (l: AuditLog) => <span className="text-xs text-slate-600 font-medium">{l.details}</span>
    },
    {
      header: 'Timestamp',
      accessor: (l: AuditLog) => <span className="text-xs text-slate-400 font-semibold">{l.timestamp}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">System Audit Logs</h1>
        <p className="text-xs text-slate-400 font-medium">Real-time immutable security and system activity tracking.</p>
      </div>

      <DataTable data={logs} columns={columns} keyExtractor={(l) => l.id} />

    </div>
  );
};
