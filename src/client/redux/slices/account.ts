import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AccountState = {
  userId?: number;
  username?: string;
  role?: string;
};

const initialState: AccountState = {
  userId: undefined,
  username: undefined,
  role: undefined,
};

type LogInAction = PayloadAction<{
  userId: number;
  username: string;
  role: string;
}>;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logIn: (state, action: LogInAction) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logOut: (state) => {
      state.userId = undefined;
      state.username = undefined;
      state.role = undefined;
    },
  },
});

export const AccountActions = accountSlice.actions;

export default accountSlice.reducer;
