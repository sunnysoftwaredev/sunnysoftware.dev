import React, { useState, useCallback } from 'react';
import type { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import type { EmployeesForProject } from '../../../common/utilities/types';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import { getListOfEmployees } from '../../redux/selectors/adminPortal';
import XIcon from '../../static/svgs/XIcon';
import ChevronUpIcon from '../../static/svgs/ChevronUpIcon';
import ChevronDownIcon from '../../static/svgs/ChevronDownIcon';
import CheckmarkIcon from '../../static/svgs/CheckmarkIcon';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import styles from './AdminAssignEmployee.scss';

type AdminAssignEmployeeFormProps = {
  projectTitle: string;
  employeesForProject: EmployeesForProject[];
  toggleAssignEmployeeForm: () => void;
};

const AdminAssignEmployee: FunctionComponent<AdminAssignEmployeeFormProps>
= ({ projectTitle,
  employeesForProject, toggleAssignEmployeeForm }) => {
  const { projectId } = useParams();
  const allEmployees = useSelector(getListOfEmployees);

  // All users assigned to project, including admin
  const justEmployees = employeesForProject.filter(user => user.role === 'employee');
  const activeEmployees = justEmployees.filter(user => user.active);
  const employeeIdList = activeEmployees.map(user => user.id);
  const [employeeIds, setEmployeeIds]
   = useState(employeeIdList);

  console.log('employeeIds: ', employeeIds);

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
      toggleAssignEmployeeForm();
    },
    [toggleAssignEmployeeForm]
  );

  const removeEmployee = (idToRemove: number): () => void => (): void => {
    const tempList = employeeIds.filter(employeeId => employeeId
      !== idToRemove);
    setEmployeeIds(tempList);
  };

  const addEmployee = (idToAdd: number):
  () => void => (): void => {
    const tempList: number[] = employeeIds.concat(idToAdd);
    setEmployeeIds(tempList);
  };

  // TODO: refactor to add employee to project
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setShowErrorPopup(false);
      const numberId = Number(projectId);
      const response = await fetch('/api/users/junction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberId,
          employeeIds,
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
  }, [projectId, employeeIds, toggleAssignmentForm]);

  const compareObjects = (
    a: UserIdNameEmailRoleActivePhone,
    b: UserIdNameEmailRoleActivePhone
  ): number => {
    const employeeA = a.username;
    const employeeB = b.username;

    let comparison = 0;
    if (employeeA > employeeB) {
      comparison = 1;
    } else if (employeeA < employeeB) {
      comparison = -1;
    }
    return comparison;
  };

  //
  const displayEmployeeButtons = (listOfIds: number[]):
  React.JSX.Element[] => {
    if (typeof listOfIds === 'undefined' || typeof allEmployees === 'undefined') {
      return [<div key={0} />];
    }
    const resultArray: React.JSX.Element[]
     = allEmployees.flatMap((employee) => {
       if (typeof employee === 'undefined') {
         return [<div key={0} />];
       }
       if (listOfIds.includes(employee.id)) {
         return (
           <div className={styles.employeeButton} key={employee.id}>
             <div>
               {employee.username}
             </div>
             <div onClick={removeEmployee(employee.id)}>
               <XIcon />
             </div>
           </div>
         );
       }
       return [<div key={employee.id} />];
     });
    if (typeof resultArray === 'undefined') {
      return [<div key={0} />];
    }
    return resultArray;
  };

  const displayEmployeeDropdownList
  = (everyEmployee: UserIdNameEmailRoleActivePhone[]):
  React.JSX.Element[] => {
    if (typeof everyEmployee === 'undefined') {
      return [<div key={0} />];
    }
    const activeEmployeeList
    = everyEmployee.filter(employee => employee.active);
    const sortedFullEmployeeList = activeEmployeeList.sort(compareObjects);
    const finalArray = sortedFullEmployeeList.map((employee) => {
      if (employeeIdList.includes(employee.id)) {
        return (
          <div
            className={styles.checkedEmployeesInDropdown}
            key={employee.id}
            onClick={removeEmployee(employee.id)}
          >
            {employee.username}
            <CheckmarkIcon />
          </div>
        );
      }
      return (
        <div
          className={styles.employeesInDropdown}
          key={employee.id}
          onClick={addEmployee(employee.id)}
        >
          {employee.username}
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
            message="Employees updated"
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
            <h1>Assign an employee</h1>
            <p>
              Assign employee to project:
              {' '}
              {projectTitle}
            </p>
          </div>
          <button type="button" onClick={toggleAssignmentForm}><XIcon /></button>
        </div>

        <div className={styles.dropdown}>
          <p>Employee(s)</p>
          <div
            className={styles.employeesDisplay}
          >
            {employeeIdList.length > 0
              ? displayEmployeeButtons(employeeIds)
              : <p>Name of employee</p>}

            <div className={styles.inputChevron} onClick={toggleDropdown}>
              {menuOpen ? (<ChevronUpIcon />) : (<ChevronDownIcon />)}
            </div>
          </div>
          <div className={classNames(styles.displayEmployees, {
            [styles.hidden]: !menuOpen,
          })}
          >
            {displayEmployeeDropdownList(allEmployees)}
          </div>

        </div>

        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Assign</Button>
      </form>
    </div>
  );
};

export default AdminAssignEmployee;

