import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { createClientProject, getIDWithToken } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/projects: req.body is not object');
    }
    const { client, title, description } = req.body;

    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/projects: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/projects: userToken not type string');
    }

    if (typeof client !== 'string') {
      throw new Error('api/projects.post: unixStart is not string');
    }
    if (typeof title !== 'string') {
      throw new Error('api/projects.post: unixEnd is not string');
    }
    if (typeof description !== 'string') {
      throw new Error('api/projects.post: unixEnd is not string');
    }

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      if (typeof idResult !== 'object') {
        throw new Error('api/projects: no idResult found');
      }

      const id = Number(client);
      await createClientProject(id, title, description);

      res.json({
        success: true,
      });
    } finally {
      release();
    }

    logger.debug('res.json success in api/projects.post');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
