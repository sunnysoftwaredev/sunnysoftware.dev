import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './ResetPassword.scss';

// TODO: old reset password, saved for when the user is logged in
// rename to something like UserChangePassword

const ResetPassword: FunctionComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setSubmitted(false);
    },
    [],
  );

  const handleConfirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
      setSubmitted(false);
    },
    [],
  );

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError(true);
        return;
      }
      setError(false);
      
      const response = await fetch('api/users/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw { type: 'response-format', message: 'Unexpected body type in response', context: 'ResetPassword.tsx' };
      }
      if (typeof result.success !== 'boolean') {
        throw { type: 'response-boolean', message: 'success property is not boolean', context: 'ResetPassword.tsx' };
      }
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        const typedError = err as { message: string; type?: string; context?: string };
        logger.error(`[${typedError.type || 'error'}] ${typedError.message} ${typedError.context ? `(Context: ${typedError.context})` : ''}`);
      }
    }
  }, [password, confirmPassword]);

  const successMessage = (): React.JSX.Element => (
    <div
      className={classNames({ [styles.hidden]: !submitted })}
    >
      <h3>Password Changed</h3>
    </div>
  );

  const errorMessage = (): React.JSX.Element => (
    <div
      className={classNames({ [styles.hidden]: !error })}
    >
      <h1>Error, passwords do not match</h1>
    </div>
  );

  return (
    <div className={styles.resetPasswordContainer} >
      <div>
        {errorMessage()}
        {successMessage()}
      </div>
      <h2>Change your password</h2>
      <form >
        <div>
          <label className="label" htmlFor="newPassword">New Password</label>
          <input
            onChange={handlePasswordChange} id="newPassword"
            value={password} type="password"
          />
        </div>
        <div>
          <label className="label" htmlFor="retypePassword">Retype Password</label>
          <input
            onChange={handleConfirmPasswordChange} id="retypePassword"
            value={confirmPassword} type="password"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
