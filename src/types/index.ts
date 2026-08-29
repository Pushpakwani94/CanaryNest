export type UserRole = 'HR_ADMIN' | 'EMPLOYEE';

export interface UserProfile {
  uid: string;
  email: string;
  password?: string;
  role: UserRole;
  employeeId: string; // Linked employee ID
  displayName: string;
  photoURL?: string;
  createdAt?: string;
}

export interface Employee {
  id: string;
  uid?: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  initialPassword?: string;
  phone: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  joiningDate: string;
  status: 'Active' | 'Probation' | 'On Leave' | 'Inactive';
  location: string;
  salary: number;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  photoURL?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  employeeCount: number;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkInTime: string; // HH:mm AM/PM
  checkOutTime?: string;
  status: 'Present' | 'Absent' | 'On Leave' | 'Late' | 'WFH';
  workHours?: number;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Casual Leave' | 'Sick Leave' | 'Privilege Leave' | 'Comp Off';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  approvedBy?: string;
  comment?: string;
}

export interface LeaveBalance {
  id: string;
  employeeId: string;
  casualLeave: { total: number; used: number; available: number };
  sickLeave: { total: number; used: number; available: number };
  privilegeLeave: { total: number; used: number; available: number };
  compOff: { total: number; used: number; available: number };
}

export interface PayrollRecord {
  id: string;
  monthYear: string; // e.g. "May 2025"
  totalEmployees: number;
  totalGrossSalary: number;
  totalDeductions: number;
  totalNetSalary: number;
  status: 'Draft' | 'Processed' | 'Paid';
  processedDate?: string;
}

export interface Payslip {
  id: string;
  payrollId: string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  designation: string;
  department: string;
  monthYear: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  pfDeduction: number;
  taxDeduction: number;
  netSalary: number;
  status: 'Paid' | 'Pending';
  paymentDate: string;
  generatedAt: string;
}

export interface HRDocument {
  id: string;
  employeeId?: string;
  employeeName?: string;
  title: string;
  category: 'Contract' | 'ID Proof' | 'Certificate' | 'Tax' | 'Company Policy';
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  cycle: string; // e.g. "Q1 2025"
  selfRating: number; // 1-5
  managerRating?: number; // 1-5
  kpis: Array<{ title: string; target: string; status: 'Met' | 'In Progress' | 'Exceeded' }>;
  feedback?: string;
  status: 'Self Assessment' | 'Under Review' | 'Completed';
  updatedLast: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  assignedEmployees: Array<{ employeeId: string; employeeName: string; status: 'Assigned' | 'Completed' }>;
}

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  category: 'Travel' | 'Meals' | 'Software' | 'Office Supplies' | 'Other';
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  targetAudience: 'All' | 'HR_ADMIN' | 'EMPLOYEE';
  createdAt: string;
  authorName: string;
  isPinned?: boolean;
}

export interface Holiday {
  id: string;
  title: string;
  date: string;
  dayOfWeek: string;
  type: 'Gazetted' | 'Restricted' | 'Optional';
  icon?: string;
}

export interface CompanyPolicy {
  id: string;
  title: string;
  category: string;
  description: string;
  effectiveDate: string;
  documentUrl?: string;
  version: string;
}

export interface CompanyAsset {
  id: string;
  assetCode: string;
  name: string;
  category: 'Laptop' | 'Monitor' | 'Mobile' | 'Peripheral' | 'Other';
  serialNumber: string;
  status: 'Available' | 'Allocated' | 'In Repair' | 'Retired';
  assignedToEmployeeId?: string;
  assignedToEmployeeName?: string;
  assignedDate?: string;
}

export interface JobPosting {
  id: string;
  jobTitle: string;
  department: string;
  location: string;
  openings: number;
  type: 'Full-Time' | 'Part-Time' | 'Contract';
  status: 'Open' | 'Closed' | 'Draft';
  postedDate: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  status: 'Applied' | 'Screening' | 'Interviewing' | 'Offered' | 'Hired' | 'Rejected';
  resumeUrl?: string;
  appliedDate: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  performedByEmail: string;
  details: string;
  target?: string;
  timestamp: string;
}

export interface CompanySettings {
  id: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  address: string;
  workingDays: string;
  checkInTime: string;
  checkOutTime: string;
  currency: string;
  logoUrl?: string;
}
