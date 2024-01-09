import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import type { UserIdNameEmailRoleActive } from '../../../server/database';
import styles from './CreateProject.scss';

type CreateProjectProps = {
  userList: UserIdNameEmailRoleActive[];
};

const CreateProject: FunctionComponent<CreateProjectProps> = (props) => {
  const [client, setClient] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const { userList } = props;
  const clientList = userList.filter(user => user.role === 'client');

  useEffect(() => {
    if (typeof clientList[0] !== 'undefined') {
      setClient(clientList[0].id.toString());
    }
  }, [clientList]);

  const handleClientChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setClient(e.target.value);
      setSubmitted(false);
    },
    [setClient],
  );

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSubmitted(false);
  }, [setTitle],);

  const handleDescriptionChange
  = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setSubmitted(false);
  }, [setDescription]);

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (client === '' || title === '' || description === '') {
        setError(true);
        return;
      }
      setError(false);
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
        setSubmitted(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [client, title, description]);

  const successMessage = (): React.JSX.Element => (
    <div
      className={classNames({ [styles.hidden]: !submitted })}
    >
      <h3>Client project has been created</h3>
    </div>
  );

  const errorMessage = (): React.JSX.Element => (
    <div
      className={classNames({ [styles.hidden]: !error })}
    >
      <h1>Please enter all the fields</h1>
    </div>
  );

  return (
    <div className={styles.createProjectContainer}>
      <h1>Create a client project</h1>
      <div
        className={classNames(styles.formHeader, {
          [styles.hidden]: !error,
        })}
      />

      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form className={styles.formContainer}>
        <div>
          <div>
            <label>Client: </label>
            <select value={client} onChange={handleClientChange}>
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

          <div>
            <label className={styles.projectTitle}>Title</label>
            <input
              onChange={handleTitleChange} className="input"
              value={title} type="text"
            />
          </div>

        </div>

        <textarea
          onChange={handleDescriptionChange}
          value={description}
          placeholder="Client project description..."
          className={styles.textArea}
        />

        <button
          onClick={handleSubmit}
          type="submit"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
