import { Router as createRouter } from 'express';
import { markTokenInactive } from '../database';
import { isObjectRecord } from '../../common/utilities/types';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/login: req.body is not object');
    }
    const { authenticationToken: userToken } = req.cookies;
    if (typeof userToken !== 'string') {
      throw new Error('api/logout: userToken not type string');
    }
    const result = await markTokenInactive(userToken);

    res.clearCookie('authenticationToken', { sameSite: 'lax' });

    res.json({
      success: result,
    });
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
