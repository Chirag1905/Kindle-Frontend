import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import {
  getAcademicYearRequest,
  getAcademicYearSuccess,
  getAcademicYearFailure,

  getAcademicYearPaginationRequest,
  getAcademicYearPaginationSuccess,
  getAcademicYearPaginationFailure,

  getAcademicYearFetchRequest,
  getAcademicYearFetchSuccess,
  getAcademicYearFetchFailure,

  postAcademicYearRequest,
  postAcademicYearSuccess,
  postAcademicYearFailure,

  putAcademicYearRequest,
  putAcademicYearSuccess,
  putAcademicYearFailure,
  deleteAcademicYearRequest,
  deleteAcademicYearFailure,
  deleteAcademicYearSuccess,
} from "./academicYearSlice";

import {
  getAcademicYear,
  getAcademicYearPagination,
  getAcademicYearFetch,
  postAcademicYear,
  putAcademicYear,
  AcademicYear,
  ApiResponse,
  deleteAcademicYear,
} from "./academicYearApi";

// ---------- Types ----------
export interface PaginationParams {
  page: number;
  size: number;
  sortBy: string;
  ascending: boolean;
}

export interface AcademicYearPayload {
  token: string;
  data?: Record<string, unknown>;
  id?: string | number;
}

// ---------- Saga Workers ----------

// Fetch list of academic years
function* getAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear[]>> = yield call(getAcademicYear, action.payload);

    if (response.data.success) {
      yield put(getAcademicYearSuccess(response.data));
    } else {
      yield put(getAcademicYearFailure(response.data.message || "Failed to fetch academic years"));
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch academic years";
    yield put(getAcademicYearFailure(message));
  }
}

// Fetch academic years with pagination
function* getAcademicYearPaginationSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear[]>> = yield call(getAcademicYearPagination, action.payload);
    yield put(getAcademicYearPaginationSuccess(response.data));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch paginated academic years";
    yield put(getAcademicYearPaginationFailure(message));
  }
}

// Fetch single academic year by ID
function* getAcademicYearFetchSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear>> = yield call(getAcademicYearFetch, action.payload);
    yield put(getAcademicYearFetchSuccess(response.data));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch academic year";
    yield put(getAcademicYearFetchFailure(message));
  }
}

// Create a new academic year
function* postAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear>> = yield call(postAcademicYear, action.payload);

    if (response.status === 200 || response.status === 201) {
      yield put(postAcademicYearSuccess(response.data));
      yield put(getAcademicYearRequest({}));
    } else {
      yield put(
        postAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      postAcademicYearFailure({
        message: err.response?.data?.message || "An unexpected error occurred",
        error: err.response?.data?.errors || [],
      })
    );
  }
}

// Update an existing academic year
function* putAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear>> = yield call(putAcademicYear, action.payload);

     if (response.status === 200 || response.status === 201) {
      yield put(putAcademicYearSuccess(response.data));
      yield put(getAcademicYearRequest({}));
    } else {
      yield put(
        putAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      putAcademicYearFailure({
        message: err.response?.data?.message || "An unexpected error occurred",
        error: err.response?.data?.errors || [],
      })
    );
  }
}

// Delete an academic year
function* deleteAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<null>> = yield call(deleteAcademicYear, action.payload);

    if (response.status === 200 || response.status === 201) {
      yield put(deleteAcademicYearSuccess(response.data));
      yield put(getAcademicYearRequest({}));
    } else {
      yield put(
        deleteAcademicYearFailure({
          message: response.data.message || "Failed to delete academic year",
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      deleteAcademicYearFailure({
        message: err.response?.data?.message || "An unexpected error occurred while deleting",
        error: err.response?.data?.errors || [],
      })
    );
  }
}


// ---------- Root Saga ----------
export default function* academicYearSaga() {
  yield takeLatest(getAcademicYearRequest.type, getAcademicYearSaga);
  yield takeLatest(getAcademicYearPaginationRequest.type, getAcademicYearPaginationSaga);
  yield takeLatest(getAcademicYearFetchRequest.type, getAcademicYearFetchSaga);
  yield takeLatest(postAcademicYearRequest.type, postAcademicYearSaga);
  yield takeLatest(putAcademicYearRequest.type, putAcademicYearSaga);
  yield takeLatest(deleteAcademicYearRequest.type, deleteAcademicYearSaga);
}
