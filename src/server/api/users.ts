import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { activateUser, deactivateUser, getAllUsers, getIDWithToken, updateUser, updateUserPassword } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

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
    const { id, newUsername, newEmail, newPhone, newRole } = req.body;

    if (typeof id !== 'number') {
      throw new Error('api/users.post: id is not number');
    }
    if (typeof newUsername !== 'string') {
      throw new Error('api/users.post: newUsername is not string');
    }
    if (typeof newEmail !== 'string') {
      throw new Error('api/users.post: newEmail is not string');
    }
    if (typeof newPhone !== 'string') {
      throw new Error('api/users.post: newPhone is not string');
    }
    if (typeof newRole !== 'string') {
      throw new Error('api/users.post: newRole is not string');
    }

    const release = await mutex.acquire();
    try {
      await updateUser(id, newUsername, newEmail, newPhone, newRole);
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

router.post('/activate', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/users/activate: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/users/activate: req.cookies is not object');
    }
    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/user/sactivate: userToken not type string');
    }
    const { id } = req.body;

    if (typeof id !== 'number') {
      throw new Error('api/users/activate.post: id is not number');
    }

    const release = await mutex.acquire();
    try {
      await activateUser(id);
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
router.post('/deactivate', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/users/deactivate: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/users/deactivate: req.cookies is not object');
    }
    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/users/deactivate: userToken not type string');
    }
    const { id, reason } = req.body;

    if (typeof id !== 'number') {
      throw new Error('api/users/deactivate.post: id is not number');
    }
    if (typeof reason !== 'string') {
      throw new Error('api/users/deactivate.post: reason is not string');
    }

    const release = await mutex.acquire();
    try {
      await deactivateUser(id, reason);
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

router.post('/password', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/users/password: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/users/password: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/users/password: userToken not type string');
    }

    const { password } = req.body;

    if (typeof password !== 'string') {
      throw new Error('api/users/password.post: password is not string');
    }

    const release = await mutex.acquire();
    try {
      const idResult = await getIDWithToken(authenticationToken);

      const salt = await generateSalt();
      const saltedAndHashedPassword = saltAndHash(password, salt);
      const finalPasswordString = saltedAndHashedPassword.toString('hex');
      const saltString = salt.toString('hex');

      await updateUserPassword(idResult, finalPasswordString, saltString);
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
