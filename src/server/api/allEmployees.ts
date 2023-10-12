import { Router as createRouter } from 'express';
import { isObjectRecord } from '../../common/utilities/types';
import { getAllEmployees, getIDWithToken } from '../database';

const router = createRouter();

router.get('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/allEmployees: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/allEmployees: userToken not type string');
    }

    const idResult = getIDWithToken(authenticationToken);
    if (typeof idResult !== 'object') {
      throw new Error('api/allEmployees: no idResult found');
    }

    const employeesArray = await getAllEmployees();

    res.json({
      success: true,
      employees: employeesArray,
    });
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
