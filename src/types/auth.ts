import { AsyncState } from "./common";

// ---------- Types ----------
export interface AuthObject {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  __v: number;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthObject;
    token: string;
  };
  timestamp: string;
}
export interface AuthPayload {
  email: string;
  password: string;
}
export interface AuthState {
  authRegisterData: AsyncState<AuthResponse>;
  authLoginData: AsyncState<AuthResponse>;
}