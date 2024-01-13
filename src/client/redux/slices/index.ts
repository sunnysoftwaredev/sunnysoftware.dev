import { combineReducers } from 'redux';
import account from './account';
import adminPortal from './adminPortal';

export const reducer = combineReducers({
  account,
  adminPortal,
});
