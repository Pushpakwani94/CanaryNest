import { 
  Employee, Department, AttendanceRecord, LeaveRequest, LeaveBalance, 
  PayrollRecord, Payslip, HRDocument, PerformanceReview, TrainingCourse, 
  ExpenseClaim, Announcement, Holiday, CompanyPolicy, CompanyAsset, 
  JobPosting, Candidate, AppNotification, AuditLog, CompanySettings, UserProfile
} from '../types';

export const initialCompanySettings: CompanySettings = {
  id: 'company_setting_1',
  companyName: 'CanaryNest HRM Inc.',
  companyEmail: 'contact@canarynest.com',
  companyPhone: '+91 98765 43210',
  address: 'Canary Towers, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
  workingDays: 'Monday - Friday (5 Days)',
  checkInTime: '09:00 AM',
  checkOutTime: '06:00 PM',
  currency: 'INR (₹)',
  logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
};

export const initialUsers: UserProfile[] = [
  {
    uid: 'admin_user_001',
    email: 'admin@canarynest.com',
    role: 'HR_ADMIN',
    employeeId: 'EMP001',
    displayName: 'Admin User',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-01',
  },
  {
    uid: 'employee_user_001',
    email: 'wanipushpak71@gmail.com',
    role: 'EMPLOYEE',
    employeeId: 'EMP00123',
    displayName: 'Rahul Patil',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-12',
  }
];

export const initialDepartments: Department[] = [
  { id: 'dept_1', name: 'Engineering', code: 'ENG', headName: 'Department Lead', employeeCount: 1, description: 'Software Development & Infrastructure', status: 'Active' },
  { id: 'dept_2', name: 'Quality Assurance', code: 'QA', headName: 'Rahul Patil', employeeCount: 1, description: 'Quality Assurance & Testing', status: 'Active' },
  { id: 'dept_3', name: 'Human Resources', code: 'HR', headName: 'Admin User', employeeCount: 1, description: 'Talent & Workplace Operations', status: 'Active' },
  { id: 'dept_4', name: 'Finance', code: 'FIN', headName: 'Finance Lead', employeeCount: 0, description: 'Financial Accounting & Payroll', status: 'Active' },
  { id: 'dept_5', name: 'Marketing', code: 'MKT', headName: 'Marketing Lead', employeeCount: 0, description: 'Brand Growth & Communications', status: 'Active' },
  { id: 'dept_6', name: 'Sales', code: 'SLS', headName: 'Sales Lead', employeeCount: 0, description: 'Enterprise Sales & Partnerships', status: 'Active' },
];

export const initialEmployees: Employee[] = [
  {
    id: 'EMP00123',
    uid: 'employee_user_001',
    employeeCode: 'EMP00123',
    firstName: 'Rahul',
    lastName: 'Patil',
    email: 'wanipushpak71@gmail.com',
    phone: '+91 98765 43210',
    designation: 'QA Engineer',
    departmentId: 'dept_2',
    departmentName: 'Quality Assurance',
    joiningDate: '12 Jan 2024',
    status: 'Active',
    location: 'Pune, Maharashtra',
    salary: 850000,
    bankDetails: { accountNumber: '987654321012', bankName: 'HDFC Bank', ifscCode: 'HDFC0001234' },
    emergencyContact: { name: 'Suresh Patil', relation: 'Father', phone: '+91 98765 00000' },
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'EMP001',
    uid: 'admin_user_001',
    employeeCode: 'EMP001',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@canarynest.com',
    phone: '+91 98765 11111',
    designation: 'Super HR Admin',
    departmentId: 'dept_3',
    departmentName: 'Human Resources',
    joiningDate: '01 Jan 2023',
    status: 'Active',
    location: 'Mumbai, Maharashtra',
    salary: 1500000,
    bankDetails: { accountNumber: '112233445566', bankName: 'ICICI Bank', ifscCode: 'ICIC0005678' },
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  }
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  { id: 'att_1', employeeId: 'EMP00123', employeeName: 'Rahul Patil', date: new Date().toISOString().split('T')[0], checkInTime: '09:02 AM', status: 'Present', workHours: 8.5, notes: 'On Time' },
];

export const initialLeaveBalances: LeaveBalance[] = [
  {
    id: 'lb_EMP00123',
    employeeId: 'EMP00123',
    casualLeave: { total: 12, used: 6, available: 6.0 },
    sickLeave: { total: 8, used: 4, available: 4.0 },
    privilegeLeave: { total: 15, used: 5, available: 10.0 },
    compOff: { total: 4, used: 2, available: 2.0 },
  },
  {
    id: 'lb_EMP001',
    employeeId: 'EMP001',
    casualLeave: { total: 12, used: 2, available: 10.0 },
    sickLeave: { total: 8, used: 1, available: 7.0 },
    privilegeLeave: { total: 15, used: 3, available: 12.0 },
    compOff: { total: 4, used: 0, available: 4.0 },
  }
];

export const initialLeaves: LeaveRequest[] = [
  {
    id: 'lve_3',
    employeeId: 'EMP00123',
    employeeName: 'Rahul Patil',
    leaveType: 'Privilege Leave',
    startDate: '2025-06-10',
    endDate: '2025-06-13',
    totalDays: 4,
    reason: 'Personal vacation',
    status: 'Approved',
    appliedOn: '2025-05-20',
    approvedBy: 'Admin User',
    comment: 'Approved, enjoy your vacation!',
  }
];

export const initialPayroll: PayrollRecord[] = [
  {
    id: 'pay_2025_05',
    monthYear: 'May 2025',
    totalEmployees: 2,
    totalGrossSalary: 195000,
    totalDeductions: 22000,
    totalNetSalary: 173000,
    status: 'Processed',
    processedDate: '28 May 2025',
  }
];

export const initialPayslips: Payslip[] = [
  {
    id: 'ps_EMP00123_2025_05',
    payrollId: 'pay_2025_05',
    employeeId: 'EMP00123',
    employeeCode: 'EMP00123',
    employeeName: 'Rahul Patil',
    designation: 'QA Engineer',
    department: 'Quality Assurance',
    monthYear: 'May 2025',
    basicSalary: 35000,
    hra: 15000,
    allowances: 14000,
    pfDeduction: 3500,
    taxDeduction: 1850,
    netSalary: 58650,
    status: 'Paid',
    paymentDate: '31 May 2025',
    generatedAt: '28 May 2025',
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'anc_1',
    title: 'Annual Team Outing – Goa 2025',
    content: 'We are excited to announce the annual team outing to Goa! Stay tuned for itinerary details.',
    priority: 'High',
    category: 'Event',
    targetAudience: 'All',
    createdAt: '2 days ago',
    authorName: 'HR Team',
    isPinned: true,
  },
  {
    id: 'anc_2',
    title: 'New HR Policy Update',
    content: 'Please review the newly updated Work From Home policy in the Policies tab.',
    priority: 'Medium',
    category: 'Policy',
    targetAudience: 'All',
    createdAt: '5 days ago',
    authorName: 'Admin User',
    isPinned: true,
  }
];

export const initialHolidays: Holiday[] = [
  { id: 'hol_1', title: 'Bakrid / Eid al-Adha', date: '06 Jun 2025', dayOfWeek: 'Friday', type: 'Gazetted', icon: '🕌' },
  { id: 'hol_2', title: 'Independence Day', date: '15 Aug 2025', dayOfWeek: 'Friday', type: 'Gazetted', icon: '🇮🇳' },
  { id: 'hol_3', title: 'Gandhi Jayanti', date: '02 Oct 2025', dayOfWeek: 'Thursday', type: 'Gazetted', icon: '🕊️' },
  { id: 'hol_4', title: 'Diwali (Laxmi Pujan)', date: '20 Oct 2025', dayOfWeek: 'Monday', type: 'Gazetted', icon: '🪔' },
  { id: 'hol_5', title: 'Christmas', date: '25 Dec 2025', dayOfWeek: 'Thursday', type: 'Gazetted', icon: '🎄' },
];

export const initialCompanyPolicies: CompanyPolicy[] = [
  { id: 'pol_1', title: 'Remote Work & Hybrid Policy 2025', category: 'Workplace', description: 'Guidelines on working from home, equipment allowance, and office core hours.', effectiveDate: '01 Jun 2025', version: 'v2.1' },
  { id: 'pol_2', title: 'Code of Conduct & Ethics', category: 'Compliance', description: 'Standards of behavior, diversity, inclusion, and anti-harassment policies.', effectiveDate: '01 Jan 2024', version: 'v1.4' },
  { id: 'pol_3', title: 'Leave & Absence Policy', category: 'HR Operations', description: 'Rules governing Casual Leave, Sick Leave, Maternity/Paternity, and Carry Forward.', effectiveDate: '01 Jan 2025', version: 'v3.0' },
];

export const initialCompanyAssets: CompanyAsset[] = [
  { id: 'ast_1', assetCode: 'AST-LAP-001', name: 'MacBook Pro M3 Max 16"', category: 'Laptop', serialNumber: 'C02GX901Q05D', status: 'Allocated', assignedToEmployeeId: 'EMP00123', assignedToEmployeeName: 'Rahul Patil', assignedDate: '12 Jan 2024' },
  { id: 'ast_2', assetCode: 'AST-MON-004', name: 'Dell UltraSharp 27" 4K Monitor', category: 'Monitor', serialNumber: 'CN-09876-74261', status: 'Allocated', assignedToEmployeeId: 'EMP00123', assignedToEmployeeName: 'Rahul Patil', assignedDate: '15 Jan 2024' },
];

export const initialRecruitment: JobPosting[] = [
  { id: 'job_1', jobTitle: 'Senior React Developer', department: 'Engineering', location: 'Remote / Hybrid', openings: 2, type: 'Full-Time', status: 'Open', postedDate: '15 May 2025' },
];

export const initialCandidates: Candidate[] = [];

export const initialDocuments: HRDocument[] = [
  { id: 'doc_1', employeeId: 'EMP00123', employeeName: 'Rahul Patil', title: 'Employment Contract', category: 'Contract', fileUrl: '#', fileName: 'Rahul_Patil_Employment_Agreement.pdf', fileSize: '2.4 MB', uploadedBy: 'HR Admin', uploadedAt: '12 Jan 2024' },
  { id: 'doc_3', title: 'CanaryNest Employee Handbook 2025', category: 'Company Policy', fileUrl: '#', fileName: 'Employee_Handbook_v2.pdf', fileSize: '4.5 MB', uploadedBy: 'HR Admin', uploadedAt: '01 Jan 2025' },
];

export const initialPerformance: PerformanceReview[] = [
  {
    id: 'prf_1',
    employeeId: 'EMP00123',
    employeeName: 'Rahul Patil',
    cycle: 'Q1 2025 Review',
    selfRating: 4,
    managerRating: 5,
    kpis: [
      { title: 'Automated Test Suite Coverage > 85%', target: '85%', status: 'Exceeded' },
      { title: 'Reduce Release Bug Rate < 2%', target: '< 2%', status: 'Met' },
    ],
    feedback: 'Rahul has shown stellar performance in maintaining automated QA benchmarks.',
    status: 'Completed',
    updatedLast: '15 Apr 2025'
  }
];

export const initialTraining: TrainingCourse[] = [
  {
    id: 'trn_1',
    title: 'Leadership & Team Dynamics 2025',
    description: 'Empowering senior individual contributors with key leadership and communication strategies.',
    category: 'Management',
    instructor: 'Dr. Neha Kulkarni',
    duration: '6 Hours',
    status: 'In Progress',
    assignedEmployees: [
      { employeeId: 'EMP00123', employeeName: 'Rahul Patil', status: 'Completed' }
    ]
  }
];

export const initialExpenses: ExpenseClaim[] = [
  { id: 'exp_1', employeeId: 'EMP00123', employeeName: 'Rahul Patil', category: 'Software', amount: 3499, date: '22 May 2025', description: 'Software license renewal', status: 'Approved', approvedBy: 'Admin User' },
];

export const initialAuditLogs: AuditLog[] = [
  { id: 'log_1', action: 'ATTENDANCE_CHECKIN', performedBy: 'Rahul Patil', performedByEmail: 'wanipushpak71@gmail.com', details: 'Checked in at 09:02 AM', timestamp: 'Today, 09:02 AM' },
];

export const initialNotifications: AppNotification[] = [
  { id: 'notif_1', userId: 'employee_user_001', title: 'Payslip Available', message: 'Your payslip for May 2025 is ready to view & download.', link: '/employee/payslips', isRead: false, createdAt: '2 hours ago', type: 'success' },
];
