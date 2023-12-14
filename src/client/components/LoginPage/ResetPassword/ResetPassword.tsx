import React, { useState, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent } from 'react';
import { isObjectRecord } from '../../../../common/utilities/types';
import AuthContext from '../../../context/AuthContext';
import logger from '../../../../server/logger';
import Input, { InputSize } from '../../Input/Input';
import Button, { ButtonSize, ButtonType } from '../../Button/Button';
import PopupMessage, { PopupType } from '../../PopupMessage/PopupMessage';
import styles from './ResetPassword.scss';

const ResetPassword: FunctionComponent = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showMismatchPopup, setShowMismatchPopup] = useState(false);

  const navigate = useNavigate();

  const [param] = useSearchParams();
  const resetToken = param.get('token');

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

  const showSuccessPopupFunction = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const showErrorPopupFunction = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const showMismatchPopupFunction = useCallback(() => {
    setShowMismatchPopup(!showMismatchPopup);
  }, [showMismatchPopup]);

  const comparePasswords = useCallback(
    (
      password1: string,
      password2: string
    ): boolean => {
      if (password1 !== password2) {
        return false;
      }
      return true;
    },
    [],
  );

  const handleSubmit = useCallback(async(e: Event) => {
    e.preventDefault();
    const passwordsSame = comparePasswords(newPassword, confirmPassword);
    if (!passwordsSame) {
      setShowMismatchPopup(true);
      return;
    }
    try {
      const response = await fetch('/api/forgotPassword/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
          resetToken,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ResetPassword.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: ResetPassword.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setShowErrorPopup(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [newPassword, confirmPassword, resetToken, comparePasswords, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Reset Password</h2>
        <p>Enter New Password</p>
      </div>
      {showMismatchPopup && (
        <PopupMessage
          type={PopupType.Success}
          message="The passwords do not match"
          onClick={showMismatchPopupFunction}
        />
      ) }
      {showSuccessPopup && (
        <PopupMessage
          type={PopupType.Success}
          message="Password has been change, you will now be redirected to the login page"
          onClick={showSuccessPopupFunction}
        />
      ) }
      {showErrorPopup && (
        <PopupMessage
          type={PopupType.Failure}
          message="Error: could not verify user credentials"
          onClick={showErrorPopupFunction}
        />
      ) }
      {/* onSubmit={handleSubmit}  */}
      <form className={styles.newPassword}>
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
            Reset Password
          </Button>
        </div>

      </form>
    </div>
  );
};
export default ResetPassword;
