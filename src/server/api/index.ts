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
import projects from './projects';
import forgotPassword from './forgotPassword';

const router = createRouter();

const routes = {
  '/login': login,
  '/logout': logout,
  '/register': register,
  '/authenticate': authenticate,
  '/workLogs': workLogs,
  '/weeklyWorkLogs': weeklyWorkLogs,
  '/contacts': contacts,
  '/timesheets': timesheets,
  '/users': users,
  '/projects': projects,
  '/forgotPassword': forgotPassword,
};

Object.entries(routes).forEach(([path, handler]) => {
  router.use(path, handler);
});

export default router;
