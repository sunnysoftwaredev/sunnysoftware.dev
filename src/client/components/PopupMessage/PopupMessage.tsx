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

const PopupMessage: FunctionComponent<PopupProps> = ({ type = PopupType.Success, message, onClick }) => {
  return (
    <div className={classNames(styles.container, {
      [styles.success]: type === PopupType.Success,
      [styles.failure]: type === PopupType.Failure,
    })}
    >
      <div className={styles.leftIcon}>
        {type === PopupType.Success && <CheckmarkIcon />}
        {type === PopupType.Failure && <WarningIcon />}
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
