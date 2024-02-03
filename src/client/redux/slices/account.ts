import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Before a user is logged in, all fields are potentially undefined
export type LoggedOutAccountState = {
  userId: undefined;
  username: undefined;
  role: undefined;
};

// Once a user is logged in, their account state must have all fields defined
export type LoggedInAccountState = {
  userId: number;
  username: string;
  role: string;
};

// The AccountState can either be in the logged out state or the logged in state
export type AccountState = LoggedOutAccountState | LoggedInAccountState;

const initialState: LoggedOutAccountState = {
  userId: undefined,
  username: undefined,
  role: undefined,
};

type LogInAction = PayloadAction<LoggedInAccountState>;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logIn: (state, action: LogInAction) => {
      const { userId, username, role } = action.payload;
      return { userId, username, role }; // return new state instead of mutating
    },
    logOut: () => {
      return initialState; // return the initialState directly
    },
  },
});

export const AccountActions = accountSlice.actions;

export default accountSlice.reducer;
