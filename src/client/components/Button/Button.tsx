import classNames from 'classnames';
import type { FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback } from 'react';
import styles from './Button.scss';

type ButtonProps = {
  size: string;
  children?: string;
  onClick: (e: SyntheticEvent) => void;
  icon: boolean;
};

const Button: FunctionComponent<ButtonProps>
 = ({ size, children, onClick, icon }) => {
   const handleClick = useCallback((e: SyntheticEvent): void => {
     e.preventDefault();
     onClick(e);
   }, [onClick]);
   return (
     <button
       type="button"
       className={classNames(styles.button, {
         [styles.small]: size === 'small',
         [styles.medium]: size === 'medium',
         [styles.large]: size === 'large',
       }, {
         [styles.smallIcon]: (size === 'small') && children === undefined,
         [styles.mediumIcon]: (size === 'medium') && children === undefined,
         [styles.largeIcon]: (size === 'large') && children === undefined,
       })}
       onClick={handleClick}
     >
       {/* <h5 className={styles.icon}>{icon ? '+' : ''}</h5> */}
       {icon && (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M12 4.5V19.5M19.5 12H4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
       ) }
       {children !== undefined && <div>{children}</div>}
     </button>
   );
 };

export default Button;

// Just icon, not working

