import type { TimeObject, EmployeeTimesheet, IdObject, UserIdNameEmailRole } from '../../server/database';

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

export const isEmployeeTimesheetArray
 = (value: unknown): value is EmployeeTimesheet[] => (
   Array.isArray(value)
  && value[0] !== null
  && value[0] !== undefined
  && 'hours' in value[0]
  && 'submitted' in value[0]
  && 'invoiced' in value[0]
  && 'paid' in value[0]
  && 'username' in value[0]
  && 'email' in value[0]
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
