export interface ExamType {
    examId?: number;
    examName: string;
    type: ExamTypeEnum;
    startDate: string;
    endDate: string;
    description?: string;
    status: boolean;
    selectedClasses?: number[]; // Array of class IDs
}
export enum ExamTypeEnum {
    UNIT_TEST = "UNIT_TEST",
    SEMESTER = "SEMESTER",
    FINAL = "FINAL",
    MID_TERM = "MID_TERM",
    PRE_BOARD = "PRE_BOARD",
    HALF_YEARLY = "HALF_YEARLY"
}