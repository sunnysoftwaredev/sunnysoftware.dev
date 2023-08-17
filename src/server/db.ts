import type { Options } from 'postgres';
import postgres from 'postgres';
import 'dotenv/config';

const connection: Options<Record<string, postgres.PostgresType>> = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT!),
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  ssl: 'require',
};

const sql = postgres('postgres://username:password@host:port/database', connection);

// create table if not exists

// thows 't' not defined error, lint errors on PendingQuery types, expression
// expected error, and usersTableExist before being assigned
// const tableExistPromise = new Promise<boolean>((resolve, reject) => {
//   const usersTableExist: postgres.PendingQuery<postasync gres.Row[]> = sql`
// SELECT EXISTS (
//   SELECT FROM
//       pg_tables
//   WHERE
//       schemaname = 'public' AND
//       tablename  = 'users'
//   ); `;

//   if (await usersTableExist) {
//     resolve('table found');
//   } else {
//     reject('table not found');
//   }
// });

// tableExistPromise.then((result) => {
//   if (result === false) {

//   }
// });

// first function works, second throws linter error: "Promises
// must be handled appropriately or explicitly marked as ignored"
const usersTableExist: postgres.PendingQuery<postgres.Row[]> = sql`
SELECT EXISTS (
  SELECT FROM
      pg_tables
  WHERE
      schemaname = 'public' AND
      tablename  = 'users'
  ); `;

usersTableExist.then((result) => {
  if (result[0].exists !== false) {
    Sql`
      CREATE TABLE users ( user_id integer CONSTRAINT PRIMARY KEY,
        username string NOT NULL,
        email string NOT NULL
      ) `;
  }
}).catch(Error);

// Below throws linter error due to use of console commands
//       .catch((err) => {
//         console.log('Error creating table:', err);
//       });
//   }
// }).catch((err) => {
//   console.log('Error checking if table exists:', err);
// });

// queires as functions , returns object back

// define db.create.user

// create definitions for typescript of types
// type User = {
//   username: string;
//   email: string;
// };

// assertions on types returned from API endpoints (will be any type/unknown)
// if type of user.username is not string, throw error as ex.

export default sql;

