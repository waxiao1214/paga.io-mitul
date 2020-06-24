import { all, takeEvery, put, fork } from "redux-saga/effects";
import authActions from "./actions";
import {
  userLogin
} from "services/auth";
import { push } from "react-router-redux";
import { message } from "antd";

export function* loginRequest() {
  yield takeEvery(authActions.LOGIN_REQUEST, function*({ data }) {
    try {
      let response = yield userLogin({
        email: data.email,
        password: data.password
      });
      if (response.status === 200 || response.status === 201) {
        const { data } = response.data;
        yield put({
          type: authActions.LOGIN_SUCCESS,
          token: data.token,
        });
        yield put(push("/"))
      } else {
        throw response;
      }
    } catch (e) {
      message.error(e.response.data.message);
      yield put({
        type: authActions.AUTH_ERROR
      });
    }
  });
}

export default function* authSagas() {
  yield all([
    fork(loginRequest)
  ]);
}
