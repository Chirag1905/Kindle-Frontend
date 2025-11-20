import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '@/Redux/store';

// ----------- Types -----------
export interface SchoolClass {
  id: number;
  schoolId: number;
  schoolName: string;
  academicYearId: number;
  academicYearName: string;
  name: string;
  capacity: number;
  isActive: boolean;
  createdTs: string;
  updatedTs: string;
  currentStudentCount: number;
  availableCapacity: number;
  classFull: boolean;
  classNearlyFull: boolean;
  capacityUtilization: number;
  [key: string]: unknown; // dynamic properties
}

export interface SchoolClassState {
  SchoolClassData: SchoolClass[] | null;
  selectedSchoolClass: SchoolClass | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  message: string;
  status?: number;
  [key: string]: unknown;
}

export interface SchoolClassPayload {
  schoolId: number;
  token?: string;
}

// ----------- Initial State -----------
const initialState: SchoolClassState = {
  SchoolClassData: null,
  selectedSchoolClass: null,
  loading: false,
  error: null,
};

// ----------- Slice -----------
const schoolClassSlice = createSlice({
  name: 'schoolClass',
  initialState,
  reducers: {
    getSchoolClassRequest: (state, action: PayloadAction<SchoolClassPayload>) => {
      state.loading = true;
      state.error = null;
      state.SchoolClassData = null;
    },
    getSchoolClassSuccess: (state, action: PayloadAction<SchoolClass[]>) => {
      state.SchoolClassData = action.payload;
      state.loading = false;
    },
    getSchoolClassFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.SchoolClassData = null;
    },
    setSelectedSchoolClass: (state, action: PayloadAction<SchoolClass | null>) => {
      state.selectedSchoolClass = action.payload;
    },
  },
});

// ----------- Export Actions -----------
export const { 
  getSchoolClassRequest,
  getSchoolClassSuccess,
  getSchoolClassFailure,
  setSelectedSchoolClass
} = schoolClassSlice.actions;

// ----------- Selectors -----------
export const selectSchoolClassState = (state: RootState) => state.schoolClass;
export const selectSchoolClassData = (state: RootState) => state.schoolClass.SchoolClassData;
export const selectSelectedSchoolClass = (state: RootState) => state.schoolClass.selectedSchoolClass;
export const selectSchoolClassLoading = (state: RootState) => state.schoolClass.loading;
export const selectSchoolClassError = (state: RootState) => state.schoolClass.error;

// ----------- Reducer -----------
export default schoolClassSlice.reducer;
