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
   (user_id, token, expiration)
  VALUES ($1, $2, $3)`, [foreignKey, token, expirationDate]);
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
    'SELECT active, expiration FROM "AuthenticationTokens" WHERE token=$1',
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
      SET active = true WHERE token=$1`, [localToken]);
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
