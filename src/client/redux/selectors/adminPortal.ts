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

export const getListOfUsers = createSelector(
  getAdminPortal,
  adminPortal => adminPortal.userList,
);

export const getProjectsWithId = createSelector(
  getAdminPortal,
  adminPortal => adminPortal.projectsWithId,
);

export const getAllProjects = createSelector(
  getAdminPortal,
  adminPortal => adminPortal.projects,
);
