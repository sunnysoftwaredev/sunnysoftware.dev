import { Router as createRouter, Request, Response, NextFunction } from 'express';
import { markTokenInactive } from '../database';
import { isObjectRecord } from '../../common/utilities/types';

const router = createRouter();

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

const handleAsyncErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

router.post('/', handleAsyncErrors(async (req: Request, res: Response) => {
  if (!isObjectRecord(req.cookies)) {
    throw new BadRequestError('api/logout: req.cookies is not an object record');
  }
  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    throw new BadRequestError('api/logout: authenticationToken is not a string');
  }
  const result = await markTokenInactive(authenticationToken);

  res.clearCookie('authenticationToken', { sameSite: 'lax' });

  res.json({
    success: result,
  });
}));

// Error handling middleware for the '/logout' route
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});

export default router;
