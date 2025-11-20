import axios, { AxiosResponse } from "axios";

// ---------- Environment Variables ----------
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ---------- Types ----------
export interface AuthUser {
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
    user: AuthUser;
    token: string;
  };
  timestamp: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}

// ---------- API Calls ----------

export const postAuthRegister = async (
  payload: AuthPayload
): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/register`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const postAuthLogin = async (
  payload: AuthPayload
): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};