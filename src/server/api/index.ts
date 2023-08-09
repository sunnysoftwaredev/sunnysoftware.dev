import { Router as createRouter } from 'express';
import login from './login';
import logout from './logout';
import register from './register';

const router = createRouter();

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);

export default router;
