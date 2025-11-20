export enum DepartmentEnum {
    DEFAULT = "Select Department",

    // Academic Departments - Sciences
    COMPUTER_SCIENCE = "Computer Science",
    PHYSICS = "Physics",
    CHEMISTRY = "Chemistry",
    BIOLOGY = "Biology",
    MATHEMATICS = "Mathematics",

    // Academic Departments - Arts & Humanities
    ENGLISH = "English",
    HINDI = "Hindi",
    HISTORY = "History",
    GEOGRAPHY = "Geography",
    ECONOMICS = "Economics",
    POLITICAL_SCIENCE = "Political Science",
    SOCIOLOGY = "Sociology",

    // Academic Departments - Commerce
    COMMERCE = "Commerce",
    BUSINESS_STUDIES = "Business Studies",
    ACCOUNTANCY = "Accountancy",

    // Academic Departments - Professional
    ENGINEERING = "Engineering",
    MEDICAL_SCIENCE = "Medical Science",
    LAW = "Law",

    // Special Departments
    PHYSICAL_EDUCATION = "Physical Education",
    FINE_ARTS = "Fine Arts",
    PERFORMING_ARTS = "Performing Arts",
    MUSIC = "Music",

    // Administrative Departments
    ADMINISTRATION = "Administration",
    LIBRARY = "Library",
    ACCOUNTS = "Accounts",
    HUMAN_RESOURCES = "Human Resources",
    STUDENT_AFFAIRS = "Student Affairs",
    EXAMINATION = "Examination",
    RESEARCH = "Research & Development",
    PLACEMENT = "Placement Cell",
    IT_SERVICES = "IT Services",
    MAINTENANCE = "Maintenance"
}

export enum DesignationEnum {
    DEFAULT = "Select Designation",

    // Top Management
    DIRECTOR = "Director",
    PRINCIPAL = "Principal",
    VICE_PRINCIPAL = "Vice Principal",

    // Academic Leadership
    DEAN = "Dean",
    HEAD_OF_DEPARTMENT = "Head of Department",
    COORDINATOR = "Coordinator",

    // Teaching Staff - College
    PROFESSOR = "Professor",
    ASSOCIATE_PROFESSOR = "Associate Professor",
    ASSISTANT_PROFESSOR = "Assistant Professor",
    RESEARCH_PROFESSOR = "Research Professor",
    VISITING_FACULTY = "Visiting Faculty",

    // Teaching Staff - School
    SENIOR_TEACHER = "Senior Teacher",
    TEACHER = "Teacher",
    JUNIOR_TEACHER = "Junior Teacher",
    GUEST_TEACHER = "Guest Teacher",

    // Administrative Positions
    REGISTRAR = "Registrar",
    ADMINISTRATIVE_OFFICER = "Administrative Officer",
    OFFICE_SUPERINTENDENT = "Office Superintendent",
    ACCOUNTANT = "Accountant",
    HR_MANAGER = "HR Manager",

    // Support Staff Leadership
    CHIEF_WARDEN = "Chief Warden",
    TECHNICAL_HEAD = "Technical Head",
    SPORTS_DIRECTOR = "Sports Director",
    CHIEF_LIBRARIAN = "Chief Librarian",

    // Support Staff
    LIBRARIAN = "Librarian",
    LAB_ASSISTANT = "Lab Assistant",
    TECHNICAL_ASSISTANT = "Technical Assistant",
    SPORTS_COACH = "Sports Coach",
    COUNSELOR = "Counselor",
    NURSE = "Nurse",

    // Other Support Roles
    SYSTEM_ADMINISTRATOR = "System Administrator",
    OFFICE_ASSISTANT = "Office Assistant",
    CLERK = "Clerk",
    WARDEN = "Warden",
    SECURITY_SUPERVISOR = "Security Supervisor"
}

export enum EmploymentEnum {
    DEFAULT = "Select Employee Type",

    // Academic Staff
    TEACHING_STAFF = "Teaching Staff",
    ACADEMIC_ADMIN = "Academic Administration",
    RESEARCH_STAFF = "Research Staff",

    // Administrative Staff
    ADMINISTRATIVE = "Administrative",
    ACCOUNTS_FINANCE = "Accounts & Finance",
    HR_STAFF = "Human Resources",

    // Support Staff
    TECHNICAL_SUPPORT = "Technical Support",
    IT_SUPPORT = "IT Support",
    LIBRARY_STAFF = "Library Staff",
    LAB_STAFF = "Laboratory Staff",

    // Healthcare & Counseling
    MEDICAL_STAFF = "Medical Staff",
    COUNSELING_STAFF = "Counseling Staff",

    // Other Support Services
    MAINTENANCE_STAFF = "Maintenance Staff",
    SECURITY_STAFF = "Security Staff",
    TRANSPORT_STAFF = "Transport Staff",
    HOSTEL_STAFF = "Hostel Staff",
    CAFETERIA_STAFF = "Cafeteria Staff"
}

// Enum conversion utilities
export const EnumConverters = {
    fromDepartmentString(value: string): DepartmentEnum {
        return (Object.values(DepartmentEnum) as string[]).includes(value)
            ? value as DepartmentEnum
            : DepartmentEnum.DEFAULT;
    },

    fromDesignationString(value: string): DesignationEnum {
        return (Object.values(DesignationEnum) as string[]).includes(value)
            ? value as DesignationEnum
            : DesignationEnum.DEFAULT;
    },

    fromEmploymentString(value: string): EmploymentEnum {
        return (Object.values(EmploymentEnum) as string[]).includes(value)
            ? value as EmploymentEnum
            : EmploymentEnum.DEFAULT;
    }
};

// Helper function to transform API response data
export function transformEmployeeData(apiData: any): any {
    return {
        ...apiData,
        department: EnumConverters.fromDepartmentString(apiData.department),
        designation: EnumConverters.fromDesignationString(apiData.designation),
        employee_type: EnumConverters.fromEmploymentString(apiData.employee_type)
    };
}