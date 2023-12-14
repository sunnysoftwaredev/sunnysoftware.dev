import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
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

type BaseProps = PropsWithChildren<{
  variant?: ButtonVariant;
  size: ButtonSize;
  iconType?: ButtonIcon;
  disabled?: boolean;
  loading?: boolean;
}>;

type LinkButtonProps = BaseProps & {
  to: string;
};

type ButtonProps = BaseProps & {
  onClick?: () => void;
  type?: ButtonType;
};

const Button: FunctionComponent<ButtonProps | LinkButtonProps> = (props) => {
  const {
    variant = ButtonVariant.Primary,
    size = ButtonSize.Medium,
    children,
    iconType,
    disabled = false,
    loading = false,
  } = props;
  const small = size === ButtonSize.Small;
  const medium = size === ButtonSize.Medium;
  const large = size === ButtonSize.Large;
  const primary = variant === ButtonVariant.Primary;
  const outlined = variant === ButtonVariant.Outlined;
  const white = variant === ButtonVariant.White;
  const plusIcon = iconType === ButtonIcon.Plus;
  const leftArrowIcon = iconType === ButtonIcon.LeftArrow;
  const rightArrowIcon = iconType === ButtonIcon.RightArrow;
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
  if ('to' in props) {
    const { to } = props;
    return (
      <Link
        to={to}
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
      >
        {plusIconElement}
        {leftArrowIconElement}
        {rightArrowIconElement}
        {loadingElement}
        {children}
      </Link>
    );
  }
  const { onClick, type } = props;
  return (
    <button
      disabled={disabled}
      // Disabling this rule here because TypeScript is verifying the type of
      // the `type` variable, so we don't need to worry about it being a
      // "dynamic" type in this case, which is what the rule was concerned with.
      // eslint-disable-next-line react/button-has-type
      type={type}
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
      onClick={onClick}
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
