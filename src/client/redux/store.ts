import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './slices';

export type State = ReturnType<typeof reducer>;

declare global {
  interface Window {
    // eslint-disable-next-line id-match
    __INITIAL_STATE__: State;
  }
}

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__INITIAL_STATE__;

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
