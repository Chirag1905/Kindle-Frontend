import { all } from "redux-saga/effects";
import academicYearSaga from "./features/academicYear/academicYearSaga";
import schoolClassSaga from "./features/schoolclass/schoolClassSaga";

export default function* rootSaga() {
  yield all([
    academicYearSaga(),
    schoolClassSaga(),
  ]);
}
