import { Router as createRouter } from 'express';
import login from './login';
import logout from './logout';
import register from './register';
import authenticate from './authenticate';
import workLogs from './workLogs';
import weeklyWorkLogs from './weeklyWorkLogs';
import contacts from './contacts';
import timesheets from './timesheets';
import users from './users';

const router = createRouter();

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/authenticate', authenticate);
router.use('/workLogs', workLogs);
router.use('/weeklyWorkLogs', weeklyWorkLogs);
router.use('/contacts', contacts);
router.use('/timesheets', timesheets);
router.use('/users', users);

export default router;
