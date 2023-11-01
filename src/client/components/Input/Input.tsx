import classNames from 'classnames';
import type { FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback } from 'react';
import styles from './Input.scss';

// value or icon needed as prop?

type InputProps = {
  size: string;
  placeholderText?: string;
  onClick: (e: SyntheticEvent) => void;
};

const Input: FunctionComponent<InputProps>
 = ({ size, placeholderText, onClick }) => {
   const handleClick = useCallback((e: SyntheticEvent): void => {
     e.preventDefault();
     onClick(e);
   }, [onClick]);
   return (
     <input
       type="input"
       placeholder={placeholderText}
       className={classNames(styles.input, {
         [styles.small]: size === 'small',
         [styles.medium]: size === 'medium',
         [styles.large]: size === 'large',
       })}
       onClick={handleClick}
     />
   );
 };

export default Input;

