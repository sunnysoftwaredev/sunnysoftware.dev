import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import type { ClientProject } from '../../../server/database';
import styles from './EditProject.scss';

const EditProject: FunctionComponent<ClientProject> = (props) => {
  const { id, title, description, active, username, email } = props;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newActive, setNewActive] = useState(active);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value);
      setSubmitted(false);
    },
    [setNewTitle],
  );

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
    setSubmitted(false);
  }, [setNewDescription],);

  const handleActiveChange = useCallback((): void => {
    setNewActive(currentActive => !currentActive);
  }, [setNewActive],);

  // Update Project information
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (newTitle === '' || newDescription === '') {
        setError(true);
        return;
      }
      setError(false);
      const response = await fetch('api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          newTitle,
          newDescription,
          newActive,
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
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [id, newTitle, newDescription, newActive]);

  const successMessage = (): React.JSX.Element => (
    <div
      className={classNames(styles.success, {
        [styles.hidden]: !submitted,
      })}
    >
      <h3>Project info updated</h3>
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
    <div className={styles.editProjectContainer} >
      <div>
        {errorMessage()}
        {successMessage()}
      </div>

      <div>
        <h3>Client Details: </h3>
        <p>
          Username:
          {' '}
          {username}
        </p>
        <p>
          Email:
          {' '}
          {email}
        </p>
      </div>
      <div>
        <h3>Project Description: </h3>
        <p>
          Description:
          {' '}
          {description}
        </p>

      </div>

      <h3>Edit details:</h3>
      <form className={styles.formContainer}>
        <div>

          <div>
            <label className={styles.projectTitle}>Title</label>
            <input
              onChange={handleTitleChange} className="input"
              value={newTitle} type="text"
            />
          </div>

        </div>

        <textarea
          onChange={handleDescriptionChange}
          value={newDescription}
          placeholder={description}
          className={styles.textArea}
        />
        {/* WORK here */}
        <div>
          <label htmlFor="activeRadio">Active</label>
          <input
            type="radio" name="activeRadioGroup" id="activeRadio"
            value="true" onChange={handleActiveChange}
            checked={newActive}
          />

          <label htmlFor="inactiveRadio">Deactive</label>
          <input
            type="radio" name="activeRadioGroup" id="inactiveRadio"
            value="false" onChange={handleActiveChange}
            checked={!newActive}
          />

        </div>

        <button
          onClick={handleSubmit}
          type="submit"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;
