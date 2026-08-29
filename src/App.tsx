import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/auth/LoginPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EmployeesPage } from './pages/admin/EmployeesPage';
import { DepartmentsPage } from './pages/admin/DepartmentsPage';
import { AttendancePage } from './pages/admin/AttendancePage';
import { LeaveManagementPage } from './pages/admin/LeaveManagementPage';
import { PayrollPage } from './pages/admin/PayrollPage';
import { RecruitmentPage } from './pages/admin/RecruitmentPage';
import { PerformancePage } from './pages/admin/PerformancePage';
import { TrainingPage } from './pages/admin/TrainingPage';
import { DocumentsPage } from './pages/admin/DocumentsPage';
import { ExpensesPage } from './pages/admin/ExpensesPage';
import { AssetsPage } from './pages/admin/AssetsPage';
import { AnnouncementsPage } from './pages/admin/AnnouncementsPage';
import { PoliciesPage } from './pages/admin/PoliciesPage';
import { HolidaysPage } from './pages/admin/HolidaysPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { RolesPermissionsPage } from './pages/admin/RolesPermissionsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Employee Pages
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { MyProfilePage } from './pages/employee/MyProfilePage';
import { MyAttendancePage } from './pages/employee/MyAttendancePage';
import { ApplyLeavePage } from './pages/employee/ApplyLeavePage';
import { MyLeavesPage } from './pages/employee/MyLeavesPage';
import { MyPayslipsPage } from './pages/employee/MyPayslipsPage';
import { MyDocumentsPage } from './pages/employee/MyDocumentsPage';
import { MyPerformancePage } from './pages/employee/MyPerformancePage';
import { MyTrainingPage } from './pages/employee/MyTrainingPage';
import { MyExpensesPage } from './pages/employee/MyExpensesPage';
import { EmployeeAnnouncementsPage } from './pages/employee/AnnouncementsPage';
import { CompanyPoliciesPage } from './pages/employee/CompanyPoliciesPage';
import { HolidayCalendarPage } from './pages/employee/HolidayCalendarPage';
import { HelpSupportPage } from './pages/employee/HelpSupportPage';
import { EmployeeSettingsPage } from './pages/employee/EmployeeSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* HR ADMIN PORTAL ROUTES */}
          <Route element={<ProtectedRoute allowedRole="HR_ADMIN" />}>
            <Route element={<Layout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/employees" element={<EmployeesPage />} />
              <Route path="/admin/departments" element={<DepartmentsPage />} />
              <Route path="/admin/attendance" element={<AttendancePage />} />
              <Route path="/admin/leaves" element={<LeaveManagementPage />} />
              <Route path="/admin/payroll" element={<PayrollPage />} />
              <Route path="/admin/recruitment" element={<RecruitmentPage />} />
              <Route path="/admin/performance" element={<PerformancePage />} />
              <Route path="/admin/training" element={<TrainingPage />} />
              <Route path="/admin/documents" element={<DocumentsPage />} />
              <Route path="/admin/expenses" element={<ExpensesPage />} />
              <Route path="/admin/assets" element={<AssetsPage />} />
              <Route path="/admin/announcements" element={<AnnouncementsPage />} />
              <Route path="/admin/policies" element={<PoliciesPage />} />
              <Route path="/admin/holidays" element={<HolidaysPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              <Route path="/admin/roles" element={<RolesPermissionsPage />} />
              <Route path="/admin/logs" element={<AuditLogsPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* EMPLOYEE PORTAL ROUTES */}
          <Route element={<ProtectedRoute allowedRole="EMPLOYEE" />}>
            <Route element={<Layout />}>
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/employee/profile" element={<MyProfilePage />} />
              <Route path="/employee/attendance" element={<MyAttendancePage />} />
              <Route path="/employee/apply-leave" element={<ApplyLeavePage />} />
              <Route path="/employee/leaves" element={<MyLeavesPage />} />
              <Route path="/employee/payslips" element={<MyPayslipsPage />} />
              <Route path="/employee/documents" element={<MyDocumentsPage />} />
              <Route path="/employee/performance" element={<MyPerformancePage />} />
              <Route path="/employee/training" element={<MyTrainingPage />} />
              <Route path="/employee/expenses" element={<MyExpensesPage />} />
              <Route path="/employee/announcements" element={<EmployeeAnnouncementsPage />} />
              <Route path="/employee/policies" element={<CompanyPoliciesPage />} />
              <Route path="/employee/holidays" element={<HolidayCalendarPage />} />
              <Route path="/employee/support" element={<HelpSupportPage />} />
              <Route path="/employee/settings" element={<EmployeeSettingsPage />} />
            </Route>
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
