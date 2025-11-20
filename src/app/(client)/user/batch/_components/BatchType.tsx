// Interface for subject-teacher mapping within a batch
export interface SubjectTeacherMapping {
    subjectId: number;
    teacherId?: number; // Optional, can be unassigned
}

export interface BatchType {
    id: number;
    courseId: number; // Changed from classId to courseId
    batchName: string;
    capacity: number;
    batchCoordinatorId?: number; // Batch coordinator who is also the batch owner
    status: boolean;
    subjects?: number[]; // Kept for backward compatibility
    subjectTeacherMappings?: SubjectTeacherMapping[]; // New field for subject-teacher assignments
}
