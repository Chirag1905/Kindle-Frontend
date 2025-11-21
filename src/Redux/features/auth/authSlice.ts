import { AuthState, AuthResponse } from "@/types/auth";
import { ApiError, AsyncReducerSet, AsyncState } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Create async state instance
const createInitialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null,
});

// Generic async reducers factory
function createAsyncReducers<
  K extends keyof AuthState,
  Payload extends AuthResponse = AuthResponse,
  Prefix extends string = string
>(
  prefix: Prefix,
  stateKey: K
): AsyncReducerSet<AuthState, Payload, Prefix> {
  return {
    [`${prefix}Request`]: (state: AuthState) => {
      const slice = state[stateKey];
      slice.loading = true;
      slice.error = null;
      slice.data = null;
    },

    [`${prefix}Success`]: (
      state: AuthState,
      action: PayloadAction<Payload>
    ) => {
      const slice = state[stateKey];
      slice.loading = false;
      slice.error = null;
      slice.data = action.payload;
    },

    [`${prefix}Failure`]: (
      state: AuthState,
      action: PayloadAction<ApiError | string>
    ) => {
      const slice = state[stateKey];
      slice.loading = false;
      slice.data = null;
      slice.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message;
    },
  } as AsyncReducerSet<AuthState, Payload, Prefix>;
}

// ---------- Initial ----------
const initialState: AuthState = {
  authRegisterData: createInitialAsyncState<AuthResponse>(),
  authLoginData: createInitialAsyncState<AuthResponse>(),
};

// ---------- Slice ----------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    ...createAsyncReducers<"authRegisterData", AuthResponse>(
      "postAuthRegister",
      "authRegisterData"
    ),
    ...createAsyncReducers<"authLoginData", AuthResponse>(
      "postAuthLogin",
      "authLoginData"
    ),
  },
});

export const {
  postAuthRegisterRequest,
  postAuthRegisterSuccess,
  postAuthRegisterFailure,

  postAuthLoginRequest,
  postAuthLoginSuccess,
  postAuthLoginFailure,
} = authSlice.actions;

export default authSlice.reducer;
