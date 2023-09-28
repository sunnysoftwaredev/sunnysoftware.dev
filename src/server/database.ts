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
    'SELECT id, username, email, password, role, salt FROM "Users" WHERE username=$1',
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
  await client.query(`INSERT INTO "Users" (username, email, password, role, salt)
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
  await client.query(`INSERT INTO "AuthenticationTokens"
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
    FROM "AuthenticationTokens"
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
      await client.query(`UPDATE "AuthenticationTokens"
      SET active = false
      WHERE token=$1`, [localToken]);
      return false;
    }
  }

  return rows[0].active;
};

export const markTokenInactive
= async(localToken: string): Promise<boolean> => {
  await client.query(`UPDATE "AuthenticationTokens"
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
  "Users".username, "Users".role
  FROM "Users"
  JOIN "AuthenticationTokens"
  ON "AuthenticationTokens".user_id="Users".id
  WHERE "AuthenticationTokens".token=$1`, [localToken]);

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

type workLog = {
  unixStart: number;
  unixEnd: number;
  submitted: boolean;
  invoiced: boolean;
  paid: boolean;
};

export const postWorkLog = async(
  id: number,
  unixStart: number, unixEnd: number,
):
Promise<workLog> => {
  await client.query(`INSERT INTO "WorkLogs" (user_id, unix_start,
     unix_end, submitted, invoiced, paid)
           VALUES ($1, $2, $3, $4, $5, $6)`, [id, unixStart, unixEnd, false, false, false]);
  return {
    unixStart,
    unixEnd,
    submitted: false,
    invoiced: false,
    paid: false,
  };
};

type ID = {
  userId: number;
};

export const getIDWithToken = async(token: string):
Promise<number> => {
  const result: QueryResult<ID> = await client.query(
    `SELECT user_id AS "userId"
    FROM "AuthenticationTokens"
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

export type timeObject = {
  unixStart: number;
  unixEnd: number;
};

export const getWeeklyLogs = async(
  id: number,
  unixWeekStart: number, unixWeekEnd: number
):
Promise<timeObject[]> => {
  const result: QueryResult<timeObject> = await client.query(
    `SELECT unix_start AS "unixStart", unix_end AS "unixEnd"
    FROM "WorkLogs"
    WHERE user_id=$1 and unix_start >= $2 and unix_end <= $3`,
    [id, unixWeekStart, unixWeekEnd],
  );

  const { rows } = result;
  return rows;
};
