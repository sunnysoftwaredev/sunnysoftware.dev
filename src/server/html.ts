import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { configureStore } from '@reduxjs/toolkit';
import { isObjectRecord } from '../common/utilities/types';
import { AccountActions } from '../client/redux/slices/account';
import { reducer } from '../client/redux/slices';
import { checkActiveToken, getUser } from './database';

const createHtml = (state: string): string => (
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">
    </div>
    <script>
      window.__INITIAL_STATE__ = ${state};
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>`
);

export default (req: ExpressRequest, res: ExpressResponse): void => {
  const store = configureStore({ reducer });

  (async (): Promise<void> => {
    try {
      if (!isObjectRecord(req.cookies)) {
        throw new Error('html: req.cookies is not object');
      }

      const { authenticationToken } = req.cookies;
      if (typeof authenticationToken !== 'string') {
        throw new Error('Expected authenticationToken to be a string');
      }

      const tokenActive = await checkActiveToken(authenticationToken);
      if (!tokenActive) {
        throw new Error('User authentication has failed');
      }

      const { userId, username, role } = await getUser(authenticationToken);
      store.dispatch(AccountActions.logIn({
        userId,
        username,
        role,
      }));
    } catch (e: unknown) {
      // User not authenticated or other errors
    } finally {
      res.send(createHtml(JSON.stringify(store.getState())));
    }
  })();
};
