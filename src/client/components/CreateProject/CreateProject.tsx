import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import Input, { InputSize } from '../Input/Input';
import { getListOfClients } from '../../redux/selectors/adminPortal';
import styles from './CreateProject.scss';

type CreateProjectProps = {
  toggleCreateProjectForm: () => void;
};

const CreateProject: FunctionComponent<CreateProjectProps> = (props) => {
  const [client, setClient] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('Not started');

  const clientList = useSelector(getListOfClients);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const statusOptions = [
    { label: 'Not started', value: 'Not started' },
    { label: 'In progress', value: 'In progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Completed', value: 'Completed' },
  ];

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const { toggleCreateProjectForm } = props;

  const handleClientChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const temp = Number(e.target.value);
      setClient(temp);
      setShowErrorPopup(false);
    },
    [setClient],
  );

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setShowErrorPopup(false);
  }, [setTitle],);

  const handleDescriptionChange
  = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setShowErrorPopup(false);
  }, [setDescription]);

  const handleStatusChange
  = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setProjectStatus(e.target.value);
    setShowErrorPopup(false);
  }, [setProjectStatus]);

  // TODO: update backend to account for changed rows
  // TODO: add unix start time for start date AND add initial status
  // REMEMBER: the javascript method returns miliseconds, not seconds
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (title === '' || client === 0
       || description === '' || projectStatus === '') {
        setShowErrorPopup(true);
        return;
      }
      setShowErrorPopup(false);
      const response = await fetch('api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          client,
          description,
          projectStatus,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: CreateProject.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: CreateProject.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          toggleCreateProjectForm();
        }, 1500);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [title, client, description, projectStatus, toggleCreateProjectForm]);

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundButton}
        onClick={toggleCreateProjectForm}
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
            message="Project successfully created"
            onClick={closeSuccessPopup}
          />
        )}
          {showErrorPopup
        && (
          <PopupMessage
            type={PopupType.Failure}
            message="Something went wrong, did you enter all the fields?"
            onClick={closeErrorPopup}
          />
        )}
        </div>
        <div className={styles.top}>
          <p />
          <h1>Create Project</h1>
          <button type="button" onClick={toggleCreateProjectForm}>X</button>
        </div>
        <div className={styles.title}>
          <label>Title</label>
          <Input
            size={InputSize.Large}
            value={title}
            setValue={setTitle}
            onChange={handleTitleChange}
            placeholderText="Video game project"
            type="text"
          />
        </div>

        <div className={styles.dropdown}>
          <label >Clients:</label>
          <select value={client} onChange={handleClientChange}>
            <option
              key={0}
              value={0}
            >
              ---
            </option>
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
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Client project description..."
            className={styles.textArea}
          />
        </div>
        {' '}

        <div className={styles.dropdown}>
          <label >Status:</label>
          <select value={projectStatus} onChange={handleStatusChange}>
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

export default CreateProject;

