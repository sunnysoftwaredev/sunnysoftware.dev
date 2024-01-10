import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import logger from '../../server/logger';

type SetterCallback = (value: string) => void;
type ChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => void;

const useChangeHandler = (setterCallback: SetterCallback): ChangeHandler => {
  const changeHandler: ChangeHandler = (e) => {
    e.preventDefault();
    setterCallback(e.target.value);
  };
  return useCallback(changeHandler, [setterCallback]);
};

export default useChangeHandler;
