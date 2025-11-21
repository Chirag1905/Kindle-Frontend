import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export interface ApiError {
    message: string;
    status?: number;
    error?: unknown[];
}

export type AsyncReducerSet<State, Payload, Prefix extends string> = {
  [K in `${Prefix}Request`]: CaseReducer<State>;
} & {
  [K in `${Prefix}Success`]: CaseReducer<State, PayloadAction<Payload>>;
} & {
  [K in `${Prefix}Failure`]: CaseReducer<State, PayloadAction<ApiError | string>>;
};
