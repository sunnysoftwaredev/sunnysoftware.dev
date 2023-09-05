import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByUsername } from '../database';
import { isObjectRecord } from '../common/utilities/types';
import { saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/login: req.body is not object');
    }
    const { username, password } = req.body;

    if (typeof username !== 'string') {
      throw new Error('api/login: user not type string');
    }
    if (typeof password !== 'string') {
      throw new Error('api/login: password not type string');
    }

    const userObject = await getUserByUsername(username);

    const { username: usernameDB, password: passwordDB, salt: saltDB }
     = userObject;

    const saltedAndHashedPassword: Buffer = saltAndHash(
      password,
      Buffer.from(saltDB)
    );
    if (saltedAndHashedPassword.toString() === passwordDB) {
      console.log('Check on passwords is true');
    } else {
      console.log('Passwords not the same');
    }
    const finalPasswordString = saltedAndHashedPassword.toString();
    const saltString = salt.toString();

    console.log(userObject);
    // console.log(userPassword);

    res.json({
      success: true,
    });
    logger.info('res.json success in login.ts');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
