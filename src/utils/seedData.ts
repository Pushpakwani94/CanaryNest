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
  { id: 'dept_1', name: 'Engineering', code: 'ENG', headName: 'Alex Mercer', employeeCount: 85, description: 'Software Development & Infrastructure', status: 'Active' },
  { id: 'dept_2', name: 'Quality Assurance', code: 'QA', headName: 'Sarah Jenkins', employeeCount: 24, description: 'Quality Assurance & Testing', status: 'Active' },
  { id: 'dept_3', name: 'Human Resources', code: 'HR', headName: 'Priya Sharma', employeeCount: 15, description: 'Talent & Workplace Operations', status: 'Active' },
  { id: 'dept_4', name: 'Finance', code: 'FIN', headName: 'Amit Verma', employeeCount: 18, description: 'Financial Accounting & Payroll', status: 'Active' },
  { id: 'dept_5', name: 'Marketing', code: 'MKT', headName: 'Sneha Patil', employeeCount: 32, description: 'Brand Growth & Communications', status: 'Active' },
  { id: 'dept_6', name: 'Sales', code: 'SLS', headName: 'Vikram Singh', employeeCount: 74, description: 'Enterprise Sales & Partnerships', status: 'Active' },
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
  },
  {
    id: 'EMP002',
    employeeCode: 'EMP002',
    firstName: 'Rohan',
    lastName: 'Mehta',
    email: 'rohan.mehta@canarynest.com',
    phone: '+91 98123 45678',
    designation: 'Backend Developer',
    departmentId: 'dept_1',
    departmentName: 'Engineering',
    joiningDate: '26 May 2025',
    status: 'Active',
    location: 'Bengaluru, Karnataka',
    salary: 1200000,
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'EMP003',
    employeeCode: 'EMP003',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@canarynest.com',
    phone: '+91 98234 56789',
    designation: 'HR Executive',
    departmentId: 'dept_3',
    departmentName: 'Human Resources',
    joiningDate: '24 May 2025',
    status: 'Active',
    location: 'Mumbai, Maharashtra',
    salary: 750000,
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'EMP004',
    employeeCode: 'EMP004',
    firstName: 'Amit',
    lastName: 'Verma',
    email: 'amit.verma@canarynest.com',
    phone: '+91 98345 67890',
    designation: 'Senior Accountant',
    departmentId: 'dept_4',
    departmentName: 'Finance',
    joiningDate: '23 May 2025',
    status: 'Active',
    location: 'Delhi NCR',
    salary: 950000,
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'EMP005',
    employeeCode: 'EMP005',
    firstName: 'Sneha',
    lastName: 'Patil',
    email: 'sneha.patil@canarynest.com',
    phone: '+91 98456 78901',
    designation: 'Marketing Executive',
    departmentId: 'dept_5',
    departmentName: 'Marketing',
    joiningDate: '22 May 2025',
    status: 'Active',
    location: 'Pune, Maharashtra',
    salary: 680000,
    photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'EMP006',
    employeeCode: 'EMP006',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@canarynest.com',
    phone: '+91 98567 89012',
    designation: 'Sales Executive',
    departmentId: 'dept_6',
    departmentName: 'Sales',
    joiningDate: '21 May 2025',
    status: 'Active',
    location: 'Mumbai, Maharashtra',
    salary: 800000,
    photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
  }
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  { id: 'att_1', employeeId: 'EMP00123', employeeName: 'Rahul Patil', date: '2025-05-28', checkInTime: '09:02 AM', checkOutTime: '06:15 PM', status: 'Present', workHours: 9.2, notes: 'On Time' },
  { id: 'att_2', employeeId: 'EMP00123', employeeName: 'Rahul Patil', date: '2025-05-27', checkInTime: '09:15 AM', checkOutTime: '06:05 PM', status: 'Late', workHours: 8.8, notes: 'Traffic delay' },
  { id: 'att_3', employeeId: 'EMP00123', employeeName: 'Rahul Patil', date: '2025-05-26', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', status: 'WFH', workHours: 9.0, notes: 'Pre-approved WFH' },
  { id: 'att_4', employeeId: 'EMP002', employeeName: 'Rohan Mehta', date: '2025-05-28', checkInTime: '09:15 AM', checkOutTime: '06:30 PM', status: 'Present', workHours: 9.25 },
  { id: 'att_5', employeeId: 'EMP003', employeeName: 'Priya Sharma', date: '2025-05-28', checkInTime: '08:45 AM', checkOutTime: '05:50 PM', status: 'Present', workHours: 9.08 },
  { id: 'att_6', employeeId: 'EMP004', employeeName: 'Amit Verma', date: '2025-05-28', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', status: 'Present', workHours: 9.00 },
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
    id: 'lve_1',
    employeeId: 'EMP003',
    employeeName: 'Priya Sharma',
    leaveType: 'Casual Leave',
    startDate: '2025-06-02',
    endDate: '2025-06-04',
    totalDays: 3,
    reason: 'Family function in native town',
    status: 'Pending',
    appliedOn: '2025-05-28',
  },
  {
    id: 'lve_2',
    employeeId: 'EMP004',
    employeeName: 'Amit Verma',
    leaveType: 'Sick Leave',
    startDate: '2025-05-29',
    endDate: '2025-05-29',
    totalDays: 1,
    reason: 'Medical checkup and routine consultation',
    status: 'Pending',
    appliedOn: '2025-05-27',
  },
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
    totalEmployees: 248,
    totalGrossSalary: 5500000,
    totalDeductions: 625000,
    totalNetSalary: 4875000,
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
    content: 'We are excited to announce the annual team outing to Goa from 20th – 22nd June 2025! Stay tuned for itinerary details.',
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
    content: 'Please review the newly updated Work From Home policy effective from 1st June 2025 in the Policies tab.',
    priority: 'Medium',
    category: 'Policy',
    targetAudience: 'All',
    createdAt: '5 days ago',
    authorName: 'Admin User',
    isPinned: true,
  },
  {
    id: 'anc_3',
    title: 'Performance Appraisal 2025',
    content: 'Performance appraisal for this cycle will begin from 5th June 2025. Please submit self-appraisals on time.',
    priority: 'High',
    category: 'Performance',
    targetAudience: 'All',
    createdAt: '1 week ago',
    authorName: 'HR Manager',
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
  { id: 'pol_4', title: 'Expense Reimbursement Guidelines', category: 'Finance', description: 'Eligible business expenses, claim process, and approval SLAs.', effectiveDate: '15 Feb 2025', version: 'v2.0' },
];

export const initialCompanyAssets: CompanyAsset[] = [
  { id: 'ast_1', assetCode: 'AST-LAP-001', name: 'MacBook Pro M3 Max 16"', category: 'Laptop', serialNumber: 'C02GX901Q05D', status: 'Allocated', assignedToEmployeeId: 'EMP00123', assignedToEmployeeName: 'Rahul Patil', assignedDate: '12 Jan 2024' },
  { id: 'ast_2', assetCode: 'AST-MON-004', name: 'Dell UltraSharp 27" 4K Monitor', category: 'Monitor', serialNumber: 'CN-09876-74261', status: 'Allocated', assignedToEmployeeId: 'EMP00123', assignedToEmployeeName: 'Rahul Patil', assignedDate: '15 Jan 2024' },
  { id: 'ast_3', assetCode: 'AST-LAP-002', name: 'ThinkPad X1 Carbon Gen 11', category: 'Laptop', serialNumber: 'PF-391X29', status: 'Available' },
  { id: 'ast_4', assetCode: 'AST-MOB-001', name: 'iPhone 15 Pro 256GB', category: 'Mobile', serialNumber: 'DN-99210-91', status: 'Allocated', assignedToEmployeeId: 'EMP001', assignedToEmployeeName: 'Admin User', assignedDate: '01 Mar 2024' },
];

export const initialRecruitment: JobPosting[] = [
  { id: 'job_1', jobTitle: 'Senior React Developer', department: 'Engineering', location: 'Remote / Bengaluru', openings: 3, type: 'Full-Time', status: 'Open', postedDate: '15 May 2025' },
  { id: 'job_2', jobTitle: 'QA Automation Lead', department: 'Quality Assurance', location: 'Pune', openings: 1, type: 'Full-Time', status: 'Open', postedDate: '18 May 2025' },
  { id: 'job_3', jobTitle: 'HR Specialist', department: 'Human Resources', location: 'Mumbai', openings: 2, type: 'Full-Time', status: 'Closed', postedDate: '01 Apr 2025' },
];

export const initialCandidates: Candidate[] = [
  { id: 'cnd_1', jobId: 'job_1', jobTitle: 'Senior React Developer', name: 'Ananya Roy', email: 'ananya.roy@example.com', phone: '+91 98111 22233', experience: '5.5 Years', status: 'Interviewing', appliedDate: '18 May 2025' },
  { id: 'cnd_2', jobId: 'job_2', jobTitle: 'QA Automation Lead', name: 'Karan Patel', email: 'karan.p@example.com', phone: '+91 98222 33344', experience: '7 Years', status: 'Offered', appliedDate: '20 May 2025' },
];

export const initialDocuments: HRDocument[] = [
  { id: 'doc_1', employeeId: 'EMP00123', employeeName: 'Rahul Patil', title: 'Employment Contract', category: 'Contract', fileUrl: '#', fileName: 'Rahul_Patil_Employment_Agreement.pdf', fileSize: '2.4 MB', uploadedBy: 'HR Admin', uploadedAt: '12 Jan 2024' },
  { id: 'doc_2', employeeId: 'EMP00123', employeeName: 'Rahul Patil', title: 'Pan Card & Passport Copy', category: 'ID Proof', fileUrl: '#', fileName: 'Rahul_ID_Documents.pdf', fileSize: '1.8 MB', uploadedBy: 'Rahul Patil', uploadedAt: '13 Jan 2024' },
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
      { title: 'Sprint Delivery SLA', target: '98%', status: 'Met' }
    ],
    feedback: 'Rahul has shown stellar performance in maintaining automated QA benchmarks and team collaboration.',
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
    duration: '6 Hours (Self-paced)',
    status: 'In Progress',
    assignedEmployees: [
      { employeeId: 'EMP00123', employeeName: 'Rahul Patil', status: 'Completed' },
      { employeeId: 'EMP002', employeeName: 'Rohan Mehta', status: 'Assigned' }
    ]
  },
  {
    id: 'trn_2',
    title: 'Cybersecurity & Data Privacy (GDPR/ISO)',
    description: 'Mandatory annual compliance and data protection training for all employees.',
    category: 'Compliance',
    instructor: 'Security Ops Team',
    duration: '2 Hours',
    status: 'Upcoming',
    assignedEmployees: [
      { employeeId: 'EMP00123', employeeName: 'Rahul Patil', status: 'Assigned' }
    ]
  }
];

export const initialExpenses: ExpenseClaim[] = [
  { id: 'exp_1', employeeId: 'EMP00123', employeeName: 'Rahul Patil', category: 'Software', amount: 3499, date: '22 May 2025', description: 'JetBrains All Products License annual renewal', status: 'Approved', approvedBy: 'Admin User' },
  { id: 'exp_2', employeeId: 'EMP00123', employeeName: 'Rahul Patil', category: 'Travel', amount: 1850, date: '25 May 2025', description: 'Client meeting taxi fare Pune -> Mumbai', status: 'Pending' },
];

export const initialAuditLogs: AuditLog[] = [
  { id: 'log_1', action: 'ATTENDANCE_CHECKIN', performedBy: 'Rahul Patil', performedByEmail: 'wanipushpak71@gmail.com', details: 'Checked in at 09:02 AM from IP 115.240.12.8', timestamp: 'Today, 09:02 AM' },
  { id: 'log_2', action: 'LEAVE_APPLICATION', performedBy: 'Priya Sharma', performedByEmail: 'priya.sharma@canarynest.com', details: 'Applied for Casual Leave (3 Days)', timestamp: 'Today, 08:45 AM' },
  { id: 'log_3', action: 'PAYROLL_PROCESSED', performedBy: 'Admin User', performedByEmail: 'admin@canarynest.com', details: 'Processed May 2025 payroll for 248 employees (₹48,75,000)', timestamp: 'Yesterday, 06:30 PM' },
];

export const initialNotifications: AppNotification[] = [
  { id: 'notif_1', userId: 'admin_user_001', title: 'New Leave Request', message: 'Priya Sharma applied for 3 days Casual Leave.', link: '/admin/leaves', isRead: false, createdAt: '10 mins ago', type: 'info' },
  { id: 'notif_2', userId: 'admin_user_001', title: 'Expense Claim Submitted', message: 'Rahul Patil submitted expense claim for ₹1,850.', link: '/admin/expenses', isRead: false, createdAt: '1 hour ago', type: 'info' },
  { id: 'notif_3', userId: 'employee_user_001', title: 'Payslip Available', message: 'Your payslip for May 2025 is ready to view & download.', link: '/employee/payslips', isRead: false, createdAt: '2 hours ago', type: 'success' },
];
