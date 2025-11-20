import axios, { AxiosResponse } from "axios";

// ---------- Environment Variables ----------
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH as string;

// ---------- Types ----------
export interface AcademicYear {
  id: string | number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface AcademicYearParams {
  year?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface AcademicYearRequest {
  token: string;
  data?: AcademicYearParams;
  id?: string | number;
  schoolId?: string | number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: unknown[];
  statusCode?: number;
  success?: boolean;
}

// ---------- API Calls ----------

// Fetch list of academic years
export const getAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<AcademicYear[]>>> => {
  return axios.get<ApiResponse<AcademicYear[]>>(
    `${API_BASE_URL}/academic-years/school/1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
      },
      params: obj.data,
    }
  );
};

// Fetch academic years with pagination
export const getAcademicYearPagination = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<AcademicYear[]>>> => {
  return axios.get<ApiResponse<AcademicYear[]>>(
    `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/academicyearpagination`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
      },
      params: obj.data,
    }
  );
};

// Fetch single academic year by ID
export const getAcademicYearFetch = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<AcademicYear>>> => {
  return axios.get<ApiResponse<AcademicYear>>(
    `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchacademicyear/${obj.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
      },
      params: obj.data,
    }
  );
};

// Create a new academic year
export const postAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<AcademicYear>>> => {
  return axios.post<ApiResponse<AcademicYear>>(
    `${API_BASE_URL}/academic-years`,
    obj,
    {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${obj.token}`,
      // },
    }
  );
};

// Update an existing academic year
export const putAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<AcademicYear>>> => {
  return axios.put<ApiResponse<AcademicYear>>(
    `${API_BASE_URL}/academic-years/${obj.schoolId}`,
    obj,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
      },
    }
  );
};

// Delete an academic year by ID
export const deleteAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<null>>> => {
  return axios.delete<ApiResponse<null>>(
    `${API_BASE_URL}/academic-years/${obj.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
      },
      data: obj.data,
    }
  );
};

