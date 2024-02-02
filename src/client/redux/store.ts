import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './slices';

export type State = ReturnType<typeof reducer>;

declare global {
  interface Window {
    // eslint-disable-next-line id-match
    initialReduxState: State;
  }
}

// Let's adhere to standard JS practices by avoiding variable names with double underscores
const preloadedState = window.initialReduxState;

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
