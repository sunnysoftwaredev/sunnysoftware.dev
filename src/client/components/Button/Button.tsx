import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren, SyntheticEvent } from 'react';
import React, { useCallback } from 'react';
import styles from './Button.scss';

export enum ButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export enum ButtonVariant {
  Primary = 'Primary',
  Outlined = 'Outlined',
  White = 'White',
}

export enum ButtonIcon {
  LeftArrow = 'LeftArrow',
  RightArrow = 'RightArrow',
  Plus = 'Plus',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}
// export type ButtonType = JSX.IntrinsicElements['button']['type'];

// export type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;

// export type ButtonType = {
//   'button':string,
//   'submit': string,
//   'reset': string,
//   undefined: undefined,
// }

// // React.ComponentProps<'button'>

// export type ButtonType = '"submit" | "button" | "reset" | undefined';

type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant;
  size: ButtonSize;
  onClick: () => void;
  iconType?: ButtonIcon;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
}>;

const Button: FunctionComponent<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  size = ButtonSize.Medium,
  children,
  onClick,
  iconType,
  disabled = false,
  loading = false,
  type = ButtonType.Button,
}) => {
  const handleClick = useCallback((e: SyntheticEvent): void => {
    e.preventDefault();
    onClick();
  }, [onClick]);
  const small = size === ButtonSize.Small;
  const medium = size === ButtonSize.Medium;
  const large = size === ButtonSize.Large;
  const primary = variant === ButtonVariant.Primary;
  const outlined = variant === ButtonVariant.Outlined;
  const white = variant === ButtonVariant.White;
  const plusIcon = iconType === ButtonIcon.Plus;
  const leftArrowIcon = iconType === ButtonIcon.LeftArrow;
  const rightArrowIcon = iconType === ButtonIcon.RightArrow;
  const elementType = {
    [ButtonType.Button]: 'button',
    [ButtonType.Submit]: 'submit',
    [ButtonType.Reset]: 'reset',
  }[type];
  const plusIconElement = plusIcon && !loading && (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.5V19.5M19.5 12H4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const leftArrowIconElement = leftArrowIcon && !loading && (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const rightArrowIconElement = rightArrowIcon && !loading && (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const loadingElement = loading && (
    <svg className={styles.animate} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 12.8438C22.5336 12.8438 22.1563 12.4664 22.1563 12C22.1563 10.6078 21.8844 9.25781 21.3453 7.98516C20.8268 6.75998 20.0763 5.64659 19.1352 4.70625C18.1959 3.76387 17.0822 3.01321 15.8563 2.49609C14.5859 1.95938 13.2359 1.6875 11.8438 1.6875C11.3773 1.6875 11 1.31016 11 0.84375C11 0.377344 11.3773 0 11.8438 0C13.4633 0 15.0359 0.316406 16.5148 0.944531C17.9445 1.54688 19.2266 2.41406 20.3281 3.51562C21.4297 4.61719 22.2945 5.90156 22.8992 7.32891C23.525 8.80781 23.8414 10.3805 23.8414 12C23.8438 12.4664 23.4664 12.8438 23 12.8438Z" fill="white" />
    </svg>
  );
  return (
    <button
      disabled={disabled}
      // type={elementType}
      type="button"
      className={classNames(styles.button, {
        [styles.primary]: primary,
        [styles.outlined]: outlined,
        [styles.white]: white,
        [styles.small]: small,
        [styles.medium]: medium,
        [styles.large]: large,
        [styles.icon]: plusIcon || leftArrowIcon || rightArrowIcon,
        [styles.iconOnly]: children === undefined,
        [styles.loading]: loading,
      })}
      onClick={handleClick}
    >
      {plusIconElement}
      {leftArrowIconElement}
      {rightArrowIconElement}
      {loadingElement}
      {children}
    </button>
  );
};

export default Button;
