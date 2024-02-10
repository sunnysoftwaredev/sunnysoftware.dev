import { createSelector } from '@reduxjs/toolkit';
import type { AccountState } from '../slices/account';
import type { State } from '../store';

const getAccount = (state: State): AccountState => state.account;

export const getUserId = (state: State) => getAccount(state).userId;

export const getUsername = (state: State) => getAccount(state).username;

export const getRole = (state: State) => getAccount(state).role;

export const getLoggedIn = (state: State) => getUserId(state) !== undefined;

export const getIsClient = (state: State) => getRole(state) === 'client';

export const getIsEmployee = (state: State) => getRole(state) === 'employee';

export const getIsAdmin = (state: State) => getRole(state) === 'admin';
