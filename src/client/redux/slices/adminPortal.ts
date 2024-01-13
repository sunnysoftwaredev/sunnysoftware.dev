import { createSlice } from '@reduxjs/toolkit';

export type AdminPortalState = {
  showRegistrationForm: boolean;
};

const adminPortalSlice = createSlice({
  name: 'adminPortal',
  initialState: {
    showRegistrationForm: false,
  },
  reducers: {
    toggleShowRegistrationForm: (state) => {
      state.showRegistrationForm = !state.showRegistrationForm;
    },
  },
});

export const AdminPortalActions = adminPortalSlice.actions;

export default adminPortalSlice.reducer;
