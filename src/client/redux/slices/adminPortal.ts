import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import type { Project, ProjectWithEmployeeId } from '../../../common/utilities/types';

export type AdminPortalState = {
  showRegistrationForm: boolean;
  userList: UserIdNameEmailRoleActivePhone[];
  projectsWithId: ProjectWithEmployeeId[];
  projects: Project[];
};

const initialState: AdminPortalState = {
  showRegistrationForm: false,
  userList: [],
  projectsWithId: [],
  projects: [],
};

type UserListAction = PayloadAction<{
  usersArray: UserIdNameEmailRoleActivePhone[];
}>;

type ProjectListAction = PayloadAction<{
  projectsWithId: ProjectWithEmployeeId[];
}>;

type ProjectsAction = PayloadAction<{
  fullProjectList: Project[];
}>;

const adminPortalSlice = createSlice({
  name: 'adminPortal',
  initialState,
  reducers: {
    toggleShowRegistrationForm: (state) => {
      state.showRegistrationForm = !state.showRegistrationForm;
    },
    populateUserList: (state, action: UserListAction) => {
      state.userList = action.payload.usersArray;
    },
    populateProjectList: (state, action: ProjectListAction) => {
      state.projectsWithId = action.payload.projectsWithId;
    },
    populateProjectsArray: (state, action: ProjectsAction) => {
      state.projects = action.payload.fullProjectList;
    },
  },
});

export const AdminPortalActions = adminPortalSlice.actions;

export default adminPortalSlice.reducer;
