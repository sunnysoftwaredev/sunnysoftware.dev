import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './slices';

export type State = ReturnType<typeof reducer>;

declare global {
  interface Window {
    __INITIAL_STATE__?: State;
  }
}

// Safely retrieves preloaded state from global window object
const getPreloadedState = (): State | undefined => {
  return window.__INITIAL_STATE__;
}

const store = configureStore({
  reducer,
  preloadedState: getPreloadedState(),
});

export default store;
