import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Project } from '../../../common/utilities/types';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import XIcon from '../../static/svgs/XIcon';
import Input, { InputSize } from '../Input/Input';
import { getListOfClients } from '../../redux/selectors/adminPortal';
import styles from './EditProject.scss';

type EditProjectProps = Project & {
  toggleEditing: () => void;
};

const EditProject: FunctionComponent<EditProjectProps> = (props) => {
  const { id, clientId, title, description, active,
    startDate, status, toggleEditing } = props;

  const [newClientID, setNewClientID] = useState(clientId);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newActive] = useState(active); // Active column needed?
  const [newStartDate] = useState(startDate); // Necessary to update?
  const [newProjectStatus, setNewProjectStatus] = useState(status);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const clientList = useSelector(getListOfClients);

  const statusOptions = [
    { label: 'Not started', value: 'Not started' },
    { label: 'In progress', value: 'In progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Completed', value: 'Completed' },
  ];

  const handleNewClientIdChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const temp = Number(e.target.value);
      setNewClientID(temp);
      setShowErrorPopup(false);
    },
    [setNewClientID],
  );

  const handleNewTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value);
      setShowErrorPopup(false);
    },
    [setNewTitle],
  );

  const handleNewDescriptionChange
   = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
     setNewDescription(e.target.value);
     setShowErrorPopup(false);
   }, [setNewDescription],);

  // const handleActiveChange = useCallback((): void => {
  //   setNewActive(!active);
  // }, [active],);

  // const handleStartDateChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     const temp = Number(e.target.value);
  //     setNewStartDate(temp);
  //     setShowErrorPopup(false);
  //   },
  //   [setNewStartDate],
  // );

  const handleNewStatusChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setNewProjectStatus(e.target.value);
      setShowErrorPopup(false);
    },
    [setNewProjectStatus],
  );

  const toggleEditingForm = useCallback(
    () => {
      toggleEditing();
    },
    [toggleEditing]
  );

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  // Update Project information
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (newClientID === 0 || newTitle === '' || newDescription === ''
      || typeof newActive !== 'boolean' || newStartDate === 0 || newProjectStatus === '') {
        setShowErrorPopup(true);
        return;
      }
      setShowErrorPopup(false);
      const response = await fetch('api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          newClientID,
          newTitle,
          newDescription,
          newActive,
          newStartDate,
          newProjectStatus,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: EditProject.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: EditProject.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [id,
    newClientID,
    newTitle,
    newDescription,
    newActive,
    newStartDate,
    newProjectStatus]);

  return (
    <div className={styles.container} >
      <div
        className={styles.backgroundButton}
        onClick={toggleEditingForm}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.top}>
          <p />
          <div>
            <h1>Edit Project</h1>
          </div>
          <button type="button" onClick={toggleEditingForm}><XIcon /></button>
        </div>
        <div>
          {showSuccessPopup
        && (
          <PopupMessage
            type={PopupType.Success}
            message="User successfully updated"
            onClick={closeSuccessPopup}
          />
        )}
          {showErrorPopup
        && (
          <PopupMessage
            type={PopupType.Failure}
            message="Failed to update database"
            onClick={closeErrorPopup}
          />
        )}
        </div>

        <div className={styles.title}>
          <label>Title</label>
          <Input
            size={InputSize.Large}
            value={newTitle}
            setValue={setNewTitle}
            onChange={handleNewTitleChange}
            placeholderText={newTitle}
            type="text"
          />
        </div>

        <div className={styles.dropdown}>
          <label >Clients:</label>
          <select value={newClientID} onChange={handleNewClientIdChange}>
            {clientList.map(option => (
              <option
                key={option.id}
                value={option.id}
              >
                {option.username}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.description}>
          <label>Description </label>
          <textarea
            onChange={handleNewDescriptionChange}
            value={newDescription}
            placeholder={description}
            className={styles.textArea}
          />
        </div>
        {' '}

        <div className={styles.dropdown}>
          <label >Status:</label>
          <select value={newProjectStatus} onChange={handleNewStatusChange}>
            {statusOptions.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Submit</Button>
      </form>
    </div>

  );
};

export default EditProject;
