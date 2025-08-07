import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import {
  postJwtLogin,
  postJwtLogout,
} from "../../../helpers/fakebackend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem("resUser", JSON.stringify(response.data));
      yield put(loginSuccess(response.data));
    }
    // history("/");
  } catch (error) {
    yield put(apiError(error?.response));
  }
}

function* logoutUser({ payload: { history } }) {
  // const location = import.meta.env.VITE_APP_PORTAL_HOST;
  try {
    // localStorage.removeItem("resUser");

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogout);
      yield put(logoutUserSuccess(response));
    }

    history("/login");
    // window.location.href = "http://localhost:8000";
    // window.location.href = location;
  } catch (error) {
    history("/login");
    // window.location.href = location;
    // yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
