import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import logger from '../../server/logger';

type SetterCallback = (value: string) => void;

const useChangeHandler = (setterCallback: SetterCallback) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setterCallback(e.target.value);
  };
  return useCallback(changeHandler, [setterCallback]);
};

export default useChangeHandler;
