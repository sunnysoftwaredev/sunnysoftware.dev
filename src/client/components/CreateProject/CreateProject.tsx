import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import Input, { InputSize } from '../Input/Input';
import useNumberChangeHandler from '../../hooks/useNumberChangeHandler';
import { getListOfClients } from '../../redux/selectors/adminPortal';
import styles from './CreateProject.scss';

type CreateProjectProps = {
  // userList: UserIdNameEmailRoleActivePhone[];
  toggleCreateProjectForm: () => void;
};

// TODO: add unix start time for start date AND add initial status
// REMEMBER: the javascript method returns miliseconds, not seconds

const CreateProject: FunctionComponent<CreateProjectProps> = (props) => {
  const [client, setClient] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectClient, setSelectClient] = useState(0);

  const handleRecordsPerPageChange = useNumberChangeHandler(setSelectClient);

  const clientList = useSelector(getListOfClients);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const { toggleCreateProjectForm } = props;
  // const { userList } = props;
  // const clientList = userList.filter(user => user.role === 'client');

  // useEffect(() => {
  //   if (typeof clientList[0] !== 'undefined') {
  //     setClient(clientList[0].id.toString());
  //   }
  // }, [clientList]);

  const handleClientChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setClient(e.target.value);
      setSubmitted(false);
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

  // TODO: update backend to account for changed rows
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (client === '' || title === '' || description === '') {
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
          client,
          title,
          description,
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
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [client, title, description]);

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
        <label>
          Title
          <Input
            size={InputSize.Large}
            value={title}
            setValue={setTitle}
            onChange={handleTitleChange}
            placeholderText="Video game project"
            type="text"
          />
        </label>

        <div className={styles.clientsDropdown}>
          <label >Clients:</label>
          <select value={selectClient} onChange={handleRecordsPerPageChange}>
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
        {/* BOX HERE  */}
        <label>Description </label>
        <textarea
          onChange={handleDescriptionChange}
          value={description}
          placeholder="Client project description..."
          className={styles.textArea}
        />
        {' '}
        <p>{selectClient}</p>

        {/* ADD STATUS DROPDOWN  */}

        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Submit</Button>
      </form>
    </div>

  );
};

export default CreateProject;

{ /* <select value={client} onChange={handleClientChange}>
              {clientList.map(option => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.username}
                </option>
              ))}
            </select> */ }
