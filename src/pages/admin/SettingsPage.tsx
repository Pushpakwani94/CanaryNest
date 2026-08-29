import React, { useState } from 'react';
import { Settings, Save, Building, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common/UIComponents';
import { initialCompanySettings } from '../../utils/seedData';
import { isFirebaseConfigured } from '../../config/firebase';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(initialCompanySettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-400 font-medium">Configure company details, work hours, shift policies, and Firebase status.</p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings updated successfully!
        </div>
      )}

      {/* Firebase Status Card */}
      <Card className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-brand-600" />
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Firebase Backend Status</h3>
            <p className="text-xs text-slate-500 font-medium">
              {isFirebaseConfigured ? 'Connected to Live Firebase Auth & Firestore' : 'Running in Offline / Seed Demo Store Mode'}
            </p>
          </div>
        </div>
        <Badge variant={isFirebaseConfigured ? 'green' : 'orange'}>
          {isFirebaseConfigured ? 'Live Firebase' : 'Demo Store Active'}
        </Badge>
      </Card>

      <Card>
        <form onSubmit={handleSave} className="space-y-5">
          <h3 className="font-extrabold text-slate-800 text-base pb-3 border-b border-slate-100">
            Company Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Company Email</label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Work Days Policy</label>
              <input
                type="text"
                value={settings.workingDays}
                onChange={(e) => setSettings({ ...settings, workingDays: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Standard Shift Hours</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.checkInTime}
                  onChange={(e) => setSettings({ ...settings, checkInTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
                <span className="text-xs font-bold self-center text-slate-400">to</span>
                <input
                  type="text"
                  value={settings.checkOutTime}
                  onChange={(e) => setSettings({ ...settings, checkOutTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Office Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button variant="primary" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Settings
            </Button>
          </div>
        </form>
      </Card>

    </div>
  );
};
