import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import logger from '../../../server/logger';
import { isObjectRecord, isUsersArray } from '../../../common/utilities/types';
import type { UserIdNameEmailRole } from '../../../server/database';
import IndividualUser from '../IndividualUser/IndividualUser';
import CreateProject from '../CreateProject/CreateProject';
import styles from './ManageUsers.scss';

const ManageUsers: FunctionComponent = () => {
  const [userList, setUserList] = useState<UserIdNameEmailRole[]>([]);

  const getUserList = useCallback(async () => {
    try {
      const response = await fetch('api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ManageUsers.tsx');
      }
      const { usersArray } = result;
      if (isUsersArray(usersArray)) {
        setUserList(usersArray);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <div className={styles.manageUsersContainer}>
      <h1>List of Clients and Employees</h1>
      <h2>Total Users: {userList.length}</h2>
      <div className={styles.usersList}>
        {userList.map(({id, username, email, role}) => 
          <div key={`user-${id}`}>
            <IndividualUser
              username={username}
              email={email}
              role={role}
              id={id}
            />
          </div>)}
      </div>
      <CreateProject userList={userList} />
    </div>
  );
};

export default ManageUsers;