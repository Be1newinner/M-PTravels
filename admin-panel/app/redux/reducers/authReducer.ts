/** @format */

// reducers/authReducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  role: null,
  loading: false,
  error: null,
  token: null,
  logout: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLoginRequest: (state) => {
      state.loading = true;
    },
    authLoginSuccess: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.accessToken;
      state.logout = false;
      state.loading = false;
    },
    authLoginFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    authLogoutRequest: (state) => {
      state.loading = true;
    },
    authLogoutSuccess: (state) => {
      state.email = null;
      state.role = null;
      state.token = null;
      state.logout = true;
      state.loading = false;
    },
  },
});

export const {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailed,
  authLogoutRequest,
  authLogoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
