export interface Student {
    id?: number;
    schoolId: number;
    registrationNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO date string
    gender: GenderEnum;
    email?: string;
    phone?: string;
    address?: string;
    class: string;
    batch: string;
    parentGuardianName: string;
    parentPhone: string;
    parentEmail?: string;
    admissionDate: string; // ISO date string
    bloodGroup?: BloodGroupEnum;
    medicalConditions?: string;
    status: boolean;
    createdTs?: string;
    updatedTs?: string;
    // Computed fields
    fullName?: string; // firstName + lastName
    age?: number; // calculated from dateOfBirth
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

// Utility functions
export const getGenderDisplayName = (gender: GenderEnum): string => {
    return GenderDisplayNames[gender];
};

export const getBloodGroupDisplayName = (bloodGroup: BloodGroupEnum): string => {
    return bloodGroup.replace('_', '');
};
export const GenderDisplayNames: Record<GenderEnum, string> = {
    [GenderEnum.MALE]: "Male",
    [GenderEnum.FEMALE]: "Female",
    [GenderEnum.OTHER]: "Other"
};

export const BloodGroupOptions = Object.values(BloodGroupEnum);
export const GenderOptions = Object.values(GenderEnum);

// Class options
export const ClassOptions = [
    "Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", 
    "6th", "7th", "8th", "9th", "10th", "11th", "12th"
];

// Batch options  
export const BatchOptions = [
    "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025", "2025-2026"
];