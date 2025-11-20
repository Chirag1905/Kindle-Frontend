import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";

// ----------- Types -----------

export interface AcademicYear {
  id?: string | number;
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  [key: string]: unknown; // dynamic properties
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
export interface AcademicYearState {
  academicYearData: AsyncState<AcademicYear[]>;
  academicYearDataPagination: AsyncState<AcademicYear[]>;
  academicYearDataFetch: AsyncState<AcademicYear>;
  academicYearPostData: AsyncState<AcademicYear>;
  academicYearPutData: AsyncState<AcademicYear>;
  academicYearDeleteData: AsyncState<AcademicYear>;
  selectedAcademicYear: AcademicYear | null;
}

export interface ApiError {
  message: string;
  status?: number;
  [key: string]: unknown;
}

// ----------- Helper Function -----------
// Dynamically creates async reducers with proper typing for each action type
function createAsyncReducers<K extends keyof AcademicYearState, Payload = unknown>(
  prefix: string,
  stateKey: K
): {
  [key: `${typeof prefix}Request`]: CaseReducer<AcademicYearState>;
  [key: `${typeof prefix}Success`]: CaseReducer<AcademicYearState, PayloadAction<Payload>>;
  [key: `${typeof prefix}Failure`]: CaseReducer<AcademicYearState, PayloadAction<ApiError | string>>;
} {
  interface AsyncReducers<Payload = unknown> {
    [key: `${typeof prefix}Request`]: CaseReducer<AcademicYearState>;
    [key: `${typeof prefix}Success`]: CaseReducer<AcademicYearState, PayloadAction<Payload>>;
    [key: `${typeof prefix}Failure`]: CaseReducer<AcademicYearState, PayloadAction<ApiError | string>>;
  }

  const asyncReducers = {
    [`${prefix}Request`]: (state: AcademicYearState) => {
      if (state[stateKey]) {
        state[stateKey]!.loading = true;
        state[stateKey]!.error = null;
        state[stateKey]!.data = null;
      }
    },
    [`${prefix}Success`]: (state: AcademicYearState, action: PayloadAction<Payload>) => {
      if (state[stateKey]) {
        state[stateKey]!.loading = false;
        state[stateKey]!.data = action.payload;
        state[stateKey]!.error = null;
      }
    },
    [`${prefix}Failure`]: (state: AcademicYearState, action: PayloadAction<ApiError | string>) => {
      if (state[stateKey]) {
        state[stateKey]!.loading = false;
        state[stateKey]!.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message;
        state[stateKey]!.data = null;
      }
    },
  } as unknown as AsyncReducers<Payload>;

  return asyncReducers;
}


const createInitialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null,
});


// ----------- Initial State -----------
const initialState: AcademicYearState = {
  academicYearData: createInitialAsyncState<AcademicYear[]>(),
  academicYearDataPagination: createInitialAsyncState<AcademicYear[]>(),
  academicYearDataFetch: createInitialAsyncState<AcademicYear>(),
  academicYearPostData: createInitialAsyncState<AcademicYear>(),
  academicYearPutData: createInitialAsyncState<AcademicYear>(),
  academicYearDeleteData: createInitialAsyncState<AcademicYear>(),
  selectedAcademicYear: null,
};

const reducers: SliceCaseReducers<AcademicYearState> = {
  ...createAsyncReducers("getAcademicYear", "academicYearData"),
  ...createAsyncReducers("getAcademicYearPagination", "academicYearDataPagination"),
  ...createAsyncReducers("getAcademicYearFetch", "academicYearDataFetch"),
  ...createAsyncReducers("postAcademicYear", "academicYearPostData"),
  ...createAsyncReducers("putAcademicYear", "academicYearPutData"),
  ...createAsyncReducers("deleteAcademicYear", "academicYearDeleteData"),

  // Setter for selected academic year
  setSelectedAcademicYear: (
    state: AcademicYearState,
    action: PayloadAction<AcademicYear | null>
  ) => {
    state.selectedAcademicYear = action.payload;
  },
};

// ----------- Slice -----------
const academicYearSlice = createSlice({
  name: "academicYear",
  initialState,
  reducers,
});

// ----------- Export Actions -----------
export const {
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
  deleteAcademicYearSuccess,
  deleteAcademicYearFailure,

  setSelectedAcademicYear,
} = academicYearSlice.actions;

// ----------- Export Reducer -----------
export default academicYearSlice.reducer;
