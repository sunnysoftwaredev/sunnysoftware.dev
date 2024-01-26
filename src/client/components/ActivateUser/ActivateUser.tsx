import type { FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import Button, { ButtonSize, ButtonType, ButtonVariant } from '../Button/Button';
import XIcon from '../../static/svgs/XIcon';
import styles from './ActivateUser.scss';

type ActivateUserPropers = {
  id: number;
  toggleActivating: () => void;
};

const ActivateUser: FunctionComponent<ActivateUserPropers> = (props) => {
  const { id, toggleActivating } = props;

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const toggleActivatingForm = useCallback(
    () => {
      toggleActivating();
    },
    [toggleActivating]
  );

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const handleActivate = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const response = await fetch('api/users/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ActivateUser.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('ActivateUser.tsx error: result.success not boolean');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        logger.info('unsuccessful database update in ActivateUser.tsx');
      }
    } catch (err: unknown) {
      setShowErrorPopup(true);
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [id]);

  return (
    <div className={styles.container} >
      <div
        className={styles.backgroundButton}
        onClick={toggleActivatingForm}
      />
      <form onSubmit={handleActivate} className={styles.form}>
        <div className={styles.top}>
          <p />
          <div>
            <h1>Activate user</h1>
            <p>
              Are you sure you want to activate this employee?
            </p>
          </div>
          <button type="button" onClick={toggleActivatingForm}><XIcon /></button>
        </div>
        <div>
          {showSuccessPopup
        && (
          <PopupMessage
            type={PopupType.Success}
            message="User activated"
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
        <div className={styles.buttons}>
          <Button
            type={ButtonType.Button}
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            onClick={toggleActivating}
          >
            Cancel
          </Button>
          <Button
            type={ButtonType.Submit}
            size={ButtonSize.Large}
          >
            Activate user
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivateUser;
