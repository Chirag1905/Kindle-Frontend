import { AuthPayload, AuthResponse } from "@/types/auth";
import axios, { AxiosResponse } from "axios";

// ---------- Environment Variables ----------
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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