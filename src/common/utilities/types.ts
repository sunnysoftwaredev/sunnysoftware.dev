import type { EmployeeTimesheet, IdObject, UserIdNameEmailRole, ClientProject, TimeObjectWithProject } from '../../server/database';

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
  && value.every((item) => item !== null && item !== undefined && 'id' in item)
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

export const isUsersArray
 = (value: unknown): value is UserIdNameEmailRole[] => (
   Array.isArray(value)
   && value.every((item) => 
        item !== null &&
        item !== undefined &&
        'id' in item &&
        'username' in item &&
        'email' in item &&
        'role' in item
      )
 );

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

export const isClientProjectArray
 = (value: unknown): value is ClientProject[] => (
   Array.isArray(value)
  && value.every(isClientProject)
 );
