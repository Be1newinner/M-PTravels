/** @format */

import { call, put, takeEvery } from "redux-saga/effects";
import Cookies from "js-cookie";
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailed,
  authLogoutSuccess,
  authLogoutRequest,
} from "../reducers/authReducer";
import { loginAPI } from "../../service/login";

function* loginSaga(action: any): any {
  try {
    const response: any = yield call(loginAPI, action.payload);
    // const token = user.data.token;
    console.log("USER => ", response);
    yield put(authLoginSuccess({ ...response })); // Ensure the token is set in your state
  } catch (error) {
    console.log("AUTH SAGA ERROR", error);
    yield put(authLoginFailed(error));
  }
}

function* logoutSaga() {
  try {
    Cookies.remove("auth_token"); // Remove token from cookies
    localStorage.removeItem("persist:root"); // Clear persisted state
    yield put(authLogoutSuccess()); // Update state to reflect logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export function* loginSagaWatcher() {
  yield takeEvery(authLoginRequest.type, loginSaga);
  yield takeEvery(authLogoutRequest.type, logoutSaga);
}
