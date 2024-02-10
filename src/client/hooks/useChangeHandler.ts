import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import logger from '../../server/logger';

type SetValue = (value: string) => void;
type ChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => void;

const useChangeHandler = (setValue: SetValue): ChangeHandler => {
  const changeHandler: ChangeHandler = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target instanceof HTMLSelectElement) {
      setValue(target.value);
    } else {
      logger.info('type error in TimeDropdown: handleValueChange');
    }
  };
  return useCallback(changeHandler, [setValue]);
};

export default useChangeHandler;
