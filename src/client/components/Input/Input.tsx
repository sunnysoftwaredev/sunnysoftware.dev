import classNames from 'classnames';
import type { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react';
import React, { useCallback } from 'react';
import styles from './Input.scss';

export enum InputSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

type InputProps = {
  size: string;
  placeholderText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  icon?: boolean;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
};

const Input: FunctionComponent<InputProps>
 = ({ size = InputSize.Medium, placeholderText, onChange, type = 'text',
   disabled = false, icon = false, setValue, value }) => {
   const handleDelete = useCallback((): void => {
     setValue('');
   }, [setValue]);

   const handleChange
    = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      onChange(e);
    }, [onChange]);
   const small = size === InputSize.Small;
   const medium = size === InputSize.Medium;
   const large = size === InputSize.Large;
   const searchIcon = icon && (
     <button
       type="button" className={classNames(styles.searchButton, {
         [styles.small]: small,
         [styles.medium]: medium,
         [styles.large]: large,
       })}
     >
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" clipRule="evenodd" d="M3.71429 9.93144C3.71429 6.4978 6.4978 3.71429 9.93144 3.71429H9.94287C13.3765 3.71429 16.16 6.4978 16.16 9.93144V9.94287C16.16 13.3765 13.3765 16.16 9.94287 16.16H9.93144C6.4978 16.16 3.71429 13.3765 3.71429 9.94287V9.93144ZM9.93144 2C5.55103 2 2 5.55103 2 9.93144V9.94287C2 14.3233 5.55103 17.8743 9.93144 17.8743H9.94287C11.8243 17.8743 13.5527 17.2192 14.9125 16.1247L20.5368 21.749C20.8715 22.0837 21.4142 22.0837 21.7489 21.749C22.0837 21.4142 22.0837 20.8715 21.7489 20.5368L16.1247 14.9125C17.2192 13.5528 17.8743 11.8243 17.8743 9.94287V9.93144C17.8743 5.55103 14.3233 2 9.94287 2H9.93144Z" fill="#1F1F1F" />
       </svg>
     </button>
   );
   const eraseButton = value.length > 0 && (
     <button
       type="reset" onClick={handleDelete} className={classNames(styles.eraseButton, {
         [styles.small]: small,
         [styles.medium]: medium,
         [styles.large]: large,
       })}
     >
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" clipRule="evenodd" d="M16.2425 7.75743C13.8993 5.41417 10.1002 5.41417 7.75741 7.75748C5.41417 10.1007 5.41417 13.8998 7.7575 16.2426C10.1002 18.5858 13.8993 18.5858 16.2425 16.2425C18.5858 13.8998 18.5858 10.1007 16.2425 7.75743ZM13.7677 9.52519C13.963 9.32993 14.2796 9.32993 14.4748 9.52519C14.6701 9.72047 14.6701 10.037 14.4748 10.2323L12.7071 12.0001L14.4747 13.7677C14.6699 13.963 14.6699 14.2796 14.4747 14.4748C14.2794 14.6701 13.9628 14.6701 13.7676 14.4748L11.9999 12.7072L10.2328 14.4743C10.0376 14.6695 9.72097 14.6695 9.52572 14.4743C9.33046 14.279 9.33046 13.9624 9.52572 13.7672L11.2928 12.0001L9.52506 10.2323C9.3298 10.037 9.3298 9.72044 9.52506 9.52519C9.72032 9.32993 10.0369 9.32993 10.2322 9.52519L11.9999 11.293L13.7677 9.52519Z" fill="#B4B9BF" />
       </svg>
     </button>
   );
   return (
     <div className={styles.container}>
       {searchIcon}
       <input
         type={type}
         placeholder={placeholderText ?? ''}
         disabled={disabled}
         value={value}
         onChange={handleChange}
         className={classNames(styles.input, {
           [styles.small]: small,
           [styles.medium]: medium,
           [styles.large]: large,
         })}
       />
       {eraseButton}
     </div>
   );
 };

export default Input;

