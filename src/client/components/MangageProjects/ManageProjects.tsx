import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logger from '../../../server/logger';
import type { ProjectAndBilling } from '../../../common/utilities/types';
import { isObjectRecord, isProjectArray, isUsersArray } from '../../../common/utilities/types';
import { getAllProjects } from '../../redux/selectors/adminPortal';
import { AdminPortalActions } from '../../redux/slices/adminPortal';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import AdminDisplayProjects from '../AdminDisplayProjects/AdminDisplayProjects';
import useNumberChangeHandler from '../../hooks/useNumberChangeHandler';
import Pagination from '../Pagination/Pagination';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import CreateProject from '../CreateProject/CreateProject';
import styles from './ManageProjects.scss';

const ManageProjects: FunctionComponent = () => {
  const dispatch = useDispatch();
  const projectList = useSelector(getAllProjects);
  const isMobileWidth = useIsMobileWidth();

  const [selectedButton, setSelectedButton] = useState('All');
  const [creatingProject, setCreatingProject] = useState(false);

  const compareProjects = (
    a: ProjectAndBilling,
    b: ProjectAndBilling
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

  const sortedProjectList = [...projectList].sort(compareProjects);

  const inProgressProjectList
  = sortedProjectList.filter(project => project.status === 'In progress');

  const pausedProjectList
  = sortedProjectList.filter(project => project.status === 'Paused');

  const cancelledProjectList
  = sortedProjectList.filter(project => project.status === 'Cancelled');

  const completedProjectList
  = sortedProjectList.filter(project => project.status === 'Completed');

  const toggleCreateProjectForm = useCallback(() => {
    setCreatingProject(!creatingProject);
  }, [creatingProject]);

  // pagination
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const activeLastIndex = currentPage * recordsPerPage;
  const activeFirstIndex = activeLastIndex - recordsPerPage;

  const recordOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '100', value: 100 },
  ];

  const handleAllClick = useCallback(() => {
    setSelectedButton('All');
    setCurrentPage(1);
  }, []);

  const handleInProgressClick = useCallback(() => {
    setSelectedButton('In progress');
    setCurrentPage(1);
  }, []);

  const handlePausedClick = useCallback(() => {
    setSelectedButton('Paused');
    setCurrentPage(1);
  }, []);
  const handleCancelledClick = useCallback(() => {
    setSelectedButton('Cancelled');
    setCurrentPage(1);
  }, []);
  const handleCompletedClick = useCallback(() => {
    setSelectedButton('Completed');
    setCurrentPage(1);
  }, []);

  const handleRecordsPerPageChange = useNumberChangeHandler(setRecordsPerPage);

  const changePage = useCallback((newPage: number): void => {
    setCurrentPage(newPage);
  }, []);

  // Pagination in useEffect

  let currentSlice: ProjectAndBilling[] = [];
  let totalPages = 0;

  switch (selectedButton) {
    case 'All': {
      currentSlice = sortedProjectList.slice(activeFirstIndex, activeLastIndex);
      totalPages = Math.ceil(sortedProjectList.length / recordsPerPage);
      break;
    }
    case 'In progress': {
      currentSlice
       = inProgressProjectList.slice(activeFirstIndex, activeLastIndex);
      totalPages = Math.ceil(inProgressProjectList.length / recordsPerPage);
      break;
    }
    case 'Paused': {
      currentSlice
      = pausedProjectList.slice(activeFirstIndex, activeLastIndex);
      totalPages
      = Math.ceil(pausedProjectList.length / recordsPerPage);
      break;
    }
    case 'Cancelled': {
      currentSlice
       = cancelledProjectList.slice(activeFirstIndex, activeLastIndex);
      totalPages = Math.ceil(cancelledProjectList.length / recordsPerPage);
      break;
    }
    case 'Completed': {
      currentSlice
       = completedProjectList.slice(activeFirstIndex, activeLastIndex);
      totalPages = Math.ceil(completedProjectList.length / recordsPerPage);
      break;
    }
  }

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

  const getProjectList = useCallback(async() => {
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
    getProjectList().catch((err) => {
      logger.error(err);
    });
  }, [getUserList, getProjectList]);

  return (
    <div className={styles.container}>
      {creatingProject
       && (
         <CreateProject
           toggleCreateProjectForm={toggleCreateProjectForm}
         />
       )}
      <div className={styles.navigationBar}>
        <div className={styles.tabMenu}>
          {selectedButton === 'All'
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={handleAllClick}
              >
                All
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={handleAllClick}
              >
                All
              </Button>
            )}
          {selectedButton === 'In progress'
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={handleInProgressClick}
              >
                In progress
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={handleInProgressClick}
              >
                In progress
              </Button>
            )}
          {selectedButton === 'Paused'
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={handlePausedClick}
              >
                Paused
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={handlePausedClick}
              >
                Paused
              </Button>
            )}
          {selectedButton === 'Cancelled'
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={handleCancelledClick}
              >
                Cancelled
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={handleCancelledClick}
              >
                Cancelled
              </Button>
            )}
          {selectedButton === 'Completed'
            ? (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
                onClick={handleCompletedClick}
              >
                Completed
              </Button>
            )
            : (
              <Button
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
                onClick={handleCompletedClick}
              >
                Completed
              </Button>
            )}

        </div>
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Primary}
          onClick={toggleCreateProjectForm}
        >
          Add project
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
            <p>Client</p>
          </div>
        )
        : (
          <div className={styles.columnNames}>
            <p>Project name</p>
            <p>Client</p>
            <p>Start date</p>
            <p>Project description</p>
            <p>Status</p>
            <p>Total billings</p>
            <p />
            <p>Actions</p>
          </div>
        )}
      <div>
        <AdminDisplayProjects projectListSlice={currentSlice} />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        changePage={changePage}
      />
    </div>

  );
};

export default ManageProjects;
