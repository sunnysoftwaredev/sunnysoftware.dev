import { Router as createRouter } from 'express';
import login from './login';
import logout from './logout';
import register from './register';
import authenticate from './authenticate';

const router = createRouter();

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/authenticate', authenticate);

export default router;
