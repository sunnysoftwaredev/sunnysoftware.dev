import { Client } from 'pg';
import config from './config';
import logger from './logger';

// Added export
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
};
export type { User };

export const getUser = async(id: string): Promise<User> => {
  const result = await client.query(
    'SELECT username, email, role FROM Users WHERE id=$1',
    [id],
  );

  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select the user.');
  }
  const row: unknown = rows[0];
  if (!Array.isArray(row)) {
    throw new Error('Unable to select the user.');
  } // Below be sure to change to correct rows and rm password after test
  const username: unknown = row[0];
  if (typeof username !== 'string') {
    throw new Error('Unable to select the user.');
  }
  const email: unknown = row[0];
  if (typeof email !== 'string') {
    throw new Error('Unable to select the user.');
  }
  const password: unknown = row[0];
  if (typeof password !== 'string') {
    throw new Error('Unable to select the user.');
  }
  const role: unknown = row[0];
  if (typeof role !== 'string') {
    throw new Error('Unable to select the user.');
  }
  return {
    username,
    email,
    password,
    role,
  };
};

export const insertUser = async(
  username: string, email: string,
  password: string, role: string
): Promise<User> => {
  await client.query(`INSERT INTO "Users" (username, email, password, role)
           VALUES ($1, $2, $3, $4)`, [username, email, password, role]);
  return {
    username,
    email,
    password,
    role,
  };
};

export const userExists = async(username: string, password: string):
Promise<boolean> => {
  const result = await client.query(
    'SELECT id FROM "Users" WHERE username=$1 AND password=$2',
    [username, password],
  );

  const { rows } = result;
  return rows.length > 0;
};
