import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent } from 'react';
import { isObjectRecord } from '../../../../common/utilities/types';
import AuthContext from '../../../context/AuthContext';
import logger from '../../../../server/logger';
import Input, { InputSize } from '../../Input/Input';
import Button, { ButtonSize, ButtonType } from '../../Button/Button';
import styles from './NewPassword.scss';

const NewPassword: FunctionComponent = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { active }
  = useContext(AuthContext) ?? { active: false };

  if (active) {
    navigate('/');
  }

  const handleNewPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
    },
    [setNewPassword],
  );

  const handleConfirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword],
  );

  const handleShowPasswordChange = useCallback(
    () => {
      setShowPassword(!showPassword);
    },
    [setShowPassword, showPassword],
  );

  // TODO: CHANGE FUNCTIONALITY
  const handleSubmit = useCallback(async() => {
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
          confirmPassword,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: NewPassword.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: NewPassword.tsx');
      }

      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: NewPassword.tsx');
      }
      if (result.success) {
        navigate('/');
        window.location.reload();
      } else {
        navigate('/contact-us');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [newPassword, confirmPassword, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Change Password</h2>
        <p>Enter New Password</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.newPassword}>
        <div>
          <label>
            New Password:
            <Input
              size={InputSize.Large}
              value={newPassword}
              setValue={setNewPassword}
              onChange={handleNewPasswordChange}
              placeholderText="*********"
              type={showPassword ? 'text' : 'password'}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm New Password
            <Input
              size={InputSize.Large}
              value={confirmPassword}
              setValue={setConfirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholderText="*********"
              type={showPassword ? 'text' : 'password'}
            />
          </label>
          <label
            htmlFor="check"
            className={styles.passwordCheck}
          >
            Show Password
            {' '}
            <input
              id="check"
              type="checkbox"
              onChange={handleShowPasswordChange}
            />

          </label>

        </div>
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Large} onClick={handleSubmit}
            type={ButtonType.Submit}
          >
            Change Password
          </Button>
        </div>

      </form>
    </div>
  );
};
export default NewPassword;
