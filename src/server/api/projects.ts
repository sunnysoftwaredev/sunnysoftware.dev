import { Router as createRouter, Request, Response, NextFunction } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { createClientProject, getAllClientProjects, getIDWithToken, updateClientProject } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

function validateRequestBody(req: Request, res: Response, next: NextFunction) {
  if (!isObjectRecord(req.body)) {
    res.status(400).json({ success: false, error: 'Request body is not an object' });
  } else {
    next();
  }
}

function validateCookies(req: Request, res: Response, next: NextFunction) {
  if (!isObjectRecord(req.cookies)) {
    res.status(400).json({ success: false, error: 'Cookies are not an object' });
  } else {
    next();
  }
}

function validateAuthenticationToken(req: Request, res: Response, next: NextFunction) {
  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    res.status(400).json({ success: false, error: 'Authentication token must be a string' });
  } else {
    next();
  }
}

router.get('/', [validateRequestBody, validateCookies, validateAuthenticationToken], (req, res) => {
  (async(): Promise<void> => {
    const release = await mutex.acquire();
    try {
      const projects = await getAllClientProjects();
      if (typeof projects !== 'object') {
        throw new Error('No projects found');
      }
      res.json({
        success: true,
        projectList: projects,
      });
    } finally {
      release();
    }
    logger.debug('res.json success in api/projects.get');
  })().catch((e: Error) => {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  });
});

router.post('/', [validateRequestBody, validateCookies, validateAuthenticationToken], (req, res) => {
  (async(): Promise<void> => {
    const { client, title, description } = req.body;

    const { authenticationToken } = req.cookies;
    
    const id = Number(client);
    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      if (typeof idResult !== 'object') {
        throw new Error('No idResult found');
      }

      await createClientProject(id, title, description);

      res.json({ success: true });
    } finally {
      release();
    }
    logger.debug('res.json success in api/projects.post');
  })().catch((e: Error) => {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  });
});

router.put('/', [validateRequestBody, validateCookies, validateAuthenticationToken], (req, res) => {
  (async(): Promise<void> => {
    const { id, newTitle, newDescription, newActive } = req.body;

    const { authenticationToken } = req.cookies;
    
    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      if (typeof idResult !== 'object') {
        throw new Error('No idResult found');
      }

      await updateClientProject(id, newTitle, newDescription, newActive);

      res.json({ success: true });
    } finally {
      release();
    }
    logger.debug('res.json success in api/projects.put');
  })().catch((e: Error) => {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
