import type { QueryResult } from 'pg';
import { Client } from 'pg';
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

export const getUserByUsername = async(usernameInput: string):
Promise<UserWithId> => {
  const result: QueryResult<UserWithId> = await client.query(
    'SELECT id, username, email, password, role, salt FROM users WHERE username=$1',
    [usernameInput],
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

export const insertUser = async(
  username: string, email: string,
  password: string, role: string,
  salt: string
): Promise<User> => {
  await client.query(`INSERT INTO users (username, email, password, role, salt)
           VALUES ($1, $2, $3, $4, $5)`, [username, email, password, role, salt]);
  return {
    username,
    email,
    password,
    role,
    salt,
  };
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

type nameRoleObject = {
  username: string;
  role: string;
};

export const getUsernameAndRole
= async(localToken: string): Promise<nameRoleObject> => {
  const result: QueryResult<nameRoleObject> = await client.query(`SELECT
  users.username, users.role
  FROM users
  JOIN authentication_tokens
  ON authentication_tokens.user_id=users.id
  WHERE authentication_tokens.token=$1`, [localToken]);

  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select user role.');
  }
  const roleJSON: nameRoleObject = rows[0];
  const { username, role } = roleJSON;

  return {
    username,
    role,
  };
};

export type TimeObject = {
  unixStart: number;
  unixEnd: number;
};

export const postWorkLog = async(
  id: number,
  unixStart: number, unixEnd: number,
):
Promise<TimeObject> => {
  await client.query(`INSERT INTO work_logs
  (user_id, unix_start,unix_end)
    VALUES ($1, $2, $3)`, [id, unixStart, unixEnd]);
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

export const getWeeklyLogs = async(
  id: number,
  unixWeekStart: number, unixWeekEnd: number
):
Promise<TimeObject[]> => {
  const result: QueryResult<TimeObject> = await client.query(
    `SELECT unix_start AS "unixStart", unix_end AS "unixEnd"
    FROM work_logs
    WHERE user_id=$1 and unix_start >= $2 and unix_end <= $3`,
    [id, unixWeekStart, unixWeekEnd],
  );

  const { rows } = result;
  return rows;
};

export type AllWeeklyLogs = {
  unixStart: number;
  unixEnd: number;
  submitted: boolean;
  invoiced: boolean;
  paid: boolean;
  username: string;
  email: string;
  id: number;
};

// deprecated
export const getAllWeeklyLogs
 = async(unixWeekStart: number, unixWeekEnd: number):
 Promise<AllWeeklyLogs[]> => {
   const result: QueryResult<AllWeeklyLogs> = await client.query(
     `SELECT work_logs.unix_start AS "unixStart", work_logs.unix_end AS "unixEnd",
      work_logs.submitted, work_logs.invoiced, work_logs.paid, users.username,
      users.email, users.id
    FROM work_logs
    JOIN users ON work_logs.user_id = users.id
    WHERE unix_start >= $1 and unix_end <= $2`,
     [unixWeekStart, unixWeekEnd],
   );

   const { rows } = result;
   return rows;
 };

export const updateWorkLog = async(
  id: number,
  oldUnixStart: number,
  unixStart: number, unixEnd: number,
):
Promise<TimeObject> => {
  await client.query(
    `UPDATE work_logs
  SET unix_start = $3, unix_end=$4
  WHERE user_id=$1 AND unix_start =$2`,
    [id, oldUnixStart, unixStart, unixEnd]
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

type IdUserEmail = {
  id: number;
  username: string;
  email: string;
};
export const getAllEmployees = async(): Promise<IdUserEmail[]> => {
  const result: QueryResult<IdUserEmail>
   = await client.query(`SELECT id, username, email
  FROM users
  WHERE role='employee'
   `);

  const { rows } = result;
  return rows;
};

type Timesheet = {
  unixStart: number;
  unixEnd: number;
  submitted: boolean;
  invoiced: boolean;
  paid: boolean;
  userId: number;
};

type TimesheetWithHours = Timesheet & {
  hoursTotal: number;
};

export const checkTimesheet = async(
  userId: number,
  weekStart: number, weekEnd: number
): Promise<boolean> => {
  const result = await client.query(
    `SELECT id
  FROM timesheets
  WHERE user_id=$1, week_start=$2, week_end=$3`,
    [userId, weekStart, weekEnd]
  );

  const { rows } = result;
  if (rows.length === 1) {
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
      total_hours, submitted, invoiced, paid)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [userId,
      weekStart,
      weekEnd,
      0.0,
      false,
      false,
      false]
  );
};

export const selectTimesheet = async(
  userId: number,
  weekStart: number, weekEnd: number
): Promise<void> => {
  await client.query(
    `SELECT week_start, week_end,
    total_hours, submitted, invoiced, paid
    FROM timesheets
    WHERE user_id=$1, week_start=$2, week_end=$3
`,
    [userId,
      weekStart,
      weekEnd]
  );
};
