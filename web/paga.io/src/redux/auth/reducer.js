import authActions from "./actions";

const initState = {
  isLogin: false,
  accessToken: null,
  loader: false
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loader: true
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        accessToken: action.token,
        loader: false
      };
    case authActions.LOGOUT:
      return {
        ...state,
        isLogin: false,
        accessToken: null
      };
    case authActions.AUTH_ERROR:
      return {
        ...state,
        isLogin: false,
        accessToken: null,
        loader: false
      };
    default:
      return state;
  }
}
