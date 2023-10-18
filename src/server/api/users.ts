import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { deleteUser, getAllUsers, updateUser } from '../database';
import { isObjectRecord } from '../../common/utilities/types';

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

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/users: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/users: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/users: userToken not type string');
    }
    const { id } = req.body;
    const { newUsername } = req.body;
    const { newEmail } = req.body;
    const { newRole } = req.body;

    if (typeof id !== 'number') {
      throw new Error('api/users.post: unixStart is not number');
    }
    if (typeof newUsername !== 'string') {
      throw new Error('api/users.post: unixStart is not string');
    }
    if (typeof newEmail !== 'string') {
      throw new Error('api/users.post: unixEnd is not string');
    }
    if (typeof newRole !== 'string') {
      throw new Error('api/users.post: unixEnd is not string');
    }

    const release = await mutex.acquire();
    try {
      await updateUser(id, newUsername, newEmail, newRole);
      res.json({
        success: true,

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

router.delete('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/users: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/users: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/users: userToken not type string');
    }
    const { id } = req.body;

    if (typeof id !== 'number') {
      throw new Error('api/users.post: unixStart is not number');
    }

    const release = await mutex.acquire();
    try {
      await deleteUser(id);
      res.json({
        success: true,

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
