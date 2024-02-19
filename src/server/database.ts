import type { QueryResult } from 'pg';
import { Client } from 'pg';
import type { ProjectAndBilling, ProjectWithEmployeeId } from '../common/utilities/types';
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
  phone: string;
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

export type UserIdNameEmailRoleActivePhone = {
  id: number;
  username: string;
  email: string;
  role: string;
  active: boolean;
  phone?: string;
  reason?: string;
};

export const getAllUsers = async():
Promise<UserIdNameEmailRoleActivePhone[]> => {
  const result: QueryResult<UserIdNameEmailRoleActivePhone>
   = await client.query(
     `SELECT id, username, email, role, active, phone, reason_for_deactivation AS reason
    FROM users`,
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
  phone: string, role: string,
  password: string, salt: string
): Promise<User> => {
  await client.query(`INSERT INTO users (username, email, phone, role, password, salt, active)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`, [username, email, phone, role, password, salt, true]);
  return {
    username,
    email,
    password,
    phone,
    role,
    salt,
  };
};

export const updateUser = async(
  id: number, username: string,
  email: string, phone: string,
  role: string,
):
Promise<void> => {
  await client.query(
    `UPDATE users
  SET username=$2, email=$3, phone=$4, role=$5
  WHERE id=$1`,
    [id, username, email, phone, role]
  );
};

export const deactivateUser = async(id: number, reason: string):
Promise<void> => {
  await client.query(
    `UPDATE users
    SET active=false, reason_for_deactivation=$2
    WHERE id=$1`,
    [id, reason]
  );
};

export const activateUser = async(id: number):
Promise<void> => {
  await client.query(
    `UPDATE users
    SET active=true
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

export type ProjectWeek = {
  projectId: number;
  weekStart: number;
  weekEnd: number;
  invoiced: boolean;
  invoiceLink: string;
  billingStatus: boolean;
};

export const getProjectWeek = async(
  projectId: number,
  unixWeekStart: number, unixWeekEnd: number
):
Promise<ProjectWeek[]> => {
  const result: QueryResult<ProjectWeek> = await client.query(
    `SELECT
      id,
      project_id AS "projectId",
      week_start AS "weekStart",
      week_end AS "weekEnd",
      invoiced,
      invoice_link AS "invoiceLink",
      billing_status AS "billingStatus"
    FROM project_week
    WHERE project_id=$1 and week_start=$2 and week_end=$3`,
    [projectId, unixWeekStart, unixWeekEnd],
  );

  const { rows } = result;
  return rows;
};

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

export const getWorkLogsForProjectWeek = async(
  projectId: number,
  unixWeekStart: number, unixWeekEnd: number
):
Promise<WorkLogsWithEmployee[]> => {
  const result: QueryResult<WorkLogsWithEmployee> = await client.query(
    `SELECT
    wl.id,
    wl.unix_start AS "unixStart",
    wl.unix_end AS "unixEnd",
    wl.hourly_rate AS "hourlyRate",
    u.id AS "userId",
    u.username,
    u.email,
    u.role,
    u.active,
    u.phone,
    u.hourly_rate AS "userHourlyRate"
    FROM
        work_logs wl
    JOIN
        users u ON wl.user_id = u.id
    WHERE
    wl.project_id = $1
    AND wl.unix_start >= $2
    AND wl.unix_end <= $3;`,
    [projectId, unixWeekStart, unixWeekEnd],
  );

  const { rows } = result;
  return rows;
};

export type EmployeeWithTotalHours = {
  userId: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
  hourlyRate: number;
  totalHours: number;
};

export const getProjectUsersWithTotalHours = async(projectId: number):
Promise<EmployeeWithTotalHours[]> => {
  const result: QueryResult<EmployeeWithTotalHours> = await client.query(
    `SELECT
    u.id,
    u.username,
    u.email,
    u.phone,
    u.role,
    u.active,
    u.hourly_rate AS "hourlyRate",
    SUM(duration_seconds)/ 3600 AS "totalHours"
FROM (
    SELECT
        wl.id,
        wl.unix_start AS "unixStart",
        wl.unix_end,
        wl.user_id,
        wl.project_id,
        (wl.unix_end - wl.unix_start ) AS duration_seconds
    FROM
        work_logs wl
    WHERE
        wl.project_id = $1
) AS subquery
JOIN
    users u ON u.id = subquery.user_id
GROUP BY
    u.id, u.username, u.email, u.phone, u.role, u.active, u.hourly_rate;`,
    [projectId],
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

export const checkProjectWeek = async(
  projectId: number,
  weekStart: number, weekEnd: number
): Promise<boolean> => {
  const result = await client.query(
    `SELECT id
  FROM project_week
  WHERE project_id=$1 AND week_start=$2 AND week_end=$3`,
    [projectId, weekStart, weekEnd]
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

export const insertProjectWeek = async(
  projectId: number,
  weekStart: number, weekEnd: number
): Promise<void> => {
  await client.query(
    `INSERT INTO project_week (project_id, week_start, week_end,
      invoiced, invoice_link, billing_status)
            VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      projectId,
      weekStart,
      weekEnd,
      false,
      '',
      false,
    ]
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
 = async(
   clientId: number, title: string,
   description: string, projectStatus: string
 ):
 Promise<void> => {
   const currentUnixSeconds = Math.floor(Date.now() / 1000);
   await client.query(`
   INSERT INTO client_projects (
    client_id, title, description,
     active, start_date, status)
    VALUES ($1, $2, $3, true, $4, $5)
    `, [clientId, title, description, currentUnixSeconds, projectStatus]);
 };

export type ClientProject = {
  id: number;
  title: string;
  description: string;
  active: boolean;
  username: string;
  email: string;
};

// Function to get projects with clients attached-may not need
// export const getAllClientProjects = async():
// Promise<ClientProject[]> => {
//   const result: QueryResult<ClientProject> = await client.query(`
//   SELECT
//     client_projects.id, client_projects.client_id AS clientId,
//   client_projects.title, client_projects.description, client_projects.active,
//     users.username, users.email
//   FROM client_projects
//   INNER JOIN users
//     ON client_projects.client_id=users.id`);

//   const { rows } = result;
//   return rows;
// };

export const getAllProjects = async():
Promise<ProjectAndBilling[]> => {
  const result: QueryResult<ProjectAndBilling> = await client.query(`
  SELECT cp.id, cp.client_id AS "clientId", cp.title, cp.description,
  cp.start_date AS "startDate", cp.status, SUM(wl.hourly_rate) AS "totalBilling"
  FROM client_projects cp
  LEFT JOIN work_logs wl ON cp.id = wl.project_id
  GROUP BY cp.id`);

  const { rows } = result;
  return rows;
};

export const getProjectsWithEmployeeId = async():
Promise<ProjectWithEmployeeId[]> => {
  const result: QueryResult<ProjectWithEmployeeId> = await client.query(`
  SELECT
    p.id,
    p.client_id "clientId",
    p.title,
    p.description,
    p.start_date "startDate",
    p.status,
    u.id "userId"
FROM client_projects p
INNER JOIN
  users_projects_junction upj ON p.id = upj.project_id
INNER JOIN
  users u ON u.id = upj.user_id`);

  const { rows } = result;
  return rows;
};

export const updateClientProject = async(
  id: number, newClientId: number,
  newTitle: string, newDescription: string,
  newStartDate: number, newProjectStatus: string,
):
Promise<void> => {
  await client.query(
    `UPDATE client_projects
    SET client_id=$2, title=$3, description=$4, start_date=$5, status=$6
    WHERE id=$1`,
    [id,
      newClientId,
      newTitle,
      newDescription,
      newStartDate,
      newProjectStatus]
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

export const updateProjectAssignments
 = async(userId: number, projectIds: number[]):
 Promise<undefined> => {
   if (projectIds.length === 0) {
     await client.query(`
      DELETE FROM users_projects_junction
      WHERE user_id = $1;
    `, [userId]);
   } else {
     await client.query(`
    DELETE FROM users_projects_junction
     WHERE user_id = $1
     AND project_id NOT IN (${projectIds.map((value, index) => `$${index + 2}`).join(', ')});
     `, [userId, ...projectIds]);
   }

   if (projectIds.length !== 0) {
     await client.query(`
    INSERT INTO users_projects_junction
    (user_id, project_id)
    VALUES
    ${projectIds.map((value, index) => `($1, $${index + 2})`).join(', ')}
    ON CONFLICT (user_id, project_id) DO NOTHING
  `, [userId, ...projectIds]);
   }
 };

export const updateEmployeesAssignedToProject
 = async(projectId: number, employeeIds: number[]):
 Promise<undefined> => {
   if (employeeIds.length === 0) {
     await client.query(`
      DELETE FROM users_projects_junction
      WHERE project_id = $1;
    `, [projectId]);
   } else {
     await client.query(`
    DELETE FROM users_projects_junction
     WHERE project_id = $1
     AND project_id NOT IN (${employeeIds.map((value, index) => `$${index + 2}`).join(', ')});
     `, [projectId, ...employeeIds]);
   }

   if (employeeIds.length !== 0) {
     await client.query(`
    INSERT INTO users_projects_junction
    (project_id, user_id)
    VALUES
    ${employeeIds.map((value, index) => `($1, $${index + 2})`).join(', ')}
    ON CONFLICT (project_id, user_id) DO NOTHING
  `, [projectId, ...employeeIds]);
   }
 };

