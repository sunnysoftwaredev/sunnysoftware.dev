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

const Input: FunctionComponent<InputProps> = ({
  size = InputSize.Medium,
  placeholderText,
  onChange,
  type = 'text',
  disabled = false,
  icon = false,
  setValue,
  value,
}) => {
  const handleDelete = useCallback((): void => {
    setValue('');
  }, [setValue]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    onChange(e);
  }, [onChange]);

  const sizeToStyleMap = {
    [InputSize.Small]: styles.small,
    [InputSize.Medium]: styles.medium,
    [InputSize.Large]: styles.large,
  };

  const inputSizeStyle = sizeToStyleMap[size] || sizeToStyleMap[InputSize.Medium];

  const searchIcon = icon && (
    <button
      type="button"
      className={classNames(styles.searchButton, inputSizeStyle)}
    >
      {/* SVG omitted for brevity */}
    </button>
  );

  const eraseButton = value.length > 0 && (
    <button
      type="reset"
      onClick={handleDelete}
      className={classNames(styles.eraseButton, inputSizeStyle)}
    >
      {/* SVG omitted for brevity */}
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
        className={classNames(styles.input, inputSizeStyle)}
      />
      {eraseButton}
    </div>
  );
};

export default Input;
