import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import EditUser from '../EditUser/EditUser';
import type { ProjectWithEmployeeId } from '../../../common/utilities/types';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import { getProjectsWithId } from '../../redux/selectors/adminPortal';
import AssignmentForm from '../AssignmentForm/AssignmentForm';
import DeactivateUser from '../DeactivateUser/DeactivateUser';
import ActivateUser from '../ActivateUser/ActivateUser';
import styles from './IndividualUser.scss';

const IndividualUser: FunctionComponent<UserIdNameEmailRoleActivePhone>
= (props) => {
  const { username, email, role, id, active, phone, reason } = props;

  const [userCreated, setUserCreated] = useState(false);

  const [assigning, setAssigning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [activating, setActivating] = useState(false);

  const compareObjects = (
    a: ProjectWithEmployeeId,
    b: ProjectWithEmployeeId
  ): number => {
    const projectA = a.title;
    const projectB = b.title;

    let comparison = 0;
    if (projectA > projectB) {
      comparison = 1;
    } else if (projectA < projectB) {
      comparison = -1;
    }
    return comparison;
  };

  const projectsWithUserId = useSelector(getProjectsWithId);

  const activeFilterList
  = projectsWithUserId.filter(project => project.status !== 'Cancelled'
  && project.status !== 'Completed');
  const unsorterUserList
  = activeFilterList.filter(project => project.userId === id);
  const userProjectList = unsorterUserList.sort(compareObjects);

  const closeUserCreatedPopup = useCallback(() => {
    setUserCreated(!userCreated);
  }, [userCreated]);

  const toggleAssigning = useCallback(() => {
    setAssigning(!assigning);
  }, [assigning]);

  const toggleEditing = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const toggleDeactivating = useCallback(() => {
    setDeactivating(!deactivating);
  }, [deactivating]);

  const toggleActivating = useCallback(() => {
    setActivating(!activating);
  }, [activating]);

  const displayUserProjects = (projects: ProjectWithEmployeeId[]):
  React.JSX.Element[] => {
    if (typeof projects === 'undefined') {
      return [<div key={0} />];
    }
    return projects.map(project => <p key={project.id}>{project.title}</p>);
  };

  return (
    <div
      key={`user-${id}`}
    >
      <div className={styles.user}>
        <p>
          {`${username}`}
        </p>
        <p>
          {`${email}`}
        </p>
        <p>
          {`${phone ?? 'None provided'}`}
        </p>
        <div>
          {active ? (displayUserProjects(userProjectList)) : (reason ?? 'None provided')}
        </div>
        <p className={styles.empty} >EMPTY</p>
        {/* p is empty to align spacing with MangeUsers.tsx headings */}
        {active
          ? (
            <div className={styles.buttons}>
              <button type="button" onClick={toggleAssigning}>Assignment</button>
              <button type="button" onClick={toggleEditing}>Edit</button>
              <button type="button" onClick={toggleDeactivating}>Deactivate</button>
            </div>
          )
          : (
            <div className={styles.activateButton}>
              <button type="button" onClick={toggleActivating}>Activate</button>
            </div>
          )}
      </div>

      {userCreated && (
        <PopupMessage
          type={PopupType.Success}
          message="User registered!"
          onClick={closeUserCreatedPopup}
        />
      )}
      {assigning && (
        <AssignmentForm
          username={username}
          id={id}
          toggleAssigning={toggleAssigning}
          userProjectList={userProjectList}
        />
      )}

      {editing && (
        <EditUser
          username={username}
          email={email}
          role={role}
          id={id}
          active={active}
          phone={phone}
          toggleEditing={toggleEditing}
        />
      )}
      {deactivating
     && (
       <DeactivateUser
         id={id}
         toggleDeactivating={toggleDeactivating}
       />
     )}
      {activating
     && (
       <ActivateUser
         id={id}
         toggleActivating={toggleActivating}
       />
     )}
    </div>
  );
};

export default IndividualUser;
