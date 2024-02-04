import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import type { ClientProject } from '../../../server/database';
import styles from './EditProject.scss';

// Extracted for readability 
const SuccessMessage: FunctionComponent<{ submitted: boolean }> = ({ submitted }) => (
  <div className={classNames(styles.success, { [styles.hidden]: !submitted })}>
    <h3>Project info updated</h3>
  </div>
);

// Extracted for readability 
const ErrorMessage: FunctionComponent<{ error: boolean }> = ({ error }) => (
  <div className={classNames({ [styles.hidden]: !error })}>
    <h1>Please enter all the fields</h1>
  </div>
);

// Utility to parse JSON safely
async function parseJSON(response: Response): Promise<unknown> {
  const textData = await response.text();
  try {
    return JSON.parse(textData);
  } catch (error) {
    throw new Error('Failed to parse JSON response: ' + error);
  }
}

const EditProject: FunctionComponent<ClientProject> = (props) => {
  const { id, title, description, active, username, email } = props;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newActive, setNewActive] = useState(active);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setSubmitted(false);
  }, []);

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
    setSubmitted(false);
  }, []);

  const handleActiveChange = useCallback(() => {
    setNewActive(prevState => !prevState);
  }, []);

  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (newTitle === '' || newDescription === '') {
        setError(true);
        return;
      }
      setError(false);
      const response = await fetch('api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newTitle, newDescription, newActive }),
      });

      const result = await parseJSON(response);
      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: EditProject.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('Success variable not type boolean: EditProject.tsx');
      }
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      logger.error('An error occurred while submitting the data: ' + err);
    }
  }, [id, newTitle, newDescription, newActive]);

  return (
    <div className={styles.editProjectContainer}>
      <div>
        <ErrorMessage error={error} />
        <SuccessMessage submitted={submitted} />
      </div>

      <div>
        <h3>Client Details: </h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
      <div>
        <h3>Project Description: </h3>
        <p>Description: {description}</p>
      </div>

      <h3>Edit details:</h3>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <div>
            <label className={styles.projectTitle}>Title</label>
            <input className="input" value={newTitle} onChange={handleTitleChange} type="text" />
          </div>
        </div>

        <textarea
          className={styles.textArea}
          value={newDescription}
          onChange={handleDescriptionChange}
          placeholder={description}
        />

        <div>
          <label htmlFor="activeRadio">Active</label>
          <input type="radio" name="activeRadioGroup" value="true" checked={newActive} onChange={handleActiveChange} />

          <label htmlFor="inactiveRadio">Deactive</label>
          <input type="radio" name="activeRadioGroup" value="false" checked={!newActive} onChange={handleActiveChange} />
        </div>

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
