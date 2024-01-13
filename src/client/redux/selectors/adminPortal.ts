import { createSelector } from '@reduxjs/toolkit';
import type { State } from '../store';
import type { AdminPortalState } from '../slices/adminPortal';

const getAdminPortal = (state: State): AdminPortalState => (
  state.adminPortal
);

export const getShowRegistrationForm = createSelector(
  getAdminPortal,
  adminPortal => adminPortal.showRegistrationForm,
);
