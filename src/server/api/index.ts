import { Router as createRouter } from 'express';
import login from './login';
import logout from './logout';
import register from './register';
import authenticate from './authenticate';
import workLogs from './workLogs';

const router = createRouter();

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/authenticate', authenticate);
router.use('/workLogs', workLogs);

export default router;
