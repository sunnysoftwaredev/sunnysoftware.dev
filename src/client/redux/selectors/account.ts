import { createSelector } from '@reduxjs/toolkit';
import type { AccountState } from '../slices/account';
import type { State } from '../store';

const getAccount = (state: State): AccountState => (
  state.account
);

const selectUserId = (account: AccountState) => account.userId;
const selectUsername = (account: AccountState) => account.username;
const selectRole = (account: AccountState) => account.role;

export const getUserId = createSelector(getAccount, selectUserId);

export const getUsername = createSelector(getAccount, selectUsername);

export const getRole = createSelector(getAccount, selectRole);

export const getLoggedIn = createSelector(
  [getUserId],
  (userId): boolean => userId !== undefined,
);

const isRole = (role: string) => createSelector(
  [getRole],
  (accountRole): boolean => accountRole === role,
);

export const getIsClient = isRole('client');
export const getIsEmployee = isRole('employee');
export const getIsAdmin = isRole('admin');
