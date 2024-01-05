import { Router as createRouter } from 'express';
import { isObjectRecord } from '../../common/utilities/types';
import { checkActiveToken, getUsernameAndRole } from '../database';

const router = createRouter();

const handleAuthenticate = async (req, res): Promise<void> => {
  try {
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/authenticate: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/authenticate: userToken not type string');
    }

    const tokenActive = await checkActiveToken(authenticationToken);

    if (!tokenActive) {
      throw new Error('User authentication has failed');
    }

    const { username, role } = await getUsernameAndRole(authenticationToken);

    res.json({
      username,
      role,
      active: tokenActive,
    });
  } catch (e: Error) {
    res.json({
      success: false,
      error: e.message,
    });
  }
};

router.post('/', handleAuthenticate);

export default router;