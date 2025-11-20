export interface AttendanceStatusType {
    id: number;
    statusCode: string;
    statusName: string;
    description?: string;
    status: boolean;
    color: string; // Hexadecimal color code (e.g., "#FF5733")
}