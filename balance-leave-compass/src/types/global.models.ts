// Users
export type Role = "Admin" | "Manager" | "Employee";

export interface authInitialState {
  status: boolean;
  userData: User | null;
  userRole: string | null;
  token: string | null;
  loading: boolean;
}

export interface Manager {
  email: string;
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: Role;
  manager?: Manager;
  managerId?: number;
  createdAt: string;
  updatedAt?: string | null;
}

// Leaves
export type LeaveType = "Annual" | "Sick" | "Personal";

export interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
}

export interface Leave {
  id: number;
  title: string;
  startDate: string; // ISO string
  endDate: string;
  type: LeaveType;
  isHalfDay: boolean;
  reason: string;
}
