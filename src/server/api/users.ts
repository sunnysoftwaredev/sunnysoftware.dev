import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { getAllUsers } from '../database';

const router = createRouter();
const mutex = new Mutex();

router.get('/', (req, res) => {
  (async(): Promise<void> => {
    const release = await mutex.acquire();
    try {
      const result = await getAllUsers();
      if (typeof result !== 'object') {
        throw new Error('api/users: no result found');
      }
      res.json({
        success: true,
        usersArray: result,
      });
    } finally {
      release();
    }
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
