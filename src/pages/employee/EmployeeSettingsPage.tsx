import React, { useState } from 'react';
import { Settings, Bell, Lock, Save, CheckCircle2 } from 'lucide-react';
import { Button, Card } from '../../components/common/UIComponents';

export const EmployeeSettingsPage: React.FC = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-xs text-slate-400 font-medium">Manage notification preferences and password options.</p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings saved successfully!
        </div>
      )}

      <Card>
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="font-extrabold text-slate-800 text-sm pb-2 border-b border-slate-100">
            Notification Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <span className="text-xs font-bold text-slate-700">Email Notifications for Leave Approvals</span>
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded focus:ring-brand-400"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <span className="text-xs font-bold text-slate-700">Push Notifications for Announcements</span>
              <input
                type="checkbox"
                checked={pushNotif}
                onChange={(e) => setPushNotif(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded focus:ring-brand-400"
              />
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button variant="primary" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>

    </div>
  );
};
