import { Router as createRouter } from 'express';
import { isObjectRecord } from '../../common/utilities/types';
import { compareTokens, getUserRole } from '../database';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/authenticate: req.cookies is not object');
    }
    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/logout: userToken not type string');
    }

    const tokensSame = await compareTokens(authenticationToken);

    if (!tokensSame) {
      throw new Error('User authentication has failed');
    }

    const role = await getUserRole(authenticationToken);

    res.json({
      success: tokensSame,
      userRole: role,
      tokenValue: tokensSame,
    });
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;

