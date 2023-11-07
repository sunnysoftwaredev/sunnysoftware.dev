import classNames from 'classnames';
import type { FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback } from 'react';
import styles from './Button.scss';

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
// way to make this easier to write?

type ButtonProps = {
  size: ButtonSize;
  children?: string;
  onClick: () => void;
  icon?: boolean;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button: FunctionComponent<ButtonProps>
 = ({ size = 'medium', onClick, icon = false, children, variant = 'primary', disabled = false, loading = false }) => {
   const handleClick = useCallback((e: SyntheticEvent): void => {
     e.preventDefault();
     onClick(e);
   }, [onClick]);
   return (
     <button
       disabled={disabled}
       type="button"
       className={classNames({
         [styles.primary]: variant === 'primary' && !loading,
         [styles.outlined]: variant === 'outlined' && !loading,
         [styles.white]: variant === 'white' && !loading,
       }, {
         [styles.small]: size === 'small',
         [styles.medium]: size === 'medium',
         [styles.large]: size === 'large',
         [styles.smallWithIcon]: (size === 'small') && !icon,
         [styles.mediumWithIcon]: (size === 'medium') && !icon,
         [styles.largeWithIcon]: (size === 'large') && !icon,
         [styles.smallIconOnly]: (size === 'small') && children === undefined,
         [styles.mediumIconOnly]: (size === 'medium') && children === undefined,
         [styles.largeIconOnly]: (size === 'large') && children === undefined,
       }, {
         [styles.primaryLoading]: loading && variant === 'primary',
         [styles.outlinedLoading]: loading && variant === 'outlined',
         [styles.whiteLoading]: loading && variant === 'white',
       })}
       onClick={handleClick}
     >
       {(icon && !loading) && (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M12 4.5V19.5M19.5 12H4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
       ) }
       {/* Loading Animation */}
       {loading && (
         <svg className={styles.animate} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M23 12.8438C22.5336 12.8438 22.1563 12.4664 22.1563 12C22.1563 10.6078 21.8844 9.25781 21.3453 7.98516C20.8268 6.75998 20.0763 5.64659 19.1352 4.70625C18.1959 3.76387 17.0822 3.01321 15.8563 2.49609C14.5859 1.95938 13.2359 1.6875 11.8438 1.6875C11.3773 1.6875 11 1.31016 11 0.84375C11 0.377344 11.3773 0 11.8438 0C13.4633 0 15.0359 0.316406 16.5148 0.944531C17.9445 1.54688 19.2266 2.41406 20.3281 3.51562C21.4297 4.61719 22.2945 5.90156 22.8992 7.32891C23.525 8.80781 23.8414 10.3805 23.8414 12C23.8438 12.4664 23.4664 12.8438 23 12.8438Z" fill="white" />
         </svg>
       )}
       {children !== undefined && !loading && <div>{children}</div>}
     </button>
   );
 };

export default Button;

