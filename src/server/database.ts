import { Client } from 'pg';
import config from './config';
import logger from './logger';

const client = new Client({
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
  id: string;
  username: string;
  email: string;
};

export const getUser = async(id: string): Promise<User> => {
  const result = await client.query(
    'SELECT username, email FROM Users WHERE id=$1',
    [id],
  );
  const { rows } = result;
  if (rows.length !== 1) {
    throw new Error('Unable to select the user.');
  }
  const row: unknown = rows[0];
  if (!Array.isArray(row)) {
    throw new Error('Unable to select the user.');
  }
  const username: unknown = row[0];
  if (typeof username !== 'string') {
    throw new Error('Unable to select the user.');
  }
  const email: unknown = row[0];
  if (typeof email !== 'string') {
    throw new Error('Unable to select the user.');
  }
  return {
    id,
    username,
    email,
  };
};
