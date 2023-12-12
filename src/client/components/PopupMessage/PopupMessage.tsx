import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames';
import CheckmarkIcon from '../../static/svgs/CheckmarkIcon';
import XIcon from '../../static/svgs/XIcon';
import WarningIcon from '../../static/svgs/WarningIcon';
import styles from './PopupMessage.scss';

export enum PopupType {
  Success = 'success',
  Failure = 'failure',
}

type PopupProps = PropsWithChildren<{
  type?: PopupType;
  message: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}>;

const PopupMessage: FunctionComponent<PopupProps> = (props) => {
  const { type = PopupType.Success, message, onClick } = props;
  const success = type === PopupType.Success;
  const failure = type === PopupType.Failure;
  return (
    <div className={classNames(styles.container, {
      [styles.success]: success,
      [styles.failure]: failure,
    })}
    >
      <div className={styles.leftIcon}>
        {success && <CheckmarkIcon />}
        {failure && <WarningIcon />}
      </div>
      <p>{message}</p>
      <div className={styles.rightIcon}>
        <button type="button" onClick={onClick}>
          <XIcon />
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
