import { Router as createRouter } from 'express';
import { markTokenInactive } from '../database';
import { isObjectRecord } from '../../common/utilities/types';

const router = createRouter();

router.get('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/login: req.body is not object');
    }
    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/logout: userToken not type string');
    }
    const result = await markTokenInactive(authenticationToken);
    // clear cookie locally
    res.clearCookie('authenticationToken');
    // redirect to home page after logout
    res.redirect('/');
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
