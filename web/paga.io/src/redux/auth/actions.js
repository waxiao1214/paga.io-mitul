const authActions = {
  LOGIN: "LOGIN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  AUTH_ERROR: "AUTH_ERROR",

  login: value => {
    return {
      type: authActions.LOGIN_REQUEST,
      data: value.data
    };
  },
  logout: () => {
    return {
      type: authActions.LOGOUT
    };
  }
};

export default authActions;
