import { Router as createRouter, Request, Response, NextFunction } from 'express';
import logger from '../logger';
import { getUserByEmail, insertToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

interface LoginBody {
  email: string;
  password: string;
}

// Error for unauthorized access
class UnauthorizedError extends Error {
  public readonly statusCode: number;
  
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

// Separate the login logic from the route handler for better readability and error handling
async function handleLogin(req: Request, res: Response, next: NextFunction) {
  if (!isObjectRecord(req.body)) {
    throw new UnauthorizedError('api/login: req.body is not object');
  }
  const { email, password } = req.body as LoginBody;

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new UnauthorizedError('api/login: email or password not type string');
  }

  const userObject = await getUserByEmail(email);

  const {
    id: userID,
    username,
    role,
    password: passwordDB,
    salt: saltDB,
  } = userObject;

  const saltedAndHashedLoginPassword: Buffer = saltAndHash(
    password,
    Buffer.from(saltDB, 'hex')
  );
  const checkPassword = saltedAndHashedLoginPassword.toString('hex');

  if (checkPassword !== passwordDB) {
    throw new UnauthorizedError('Unable to authenticate with the provided email and password');
  }

  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 10);
  
  const token = (await generateSalt()).toString('hex');
  const tokenToDatabase = await insertToken(userID, token, expiration);
  
  res.cookie('authenticationToken', token, {
    expires: expiration,
    sameSite: 'lax',
  });

  res.json({
    success: true,
    token: tokenToDatabase,
    userId: userID,
    username,
    role,
  });
}

// Use the new handler in the login route
router.post('/', (req, res, next) => {
  handleLogin(req, res, next).catch(e => {
    if (e instanceof UnauthorizedError) {
      res.status(e.statusCode).json({
        success: false,
        error: e.message,
      });
    } else {
      next(e);
    }
  });
});

// General error handler to be used in other routes as well
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred',
  });
});

export default router;
