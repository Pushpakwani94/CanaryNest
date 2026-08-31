import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building2, Calendar, ShieldCheck, Edit, Camera, Save, Lock, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common/UIComponents';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/db';
import { Employee } from '../../types';

export const MyProfilePage: React.FC = () => {
  const { userProfile } = useAuth();
  const [empRecord, setEmpRecord] = useState<Employee | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Pune, Maharashtra');

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [saveDetailsMsg, setSaveDetailsMsg] = useState('');

  useEffect(() => {
    const unsub = dataService.getEmployees((list) => {
      const found = list.find(e => 
        e.id === userProfile?.employeeId || 
        e.email.toLowerCase() === userProfile?.email?.toLowerCase()
      );
      if (found) {
        setEmpRecord(found);
        setPhone(found.phone);
        setLocation(found.location);
      }
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [userProfile]);

  const handleToggleEdit = async () => {
    if (isEditing && empRecord) {
      await dataService.updateEmployee(empRecord.id, { phone, location });
      setSaveDetailsMsg('Contact details updated successfully!');
      setTimeout(() => setSaveDetailsMsg(''), 3000);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!newPassword || newPassword.length < 6) {
      setPassError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    if (userProfile?.email) {
      await dataService.updateUserPassword(userProfile.email, newPassword);
      setPassSuccess('Password updated successfully! You can use this new password for your next login.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 4000);
    }
  };

  const displayName = empRecord ? `${empRecord.firstName} ${empRecord.lastName}` : (userProfile?.displayName || 'Employee');
  const designation = empRecord?.designation || 'QA Engineer';
  const departmentName = empRecord?.departmentName || 'Quality Assurance';
  const empCode = empRecord?.employeeCode || userProfile?.employeeId || 'EMP00123';
  const empStatus = empRecord?.status || 'Active';
  const joiningDate = empRecord?.joiningDate || '12 Jan 2024';
  const email = empRecord?.email || userProfile?.email || 'wanipushpak71@gmail.com';
  const photo = empRecord?.photoURL || userProfile?.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Profile</h1>
          <p className="text-xs text-slate-400 font-medium">View and update your live employee profile and credentials.</p>
        </div>
        <Button
          variant={isEditing ? 'success' : 'outline'}
          icon={<Edit className="w-4 h-4" />}
          onClick={handleToggleEdit}
        >
          {isEditing ? 'Save Changes' : 'Edit Contact Details'}
        </Button>
      </div>

      {saveDetailsMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {saveDetailsMsg}
        </div>
      )}

      {/* Main Profile Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <img
              src={photo}
              alt={displayName}
              className="w-28 h-28 rounded-full object-cover border-4 border-slate-100 shadow-md"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-brand-500 text-white rounded-full shadow-md hover:bg-brand-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-2xl font-black text-slate-800">{displayName}</h2>
              <Badge variant={empStatus === 'Active' ? 'green' : 'orange'}>{empStatus}</Badge>
            </div>
            <p className="text-sm font-bold text-brand-600">{designation}</p>
            <p className="text-xs text-slate-500 font-medium">{departmentName} Department • Employee Code: {empCode}</p>
            <p className="text-xs text-slate-400 font-medium mt-2">Joined {joiningDate}</p>
          </div>
        </div>
      </Card>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Info */}
        <Card className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
            Contact Information
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-400">Work Email</label>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{email}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400">Mobile Phone</label>
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-bold text-slate-800"
              />
            ) : (
              <p className="text-xs font-bold text-slate-800 mt-0.5">{phone}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400">Work Location</label>
            {isEditing ? (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-bold text-slate-800"
              />
            ) : (
              <p className="text-xs font-bold text-slate-800 mt-0.5">{location}</p>
            )}
          </div>
        </Card>

        {/* Bank Details */}
        <Card className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
            Bank & Salary Account
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-400">Bank Name</label>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{empRecord?.bankDetails?.bankName || 'HDFC Bank Ltd.'}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400">Account Number</label>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{empRecord?.bankDetails?.accountNumber || '•••• •••• 987654'}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400">IFSC Code</label>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{empRecord?.bankDetails?.ifscCode || 'HDFC0001234'}</p>
          </div>
        </Card>

      </div>

      {/* Change Password Card */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Lock className="w-4 h-4 text-brand-500" />
          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
            Account Password & Security
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

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>
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

          <div className="flex justify-end pt-2">
            <Button variant="primary" type="submit" icon={<Save className="w-4 h-4" />}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>

    </div>
  );
};
