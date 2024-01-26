import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import Input, { InputSize } from '../Input/Input';
import Button, { ButtonSize, ButtonType, ButtonVariant } from '../Button/Button';
import XIcon from '../../static/svgs/XIcon';
import styles from './DeactivateUser.scss';

type DeactivateUserPropers = {
  id: number;
  toggleDeactivating: () => void;
};

const DeactivateUser: FunctionComponent<DeactivateUserPropers> = (props) => {
  const { id, toggleDeactivating } = props;

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [reason, setReason] = useState('');

  const handleReasonChange
   = useCallback((e: ChangeEvent<HTMLInputElement>) => {
     setReason(e.target.value);
     setShowErrorPopup(false);
   }, [setReason],);

  const toggleDeactivatingForm = useCallback(
    () => {
      toggleDeactivating();
    },
    [toggleDeactivating]
  );

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const handleDeactivate = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const response = await fetch('api/users/deactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, reason }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: DeactivateUser.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('DeactivateUser.tsx error: result.success not boolean');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        logger.info('unsuccessful database update in DeactivateUser.tsx');
      }
    } catch (err: unknown) {
      setShowErrorPopup(true);
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [id, reason]);

  return (
    <div className={styles.container} >
      <div
        className={styles.backgroundButton}
        onClick={toggleDeactivatingForm}
      />
      <form onSubmit={handleDeactivate} className={styles.formContainer}>
        <div className={styles.top}>
          <p />
          <div>
            <h1>Deactivate user</h1>
            <p>
              Are you sure you want to deactivate this employee?
            </p>
          </div>
          <button type="button" onClick={toggleDeactivatingForm}><XIcon /></button>
        </div>
        <div>
          {showSuccessPopup
        && (
          <PopupMessage
            type={PopupType.Success}
            message="User deactivated"
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
        <label>Notes</label>
        <Input
          size={InputSize.Medium}
          onChange={handleReasonChange}
          setValue={setReason}
          value={reason}
        />
        <div className={styles.buttons}>
          <Button
            type={ButtonType.Button}
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            onClick={toggleDeactivating}
          >
            Cancel
          </Button>
          <Button
            type={ButtonType.Submit}
            size={ButtonSize.Large}
          >
            Deactivate user
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeactivateUser;
