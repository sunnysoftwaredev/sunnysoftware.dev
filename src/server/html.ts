```typescript
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
  const store = configureStore({
    reducer,
  });

  if (!isObjectRecord(req.cookies)) {
    res.status(400).send('Bad Request: Cookies must be an object.');
    return;
  }

  const { authenticationToken } = req.cookies;

  if (!authenticationToken) {
    res.status(401).send('Unauthorized: Missing authentication token.');
    return;
  }

  if (typeof authenticationToken !== 'string') {
    res.status(400).send('Bad Request: Authentication token must be a string.');
    return;
  }
  
  (async (): Promise<void> => {
    try {
      const tokenActive = await checkActiveToken(authenticationToken);
      if (!tokenActive) {
        throw new Error('Invalid or expired authentication token.');
      }
      const { userId, username, role } = await getUser(authenticationToken);
      store.dispatch(AccountActions.logIn({
        userId,
        username,
        role,
      }));
    } catch (e) {
      res.status(401).send('Unauthorized: ' + e.message); // Or log the error internally, send a generic message to the client if appropriate
      return;
    }
    res.send(createHtml(JSON.stringify(store.getState())));
  })();
};
```
