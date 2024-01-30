import type { EmployeeTimesheet, IdObject, UserIdNameEmailRoleActivePhone, ClientProject, TimeObjectWithProject } from '../../server/database';

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

export type Project = {
  id: number;
  clientId: number;
  title: string;
  description: string;
  active: boolean;
  startDate: number;
  status: string;
};

const isProject
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'clientId' in currentValue
  && 'title' in currentValue
  && 'description' in currentValue
  && 'active' in currentValue
 );

export const isProjectArray
 = (value: unknown): value is Project[] => (
   Array.isArray(value)
  && value.every(isProject)
 );

// below is currently used in ManageProjects.tsx and
// WorkCalendar.tsx: may no longer be relevant/needed
const isClientProject
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'title' in currentValue
  && 'description' in currentValue
  && 'active' in currentValue
  && 'username' in currentValue
  && 'email' in currentValue
 );

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
  active: boolean;
  userId: number;
};

const isProjectWithEmployeeId
 = (currentValue: Record<string, unknown>): boolean => (
   isObjectRecord(currentValue)
  && 'id' in currentValue
  && 'clientId' in currentValue
  && 'title' in currentValue
  && 'description' in currentValue
  && 'active' in currentValue
  && 'userId' in currentValue
 );

export const isProjectWithEmployeeIdArray
 = (value: unknown): value is ProjectWithEmployeeId[] => (
   Array.isArray(value)
  && value.every(isProjectWithEmployeeId)
 );

