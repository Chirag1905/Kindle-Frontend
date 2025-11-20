// Teacher type definition
export interface TeacherType {
  id: number;
  name: string;
  designation: string;
  employeeId: string;
  specialization?: string[];
  status: boolean;
}

// Subject type definition
export interface SubjectType {
  id: number;
  subjectName: string;
  subjectCode: string;
  isOptional: boolean;
  description?: string;
  credits?: number;
}

// Sample teacher data
export const teacherData: TeacherType[] = [
  {
    id: 1,
    name: "Rekha Sharma",
    designation: "Principal",
    employeeId: "EMP001",
    specialization: ["Administration", "Mathematics"],
    status: true
  },
  {
    id: 2,
    name: "Amit Kumar",
    designation: "Math Teacher",
    employeeId: "EMP002",
    specialization: ["Mathematics", "Physics"],
    status: true
  },
  {
    id: 3,
    name: "Priya Singh",
    designation: "English Teacher",
    employeeId: "EMP003",
    specialization: ["English Literature", "Language Arts"],
    status: true
  },
  {
    id: 4,
    name: "Vivek Patel",
    designation: "Science Teacher",
    employeeId: "EMP004",
    specialization: ["Physics", "Chemistry", "General Science"],
    status: true
  },
  {
    id: 5,
    name: "Sarita Ram",
    designation: "Social Studies Teacher",
    employeeId: "EMP005",
    specialization: ["History", "Geography", "Civics"],
    status: true
  },
  {
    id: 6,
    name: "Rajesh Gupta",
    designation: "Computer Teacher",
    employeeId: "EMP006",
    specialization: ["Computer Science", "Programming"],
    status: true
  },
  {
    id: 7,
    name: "Neha Bose",
    designation: "Art Teacher",
    employeeId: "EMP007",
    specialization: ["Fine Arts", "Craft", "Drawing"],
    status: true
  },
  {
    id: 8,
    name: "Manish Jain",
    designation: "Music Teacher",
    employeeId: "EMP008",
    specialization: ["Vocal Music", "Instrumental Music"],
    status: true
  },
  {
    id: 9,
    name: "Sunita Verma",
    designation: "Physical Education Teacher",
    employeeId: "EMP009",
    specialization: ["Sports", "Physical Fitness", "Yoga"],
    status: true
  },
  {
    id: 10,
    name: "Deepak Tiwari",
    designation: "Language Teacher",
    employeeId: "EMP010",
    specialization: ["Hindi", "Sanskrit", "Regional Languages"],
    status: true
  }
];

// Sample subject data
export const subjectData: SubjectType[] = [
  {
    id: 1,
    subjectName: "Mathematics",
    subjectCode: "MATH001",
    isOptional: false,
    description: "Basic mathematics including arithmetic, algebra and geometry",
    credits: 4
  },
  {
    id: 2,
    subjectName: "English Language",
    subjectCode: "ENG001",
    isOptional: false,
    description: "English language and literature fundamentals",
    credits: 4
  },
  {
    id: 3,
    subjectName: "Science",
    subjectCode: "SCI001",
    isOptional: false,
    description: "General science including physics, chemistry and biology basics",
    credits: 4
  },
  {
    id: 4,
    subjectName: "Social Studies",
    subjectCode: "SOC001",
    isOptional: false,
    description: "History, geography and civics",
    credits: 3
  },
  {
    id: 5,
    subjectName: "Physical Education",
    subjectCode: "PE001",
    isOptional: true,
    description: "Physical fitness and sports activities",
    credits: 2
  },
  {
    id: 6,
    subjectName: "Computer Science",
    subjectCode: "CS001",
    isOptional: true,
    description: "Introduction to computers and basic programming",
    credits: 3
  },
  {
    id: 7,
    subjectName: "Art & Craft",
    subjectCode: "ART001",
    isOptional: true,
    description: "Creative arts, drawing and handicrafts",
    credits: 2
  },
  {
    id: 8,
    subjectName: "Music",
    subjectCode: "MUS001",
    isOptional: true,
    description: "Vocal and instrumental music basics",
    credits: 2
  },
  {
    id: 9,
    subjectName: "Environmental Science",
    subjectCode: "ENV001",
    isOptional: false,
    description: "Environmental awareness and conservation",
    credits: 2
  },
  {
    id: 10,
    subjectName: "Second Language",
    subjectCode: "LANG002",
    isOptional: true,
    description: "Regional or foreign language options",
    credits: 3
  }
];

// Helper function to get subject by ID
export const getSubjectById = (id: number): SubjectType | undefined => {
  return subjectData.find(subject => subject.id === id);
};

// Helper function to get multiple subjects by IDs
export const getSubjectsByIds = (ids: number[]): SubjectType[] => {
  return subjectData.filter(subject => ids.includes(subject.id));
};

// Helper function to get teacher by ID
export const getTeacherById = (id: number): TeacherType | undefined => {
  return teacherData.find(teacher => teacher.id === id);
};

// Helper function to get multiple teachers by IDs
export const getTeachersByIds = (ids: number[]): TeacherType[] => {
  return teacherData.filter(teacher => ids.includes(teacher.id));
};

// Helper function to get active teachers only
export const getActiveTeachers = (): TeacherType[] => {
  return teacherData.filter(teacher => teacher.status);
};