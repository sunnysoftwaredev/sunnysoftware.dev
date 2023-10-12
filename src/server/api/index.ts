import { Router as createRouter } from 'express';
import login from './login';
import logout from './logout';
import register from './register';
import authenticate from './authenticate';
import workLogs from './workLogs';
import weeklyLogs from './weeklyLogs';
import contacts from './contacts';
import allWeeklyLogs from './allWeeklyLogs';
import allEmployees from './allEmployees';

const router = createRouter();

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/authenticate', authenticate);
router.use('/workLogs', workLogs);
router.use('/weeklyLogs', weeklyLogs);
router.use('/contacts', contacts);
router.use('/allWeeklyLogs', allWeeklyLogs);
router.use('/allEmployees', allEmployees);

export default router;
