import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import type { ClientProject } from '../../../server/database';
import EditProject from '../EditProject/EditProject';
import styles from './IndividualProjects.scss';

const IndividualProject: FunctionComponent<ClientProject> = ({
  id,
  title,
  description,
  active,
  username,
  email,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <div
      key={`project-${id}`}
      className={styles.project}
    >
      <div>
        <h2>{`Title: ${title}`}</h2>
        <h4>{`Active: ${active ? 'true' : 'false'}`}</h4>
      </div>
      <button
        type="button"
        onClick={() => setEditing(editState => !editState)}
      >
        More...
      </button>
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
