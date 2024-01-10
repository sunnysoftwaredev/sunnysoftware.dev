import type { QueryResult } from 'pg';
import { Client } from 'pg';
import { isIdArray, isObjectRecord } from '../common/utilities/types';
import config from './config';
import logger from './logger';

export const client = new Client({
  host: config.pg.host,
  port: config.pg.port,
  database: config.pg.database,
  user: config.pg.user,
  password: config.pg.password,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initializeDatabase = async(): Promise<void> => {
  await client.connect();
  logger.info('Database initialized successfully.');
};

type User = {
  username: string;
  email: string;
  password: string;
  role: string;
  salt: string;
};
export type { User };

type UserWithId = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  salt: string;
};
export type { UserWithId };

export type UserIdNameEmailRole = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export const getAllUsers = async():
Promise<UserIdNameEmailRole[]> => {
  const result: QueryResult<UserIdNameEmailRole> = await client.query(
    `SELECT id, username, email, role
    FROM users WHERE active=true`,
    [],
  );

  const { rows } = result;
  if (rows.length === 0) {
    throw new Error('Unable to select users.');
  }

  return rows;
};

export const getUserByEmail = async(emailInput: string):
Promise<UserWithId> => {
  const result: QueryResult<UserWithId> = await client.query(
    `SELECT id, username, email, password, role, salt
    FROM users
    WHERE email=$1 AND active=true`,
    [emailInput],
  );

  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select the user.');
  }
  const user: UserWithId = rows[0];
  const { id, username, email, password, role, salt } = user;

  return {
    id,
    username,
    email,
    password,
    role,
    salt,
  };
};

export type IdByEmail = {
  id: number;
};

export const getUserIdByEmail = async(userEmail: string):
Promise<number> => {
  const result: QueryResult<IdByEmail> = await client.query(
    `SELECT id
    FROM users
    WHERE email=$1 AND active=true`,
    [userEmail],
  );

  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select the user.');
  }
  const object = rows[0];
  const { id } = object;

  return id;
};

export const insertUser = async(
  username: string, email: string,
  password: string, role: string,
  salt: string
): Promise<User> => {
  await client.query(`INSERT INTO users (username, email, password, role, salt, active)
           VALUES ($1, $2, $3, $4, $5, $6)`, [username, email, password, role, salt, true]);
  return {
    username,
    email,
    password,
    role,
    salt,
  };
};

export const updateUser = async(
  id: number,
  username: string,
  email: string, role: string,
):
Promise<void> => {
  await client.query(
    `UPDATE users
  SET username=$2, email=$3, role=$4
  WHERE id=$1`,
    [id, username, email, role]
  );
};

export const deactivateUser = async(id: number):
Promise<void> => {
  await client.query(
    `UPDATE users
    SET active=false
    WHERE id=$1`,
    [id]
  );
};

export const insertToken = async(
  foreignKey: number,
  token: string, expirationDate: Date
): Promise<string> => {
  await client.query(`INSERT INTO authentication_tokens
   (user_id, token, expiration, active)
  VALUES ($1, $2, $3, $4)`, [foreignKey, token, expirationDate, true]);
  return token;
};

type ActiveStatus = {
  active: boolean;
  expiration: Date;
};
export type { ActiveStatus };

export const checkActiveToken = async(localToken: string):
Promise<boolean> => {
  const result: QueryResult<ActiveStatus> = await client.query(
    `SELECT
    active,
    expiration
    FROM authentication_tokens
    WHERE token=$1`,
    [localToken],
  );
  const { rows } = result;
  if (rows.length !== 1) {
    return false;
  }

  if (typeof rows[0].active !== 'boolean') {
    return false;
  }

  // check for expiration
  if (rows[0].active) {
    const databaseDate = rows[0].expiration;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    if (databaseDate < currentDate) {
      // set token inactive
      await client.query(`UPDATE authentication_tokens
      SET active = false
      WHERE token=$1`, [localToken]);
      return false;
    }
  }

  return rows[0].active;
};

export const markTokenInactive
= async(localToken: string): Promise<boolean> => {
  await client.query(`UPDATE authentication_tokens
  SET active = false
   WHERE token=$1`, [localToken]);
  return true;
};

type UserObject = {
  userId: number;
  username: string;
  role: string;
};

type UserRow = {
  id: number;
  username: string;
  role: string;
};

const isUserRow = (value: unknown): value is UserRow => (
  isObjectRecord(value)
    && typeof value.id === 'number'
    && typeof value.username === 'string'
    && typeof value.role === 'string'
);

export const getUser = async(localToken: string): Promise<UserObject> => {
  const result: QueryResult = await client.query(`SELECT
  users.id, users.username, users.role
  FROM users
  JOIN authentication_tokens
  ON authentication_tokens.user_id=users.id
  WHERE authentication_tokens.token=$1 AND users.active=true`, [localToken]);
  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select user.');
  }
  const row: unknown = rows[0];
  if (!isUserRow(row)) {
    throw new Error('Expected an object row');
  }
  return {
    userId: row.id,
    username: row.username,
    role: row.role,
  };
};

export type TimeObject = {
  unixStart: number;
  unixEnd: number;
};

export type TimeObjectWithProject = TimeObject & {
  projectId: number;
};

export const postWorkLog = async(
  id: number,
  unixStart: number, unixEnd: number,
  projectId: number,
):
Promise<TimeObject> => {
  await client.query(`INSERT INTO work_logs
  (user_id, unix_start,unix_end, project_id)
    VALUES ($1, $2, $3, $4)`, [id, unixStart, unixEnd, projectId]);
  return {
    unixStart,
    unixEnd,
  };
};

type ID = {
  userId: number;
};

export const getIDWithToken = async(token: string):
Promise<number> => {
  const result: QueryResult<ID> = await client.query(
    `SELECT user_id AS "userId"
    FROM authentication_tokens
    WHERE token=$1`,
    [token],
  );

  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select userId.');
  }

  const idObject: ID = rows[0];

  if (typeof idObject.userId !== 'number') {
    throw new Error('Unable to get userId from row');
  }

  const id = idObject.userId;

  return id;
};

export const getWeeklyWorkLogs = async(
  id: number,
  unixWeekStart: number, unixWeekEnd: number
):
Promise<TimeObjectWithProject[]> => {
  const result: QueryResult<TimeObjectWithProject> = await client.query(
    `SELECT unix_start AS "unixStart", unix_end AS "unixEnd",
    project_id AS "projectId"
    FROM work_logs
    WHERE user_id=$1 and unix_start >= $2 and unix_end <= $3`,
    [id, unixWeekStart, unixWeekEnd],
  );

  const { rows } = result;
  return rows;
};

export type Timesheet = {
  userId: number;
  weekStart: number;
  weekEnd: number;
  totalHours: number;
  submitted: boolean;
  invoiced: boolean;
  paid: boolean;
};

// type TimesheetWithHours = Timesheet & {
//   hoursTotal: number;
// };

export type EmployeeTimesheet = {
  username: string;
  email: string;
  hours: number;
  submitted: boolean;
  invoiced: boolean;
  paid: boolean;
};

export const getEmployeeTimesheets
 = async(unixWeekStart: number, unixWeekEnd: number):
 Promise<Timesheet[]> => {
   const result: QueryResult<Timesheet> = await client.query(
     `SELECT
     users.username,
     users.email,
     (SUM(work_logs.unix_end) - SUM(work_logs.unix_start))/3600 AS hours,
     timesheets.submitted,
     timesheets.invoiced,
     timesheets.paid
   FROM users
   INNER JOIN timesheets
    ON users.id=timesheets.user_id
    INNER JOIN work_logs
      ON work_logs.user_id=timesheets.user_id
   WHERE timesheets.week_start=$1 AND timesheets.week_end=$2 AND
   work_logs.unix_start>=$1 AND work_logs.unix_end<=$2
   AND users.role='employee' AND users.active=true
   GROUP BY users.username, users.email,
   timesheets.submitted, timesheets.invoiced, timesheets.paid;
`,
     [unixWeekStart, unixWeekEnd],
   );

   const { rows } = result;
   return rows;
 };

export const updateWorkLog = async(
  id: number,
  oldUnixStart: number,
  unixStart: number, unixEnd: number,
  projectId: number,
):
Promise<TimeObject> => {
  await client.query(
    `UPDATE work_logs
  SET unix_start = $3, unix_end=$4, project_id=$5
  WHERE user_id=$1 AND unix_start =$2`,
    [id, oldUnixStart, unixStart, unixEnd, projectId]
  );
  return {
    unixStart,
    unixEnd,
  };
};

export const deleteWorkLog = async(
  id: number,
  unixStart: number, unixEnd: number,
):
Promise<TimeObject> => {
  await client.query(
    `DELETE FROM work_logs
    WHERE user_id=$1
      and unix_start=$2
        and unix_end=$3`,
    [id, unixStart, unixEnd]
  );
  return {
    unixStart,
    unixEnd,
  };
};

type Contact = {
  contactName: string;
  email: string;
  subject: string;
  message: string;
};

export const insertContact = async(
  contactName: string, email: string,
  subject: string, message: string,
):
Promise<Contact> => {
  await client.query(`INSERT INTO contacts (contact_name, email,
     subject, message)
           VALUES ($1, $2, $3, $4)`, [contactName, email, subject, message]);
  return {
    contactName,
    email,
    subject,
    message,
  };
};

export type IdObject = {
  id: number;
};

export const getEmployeeIds = async(): Promise<number[] | undefined> => {
  const result: QueryResult<IdObject[]>
   = await client.query(`
   SELECT id
  FROM users
  WHERE role='employee' AND active=true
   `);

  const { rows } = result;

  if (isIdArray(rows)) {
    const numberArray = rows.flat().map(obj => obj.id);
    return numberArray;
  }
};

export const checkTimesheet = async(
  userId: number,
  weekStart: number, weekEnd: number
): Promise<boolean> => {
  const result = await client.query(
    `SELECT id
  FROM timesheets
  WHERE user_id=$1 AND week_start=$2 AND week_end=$3`,
    [userId, weekStart, weekEnd]
  );

  const { rows } = result;
  if (rows.length >= 1) {
    return true;
  }
  return false;
};

export const insertTimesheet = async(
  userId: number,
  weekStart: number, weekEnd: number
): Promise<void> => {
  await client.query(
    `INSERT INTO timesheets (user_id, week_start, week_end,
       submitted, invoiced, paid)
            VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId,
      weekStart,
      weekEnd,
      false,
      false,
      false]
  );
};

export const updateUserPassword = async(
  id: number,
  password: string, salt: string
):
Promise<void> => {
  await client.query(
    `UPDATE users
  SET password=$2, salt=$3
  WHERE id=$1`,
    [id, password, salt]
  );
};

export const createClientProject
 = async(id: number, title: string, description: string):
 Promise<void> => {
   await client.query(`
   INSERT INTO client_projects (client_id, title, description, active)
    VALUES ($1, $2, $3, true)
    `, [id, title, description]);
 };

export type ClientProject = {
  id: number;
  title: string;
  description: string;
  active: boolean;
  username: string;
  email: string;
};

export const getAllClientProjects = async():
Promise<ClientProject[]> => {
  const result: QueryResult<ClientProject> = await client.query(`
  SELECT
    client_projects.id, client_projects.client_id AS clientId,
    client_projects.title, client_projects.description, client_projects.active,
    users.username, users.email
  FROM client_projects
  INNER JOIN users
    ON client_projects.client_id=users.id`);

  const { rows } = result;
  return rows;
};

export const updateClientProject = async(
  id: number,
  title: string,
  description: string, active: boolean,
):
Promise<void> => {
  await client.query(
    `UPDATE client_projects
  SET title=$2, description=$3, active=$4
  WHERE id=$1`,
    [id, title, description, active]
  );
};

export const insertPasswordResetToken = async(
  foreignKey: number,
  token: string,
): Promise<void> => {
  // create expiration
  const currentUnixSeconds = Math.floor(Date.now() / 1000);
  const tenMinutesSeconds = 600;
  const expirationTime = currentUnixSeconds + tenMinutesSeconds;

  await client.query(`INSERT INTO password_reset_tokens
   (user_id, token, expiration, active)
  VALUES ($1, $2, $3, $4)`, [foreignKey, token, expirationTime, true]);
};

type ResetActiveStatus = {
  active: boolean;
  expiration: number;
};

export const checkResetTokenActive = async(resetToken: string):
Promise<boolean> => {
  const result: QueryResult<ResetActiveStatus> = await client.query(
    `SELECT
    active,
    expiration
    FROM password_reset_tokens
    WHERE token=$1`,
    [resetToken],
  );
  const { rows } = result;
  if (rows.length !== 1) {
    return false;
  }
  if (typeof rows[0].active !== 'boolean') {
    return false;
  }

  // TODO: CHECK STATUS OF THIS FUNCTION
  // check for expiration
  if (rows[0].active) {
    const unixSecondsExpiration = rows[0].expiration;
    const currentUnixSeconds = Math.floor(Date.now() / 1000);
    if (unixSecondsExpiration < currentUnixSeconds) {
      // set token inactive
      await client.query(`UPDATE password_reset_tokens
      SET active = false
      WHERE token=$1`, [resetToken]);
      return false;
    }
  }

  return rows[0].active;
};

type UserIdByResetToken = {
  userId: number;
};

export const getIdFromResetToken = async(resetToken: string):
Promise<number> => {
  const result: QueryResult<UserIdByResetToken> = await client.query(`SELECT user_id AS "userId"
    FROM password_reset_tokens
    WHERE token=$1`, [resetToken]);
  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select the user_id from resetToken in DB.');
  }

  const object = rows[0];
  const { userId } = object;

  return userId;
};

