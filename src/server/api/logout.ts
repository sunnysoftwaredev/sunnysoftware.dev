import { Router as createRouter } from 'express';
import { markTokenInactive } from '../database';
import { isObjectRecord } from '../../common/utilities/types';

const router = createRouter();

const handleLogout = async (req, res) => {
  if (!isObjectRecord(req.cookies)) {
    throw new Error('api/logout: req.cookies is not an object');
  }
  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    throw new Error('api/logout: authenticationToken not of type string');
  }
  const result = await markTokenInactive(authenticationToken);

  res.clearCookie('authenticationToken', { sameSite: 'lax' });
  
  return result;
};

router.post('/', (req, res) => {
  handleLogout(req, res)
    .then(result => {
      res.json({
        success: result,
      });
    })
    .catch((e: Error) => {
      res.json({
        success: false,
        error: e.message,
      });
    });
});

export default router;
