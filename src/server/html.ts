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

async function authenticateUser(authenticationToken: string, store: ReturnType<typeof configureStore>) {
  if (!authenticationToken) {
    return; // No authentication possible without a token
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
}

export default (req: ExpressRequest, res: ExpressResponse): void => {
  const store = configureStore({ reducer, });
  
  (async(): Promise<void> => {
    if (!isObjectRecord(req.cookies)) {
      res.status(400).send('Invalid cookie format');
      return;
    }

    const { authenticationToken = null } = req.cookies;
    try {
      await authenticateUser(authenticationToken as string, store);
    } catch (e: unknown) {
      // User not authenticated, continue with default state
    }
    res.send(createHtml(JSON.stringify(store.getState())));
  })().catch((error) => {
    res.status(500).send('An error occurred while preparing the application state');
  });
};
