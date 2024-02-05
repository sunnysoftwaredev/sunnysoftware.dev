import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import {
  createClientProject,
  getAllClientProjects,
  getIDWithToken,
  updateClientProject,
} from '../database';
import logger from '../logger';

// Utility function to ensure the presence of an authentication token as a string
function assertAuthenticationToken(cookies: any): asserts cookies is { authenticationToken: string } {
  if (!isObjectRecord(cookies) || typeof cookies.authenticationToken !== 'string') {
    throw new Error('api/projects: authenticationToken is missing or not a string');
  }
}

// Utility function to ensure the object shape with string properties
function assertObjectWithStringProperties(
  object: any,
  properties: string[]
): asserts object is Record<string, string> {
  if (!isObjectRecord(object)) {
    throw new Error('api/projects: object is not an object');
  }
  for (const property of properties) {
    if (typeof object[property] !== 'string') {
      throw new Error(`api/projects: ${property} is not a string`);
    }
  }
}

function assertIsNumber(value: any, name: string): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error(`api/projects: ${name} is not a number`);
  }
}

function assertIsBoolean(value: any, name: string): asserts value is boolean {
  if (typeof value !== 'boolean') {
    throw new Error(`api/projects: ${name} is not a boolean`);
  }
}


const router = createRouter();
const mutex = new Mutex();

router.get('/', (req, res) => {
  (async (): Promise<void> => {
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
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

router.post('/', (req, res) => {
  (async (): Promise<void> => {
    assertObjectWithStringProperties(req.body, ['client', 'title', 'description']);
    assertAuthenticationToken(req.cookies);

    const { client, title, description } = req.body;
    const { authenticationToken } = req.cookies;

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

router.put('/', (req, res) => {
  (async (): Promise<void> => {
    assertObjectWithStringProperties(req.body, ['newTitle', 'newDescription']);
    assertAuthenticationToken(req.cookies);
    assertIsNumber(req.body.id, 'id');
    assertIsBoolean(req.body.newActive, 'newActive');

    const { id, newTitle, newDescription, newActive } = req.body;
    const { authenticationToken } = req.cookies;

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
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
