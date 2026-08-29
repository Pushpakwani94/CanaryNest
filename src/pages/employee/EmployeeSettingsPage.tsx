import React, { useState } from 'react';
import { Settings, Bell, Lock, Save, CheckCircle2 } from 'lucide-react';
import { Button, Card } from '../../components/common/UIComponents';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/db';

export const EmployeeSettingsPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!newPassword || newPassword.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('Passwords do not match.');
      return;
    }

    if (userProfile?.email) {
      await dataService.updateUserPassword(userProfile.email, newPassword);
      setPassSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-xs text-slate-400 font-medium">Manage notification preferences and security options.</p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Preferences saved successfully!
        </div>
      )}

      {/* Notification Preferences */}
      <Card>
        <form onSubmit={handleSavePreferences} className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-brand-500" />
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
              Notification Preferences
            </h3>
          </div>

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

      {/* Security & Password Change */}
      <Card>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Lock className="w-4 h-4 text-brand-500" />
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
              Change Account Password
            </h3>
          </div>

          {passSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {passSuccess}
            </div>
          )}

          {passError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600">
              {passError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100">
            <Button variant="primary" type="submit" icon={<Save className="w-4 h-4" />}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>

    </div>
  );
};
