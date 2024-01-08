import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import logger from '../../../server/logger';
import { isClientProjectArray, isObjectRecord } from '../../../common/utilities/types';
import type { ClientProject } from '../../../server/database';
import IndividualProject from '../IndividualProjects/IndividualProjects';
import styles from './ManageProjects.scss';

const ManageProjects: FunctionComponent = () => {
  const [activeProjects, setActiveProjects] = useState<ClientProject[]>([]);
  const [inactiveProjects, setInactiveProjects] = useState<ClientProject[]>([]);

  const compareObjects = (a: ClientProject, b: ClientProject): number => {
    return a.title.localeCompare(b.title);
  };

  const getProjects = useCallback(async() => {
    try {
      const response = await fetch('api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ManageProjects.tsx');
      }

      const { projectList } = result;
      if (isClientProjectArray(projectList)) {
        const activeProjectList
         = projectList.filter(project => project.active);
        const sortedActive = activeProjectList.sort(compareObjects);

        const inactiveProjectList
         = projectList.filter(project => !project.active);
        const sortedInactive = inactiveProjectList.sort(compareObjects);

        setActiveProjects(sortedActive);
        setInactiveProjects(sortedInactive);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    getProjects().catch((err) => {
      logger.error(err);
    });
  }, [getProjects]);

  const displayProjects = (listOfProjects: ClientProject[]):
  React.ReactElement[] => {
    if (typeof listOfProjects === 'undefined') {
      return [<div key={0} />];
    }
    const projectElements: React.ReactElement[] = [];

    for (const project of listOfProjects) {
      const { id } = project;
      const { title } = project;
      const { description } = project;
      const { active } = project;
      const { username } = project;
      const { email } = project;

      projectElements.push((
        <div
          key={`project-${id}`}
        >
          <IndividualProject
            id={id}
            title={title} description={description}
            active={active}
            username={username} email={email}
          />
        </div>));
    }
    return projectElements;
  };
  return (
    <div className={styles.ManageProjectsContainer}>
      <h1>List of Projects</h1>
      <h2>Active projects: </h2>
      <div>
        {displayProjects(activeProjects)}
      </div>
      <h2>Inactive projects: </h2>
      <div>
        {displayProjects(inactiveProjects)}
      </div>
    </div>

  );
};

export default ManageProjects;
