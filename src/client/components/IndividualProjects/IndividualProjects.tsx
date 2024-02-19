import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditProject from '../EditProject/EditProject';
import type { ProjectAndBilling } from '../../../common/utilities/types';
import { getListOfClients } from '../../redux/selectors/adminPortal';
import styles from './IndividualProjects.scss';

const IndividualProject: FunctionComponent<ProjectAndBilling> = (props) => {
  const { id, clientId, title, description,
    startDate, status: projectStatus, totalBilling } = props;

  const clientList = useSelector(getListOfClients);

  const [editing, setEditing] = useState(false);

  const date = new Date(startDate * 1000);

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const dollarDisplay = USDollar.format(totalBilling);

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
          {`${projectStatus}`}
        </p>
        <p>
          {`${dollarDisplay}`}
        </p>

        <div className={styles.buttons}>
          <Link to={`/admin-portal/project/${id}`}>Details</Link>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={toggleEditing}>Edit</button>
        </div>

      </div>
      {editing && (
        <EditProject
          id={id}
          clientId={clientId}
          title={title}
          description={description}
          startDate={startDate}
          status={projectStatus}
          toggleEditing={toggleEditing}
          totalBilling={0}
        />
      )}
    </div>
  );
};

export default IndividualProject;
