import { combineReducers, Reducer } from 'redux';
import account from './account';
import { RootState } from './types'; // Assuming `RootState` is defined in './types'

export const reducer: Reducer<RootState> = combineReducers({
  account,
});
