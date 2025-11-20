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