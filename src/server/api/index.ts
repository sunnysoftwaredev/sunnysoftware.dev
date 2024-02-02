import { Router as createRouter } from 'express';

const router = createRouter();

const routes = {
  '/login': () => import('./login'),
  '/logout': () => import('./logout'),
  '/register': () => import('./register'),
  '/authenticate': () => import('./authenticate'),
  '/workLogs': () => import('./workLogs'),
  '/weeklyWorkLogs': () => import('./weeklyWorkLogs'),
  '/contacts': () => import('./contacts'),
  '/timesheets': () => import('./timesheets'),
  '/users': () => import('./users'),
  '/projects': () => import('./projects'),
  '/forgotPassword': () => import('./forgotPassword'),
};

Object.entries(routes).forEach(([path, routeModule]) => {
  routeModule().then(module => {
    router.use(path, module.default);
  });
});

export default router;
