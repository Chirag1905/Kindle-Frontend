import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";
import academicYearReducer from "./features/academicYear/academicYearSlice";
import schoolClassReducer from "./features/schoolclass/schoolClassSlice";

const appReducer = combineReducers({
  academicYear: academicYearReducer,
  schoolClass: schoolClassReducer,
});

// Extract the RootState type
export type RootState = ReturnType<typeof appReducer>;

// Root reducer with logout handling
interface LogoutAction {
  type: "LOGOUT";
  [key: string]: unknown;
}

type RootReducerAction = AnyAction | LogoutAction;

const rootReducer: Reducer<RootState, RootReducerAction> = (state: RootState | undefined, action: RootReducerAction) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;