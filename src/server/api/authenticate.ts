import { Router as createRouter, Request, Response, NextFunction } from 'express';
import { isObjectRecord } from '../../common/utilities/types';
import { checkActiveToken, getUser } from '../database';

const router = createRouter();

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (!isObjectRecord(req.cookies)) {
    return res.status(400).json({
      success: false,
      error: 'api/authenticate: req.cookies is not object',
    });
  }

  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'api/authenticate: authenticationToken not type string',
    });
  }

  try {
    const tokenActive = await checkActiveToken(authenticationToken);

    if (!tokenActive) {
      return res.status(401).json({
        success: false,
        error: 'User authentication has failed',
      });
    }

    const user = await getUser(authenticationToken);
    res.locals.user = user;
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    });
  }
};

router.post('/', authenticate, (req, res) => {
  const { username, role } = res.locals.user;
  res.json({
    username,
    role,
    active: true,
  });
});

export default router;
