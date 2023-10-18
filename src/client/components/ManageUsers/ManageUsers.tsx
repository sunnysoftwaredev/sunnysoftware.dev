import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import logger from '../../../server/logger';
import { isObjectRecord, isUsersArray } from '../../../common/utilities/types';
import type { UserIdNameEmailRole } from '../../../server/database';
import IndividualUser from '../IndividualUser/IndividualUser';
import styles from './ManageUsers.scss';

const ManageUsers: FunctionComponent = () => {
  const [userList, setUserList] = useState<UserIdNameEmailRole[]>([]);

  const getUserList = useCallback(async() => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: WorkCalendar.tsx');
      }
      const { usersArray } = result;
      // console.log('usersArray: ', usersArray);
      if (isUsersArray(usersArray)) {
        setUserList(usersArray);
      }
      // console.log('userList: ', userList);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    getUserList().catch((err) => {
      logger.error(err);
    });
  }, [getUserList]);

  // console.log(userList);

  const displayUsers = (users: UserIdNameEmailRole[]):
  React.ReactElement[] => {
    if (typeof users === 'undefined') {
      return [<div key={0} />];
    }
    const userElements: React.ReactElement[] = [];

    for (const user of users) {
      const { username } = user;
      const { email } = user;
      const { id } = user;
      const { role } = user;

      userElements.push((
        <div
          key={`user-${id}`}
        >
          <IndividualUser
            username={username} email={email}
            role={role}
            id={id}
          />
        </div>));
    }
    return userElements;
  };
  return (
    <div>
      <h1>List of Clients and Employees</h1>
      <h2>
        Total Users:
        {' '}
        {userList.length}
      </h2>
      <div className={styles.usersList}>

        {displayUsers(userList)}
      </div>
    </div>

  );
};

export default ManageUsers;
