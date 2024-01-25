import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
// import { isObjectRecord } from '../../../common/utilities/types';
// import logger from '../../../server/logger';
import type { ClientProject } from '../../../server/database';
import EditProject from '../EditProject/EditProject';
import styles from './IndividualProjects.scss';

const IndividualProject: FunctionComponent<ClientProject> = (props) => {
  const { id, title, description, active, username, email } = props;

  const [editing, setEditing] = useState(false);

  const toggleEditing = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  return (
    <div
      key={`project-${id}`}
      className={styles.project}
    >
      <div>
        <h2>
          {`Title: ${title}`}
        </h2>
        <h4>
          {'Active: '}
          {' '}
          {active ? 'true' : 'false'}
        </h4>
      </div>
      <button type="button" onClick={toggleEditing}>More...</button>
      {editing && (
        <EditProject
          id={id}
          title={title}
          description={description}
          active={active}
          username={username}
          email={email}
        />
      )}
    </div>
  );
};

export default IndividualProject;
