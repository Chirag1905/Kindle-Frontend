import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8082" as string;
const CLASS_API_PATH_URL = "api/classes" as string;
const SCHOOL_ID = 1; // Example static school ID, replace with dynamic value as needed

// ---------- Types ----------

interface SchoolClassParams {
  SchoolClassId?: number;
  className?: string;
  capacity?: string;
  isActive?: string;
  // Add more fields as per your API specification
}

interface SchoolClassRequest {
  // token: string;
  data?: SchoolClassParams;
  schoolId?: string | number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


// Fetch list of academic years
export const getSchoolClass = async (
  obj: SchoolClassRequest
): Promise<AxiosResponse<ApiResponse<unknown>>> => {
  try {
    const { schoolId = SCHOOL_ID } = obj;
    const response = await axios.get<ApiResponse<unknown>>(
      `${API_BASE_URL}/${CLASS_API_PATH_URL}/school/${schoolId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        }
      }
    );
    return response;
  } catch (err: unknown) {
    console.error(err, "err");
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw err;
  }
};