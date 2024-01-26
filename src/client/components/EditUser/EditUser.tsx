import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import Input, { InputSize } from '../Input/Input';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import XIcon from '../../static/svgs/XIcon';
import styles from './EditUser.scss';

type ToggleEditing = {
  toggleEditing: () => void;
};

type EditUserProps = UserIdNameEmailRoleActivePhone & ToggleEditing;

const EditUser: FunctionComponent<EditUserProps> = (props) => {
  const { id, username, email, phone, role, toggleEditing } = props;

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone ?? '');
  const [newRole, setNewRole] = useState(role);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

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

  const handleNameChange
   = useCallback(
     (e: ChangeEvent<HTMLInputElement>) => {
       setNewUsername(e.target.value);
       setShowErrorPopup(false);
     },
     [setNewUsername],
   );

  const handleEmailChange
   = useCallback((e: ChangeEvent<HTMLInputElement>) => {
     setNewEmail(e.target.value);
     setShowErrorPopup(false);
   }, [setNewEmail],);

  const handlePhoneChange
   = useCallback((e: ChangeEvent<HTMLInputElement>) => {
     setNewPhone(e.target.value);
     setShowErrorPopup(false);
   }, [setNewPhone],);

  const handleRoleChange
  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewRole(e.target.value);
    setShowErrorPopup(false);
  }, [setNewRole]);

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (newUsername === '' || newEmail === '' || newPhone === '' || newRole === '') {
        setShowErrorPopup(true);
        return;
      }
      setShowErrorPopup(false);
      const response = await fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newUsername,
          newEmail,
          newPhone,
          newRole,
          id,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: EditUser.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: EditUser.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
        setTimeout(() => {
          toggleEditingForm();
        }, 1500);
      }
    } catch (err: unknown) {
      setShowErrorPopup(true);
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [newUsername, newEmail, newPhone, newRole, id, toggleEditingForm]);

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
            <h1>Edit User</h1>
            <p>
              Change information for
              {' '}
              {username}
            </p>
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
        <div>
          <label>Name</label>
          <Input
            size={InputSize.Medium}
            onChange={handleNameChange}
            setValue={setNewUsername}
            value={newUsername}
          />
        </div>
        <div>
          <label>Email</label>
          <Input
            size={InputSize.Medium}
            onChange={handleEmailChange}
            setValue={setNewEmail}
            value={newEmail}
          />
        </div>
        <div>
          <label>Phone</label>
          <Input
            size={InputSize.Medium}
            onChange={handlePhoneChange}
            setValue={setNewPhone}
            value={newPhone}
          />
        </div>

        <div className={styles.radioGroup}>
          <h3>User role:  </h3>
          <div>
            <label htmlFor="employeeRadio">Employee</label>
            <input
              type="radio" name="radioGroup" id="employeeRadio"
              value="employee" onChange={handleRoleChange}
              checked={newRole === 'employee'}
            />
          </div>
          <div className={styles.roleRadio}>
            <div>
              <label htmlFor="clientRadio">Client</label>
              <input
                type="radio" name="radioGroup" id="clientRadio"
                value="client" onChange={handleRoleChange}
                checked={newRole === 'client'}
              />
            </div>
          </div>
        </div>
        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Submit</Button>
      </form>
    </div>
  );
};

export default EditUser;
