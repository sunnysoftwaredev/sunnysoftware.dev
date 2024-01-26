import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import logger from '../../server/logger';

type SetterCallback = (value: number) => void;
type ChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => void;

const useNumberChangeHandler
 = (setterCallback: SetterCallback): ChangeHandler => {
   const changeHandler: ChangeHandler = (e) => {
     e.preventDefault();
     const stringValue = e.target.value;
     const numValue = Number(stringValue);
     const { target } = e;
     if (target instanceof HTMLSelectElement) {
       setterCallback(numValue);
     } else {
       logger.info('type error in handleNumberValueChange');
     }
   };
   return useCallback(changeHandler, [setterCallback]);
 };

export default useNumberChangeHandler;
