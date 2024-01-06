import React, { useState, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent, FormEvent } from 'react';
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

  const [popupStates, setPopupStates] = useState({
    showSuccessPopup: false,
    showErrorPopup: false,
    showMismatchPopup: false
  });

  const navigate = useNavigate();
  const [param] = useSearchParams();
  const resetToken = param.get('token');

  const { active } = useContext(AuthContext) ?? { active: false };

  if (active) {
    navigate('/');
  }

  const handlePasswordChange = (setter) => useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    },
    [setter],
  );

  const handleShowPasswordChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [setShowPassword, showPassword]);

  const togglePopup = (popupKey: keyof typeof popupStates) => useCallback(() => {
    setPopupStates(prevState => ({ ...prevState, [popupKey]: !prevState[popupKey] }));
  }, []);

  const comparePasswords = (password1: string, password2: string): boolean => {
    return password1 === password2;
  };

  const handleSubmit = useCallback(async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordsSame = comparePasswords(newPassword, confirmPassword);
    if (!passwordsSame) {
      setPopupStates({...popupStates, showMismatchPopup: true});
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
        setPopupStates({...popupStates, showSuccessPopup: true});
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setPopupStates({...popupStates, showErrorPopup: true});
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
      setPopupStates({...popupStates, showErrorPopup: true});
    }
  }, [newPassword, confirmPassword, resetToken, navigate, popupStates]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Reset Password</h2>
        <p>Enter New Password</p>
      </div>
      {popupStates.showMismatchPopup && (
        <PopupMessage
          type={PopupType.Success}
          message="The passwords do not match"
          onClick={togglePopup('showMismatchPopup')}
        />
      )}
      {popupStates.showSuccessPopup && (
        <PopupMessage
          type={PopupType.Success}
          message="Password has been change, you will now be redirected to the login page"
          onClick={togglePopup('showSuccessPopup')}
        />
      )}
      {popupStates.showErrorPopup && (
        <PopupMessage
          type={PopupType.Failure}
          message="Error: could not verify user credentials"
          onClick={togglePopup('showErrorPopup')}
        />
      )}
      <form className={styles.newPassword} onSubmit={handleSubmit}>
        <div>
          <label>
            New Password:
            <Input
              size={InputSize.Large}
              value={newPassword}
              setValue={setNewPassword}
              onChange={handlePasswordChange(setNewPassword)}
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
              onChange={handlePasswordChange(setConfirmPassword)}
              placeholderText="*********"
              type={showPassword ? 'text' : 'password'}
            />
          </label>
          <label htmlFor="check" className={styles.passwordCheck}>
            Show Password
            <input id="check" type="checkbox" onChange={handleShowPasswordChange} />
          </label>
        </div>
        <div className={styles.buttons}>
          <Button size={ButtonSize.Large} type={ButtonType.Submit}>
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
