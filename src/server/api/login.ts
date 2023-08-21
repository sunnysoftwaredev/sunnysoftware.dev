import { Router as createRouter } from 'express';
import { client } from '../database';
import type { User } from '../database';

const router = createRouter();
// for route: '/api/login'
router.post('/', (req, res) => {
  const { username }: string = req.body.username;
  const { password }: string = req.body.password;

  const result = async(): Promise<User> => {
    await client.query(`SELECT username, password
    FROM "Users" WHERE username=$1
    AND password =$2;`, [username, password]);
  };
  return (res.json(result));
});

export default router;
