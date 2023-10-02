import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import logger from '../../server/logger';

type SetterCallback = (value: string) => void;
type ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

const useHtmlInputChange = (setterCallback: SetterCallback): ChangeHandler => {
  const changeHandler: ChangeHandler = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      setterCallback(e.target.value);
    } else {
      logger.info('type error in TimeDropdown: handleValueChange');
    }
  };
  return useCallback(changeHandler, [setterCallback]);
};

export default useHtmlInputChange;
