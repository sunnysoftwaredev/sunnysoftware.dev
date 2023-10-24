import type { TimeObject, EmployeeTimesheet, IdObject, UserIdNameEmailRole, ClientProject } from '../../server/database';

export const isObjectRecord
= (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
);

export const isTimeArray = (value: unknown): value is TimeObject[] => (
  Array.isArray(value)
  && value[0] !== null
  && value[0] !== undefined
  && 'unixStart' in value[0]
  && 'unixEnd' in value[0]
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

export const isUsersArray
 = (value: unknown): value is UserIdNameEmailRole[] => (
   Array.isArray(value)
   && value[0] !== null
   && value[0] !== undefined
    && 'id' in value[0]
    && 'username' in value[0]
    && 'email' in value[0]
    && 'role' in value[0]
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
