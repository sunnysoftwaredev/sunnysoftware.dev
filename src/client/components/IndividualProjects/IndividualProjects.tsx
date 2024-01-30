import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import EditProject from '../EditProject/EditProject';
import type { Project } from '../../../common/utilities/types';
import { getListOfClients } from '../../redux/selectors/adminPortal';
import styles from './IndividualProjects.scss';

const IndividualProject: FunctionComponent<Project> = (props) => {
  const { id, clientId, title, description, active, startDate, status } = props;

  const clientList = useSelector(getListOfClients);

  const [assigning, setAssigning] = useState(false);
  const [editing, setEditing] = useState(false);

  const date = new Date(startDate * 1000);

  const toggleAssigning = useCallback(() => {
    setAssigning(!assigning);
  }, [assigning]);

  const toggleEditing = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const projectClient
  = clientList.filter(client => client.id === clientId);
  const client = projectClient[0]?.username ?? 'Not listed';

  return (
    <div >
      <div className={styles.project}>
        <p>
          {`${title}`}
        </p>
        <p>
          {`${client}`}
        </p>
        <p>
          {`${date.getMonth() + 1}.
          ${date.getDay()}.
          ${date.getFullYear()}`}
        </p>
        <p>
          {`${description}`}
        </p>
        <p>
          {`${status}`}
        </p>
        <p>
          MONEY
        </p>

        <div className={styles.buttons}>
          <button type="button" onClick={toggleAssigning}>Assign employee</button>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={toggleEditing}>Edit</button>
        </div>

      </div>
      {/* TODO: refactor editProject  */}
      {editing && (
        <EditProject
          id={id}
          title={title}
          description={description}
          active={active}
          username={'TODO'}
          email={'TODO'}
        />
      )}
    </div>
  );
};

export default IndividualProject;
