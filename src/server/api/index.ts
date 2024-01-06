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

const routes = [
  { path: '/login', handler: login },
  { path: '/logout', handler: logout },
  { path: '/register', handler: register },
  { path: '/authenticate', handler: authenticate },
  { path: '/workLogs', handler: workLogs },
  { path: '/weeklyWorkLogs', handler: weeklyWorkLogs },
  { path: '/contacts', handler: contacts },
  { path: '/timesheets', handler: timesheets },
  { path: '/users', handler: users },
  { path: '/projects', handler: projects },
  { path: '/forgotPassword', handler: forgotPassword },
];

routes.forEach(route => {
  router.use(route.path, route.handler);
});

export default router;
