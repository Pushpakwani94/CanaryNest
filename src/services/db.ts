import { 
  collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, 
  query, where, onSnapshot, orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import * as seedData from '../utils/seedData';
import { Employee, Department, AttendanceRecord, LeaveRequest, LeaveBalance, PayrollRecord, Payslip, HRDocument, PerformanceReview, TrainingCourse, ExpenseClaim, Announcement, Holiday, CompanyPolicy, CompanyAsset, JobPosting, Candidate, AppNotification, AuditLog, CompanySettings } from '../types';

// In-Memory Local State Backup (Pre-populated from seedData)
class LocalStore {
  users = [...seedData.initialUsers];
  employees = [...seedData.initialEmployees];
  departments = [...seedData.initialDepartments];
  attendance = [...seedData.initialAttendanceRecords];
  leaves = [...seedData.initialLeaves];
  leaveBalances = [...seedData.initialLeaveBalances];
  payroll = [...seedData.initialPayroll];
  payslips = [...seedData.initialPayslips];
  documents = [...seedData.initialDocuments];
  performance = [...seedData.initialPerformance];
  training = [...seedData.initialTraining];
  expenses = [...seedData.initialExpenses];
  announcements = [...seedData.initialAnnouncements];
  holidays = [...seedData.initialHolidays];
  policies = [...seedData.initialCompanyPolicies];
  assets = [...seedData.initialCompanyAssets];
  recruitment = [...seedData.initialRecruitment];
  candidates = [...seedData.initialCandidates];
  notifications = [...seedData.initialNotifications];
  auditLogs = [...seedData.initialAuditLogs];
  settings = { ...seedData.initialCompanySettings };
  listeners: Record<string, Set<Function>> = {};

  constructor() {
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('canarynest_db_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(this, parsed);
      }
    } catch (e) {
      console.warn("Failed to load local storage fallback", e);
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('canarynest_db_v1', JSON.stringify({
        employees: this.employees,
        departments: this.departments,
        attendance: this.attendance,
        leaves: this.leaves,
        leaveBalances: this.leaveBalances,
        payroll: this.payroll,
        payslips: this.payslips,
        documents: this.documents,
        performance: this.performance,
        training: this.training,
        expenses: this.expenses,
        announcements: this.announcements,
        holidays: this.holidays,
        policies: this.policies,
        assets: this.assets,
        recruitment: this.recruitment,
        candidates: this.candidates,
        notifications: this.notifications,
        auditLogs: this.auditLogs,
        settings: this.settings,
      }));
    } catch (e) {
      console.warn("Failed to save to local storage", e);
    }
  }

  notify(key: string) {
    this.saveToLocalStorage();
    if (this.listeners[key]) {
      this.listeners[key].forEach(fn => fn(this[key as keyof LocalStore]));
    }
  }

  subscribe(key: string, callback: Function) {
    if (!this.listeners[key]) this.listeners[key] = new Set();
    this.listeners[key].add(callback);
    callback(this[key as keyof LocalStore]);
    return () => this.listeners[key]?.delete(callback);
  }
}

export const localStore = new LocalStore();

export const dataService = {
  // Check if live Firestore is active
  isLive: () => isFirebaseConfigured && db !== null,

  // Employees
  getEmployees: (callback: (data: Employee[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'employees'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
        callback(list.length > 0 ? list : localStore.employees);
      }, () => callback(localStore.employees));
    }
    return localStore.subscribe('employees', callback);
  },

  addEmployee: async (emp: Omit<Employee, 'id'>) => {
    const id = 'EMP' + Math.floor(100 + Math.random() * 900);
    const newEmp: Employee = { ...emp, id, employeeCode: id };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'employees', id), newEmp);
    }
    localStore.employees = [newEmp, ...localStore.employees];
    localStore.notify('employees');
    dataService.logAudit('CREATE_EMPLOYEE', `Added employee ${newEmp.firstName} ${newEmp.lastName} (${id})`);
    return newEmp;
  },

  updateEmployee: async (id: string, updates: Partial<Employee>) => {
    if (dataService.isLive() && db) {
      await updateDoc(doc(db, 'employees', id), updates);
    }
    localStore.employees = localStore.employees.map(e => e.id === id ? { ...e, ...updates } : e);
    localStore.notify('employees');
    dataService.logAudit('UPDATE_EMPLOYEE', `Updated employee ${id}`);
  },

  deleteEmployee: async (id: string) => {
    if (dataService.isLive() && db) {
      await deleteDoc(doc(db, 'employees', id));
    }
    localStore.employees = localStore.employees.filter(e => e.id !== id);
    localStore.notify('employees');
    dataService.logAudit('DELETE_EMPLOYEE', `Deleted employee ${id}`);
  },

  // Attendance
  getAttendance: (callback: (data: AttendanceRecord[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'attendance'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceRecord));
        callback(list.length > 0 ? list : localStore.attendance);
      }, () => callback(localStore.attendance));
    }
    return localStore.subscribe('attendance', callback);
  },

  checkIn: async (employeeId: string, employeeName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = 'att_' + Date.now();
    const newRecord: AttendanceRecord = {
      id,
      employeeId,
      employeeName,
      date: today,
      checkInTime: timeStr,
      status: 'Present',
      notes: 'Mobile Check-In',
    };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'attendance', id), newRecord);
    }
    localStore.attendance = [newRecord, ...localStore.attendance];
    localStore.notify('attendance');
    dataService.logAudit('ATTENDANCE_CHECKIN', `${employeeName} checked in at ${timeStr}`);
    return newRecord;
  },

  checkOut: async (attendanceId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updates = { checkOutTime: timeStr, workHours: 8.5 };
    if (dataService.isLive() && db) {
      await updateDoc(doc(db, 'attendance', attendanceId), updates);
    }
    localStore.attendance = localStore.attendance.map(a => a.id === attendanceId ? { ...a, ...updates } : a);
    localStore.notify('attendance');
    dataService.logAudit('ATTENDANCE_CHECKOUT', `Clocked out at ${timeStr}`);
  },

  // Leaves
  getLeaves: (callback: (data: LeaveRequest[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'leaves'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeaveRequest));
        callback(list.length > 0 ? list : localStore.leaves);
      }, () => callback(localStore.leaves));
    }
    return localStore.subscribe('leaves', callback);
  },

  applyLeave: async (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => {
    const id = 'lve_' + Date.now();
    const newLeave: LeaveRequest = {
      ...leave,
      id,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'leaves', id), newLeave);
    }
    localStore.leaves = [newLeave, ...localStore.leaves];
    localStore.notify('leaves');
    dataService.logAudit('LEAVE_APPLIED', `${leave.employeeName} applied for ${leave.leaveType}`);
    return newLeave;
  },

  updateLeaveStatus: async (id: string, status: 'Approved' | 'Rejected', comment?: string, adminName: string = 'Admin User') => {
    const updates = { status, comment, approvedBy: adminName };
    if (dataService.isLive() && db) {
      await updateDoc(doc(db, 'leaves', id), updates);
    }
    localStore.leaves = localStore.leaves.map(l => l.id === id ? { ...l, ...updates } : l);
    localStore.notify('leaves');
    dataService.logAudit('LEAVE_STATUS_UPDATE', `Leave request ${id} ${status.toLowerCase()} by ${adminName}`);
  },

  // Departments
  getDepartments: (callback: (data: Department[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'departments'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Department));
        callback(list.length > 0 ? list : localStore.departments);
      }, () => callback(localStore.departments));
    }
    return localStore.subscribe('departments', callback);
  },

  addDepartment: async (dept: Omit<Department, 'id'>) => {
    const id = 'dept_' + Date.now();
    const newDept: Department = { ...dept, id };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'departments', id), newDept);
    }
    localStore.departments = [newDept, ...localStore.departments];
    localStore.notify('departments');
    return newDept;
  },

  // Expenses
  getExpenses: (callback: (data: ExpenseClaim[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'expenses'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExpenseClaim));
        callback(list.length > 0 ? list : localStore.expenses);
      }, () => callback(localStore.expenses));
    }
    return localStore.subscribe('expenses', callback);
  },

  addExpense: async (exp: Omit<ExpenseClaim, 'id' | 'status'>) => {
    const id = 'exp_' + Date.now();
    const newExp: ExpenseClaim = { ...exp, id, status: 'Pending' };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'expenses', id), newExp);
    }
    localStore.expenses = [newExp, ...localStore.expenses];
    localStore.notify('expenses');
    return newExp;
  },

  updateExpenseStatus: async (id: string, status: 'Approved' | 'Rejected', adminName: string = 'Admin User') => {
    const updates = { status, approvedBy: adminName };
    if (dataService.isLive() && db) {
      await updateDoc(doc(db, 'expenses', id), updates);
    }
    localStore.expenses = localStore.expenses.map(e => e.id === id ? { ...e, ...updates } : e);
    localStore.notify('expenses');
  },

  // Announcements
  getAnnouncements: (callback: (data: Announcement[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'announcements'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
        callback(list.length > 0 ? list : localStore.announcements);
      }, () => callback(localStore.announcements));
    }
    return localStore.subscribe('announcements', callback);
  },

  addAnnouncement: async (anc: Omit<Announcement, 'id' | 'createdAt'>) => {
    const id = 'anc_' + Date.now();
    const newAnc: Announcement = { ...anc, id, createdAt: 'Just now' };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'announcements', id), newAnc);
    }
    localStore.announcements = [newAnc, ...localStore.announcements];
    localStore.notify('announcements');
    return newAnc;
  },

  // Holidays
  getHolidays: (callback: (data: Holiday[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'holidays'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Holiday));
        callback(list.length > 0 ? list : localStore.holidays);
      }, () => callback(localStore.holidays));
    }
    return localStore.subscribe('holidays', callback);
  },

  addHoliday: async (hol: Omit<Holiday, 'id'>) => {
    const id = 'hol_' + Date.now();
    const newHol: Holiday = { ...hol, id };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'holidays', id), newHol);
    }
    localStore.holidays = [...localStore.holidays, newHol];
    localStore.notify('holidays');
    return newHol;
  },

  // Assets
  getAssets: (callback: (data: CompanyAsset[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'assets'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CompanyAsset));
        callback(list.length > 0 ? list : localStore.assets);
      }, () => callback(localStore.assets));
    }
    return localStore.subscribe('assets', callback);
  },

  addAsset: async (ast: Omit<CompanyAsset, 'id'>) => {
    const id = 'ast_' + Date.now();
    const newAsset: CompanyAsset = { ...ast, id };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'assets', id), newAsset);
    }
    localStore.assets = [newAsset, ...localStore.assets];
    localStore.notify('assets');
    return newAsset;
  },

  // Documents
  getDocuments: (callback: (data: HRDocument[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'documents'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HRDocument));
        callback(list.length > 0 ? list : localStore.documents);
      }, () => callback(localStore.documents));
    }
    return localStore.subscribe('documents', callback);
  },

  addDocument: async (docData: Omit<HRDocument, 'id' | 'uploadedAt'>) => {
    const id = 'doc_' + Date.now();
    const newDoc: HRDocument = { ...docData, id, uploadedAt: new Date().toISOString().split('T')[0] };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'documents', id), newDoc);
    }
    localStore.documents = [newDoc, ...localStore.documents];
    localStore.notify('documents');
    return newDoc;
  },

  // Payslips & Payroll
  getPayslips: (callback: (data: Payslip[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'payslips'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payslip));
        callback(list.length > 0 ? list : localStore.payslips);
      }, () => callback(localStore.payslips));
    }
    return localStore.subscribe('payslips', callback);
  },

  getPayroll: (callback: (data: PayrollRecord[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'payroll'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PayrollRecord));
        callback(list.length > 0 ? list : localStore.payroll);
      }, () => callback(localStore.payroll));
    }
    return localStore.subscribe('payroll', callback);
  },

  // Audit Log Tracker
  logAudit: async (action: string, details: string, performedBy: string = 'Current User', performedByEmail: string = 'user@canarynest.com') => {
    const log: AuditLog = {
      id: 'log_' + Date.now(),
      action,
      performedBy,
      performedByEmail,
      details,
      timestamp: new Date().toLocaleString(),
    };
    if (dataService.isLive() && db) {
      await setDoc(doc(db, 'auditLogs', log.id), log);
    }
    localStore.auditLogs = [log, ...localStore.auditLogs];
    localStore.notify('auditLogs');
  },

  getAuditLogs: (callback: (data: AuditLog[]) => void) => {
    if (dataService.isLive() && db) {
      return onSnapshot(collection(db, 'auditLogs'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditLog));
        callback(list.length > 0 ? list : localStore.auditLogs);
      }, () => callback(localStore.auditLogs));
    }
    return localStore.subscribe('auditLogs', callback);
  }
};
