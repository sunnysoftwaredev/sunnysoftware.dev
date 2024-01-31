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

  const compareProjects = (a: ClientProject, b: ClientProject): number => (
    a.title.localeCompare(b.title)
  );

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
        const sortedActive = activeProjectList.sort(compareProjects);

        const inactiveProjectList
         = projectList.filter(project => !project.active);
        const sortedInactive = inactiveProjectList.sort(compareProjects);

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

  const displayProjects = (listOfProjects: ClientProject[]): React.ReactElement[] => {
    return listOfProjects?.map(project => (
      <div key={`project-${project.id}`}>
        <IndividualProject
          id={project.id}
          title={project.title}
          description={project.description}
          active={project.active}
          username={project.username}
          email={project.email}
        />
      </div>
    )) ?? [<div key={0} />];
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
