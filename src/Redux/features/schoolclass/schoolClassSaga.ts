import { call, put, takeLatest } from "redux-saga/effects";
import {
  getSchoolClassRequest,
  getSchoolClassSuccess,
  getSchoolClassFailure,
  SchoolClass
} from "./schoolClassSlice";

import {
  getSchoolClass,
} from "./schoolClassApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ---------- Types ----------


interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  errors?: unknown[];
}

interface SchoolClassPayload {
  schoolId: number;
  token?: string;
}

type SchoolClassRequest = SchoolClassPayload;

// ---------- Saga Workers ----------

function* getSchoolClassSaga(
  action: PayloadAction<SchoolClassPayload>
): Generator<any, void, any> {
  try {
    const response = yield call(getSchoolClass, action.payload);
    const apiResponse = (response as AxiosResponse<ApiResponse<SchoolClass[]>>).data;
    
    if (apiResponse?.data) {
      const schoolClasses = apiResponse.data;
      yield put({
        type: getSchoolClassSuccess.type,
        payload: schoolClasses
      });
    } else {
      throw new Error("No data received from API");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch school classes";
    yield put({
      type: getSchoolClassFailure.type,
      payload: errorMessage
    });
  }
}

// ---------- Root Saga ----------
export default function* SchoolClassSaga() {
  yield takeLatest(getSchoolClassRequest.type, getSchoolClassSaga);
}
