/** @format */

export const selectAuth = (state: any) => ({
  email: state.auth.email,
  role: state.auth.role,
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
  logout: state.auth.logout,
});
