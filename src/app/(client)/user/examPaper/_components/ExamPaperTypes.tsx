// Exam Paper Types and Interfaces

export interface ExamPaperType {
    id: number;
    examId: number;
    examName: string;
    examType: string;
    batchId: number;
    batchName: string;
    courseName: string;
    subjectId: number;
    subjectName: string;
    teacherId: number;
    teacherName: string;
    paperDate: string;
    duration: number; // in minutes
    maxMarks: number;
    passingMarks: number;
    status: ExamPaperStatus;
    createdAt: string;
    updatedAt: string;
}

export enum ExamPaperStatus {
    DRAFT = "DRAFT",
    SCHEDULED = "SCHEDULED",
    IN_PROGRESS = "IN_PROGRESS", 
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export interface BatchSubjectMapping {
    id: number;
    batchId: number;
    batchName: string;
    courseName: string;
    subjectId: number;
    subjectName: string;
    teacherId: number;
    teacherName: string;
    capacity: number;
    currentStudents: number;
    status: boolean;
}

export interface ExamWithBatches {
    examId: number;
    examName: string;
    examType: string;
    startDate: string;
    endDate: string;
    status: boolean;
    selectedBatches: number[];
    examPapers: ExamPaperType[];
}

// Helper functions
export const getStatusColor = (status: ExamPaperStatus): string => {
    switch (status) {
        case ExamPaperStatus.DRAFT:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        case ExamPaperStatus.SCHEDULED:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case ExamPaperStatus.IN_PROGRESS:
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case ExamPaperStatus.COMPLETED:
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case ExamPaperStatus.CANCELLED:
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
        return `${mins}m`;
    } else if (mins === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h ${mins}m`;
    }
};

export const getStatusLabel = (status: ExamPaperStatus): string => {
    return status.split('_').map(word => 
        word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
};