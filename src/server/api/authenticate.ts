import { Router as createRouter } from 'express';
import { isObjectRecord } from '../../common/utilities/types';
import { checkActiveToken, getUser } from '../database';

const router = createRouter();

// Send a structured JSON response for errors
const sendErrorResponse = (res, message: string) => {
  res.json({
    success: false,
    error: message,
  });
};

router.post('/', async (req, res) => {
  try {
    if (!isObjectRecord(req.cookies)) {
      sendErrorResponse(res, 'api/authenticate: req.cookies is not object');
      return;
    }
    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      sendErrorResponse(res, 'api/authenticate: authenticationToken not type string');
      return;
    }

    const tokenActive = await checkActiveToken(authenticationToken);
    if (!tokenActive) {
      sendErrorResponse(res, 'User authentication has failed');
      return;
    }

    const { username, role } = await getUser(authenticationToken);

    res.json({
      username,
      role,
      active: tokenActive,
      success: true,
    });
  } catch (e) {
    sendErrorResponse(res, e instanceof Error ? e.message : 'An unexpected error occurred');
  }
});

export default router;
