// User and Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  todayAttendance: number;
  recentActivities: Activity[];
  upcomingEvents: Event[];
}

export interface Activity {
  id: string;
  type: 'attendance' | 'grade' | 'assignment' | 'announcement';
  message: string;
  timestamp: Date;
  user: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'exam' | 'assignment' | 'holiday' | 'meeting';
}

// Academic Types
export interface Class {
  id: string;
  name: string;
  grade: number;
  section: string;
  teacher: Teacher;
  capacity: number;
  academicYear: string;
  studentCount: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  class: Class;
  teacher: Teacher;
}

export interface Teacher {
  id: string;
  user: User;
  employeeId: string;
  department: string;
  subject: string;
  qualification?: string;
  experience?: number;
  salary?: number;
  joinDate: Date;
}

export interface Student {
  id: string;
  user: User;
  studentId: string;
  rollNumber: string;
  class: Class;
  section: string;
  admissionDate: Date;
  dateOfBirth: Date;
  address: string;
  parent?: Parent;
}

export interface Parent {
  id: string;
  user: User;
  occupation?: string;
  relationship: string;
  address: string;
  children: Student[];
}

// Attendance Types
export interface Attendance {
  id: string;
  date: Date;
  status: AttendanceStatus;
  student: Student;
  class: Class;
  teacher: Teacher;
  remarks?: string;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED'
}

export interface AttendanceReport {
  studentId: string;
  studentName: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  percentage: number;
}

// Grading Types
export interface Grade {
  id: string;
  student: Student;
  subject: Subject;
  teacher: Teacher;
  examType: ExamType;
  marks: number;
  maxMarks: number;
  grade: string;
  gpa?: number;
  examDate: Date;
  remarks?: string;
}

export enum ExamType {
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
  MIDTERM = 'MIDTERM',
  FINAL = 'FINAL',
  PROJECT = 'PROJECT'
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  class: Class;
  subject: Subject;
  teacher: Teacher;
  dueDate: Date;
  maxMarks: number;
  attachments: string[];
  submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignment: Assignment;
  student: Student;
  content?: string;
  attachments: string[];
  marks?: number;
  feedback?: string;
  submittedAt: Date;
  gradedAt?: Date;
}

// Communication Types
export interface Message {
  id: string;
  sender: User;
  receiver: User;
  subject: string;
  content: string;
  isRead: boolean;
  attachments: string[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  user: User;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
}

export enum NotificationType {
  ASSIGNMENT = 'ASSIGNMENT',
  GRADE = 'GRADE',
  ATTENDANCE = 'ATTENDANCE',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  FEE = 'FEE',
  GENERAL = 'GENERAL'
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  class?: Class;
  teacher: Teacher;
  priority: Priority;
  isActive: boolean;
  attachments: string[];
  createdAt: Date;
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

// Fee Types
export interface FeeRecord {
  id: string;
  student: Student;
  feeType: FeeType;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: FeeStatus;
  remarks?: string;
}

export enum FeeType {
  TUITION = 'TUITION',
  LIBRARY = 'LIBRARY',
  LABORATORY = 'LABORATORY',
  SPORTS = 'SPORTS',
  TRANSPORT = 'TRANSPORT',
  EXAMINATION = 'EXAMINATION',
  OTHER = 'OTHER'
}

export enum FeeStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  WAIVED = 'WAIVED'
}

// File Upload Types
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: User;
  category: FileCategory;
  createdAt: Date;
}

export enum FileCategory {
  ASSIGNMENT = 'ASSIGNMENT',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  DOCUMENT = 'DOCUMENT',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  OTHER = 'OTHER'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
