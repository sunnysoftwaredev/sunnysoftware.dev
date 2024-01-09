import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import logger from '../../server/logger';

type SetterCallback = (value: string) => void;
type ChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

const useChangeHandler = (setterCallback: SetterCallback): ChangeHandler => {
  const changeHandler: ChangeHandler = (e) => {
    const { value } = e.target;
    setterCallback(value);
  };

  return useCallback(changeHandler, [setterCallback]);
};

export default useChangeHandler;
