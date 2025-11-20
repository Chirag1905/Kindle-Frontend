import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import {
  postAuthRegisterRequest,
  postAuthRegisterSuccess,
  postAuthRegisterFailure,

  postAuthLoginRequest,
  postAuthLoginSuccess,
  postAuthLoginFailure,
} from "./authSlice";

import {
  postAuthRegister,
  postAuthLogin,
  AuthResponse
} from "./authApi";
import { ApiResponse } from "../academicYear/academicYearApi";

// ---------- Types ----------


// ---------- Saga Workers ----------

// Create a new academic year
function* postAuthRegisterSaga(action: PayloadAction<AuthResponse>) {
  try {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = yield call(postAuthRegister, action.payload);

    if (response.status === 200 || response.status === 201) {
      yield put(postAuthRegisterSuccess(response.data));
    } else {
      yield put(
        postAuthRegisterFailure({
          message: response.data.message,
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      postAuthRegisterFailure({
        message: err.response?.data?.message || "An unexpected error occurred",
        error: err.response?.data?.errors || [],
      })
    );
  }
}

function* postAuthLoginSaga(action: PayloadAction<AuthResponse>) {
  try {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = yield call(postAuthLogin, action.payload);

    if (response.status === 200 || response.status === 201) {
      yield put(postAuthLoginSuccess(response.data));
    } else {
      yield put(
        postAuthLoginFailure({
          message: response.data.message,
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      postAuthLoginFailure({
        message: err.response?.data?.message || "An unexpected error occurred",
        error: err.response?.data?.errors || [],
      })
    );
  }
}

// ---------- Root Saga ----------
export default function* authSaga() {
  yield takeLatest(postAuthRegisterRequest.type, postAuthRegisterSaga);
  yield takeLatest(postAuthLoginRequest.type, postAuthLoginSaga);
}
