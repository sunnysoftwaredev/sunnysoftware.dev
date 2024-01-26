import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logger from '../../../server/logger';
import { isObjectRecord, isProjectArray, isProjectWithEmployeeIdArray, isUsersArray } from '../../../common/utilities/types';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { getListOfUsers, getShowRegistrationForm } from '../../redux/selectors/adminPortal';
import { AdminPortalActions } from '../../redux/slices/adminPortal';
import Pagination from '../Pagination/Pagination';
import AdminDisplayUsers from '../AdminDisplayUsers/AdminDisplayUsers';
import useNumberChangeHandler from '../../hooks/useNumberChangeHandler';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import styles from './ManageUsers.scss';

const ManageUsers: FunctionComponent = () => {
  // activeOrTerminated button to sort users
  const [activeOrTerminated, setActiveOrTerminated] = useState(true);
  const showRegistrationForm = useSelector(getShowRegistrationForm);
  const userList = useSelector(getListOfUsers);

  const dispatch = useDispatch();
  const isMobileWidth = useIsMobileWidth();

  const compareUserObjects = (
    a: UserIdNameEmailRoleActivePhone,
    b: UserIdNameEmailRoleActivePhone
  ): number => {
    const userA = a.username;
    const userB = b.username;

    if (userA > userB) {
      return 1;
    }
    if (userA < userB) {
      return -1;
    }
    return 0;
  };

  const sortedUserList = [...userList].sort(compareUserObjects);

  const toggleActiveOrTerminated = useCallback(() => {
    setActiveOrTerminated(!activeOrTerminated);
  }, [activeOrTerminated]);

  const toggleRegistrationForm = useCallback(() => {
    dispatch(AdminPortalActions.toggleShowRegistrationForm());
  }, [dispatch]);

  // pagination
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const recordOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '100', value: 100 },
  ];

  const handleRecordsPerPageChange = useNumberChangeHandler(setRecordsPerPage);

  // active pagination
  const [currentActivePage, setCurrentActivePage] = useState(1);
  const activeUserList = sortedUserList.filter(user => user.active);

  const activeLastIndex = currentActivePage * recordsPerPage;
  const activeFirstIndex = activeLastIndex - recordsPerPage;

  const currentActiveRecords
  = activeUserList.slice(activeFirstIndex, activeLastIndex);

  const totalActivePages = Math.ceil(activeUserList.length / recordsPerPage);

  const changeActivePage = useCallback((newPage: number): void => {
    setCurrentActivePage(newPage);
  }, []);

  // terminated pagination:
  const [currentTerminatedPage, setCurrentTerminatedPage] = useState(1);
  const terminatedUserList = sortedUserList.filter(user => !user.active);

  const terminatedLastIndex
  = currentTerminatedPage * recordsPerPage;
  const terminatedFirstIndex = terminatedLastIndex - recordsPerPage;

  const currentTerminatedRecords
  = terminatedUserList.slice(terminatedFirstIndex, terminatedLastIndex);

  const totalTerminatedPages
  = Math.ceil(terminatedUserList.length / recordsPerPage);

  const changeTerminatedPage = useCallback((newPage: number): void => {
    setCurrentTerminatedPage(newPage);
  }, []);

  const getUserList = useCallback(async() => {
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
        dispatch(AdminPortalActions.populateUserList({ usersArray }));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [dispatch]);

  const getProjectsWithEmployee = useCallback(async() => {
    try {
      const response = await fetch('api/projects/junction', {
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

      const { projectsWithId } = result;

      if (isProjectWithEmployeeIdArray(projectsWithId)) {
        dispatch(AdminPortalActions.populateProjectList({ projectsWithId }));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [dispatch]);

  const getAllProjects = useCallback(async() => {
    try {
      const response = await fetch('api/projects/', {
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

      const { fullProjectList } = result;

      if (isProjectArray(fullProjectList)) {
        dispatch(AdminPortalActions.populateProjectsArray({ fullProjectList }));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getUserList().catch((err) => {
      logger.error(err);
    });
    getProjectsWithEmployee().catch((err) => {
      logger.error(err);
    });
    getAllProjects().catch((err) => {
      logger.error(err);
    });
  }, [getUserList,
    showRegistrationForm,
    getProjectsWithEmployee,
    getAllProjects]);

  return (
    <div className={styles.manageUsersContainer}>
      {showRegistrationForm
       && <RegistrationForm />}
      <div className={styles.navigationBar}>
        <div className={styles.tabMenu}>
          {activeOrTerminated
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={toggleActiveOrTerminated}
              >
                Active
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={toggleActiveOrTerminated}
              >
                Active
              </Button>
            )}
          {activeOrTerminated
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={toggleActiveOrTerminated}
              >
                Terminated
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={toggleActiveOrTerminated}
              >
                Terminated
              </Button>
            )}

        </div>
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Primary}
          onClick={toggleRegistrationForm}
        >
          Add employee
        </Button>
      </div>
      <div className={styles.recordsPerPageDropdown}>
        <label >Records per page:</label>
        <select value={recordsPerPage} onChange={handleRecordsPerPageChange}>
          {recordOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {isMobileWidth
        ? (
          <div className={styles.mobileColumnNames}>
            <p>Name</p>
            <p>Email</p>
          </div>
        )
        : (
          <div className={styles.columnNames}>
            <p>Name</p>
            <p>Email</p>
            <p>Phone number</p>
            {activeOrTerminated ? (<p>Project name(s)</p>) : (<p>Note</p>)}
            <p className={styles.empty}>EMPTY</p>
            <p className={styles.actionsTitle}>Actions</p>
            {/* NB: p's empty to line up with IndividualUser grid */}
          </div>
        )}
      <div>
        {activeOrTerminated
          ? (<AdminDisplayUsers userListSlice={currentActiveRecords} />)
          : (<AdminDisplayUsers userListSlice={currentTerminatedRecords} />)}
      </div>
      {activeOrTerminated
        ? (
          <Pagination
            totalPages={totalActivePages}
            currentPage={currentActivePage}
            changePage={changeActivePage}
          />
        )
        : (
          <Pagination
            totalPages={totalTerminatedPages}
            currentPage={currentTerminatedPage}
            changePage={changeTerminatedPage}
          />
        )}

    </div>

  );
};

export default ManageUsers;
