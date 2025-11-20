/**
 * Centralized Sample Data File
 * This file contains realistic sample data for the entire ERP application
 * All modules can import and use this data for consistency
 */

// ====================
// TYPE DEFINITIONS
// ====================

export interface AcademicYear {
  id?: number;
  srNo?: number;
  academicYearName: string;
  startDate: string;
  endDate: string;
  status: string;
  isActive?: boolean;
}

export interface Employee {
  id: number;
  srNo: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  name?: string; // computed field
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  designation: string;
  department: string;
  employeeType: "TEACHER" | "ADMIN" | "SUPPORT";
  qualification: string;
  experienceYears: number;
  specialization?: string[];
  salary: number;
  address: string;
  emergencyContact: string;
  isActive: boolean;
  status?: boolean;
  createdTs: string;
  updatedTs: string;
  schoolId: number;
}

export interface Subject {
  id: number;
  subjectName: string;
  subjectCode: string;
  isOptional: boolean;
  description?: string;
  credits: number;
  status: boolean;
}

export interface Course {
  id: number;
  schoolId: number;
  academicYearId: number;
  courseName: string; // Used instead of 'name' for clarity
  name?: string; // backward compatibility
  capacity: number;
  isActive: boolean;
  status?: boolean;
  createdTs: string;
  updatedTs: string;
  dbUser: string;
}

export interface SubjectTeacherMapping {
  subjectId: number;
  teacherId?: number;
}

export interface Batch {
  id: number;
  batchName: string;
  courseId: number;
  courseName?: string; // populated field
  capacity: number;
  batchCoordinatorId?: number;
  batchCoordinatorName?: string; // populated field
  status: boolean;
  isActive?: boolean;
  subjects?: number[];
  subjectTeacherMappings?: SubjectTeacherMapping[];
  createdTs: string;
  updatedTs: string;
}

export interface Class {
  id: number;
  className: string;
  courseId: number;
  courseName?: string; // populated field
  batches: Batch[];
  totalStudents?: number; // computed field
  status: boolean;
  isActive?: boolean;
  createdTs: string;
  updatedTs: string;
}

export interface Campus {
  id: number;
  campusName: string;
  campusCode: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  email: string;
  principalId?: number;
  principalName?: string; // populated field
  totalStudents?: number;
  totalTeachers?: number;
  isActive: boolean;
  status?: boolean;
  createdTs: string;
  updatedTs: string;
}

export interface CampusGroup {
  id: number;
  groupName: string;
  groupCode: string;
  description?: string;
  campuses: Campus[];
  totalCampuses?: number; // computed field
  isActive: boolean;
  status?: boolean;
  createdTs: string;
  updatedTs: string;
}

export enum ExamTypeEnum {
  UNIT_TEST = "UNIT_TEST",
  SEMESTER = "SEMESTER", 
  FINAL = "FINAL",
  MID_TERM = "MID_TERM",
  PRE_BOARD = "PRE_BOARD",
  HALF_YEARLY = "HALF_YEARLY"
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE", 
  OTHER = "OTHER"
}

export enum BloodGroupEnum {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+", 
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-"
}

export interface Exam {
  examId?: number;
  id?: number;
  examName: string;
  type: ExamTypeEnum;
  startDate: string;
  endDate: string;
  description?: string;
  status: boolean;
  isActive?: boolean;
  selectedBatches?: number[];
  selectedClasses?: number[];
  createdTs?: string;
  updatedTs?: string;
}

export interface Student {
  id?: number;
  schoolId: number;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: GenderEnum;
  email?: string;
  phone?: string;
  address?: string;
  class: string;
  batch: string;
  parentGuardianName: string;
  parentPhone: string;
  parentEmail?: string;
  admissionDate: string;
  bloodGroup?: BloodGroupEnum;
  medicalConditions?: string;
  status: boolean;
  createdTs?: string;
  updatedTs?: string;
  // Computed fields
  fullName?: string;
  age?: number;
}

// ====================
// SAMPLE DATA
// ====================

export const sampleAcademicYears: AcademicYear[] = [
  {
    id: 1,
    srNo: 1,
    academicYearName: "2023-2024",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    status: "inactive",
    isActive: false,
  },
  {
    id: 2,
    srNo: 2,
    academicYearName: "2024-2025",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "active",
    isActive: true,
  },
  {
    id: 3,
    srNo: 3,
    academicYearName: "2025-2026",
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    status: "draft",
    isActive: false,
  },
];

export const sampleEmployees: Employee[] = [
  {
    id: 1,
    srNo: 1,
    employeeId: "EMP001",
    firstName: "Dr. Rajesh",
    lastName: "Kumar",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@edurelic.com",
    phone: "+91-9876543210",
    dateOfBirth: "1980-05-15",
    hireDate: "2020-07-01",
    designation: "Professor",
    department: "Computer Science",
    employeeType: "TEACHER",
    qualification: "Ph.D. in Computer Science",
    experienceYears: 12,
    specialization: ["Artificial Intelligence", "Machine Learning", "Data Structures"],
    salary: 85000,
    address: "123 Academic Street, Education City",
    emergencyContact: "+91-9876543211",
    isActive: true,
    status: true,
    createdTs: "2020-07-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
    schoolId: 1,
  },
  {
    id: 2,
    srNo: 2,
    employeeId: "EMP002", 
    firstName: "Prof. Priya",
    lastName: "Sharma",
    name: "Prof. Priya Sharma",
    email: "priya.sharma@edurelic.com",
    phone: "+91-9876543220",
    dateOfBirth: "1985-03-20",
    hireDate: "2021-08-15",
    designation: "Associate Professor",
    department: "Mathematics",
    employeeType: "TEACHER",
    qualification: "M.Sc. Mathematics, B.Ed.",
    experienceYears: 8,
    specialization: ["Calculus", "Statistics", "Linear Algebra"],
    salary: 65000,
    address: "456 Knowledge Lane, Academic Town",
    emergencyContact: "+91-9876543221",
    isActive: true,
    status: true,
    createdTs: "2021-08-15T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
    schoolId: 1,
  },
  {
    id: 3,
    srNo: 3,
    employeeId: "EMP003",
    firstName: "Mr. Anil",
    lastName: "Verma",
    name: "Mr. Anil Verma",
    email: "anil.verma@edurelic.com",
    phone: "+91-9876543230",
    dateOfBirth: "1978-11-10",
    hireDate: "2019-06-01",
    designation: "Assistant Professor",
    department: "Physics",
    employeeType: "TEACHER",
    qualification: "M.Sc. Physics, B.Ed.",
    experienceYears: 15,
    specialization: ["Quantum Physics", "Thermodynamics", "Electronics"],
    salary: 60000,
    address: "789 Science Road, University Area",
    emergencyContact: "+91-9876543231",
    isActive: true,
    status: true,
    createdTs: "2019-06-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
    schoolId: 1,
  },
  {
    id: 4,
    srNo: 4,
    employeeId: "EMP004",
    firstName: "Ms. Sunita",
    lastName: "Gupta",
    name: "Ms. Sunita Gupta",
    email: "sunita.gupta@edurelic.com",
    phone: "+91-9876543240",
    dateOfBirth: "1990-07-25",
    hireDate: "2022-01-10",
    designation: "Lecturer",
    department: "English",
    employeeType: "TEACHER",
    qualification: "M.A. English Literature, B.Ed.",
    experienceYears: 5,
    specialization: ["Grammar", "Literature", "Communication Skills"],
    salary: 45000,
    address: "321 Literature Street, Arts Colony",
    emergencyContact: "+91-9876543241",
    isActive: true,
    status: true,
    createdTs: "2022-01-10T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
    schoolId: 1,
  },
  {
    id: 5,
    srNo: 5,
    employeeId: "ADM001",
    firstName: "Mr. Vikash",
    lastName: "Singh",
    name: "Mr. Vikash Singh",
    email: "vikash.singh@edurelic.com",
    phone: "+91-9876543250",
    dateOfBirth: "1975-09-12",
    hireDate: "2018-04-01",
    designation: "Principal",
    department: "Administration",
    employeeType: "ADMIN",
    qualification: "M.Ed., MBA",
    experienceYears: 20,
    specialization: ["Educational Administration", "Leadership"],
    salary: 120000,
    address: "111 Admin Block, Campus Central",
    emergencyContact: "+91-9876543251",
    isActive: true,
    status: true,
    createdTs: "2018-04-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
    schoolId: 1,
  },
];

export const sampleSubjects: Subject[] = [
  {
    id: 1,
    subjectName: "Data Structures and Algorithms",
    subjectCode: "CS101",
    isOptional: false,
    description: "Fundamental concepts of data structures and algorithmic problem solving",
    credits: 4,
    status: true,
  },
  {
    id: 2,
    subjectName: "Database Management Systems",
    subjectCode: "CS102",
    isOptional: false,
    description: "Design and implementation of database systems",
    credits: 4,
    status: true,
  },
  {
    id: 3,
    subjectName: "Artificial Intelligence",
    subjectCode: "CS301",
    isOptional: true,
    description: "Introduction to AI concepts and machine learning",
    credits: 3,
    status: true,
  },
  {
    id: 4,
    subjectName: "Calculus I",
    subjectCode: "MATH101",
    isOptional: false,
    description: "Differential and integral calculus",
    credits: 3,
    status: true,
  },
  {
    id: 5,
    subjectName: "Linear Algebra",
    subjectCode: "MATH201",
    isOptional: false,
    description: "Vectors, matrices, and linear transformations",
    credits: 3,
    status: true,
  },
  {
    id: 6,
    subjectName: "Quantum Physics",
    subjectCode: "PHYS301",
    isOptional: true,
    description: "Introduction to quantum mechanics",
    credits: 4,
    status: true,
  },
  {
    id: 7,
    subjectName: "English Literature",
    subjectCode: "ENG201",
    isOptional: false,
    description: "Classic and contemporary literature analysis",
    credits: 3,
    status: true,
  },
  {
    id: 8,
    subjectName: "Technical Communication",
    subjectCode: "ENG101",
    isOptional: false,
    description: "Written and oral communication skills for technical fields",
    credits: 2,
    status: true,
  },
];

export const sampleCourses: Course[] = [
  {
    id: 1,
    schoolId: 1,
    academicYearId: 2,
    courseName: "Computer Science Engineering",
    name: "Computer Science Engineering",
    capacity: 120,
    isActive: true,
    status: true,
    createdTs: "2024-06-01T09:00:00.000Z",
    updatedTs: "2024-06-01T09:00:00.000Z",
    dbUser: "system",
  },
  {
    id: 2,
    schoolId: 1,
    academicYearId: 2,
    courseName: "Mathematics",
    name: "Mathematics",
    capacity: 80,
    isActive: true,
    status: true,
    createdTs: "2024-06-01T09:00:00.000Z",
    updatedTs: "2024-06-01T09:00:00.000Z",
    dbUser: "system",
  },
  {
    id: 3,
    schoolId: 1,
    academicYearId: 2,
    courseName: "Physics",
    name: "Physics",
    capacity: 60,
    isActive: true,
    status: true,
    createdTs: "2024-06-01T09:00:00.000Z",
    updatedTs: "2024-06-01T09:00:00.000Z",
    dbUser: "system",
  },
  {
    id: 4,
    schoolId: 1,
    academicYearId: 2,
    courseName: "English Literature",
    name: "English Literature",
    capacity: 50,
    isActive: true,
    status: true,
    createdTs: "2024-06-01T09:00:00.000Z",
    updatedTs: "2024-06-01T09:00:00.000Z",
    dbUser: "system",
  },
];

export const sampleBatches: Batch[] = [
  {
    id: 1,
    batchName: "CSE-A",
    courseId: 1,
    courseName: "Computer Science Engineering",
    capacity: 40,
    batchCoordinatorId: 1,
    batchCoordinatorName: "Dr. Rajesh Kumar",
    status: true,
    isActive: true,
    subjects: [1, 2, 8],
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 1 },
      { subjectId: 2, teacherId: 1 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 2,
    batchName: "CSE-B",
    courseId: 1,
    courseName: "Computer Science Engineering",
    capacity: 40,
    batchCoordinatorId: 1,
    batchCoordinatorName: "Dr. Rajesh Kumar",
    status: true,
    isActive: true,
    subjects: [1, 2, 3, 8],
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 1 },
      { subjectId: 2, teacherId: 1 },
      { subjectId: 3, teacherId: 1 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 3,
    batchName: "CSE-C",
    courseId: 1,
    courseName: "Computer Science Engineering", 
    capacity: 40,
    batchCoordinatorId: 1,
    batchCoordinatorName: "Dr. Rajesh Kumar",
    status: true,
    isActive: true,
    subjects: [1, 2, 8],
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 1 },
      { subjectId: 2, teacherId: 1 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 4,
    batchName: "MATH-A",
    courseId: 2,
    courseName: "Mathematics",
    capacity: 40,
    batchCoordinatorId: 2,
    batchCoordinatorName: "Prof. Priya Sharma",
    status: true,
    isActive: true,
    subjects: [4, 5, 8],
    subjectTeacherMappings: [
      { subjectId: 4, teacherId: 2 },
      { subjectId: 5, teacherId: 2 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 5,
    batchName: "MATH-B",
    courseId: 2,
    courseName: "Mathematics",
    capacity: 40,
    batchCoordinatorId: 2,
    batchCoordinatorName: "Prof. Priya Sharma",
    status: true,
    isActive: true,
    subjects: [4, 5, 8],
    subjectTeacherMappings: [
      { subjectId: 4, teacherId: 2 },
      { subjectId: 5, teacherId: 2 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 6,
    batchName: "PHYS-A",
    courseId: 3,
    courseName: "Physics",
    capacity: 30,
    batchCoordinatorId: 3,
    batchCoordinatorName: "Mr. Anil Verma",
    status: true,
    isActive: true,
    subjects: [6, 4, 8],
    subjectTeacherMappings: [
      { subjectId: 6, teacherId: 3 },
      { subjectId: 4, teacherId: 2 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 7,
    batchName: "PHYS-B",
    courseId: 3,
    courseName: "Physics",
    capacity: 30,
    batchCoordinatorId: 3,
    batchCoordinatorName: "Mr. Anil Verma",
    status: true,
    isActive: true,
    subjects: [6, 4, 8],
    subjectTeacherMappings: [
      { subjectId: 6, teacherId: 3 },
      { subjectId: 4, teacherId: 2 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 8,
    batchName: "ENG-A",
    courseId: 4,
    courseName: "English Literature",
    capacity: 25,
    batchCoordinatorId: 4,
    batchCoordinatorName: "Ms. Sunita Gupta",
    status: true,
    isActive: true,
    subjects: [7, 8],
    subjectTeacherMappings: [
      { subjectId: 7, teacherId: 4 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
  {
    id: 9,
    batchName: "ENG-B",
    courseId: 4,
    courseName: "English Literature",
    capacity: 25,
    batchCoordinatorId: 4,
    batchCoordinatorName: "Ms. Sunita Gupta",
    status: true,
    isActive: true,
    subjects: [7, 8],
    subjectTeacherMappings: [
      { subjectId: 7, teacherId: 4 },
      { subjectId: 8, teacherId: 4 },
    ],
    createdTs: "2024-06-15T09:00:00.000Z",
    updatedTs: "2024-06-15T09:00:00.000Z",
  },
];

export const sampleClasses: Class[] = [
  {
    id: 1,
    className: "Computer Science - Year 1",
    courseId: 1,
    courseName: "Computer Science Engineering",
    batches: [
      sampleBatches.find(b => b.id === 1)!,
      sampleBatches.find(b => b.id === 2)!,
      sampleBatches.find(b => b.id === 3)!,
    ],
    totalStudents: 120,
    status: true,
    isActive: true,
    createdTs: "2024-06-10T09:00:00.000Z",
    updatedTs: "2024-06-10T09:00:00.000Z",
  },
  {
    id: 2,
    className: "Mathematics - Year 1",
    courseId: 2,
    courseName: "Mathematics",
    batches: [
      sampleBatches.find(b => b.id === 4)!,
      sampleBatches.find(b => b.id === 5)!,
    ],
    totalStudents: 80,
    status: true,
    isActive: true,
    createdTs: "2024-06-10T09:00:00.000Z",
    updatedTs: "2024-06-10T09:00:00.000Z",
  },
  {
    id: 3,
    className: "Physics - Year 1",
    courseId: 3,
    courseName: "Physics",
    batches: [
      sampleBatches.find(b => b.id === 6)!,
      sampleBatches.find(b => b.id === 7)!,
    ],
    totalStudents: 60,
    status: true,
    isActive: true,
    createdTs: "2024-06-10T09:00:00.000Z",
    updatedTs: "2024-06-10T09:00:00.000Z",
  },
  {
    id: 4,
    className: "English Literature - Year 1", 
    courseId: 4,
    courseName: "English Literature",
    batches: [
      sampleBatches.find(b => b.id === 8)!,
      sampleBatches.find(b => b.id === 9)!,
    ],
    totalStudents: 50,
    status: true,
    isActive: true,
    createdTs: "2024-06-10T09:00:00.000Z",
    updatedTs: "2024-06-10T09:00:00.000Z",
  },
];

export const sampleCampusGroups: CampusGroup[] = [
  {
    id: 1,
    groupName: "Edurelic North India",
    groupCode: "ENI",
    description: "Educational campuses in North Indian regions",
    campuses: [], // Will be populated below
    totalCampuses: 3,
    isActive: true,
    status: true,
    createdTs: "2020-01-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    groupName: "Edurelic South India",
    groupCode: "ESI",
    description: "Educational campuses in South Indian regions",
    campuses: [], // Will be populated below
    totalCampuses: 2,
    isActive: true,
    status: true,
    createdTs: "2020-06-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
];

export const sampleCampuses: Campus[] = [
  {
    id: 1,
    campusName: "Edurelic Delhi Campus",
    campusCode: "EDC",
    address: "Sector 62, Phase-IV",
    city: "Noida",
    state: "Uttar Pradesh",
    pinCode: "201309",
    phone: "+91-120-4567890",
    email: "delhi@edurelic.com",
    principalId: 5,
    principalName: "Mr. Vikash Singh",
    totalStudents: 1200,
    totalTeachers: 85,
    isActive: true,
    status: true,
    createdTs: "2020-01-15T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    campusName: "Edurelic Mumbai Campus",
    campusCode: "EMC",
    address: "Powai Tech Park",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400076",
    phone: "+91-22-4567890",
    email: "mumbai@edurelic.com",
    principalId: 5,
    principalName: "Mr. Vikash Singh",
    totalStudents: 950,
    totalTeachers: 68,
    isActive: true,
    status: true,
    createdTs: "2020-03-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 3,
    campusName: "Edurelic Bangalore Campus",
    campusCode: "EBC",
    address: "Electronic City Phase-II",
    city: "Bangalore",
    state: "Karnataka",
    pinCode: "560100",
    phone: "+91-80-4567890",
    email: "bangalore@edurelic.com",
    principalId: 5,
    principalName: "Mr. Vikash Singh",
    totalStudents: 800,
    totalTeachers: 55,
    isActive: true,
    status: true,
    createdTs: "2020-06-15T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 4,
    campusName: "Edurelic Chennai Campus",
    campusCode: "ECC",
    address: "OMR IT Corridor",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600096",
    phone: "+91-44-4567890",
    email: "chennai@edurelic.com",
    principalId: 5,
    principalName: "Mr. Vikash Singh",
    totalStudents: 600,
    totalTeachers: 42,
    isActive: true,
    status: true,
    createdTs: "2021-01-10T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 5,
    campusName: "Edurelic Pune Campus",
    campusCode: "EPC",
    address: "Hinjewadi IT Park",
    city: "Pune",
    state: "Maharashtra",
    pinCode: "411057",
    phone: "+91-20-4567890",
    email: "pune@edurelic.com",
    principalId: 5,
    principalName: "Mr. Vikash Singh",
    totalStudents: 700,
    totalTeachers: 48,
    isActive: true,
    status: true,
    createdTs: "2021-08-01T09:00:00.000Z",
    updatedTs: "2024-01-15T10:30:00.000Z",
  },
];

// Update campus groups with their respective campuses
sampleCampusGroups[0].campuses = [
  sampleCampuses.find(c => c.id === 1)!,
  sampleCampuses.find(c => c.id === 2)!,
  sampleCampuses.find(c => c.id === 5)!,
];

sampleCampusGroups[1].campuses = [
  sampleCampuses.find(c => c.id === 3)!,
  sampleCampuses.find(c => c.id === 4)!,
];

export const sampleStudents: Student[] = [
  {
    id: 1,
    schoolId: 1,
    registrationNumber: "EDU2024001",
    firstName: "Arjun",
    lastName: "Patel",
    fullName: "Arjun Patel",
    dateOfBirth: "2005-03-15",
    age: 19,
    gender: GenderEnum.MALE,
    email: "arjun.patel@student.edu",
    phone: "+91-9876543201",
    address: "123, Shanti Nagar, Sector 15, Noida, UP 201301",
    class: "12th",
    batch: "2024-2025",
    parentGuardianName: "Mr. Rajesh Patel",
    parentPhone: "+91-9876543202",
    parentEmail: "rajesh.patel@gmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.B_POSITIVE,
    medicalConditions: "None",
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 2,
    schoolId: 1,
    registrationNumber: "EDU2024002",
    firstName: "Priya",
    lastName: "Sharma",
    fullName: "Priya Sharma",
    dateOfBirth: "2005-08-22",
    age: 18,
    gender: GenderEnum.FEMALE,
    email: "priya.sharma@student.edu",
    phone: "+91-9876543203",
    address: "456, Green Park, Phase II, Delhi 110016",
    class: "11th",
    batch: "2024-2025",
    parentGuardianName: "Mrs. Sunita Sharma",
    parentPhone: "+91-9876543204",
    parentEmail: "sunita.sharma@gmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.A_POSITIVE,
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 3,
    schoolId: 1,
    registrationNumber: "EDU2024003",
    firstName: "Vikram",
    lastName: "Singh",
    fullName: "Vikram Singh",
    dateOfBirth: "2004-11-10",
    age: 19,
    gender: GenderEnum.MALE,
    email: "vikram.singh@student.edu",
    phone: "+91-9876543205",
    address: "789, Model Town, Sector 8, Gurgaon, HR 122001",
    class: "10th",
    batch: "2023-2024",
    parentGuardianName: "Mr. Amarjeet Singh",
    parentPhone: "+91-9876543206",
    parentEmail: "amarjeet.singh@yahoo.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.O_POSITIVE,
    medicalConditions: "Mild asthma",
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 4,
    schoolId: 1,
    registrationNumber: "EDU2024004",
    firstName: "Ananya",
    lastName: "Gupta",
    fullName: "Ananya Gupta",
    dateOfBirth: "2005-06-18",
    age: 19,
    gender: GenderEnum.FEMALE,
    email: "ananya.gupta@student.edu",
    phone: "+91-9876543207",
    address: "321, Vasant Vihar, New Delhi 110057",
    class: "9th",
    batch: "2023-2024",
    parentGuardianName: "Dr. Ashok Gupta",
    parentPhone: "+91-9876543208",
    parentEmail: "dr.ashok.gupta@gmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.AB_POSITIVE,
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 5,
    schoolId: 1,
    registrationNumber: "EDU2024005",
    firstName: "Rohit",
    lastName: "Kumar",
    fullName: "Rohit Kumar",
    dateOfBirth: "2004-12-25",
    age: 19,
    gender: GenderEnum.MALE,
    email: "rohit.kumar@student.edu",
    phone: "+91-9876543209",
    address: "654, Lajpat Nagar, Ring Road, Delhi 110024",
    class: "8th",
    batch: "2022-2023",
    parentGuardianName: "Mrs. Meena Kumar",
    parentPhone: "+91-9876543210",
    parentEmail: "meena.kumar@hotmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.B_NEGATIVE,
    medicalConditions: "Allergic to peanuts",
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 6,
    schoolId: 1,
    registrationNumber: "EDU2024006",
    firstName: "Kavya",
    lastName: "Reddy",
    fullName: "Kavya Reddy",
    dateOfBirth: "2005-01-30",
    age: 19,
    gender: GenderEnum.FEMALE,
    email: "kavya.reddy@student.edu",
    phone: "+91-9876543211",
    address: "987, Banjara Hills, Hyderabad, TS 500034",
    class: "7th",
    batch: "2022-2023",
    parentGuardianName: "Mr. Venkat Reddy",
    parentPhone: "+91-9876543212",
    parentEmail: "venkat.reddy@gmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.A_NEGATIVE,
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 7,
    schoolId: 1,
    registrationNumber: "EDU2024007",
    firstName: "Aditya",
    lastName: "Jain",
    fullName: "Aditya Jain",
    dateOfBirth: "2004-09-14",
    age: 19,
    gender: GenderEnum.MALE,
    email: "aditya.jain@student.edu",
    phone: "+91-9876543213",
    address: "147, CP Tank, Mumbai, MH 400004",
    class: "6th",
    batch: "2021-2022",
    parentGuardianName: "Mr. Suresh Jain",
    parentPhone: "+91-9876543214",
    parentEmail: "suresh.jain@rediffmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.O_NEGATIVE,
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 8,
    schoolId: 1,
    registrationNumber: "EDU2024008",
    firstName: "Shreya",
    lastName: "Agarwal",
    fullName: "Shreya Agarwal",
    dateOfBirth: "2005-04-07",
    age: 19,
    gender: GenderEnum.FEMALE,
    email: "shreya.agarwal@student.edu",
    phone: "+91-9876543215",
    address: "258, Malviya Nagar, Jaipur, RJ 302017",
    class: "5th",
    batch: "2021-2022",
    parentGuardianName: "Mrs. Pooja Agarwal",
    parentPhone: "+91-9876543216",
    parentEmail: "pooja.agarwal@gmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.AB_NEGATIVE,
    medicalConditions: "Glasses for myopia",
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
  {
    id: 9,
    schoolId: 1,
    registrationNumber: "EDU2024009",
    firstName: "Karan",
    lastName: "Mehta",
    fullName: "Karan Mehta",
    dateOfBirth: "2005-07-03",
    age: 19,
    gender: GenderEnum.MALE,
    email: "karan.mehta@student.edu",
    phone: "+91-9876543217",
    address: "369, Navrangpura, Ahmedabad, GJ 380009",
    class: "4th",
    batch: "2020-2021",
    parentGuardianName: "Mr. Hitesh Mehta",
    parentPhone: "+91-9876543218",
    parentEmail: "hitesh.mehta@yahoo.in",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.B_POSITIVE,
    status: false, // Inactive student
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-09-01T14:30:00.000Z",
  },
  {
    id: 10,
    schoolId: 1,
    registrationNumber: "EDU2024010",
    firstName: "Nisha",
    lastName: "Verma",
    fullName: "Nisha Verma",
    dateOfBirth: "2004-10-28",
    age: 19,
    gender: GenderEnum.FEMALE,
    email: "nisha.verma@student.edu",
    phone: "+91-9876543219",
    address: "741, Gomti Nagar, Lucknow, UP 226010",
    class: "3rd",
    batch: "2020-2021",
    parentGuardianName: "Mrs. Rekha Verma",
    parentPhone: "+91-9876543220",
    parentEmail: "rekha.verma@gmail.com",
    admissionDate: "2024-07-01",
    bloodGroup: BloodGroupEnum.A_POSITIVE,
    status: true,
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-07-01T09:00:00.000Z",
  },
];

export const sampleExams: Exam[] = [
  {
    examId: 1,
    id: 1,
    examName: "Mid Term Examination - Computer Science",
    type: ExamTypeEnum.MID_TERM,
    startDate: "2024-10-15",
    endDate: "2024-10-25",
    description: "Mid term examination covering topics from first half of semester",
    status: true,
    isActive: true,
    selectedBatches: [1, 2, 3],
    selectedClasses: [1],
    createdTs: "2024-09-01T09:00:00.000Z",
    updatedTs: "2024-09-01T09:00:00.000Z",
  },
  {
    examId: 2,
    id: 2,
    examName: "Unit Test 1 - Mathematics",
    type: ExamTypeEnum.UNIT_TEST,
    startDate: "2024-09-20",
    endDate: "2024-09-22",
    description: "First unit test for calculus and linear algebra",
    status: true,
    isActive: true,
    selectedBatches: [4, 5],
    selectedClasses: [2],
    createdTs: "2024-08-15T09:00:00.000Z",
    updatedTs: "2024-08-15T09:00:00.000Z",
  },
  {
    examId: 3,
    id: 3,
    examName: "Semester End Examination - Physics",
    type: ExamTypeEnum.SEMESTER,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    description: "Final semester examination for all physics subjects",
    status: true,
    isActive: true,
    selectedBatches: [6, 7],
    selectedClasses: [3],
    createdTs: "2024-08-01T09:00:00.000Z",
    updatedTs: "2024-08-01T09:00:00.000Z",
  },
  {
    examId: 4,
    id: 4,
    examName: "Pre-Board Examination - English Literature",
    type: ExamTypeEnum.PRE_BOARD,
    startDate: "2024-11-10",
    endDate: "2024-11-15",
    description: "Preparatory examination before final board exams",
    status: true,
    isActive: true,
    selectedBatches: [8, 9],
    selectedClasses: [4],
    createdTs: "2024-07-20T09:00:00.000Z",
    updatedTs: "2024-07-20T09:00:00.000Z",
  },
  {
    examId: 5,
    id: 5,
    examName: "Half Yearly Examination - All Subjects",
    type: ExamTypeEnum.HALF_YEARLY,
    startDate: "2024-12-20",
    endDate: "2025-01-05",
    description: "Comprehensive examination covering all subjects taught in first half",
    status: false,
    isActive: false,
    selectedBatches: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    selectedClasses: [1, 2, 3, 4],
    createdTs: "2024-07-01T09:00:00.000Z",
    updatedTs: "2024-09-10T14:20:00.000Z",
  },
];

// ====================
// UTILITY FUNCTIONS
// ====================

/**
 * Get student by ID
 */
export const getStudentById = (id: number): Student | undefined => {
  return sampleStudents.find(student => student.id === id);
};

/**
 * Get student by registration number
 */
export const getStudentByRegistrationNumber = (registrationNumber: string): Student | undefined => {
  return sampleStudents.find(student => student.registrationNumber === registrationNumber);
};

/**
 * Get active students
 */
export const getActiveStudents = (): Student[] => {
  return sampleStudents.filter(student => student.status === true);
};

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Format student full name
 */
export const getStudentFullName = (student: Student): string => {
  return student.fullName || `${student.firstName} ${student.lastName}`;
};

/**
 * Get gender display name
 */
export const getGenderDisplayName = (gender: GenderEnum): string => {
  const displayNames: Record<GenderEnum, string> = {
    [GenderEnum.MALE]: "Male",
    [GenderEnum.FEMALE]: "Female",
    [GenderEnum.OTHER]: "Other"
  };
  return displayNames[gender] || gender;
};

/**
 * Get employee by ID
 */
export const getEmployeeById = (id: number): Employee | undefined => {
  return sampleEmployees.find(emp => emp.id === id);
};

/**
 * Get subject by ID
 */
export const getSubjectById = (id: number): Subject | undefined => {
  return sampleSubjects.find(subject => subject.id === id);
};

/**
 * Get course by ID
 */
export const getCourseById = (id: number): Course | undefined => {
  return sampleCourses.find(course => course.id === id);
};

/**
 * Get batch by ID
 */
export const getBatchById = (id: number): Batch | undefined => {
  return sampleBatches.find(batch => batch.id === id);
};

/**
 * Get class by ID
 */
export const getClassById = (id: number): Class | undefined => {
  return sampleClasses.find(cls => cls.id === id);
};

/**
 * Get campus by ID
 */
export const getCampusById = (id: number): Campus | undefined => {
  return sampleCampuses.find(campus => campus.id === id);
};

/**
 * Get active academic year
 */
export const getActiveAcademicYear = (): AcademicYear | undefined => {
  return sampleAcademicYears.find(year => year.isActive === true);
};

/**
 * Get academic year by ID
 */
export const getAcademicYearById = (id: number): AcademicYear | undefined => {
  return sampleAcademicYears.find(year => year.id === id);
};

/**
 * Get academic year name by ID
 */
export const getAcademicYearNameById = (id: number): string => {
  const academicYear = getAcademicYearById(id);
  return academicYear?.academicYearName || `Year ${id}`;
};

/**
 * Get teachers (employees with TEACHER type)
 */
export const getTeachers = (): Employee[] => {
  return sampleEmployees.filter(emp => emp.employeeType === "TEACHER" && emp.isActive);
};

/**
 * Get batches by course ID
 */
export const getBatchesByCourseId = (courseId: number): Batch[] => {
  return sampleBatches.filter(batch => batch.courseId === courseId && batch.status);
};

/**
 * Get classes by course ID  
 */
export const getClassesByCourseId = (courseId: number): Class[] => {
  return sampleClasses.filter(cls => cls.courseId === courseId && cls.status);
};

/**
 * Get subject names by IDs
 */
export const getSubjectNamesByIds = (subjectIds: number[]): string[] => {
  return subjectIds
    .map(id => sampleSubjects.find(subject => subject.id === id)?.subjectName)
    .filter(Boolean) as string[];
};

/**
 * Generate dynamic academic years
 */
export const generateAcademicYears = (count: number = 5): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => {
    const startYear = currentYear + i;
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  });
};

/**
 * Format employee name
 */
export const getEmployeeName = (employee: Employee): string => {
  return employee.name || `${employee.firstName} ${employee.lastName}`;
};

/**
 * Get exam type display name
 */
export const getExamTypeDisplayName = (type: ExamTypeEnum): string => {
  const displayNames: Record<ExamTypeEnum, string> = {
    [ExamTypeEnum.UNIT_TEST]: "Unit Test",
    [ExamTypeEnum.SEMESTER]: "Semester Exam",
    [ExamTypeEnum.FINAL]: "Final Exam",
    [ExamTypeEnum.MID_TERM]: "Mid Term Exam",
    [ExamTypeEnum.PRE_BOARD]: "Pre-Board Exam",
    [ExamTypeEnum.HALF_YEARLY]: "Half Yearly Exam",
  };
  return displayNames[type] || type;
};