import type { EmployeeTimesheet, IdObject, UserIdNameEmailRoleActivePhone, TimeObjectWithProject, ProjectWeek } from '../../server/database';

export const isObjectRecord
= (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
);

export const isTimeObjectWithProject
 = (value: unknown): value is TimeObjectWithProject => (
   isObjectRecord(value)
  && 'unixStart' in value
  && 'unixEnd' in value
  && 'projectId' in value
 );

export const isTimeObjectWithProjectArray
= (value: unknown): value is TimeObjectWithProject[] => (
  Array.isArray(value)
 && value.every(isTimeObjectWithProject)
);

export const isIdArray = (value: unknown): value is IdObject[] => (
  Array.isArray(value)
  && value[0] !== null
  && value[0] !== undefined
  && 'id' in value[0]
);

const isEmployeeTimesheet
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'hours' in currentValue
  && 'submitted' in currentValue
  && 'invoiced' in currentValue
  && 'paid' in currentValue
  && 'username' in currentValue
  && 'email' in currentValue
 );

export const isEmployeeTimesheetArray
 = (value: unknown): value is EmployeeTimesheet[] => (
   Array.isArray(value)
  && value.every(isEmployeeTimesheet)
 );

// add in 'reason' column?
export const isUsersArray
 = (value: unknown): value is UserIdNameEmailRoleActivePhone[] => (
   Array.isArray(value)
   && value[0] !== null
   && value[0] !== undefined
    && 'id' in value[0]
    && 'username' in value[0]
    && 'email' in value[0]
    && 'role' in value[0]
    && 'active' in value[0]
    && 'phone' in value[0]
 );

export type ProjectAndBilling = {
  id: number;
  clientId: number;
  title: string;
  description: string;
  startDate: number;
  status: string;
  totalBilling: number;
};

const isProjectAndBilling
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'clientId' in currentValue
  && 'title' in currentValue
  && 'description' in currentValue
  && 'startDate' in currentValue
  && 'status' in currentValue
  && 'totalBilling' in currentValue
 );

export const isProjectArray
 = (value: unknown): value is ProjectAndBilling[] => (
   Array.isArray(value)
  && value.every(isProjectAndBilling)
 );

export const isProjectWeek
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'projectId' in currentValue
  && 'weekStart' in currentValue
  && 'weekEnd' in currentValue
  && 'invoiced' in currentValue
  && 'invoiceLink' in currentValue
  && 'billingStatus' in currentValue
 );

export const isProjectWeekArray
 = (value: unknown): value is ProjectWeek[] => (
   Array.isArray(value)
  && value.every(isProjectWeek)
 );

export type WorkLogsWithEmployee = {
  id: number;
  unixStart: number;
  unixEnd: number;
  hourlyRate: number;
  userId: number;
  username: string;
  email: string;
  role: string;
  active: boolean;
  phone: string;
  userHourlyRate: number;
};

export const isWorkLogWithEmployee
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'unixStart' in currentValue
  && 'unixEnd' in currentValue
  && 'hourlyRate' in currentValue
  && 'userId' in currentValue
  && 'username' in currentValue
  && 'email' in currentValue
  && 'role' in currentValue
  && 'active' in currentValue
  && 'phone' in currentValue
  && 'userHourlyRate' in currentValue
 );

export const isWorkLogWithEmployeeArray
 = (value: unknown): value is WorkLogsWithEmployee[] => (
   Array.isArray(value)
  && value.every(isWorkLogWithEmployee)
 );

export type EmployeesForProject = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
  hourlyRate: number;
  totalHours: number;

};

export const isEmployeesForProject
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'username' in currentValue
  && 'email' in currentValue
  && 'phone' in currentValue
  && 'role' in currentValue
  && 'active' in currentValue
  && 'hourlyRate' in currentValue
  && 'totalHours' in currentValue
 );

export const isEmployeesForProjectArray
 = (value: unknown): value is EmployeesForProject[] => (
   Array.isArray(value)
  && value.every(isEmployeesForProject)
 );

// below is currently used in ManageProjects.tsx and
// WorkCalendar.tsx: may no longer be relevant/needed
const isClientProject
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'title' in currentValue
  && 'description' in currentValue
  && 'start' in currentValue
  && 'username' in currentValue
  && 'email' in currentValue
 );

// TEMP to stop errors
export type ClientProject = {
  id: number;
  clientId: number;
  title: string;
  description: string;
  startDate: number;
  status: string;
  userId: number;
  active: boolean;
  username: string;
  email: string;
};

// see above
export const isClientProjectArray
 = (value: unknown): value is ClientProject[] => (
   Array.isArray(value)
  && value.every(isClientProject)
 );

export type ProjectWithEmployeeId = {
  id: number;
  clientId: number;
  title: string;
  description: string;
  startDate: number;
  status: string;
  userId: number;
};

const isProjectWithEmployeeId
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'clientId' in currentValue
  && 'title' in currentValue
  && 'description' in currentValue
  && 'startDate' in currentValue
  && 'status' in currentValue
  && 'userId' in currentValue
 );

export const isProjectWithEmployeeIdArray
 = (value: unknown): value is ProjectWithEmployeeId[] => (
   Array.isArray(value)
  && value.every(isProjectWithEmployeeId)
 );

