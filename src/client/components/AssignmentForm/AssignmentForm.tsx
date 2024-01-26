import React, { useState, useCallback } from 'react';
import type { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import type { Project, ProjectWithEmployeeId } from '../../../common/utilities/types';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import { getAllProjects } from '../../redux/selectors/adminPortal';
import XIcon from '../../static/svgs/XIcon';
import ChevronUpIcon from '../../static/svgs/ChevronUpIcon';
import ChevronDownIcon from '../../static/svgs/ChevronDownIcon';
import CheckmarkIcon from '../../static/svgs/CheckmarkIcon';
import styles from './AssignmentForm.scss';

type AssignmentFormProps = {
  username: string;
  id: number;
  toggleAssigning: () => void;
  userProjectList: ProjectWithEmployeeId[];
};

const AssignmentForm: FunctionComponent<AssignmentFormProps>
= ({ username, id, toggleAssigning, userProjectList }) => {
  const allProjects = useSelector(getAllProjects);

  const userProjectNumberList = userProjectList.map(project => project.id);
  const [assignedProjectIds, setAssignedProjectIds]
   = useState(userProjectNumberList);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const toggleDropdown = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const toggleAssignmentForm = useCallback(
    () => {
      toggleAssigning();
    },
    [toggleAssigning]
  );

  const removeProject = (idToRemove: number): () => void => (): void => {
    const temp = assignedProjectIds.filter(projectId => projectId
      !== idToRemove);
    setAssignedProjectIds(temp);
  };

  const addProject = (idToAdd: number):
  () => void => (): void => {
    const tempList: number[] = assignedProjectIds.concat(idToAdd);
    setAssignedProjectIds(tempList);
  };

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setShowErrorPopup(false);
      const response = await fetch('api/projects/junction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          assignedProjectIds,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: AssignmentForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: AssignmentForm.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          toggleAssignmentForm();
        }, 1000);
      }
    } catch (err: unknown) {
      setShowErrorPopup(true);
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [id, toggleAssignmentForm, assignedProjectIds]);

  const compareObjects = (
    a: Project,
    b: Project
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

  const displayProjectButtons = (projectIds: number[]):
  React.JSX.Element[] => {
    if (typeof projectIds === 'undefined' || typeof allProjects === 'undefined') {
      return [<div key={0} />];
    }
    const resultArray: React.JSX.Element[] = allProjects.flatMap((project) => {
      if (typeof project === 'undefined') {
        return [<div key={0} />];
      }
      if (projectIds.includes(project.id)) {
        return (
          <div className={styles.projectButton} key={project.id}>
            <div>
              {project.title}
            </div>
            <div onClick={removeProject(project.id)}>
              <XIcon />
            </div>
          </div>
        );
      }
      return [<div key={project.id} />];
    });
    if (typeof resultArray === 'undefined') {
      return [<div key={0} />];
    }
    return resultArray;
  };

  const displayProjectDropdownList = (everyProject: Project[]):
  React.JSX.Element[] => {
    if (typeof everyProject === 'undefined') {
      return [<div key={0} />];
    }
    const activeProjectList
    = everyProject.filter(project => project.active);
    const sortedFullProjectList = activeProjectList.sort(compareObjects);
    const finalArray = sortedFullProjectList.map((project) => {
      if (assignedProjectIds.includes(project.id)) {
        return (
          <div
            className={styles.userProjectsInDropdown}
            key={project.id}
            onClick={removeProject(project.id)}
          >
            {project.title}
            <CheckmarkIcon />
          </div>
        );
      }
      return (
        <div
          className={styles.projectsInDropdown}
          key={project.id}
          onClick={addProject(project.id)}
        >
          {project.title}
        </div>
      );
    });
    return finalArray;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundButton}
        onClick={toggleAssignmentForm}
      />
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div>
          {showSuccessPopup
        && (
          <PopupMessage
            type={PopupType.Success}
            message="Projects updated"
            onClick={closeSuccessPopup}
          />
        )}
          {showErrorPopup
        && (
          <PopupMessage
            type={PopupType.Failure}
            message="API call unsuccessful, see terminal for details"
            onClick={closeErrorPopup}
          />
        )}
        </div>
        <div className={styles.top}>
          <p />
          <div>
            <h1>Assign a project</h1>
            <p>
              Assign a project to
              {' '}
              {username}
            </p>
          </div>
          <button type="button" onClick={toggleAssignmentForm}><XIcon /></button>
        </div>

        <div className={styles.dropdown}>
          <p>Project(s)</p>
          <div
            className={styles.projectsDisplay}
          >
            {assignedProjectIds.length > 0
              ? displayProjectButtons(assignedProjectIds)
              : <p>Name of project</p>}

            <div className={styles.inputChevron} onClick={toggleDropdown}>
              {menuOpen ? (<ChevronUpIcon />) : (<ChevronDownIcon />)}
            </div>
          </div>
          <div className={classNames(styles.displayProjects, {
            [styles.hidden]: !menuOpen,
          })}
          >
            {displayProjectDropdownList(allProjects)}
          </div>

        </div>

        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Assign</Button>
      </form>
    </div>
  );
};

export default AssignmentForm;
