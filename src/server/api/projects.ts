import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { createClientProject, getAllClientProjects, getIDWithToken, updateClientProject } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

// Wrap async functions for error handling
function wrapAsync(fn: (req: any, res: any) => Promise<any>) {
  return function(req: any, res: any, next: any) {
    fn(req, res).catch((e: Error) => {
      res.json({
        success: false,
        error: e.message,
      });
      next(e);
    });
  };
}

router.get('/', wrapAsync(async (req, res) => {
  const release = await mutex.acquire();
  try {
    const projects = await getAllClientProjects();
    if (typeof projects !== 'object') {
      throw new Error('api/projects: no projects found');
    }
    res.json({
      success: true,
      projectList: projects,
    });
  } finally {
    release();
  }
  logger.debug('res.json success in api/projects.get');
}));

router.post('/', wrapAsync(async (req, res) => {
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
    throw new Error('api/projects.post: client is not string');
  }
  if (typeof title !== 'string') {
    throw new Error('api/projects.post: title is not string');
  }
  if (typeof description !== 'string') {
    throw new Error('api/projects.post: description is not string');
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
}));

router.put('/', wrapAsync(async (req, res) => {
  if (!isObjectRecord(req.body)) {
    throw new Error('api/projects: req.body is not object');
  }
  const { id, newTitle, newDescription, newActive } = req.body;

  if (!isObjectRecord(req.cookies)) {
    throw new Error('api/projects: req.cookies is not object');
  }

  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    throw new Error('api/projects: userToken not type string');
  }

  if (typeof id !== 'number') {
    throw new Error('api/projects.put: id is not number');
  }
  if (typeof newTitle !== 'string') {
    throw new Error('api/projects.put: title is not string');
  }
  if (typeof newDescription !== 'string') {
    throw new Error('api/projects.put: description is not string');
  }
  if (typeof newActive !== 'boolean') {
    throw new Error('api/projects.put: active is not boolean');
  }

  const release = await mutex.acquire();
  try {
    const idResult = getIDWithToken(authenticationToken);
    if (typeof idResult !== 'object') {
      throw new Error('api/projects: no idResult found');
    }

    await updateClientProject(id, newTitle, newDescription, newActive);

    res.json({
      success: true,
    });
  } finally {
    release();
  }

  logger.debug('res.json success in api/projects.post');
}));

export default router;
