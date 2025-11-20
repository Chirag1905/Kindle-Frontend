import { ExamPaperType, ExamPaperStatus, BatchSubjectMapping, ExamWithBatches } from './ExamPaperTypes';

// Sample batch-subject mappings (from batch module data)
export const batchSubjectMappings: BatchSubjectMapping[] = [
    // Batch A (Class 1) - Mathematics, English, Science, Social Studies, Environmental Science
    { id: 1, batchId: 1, batchName: "Batch A", courseName: "Class 1", subjectId: 1, subjectName: "Mathematics", teacherId: 2, teacherName: "Amit Kumar", capacity: 40, currentStudents: 35, status: true },
    { id: 2, batchId: 1, batchName: "Batch A", courseName: "Class 1", subjectId: 2, subjectName: "English", teacherId: 3, teacherName: "Priya Singh", capacity: 40, currentStudents: 35, status: true },
    { id: 3, batchId: 1, batchName: "Batch A", courseName: "Class 1", subjectId: 3, subjectName: "Science", teacherId: 4, teacherName: "Vivek Patel", capacity: 40, currentStudents: 35, status: true },
    { id: 4, batchId: 1, batchName: "Batch A", courseName: "Class 1", subjectId: 4, subjectName: "Social Studies", teacherId: 5, teacherName: "Sarita Ram", capacity: 40, currentStudents: 35, status: true },
    { id: 5, batchId: 1, batchName: "Batch A", courseName: "Class 1", subjectId: 9, subjectName: "Environmental Science", teacherId: 4, teacherName: "Vivek Patel", capacity: 40, currentStudents: 35, status: true },
    
    // Batch B (Class 2) - Mathematics, English, Science, Social Studies, Physical Education, Environmental Science
    { id: 6, batchId: 2, batchName: "Batch B", courseName: "Class 2", subjectId: 1, subjectName: "Mathematics", teacherId: 2, teacherName: "Amit Kumar", capacity: 35, currentStudents: 32, status: true },
    { id: 7, batchId: 2, batchName: "Batch B", courseName: "Class 2", subjectId: 2, subjectName: "English", teacherId: 3, teacherName: "Priya Singh", capacity: 35, currentStudents: 32, status: true },
    { id: 8, batchId: 2, batchName: "Batch B", courseName: "Class 2", subjectId: 3, subjectName: "Science", teacherId: 4, teacherName: "Vivek Patel", capacity: 35, currentStudents: 32, status: true },
    { id: 9, batchId: 2, batchName: "Batch B", courseName: "Class 2", subjectId: 4, subjectName: "Social Studies", teacherId: 5, teacherName: "Sarita Ram", capacity: 35, currentStudents: 32, status: true },
    { id: 10, batchId: 2, batchName: "Batch B", courseName: "Class 2", subjectId: 5, subjectName: "Physical Education", teacherId: 9, teacherName: "Sunita Verma", capacity: 35, currentStudents: 32, status: true },
    
    // Batch C (Class 3) - All core subjects
    { id: 11, batchId: 3, batchName: "Batch C", courseName: "Class 3", subjectId: 1, subjectName: "Mathematics", teacherId: 2, teacherName: "Amit Kumar", capacity: 50, currentStudents: 45, status: true },
    { id: 12, batchId: 3, batchName: "Batch C", courseName: "Class 3", subjectId: 2, subjectName: "English", teacherId: 3, teacherName: "Priya Singh", capacity: 50, currentStudents: 45, status: true },
    { id: 13, batchId: 3, batchName: "Batch C", courseName: "Class 3", subjectId: 3, subjectName: "Science", teacherId: 7, teacherName: "Neha Bose", capacity: 50, currentStudents: 45, status: true },
    { id: 14, batchId: 3, batchName: "Batch C", courseName: "Class 3", subjectId: 6, subjectName: "History", teacherId: 8, teacherName: "Rajesh Gupta", capacity: 50, currentStudents: 45, status: true },
    
    // Batch D (Class 4)
    { id: 15, batchId: 4, batchName: "Batch D", courseName: "Class 4", subjectId: 1, subjectName: "Mathematics", teacherId: 6, teacherName: "Anita Joshi", capacity: 35, currentStudents: 30, status: true },
    { id: 16, batchId: 4, batchName: "Batch D", courseName: "Class 4", subjectId: 2, subjectName: "English", teacherId: 3, teacherName: "Priya Singh", capacity: 35, currentStudents: 30, status: true },
    { id: 17, batchId: 4, batchName: "Batch D", courseName: "Class 4", subjectId: 7, subjectName: "Geography", teacherId: 10, teacherName: "Manoj Tiwari", capacity: 35, currentStudents: 30, status: true },
    
    // Batch E (Class 5)
    { id: 18, batchId: 5, batchName: "Batch E", courseName: "Class 5", subjectId: 1, subjectName: "Mathematics", teacherId: 6, teacherName: "Anita Joshi", capacity: 42, currentStudents: 38, status: true },
    { id: 19, batchId: 5, batchName: "Batch E", courseName: "Class 5", subjectId: 2, subjectName: "English", teacherId: 3, teacherName: "Priya Singh", capacity: 42, currentStudents: 38, status: true },
    { id: 20, batchId: 5, batchName: "Batch E", courseName: "Class 5", subjectId: 8, subjectName: "Computer Science", teacherId: 2, teacherName: "Amit Kumar", capacity: 42, currentStudents: 38, status: true },
];

// Sample active exams with their batch assignments
export const activeExamsWithBatches: ExamWithBatches[] = [
    {
        examId: 1,
        examName: "First Term Assessment",
        examType: "MID_TERM",
        startDate: "2024-03-15",
        endDate: "2024-03-25",
        status: true,
        selectedBatches: [1, 2, 3],
        examPapers: []
    },
    {
        examId: 3,
        examName: "Final Examination",
        examType: "UNIT_TEST",
        startDate: "2024-12-10",
        endDate: "2024-12-20",
        status: true,
        selectedBatches: [1, 3, 5],
        examPapers: []
    },
    {
        examId: 4,
        examName: "Practical Assessment",
        examType: "HALF_YEARLY",
        startDate: "2024-11-01",
        endDate: "2024-11-10",
        status: true,
        selectedBatches: [2, 4],
        examPapers: []
    }
];

// Generate exam papers for active exams
export const generateExamPapersForActiveExams = (): ExamPaperType[] => {
    const examPapers: ExamPaperType[] = [];
    let paperId = 1;
    
    activeExamsWithBatches.forEach(exam => {
        exam.selectedBatches.forEach(batchId => {
            // Get subjects for this batch
            const batchSubjects = batchSubjectMappings.filter(mapping => mapping.batchId === batchId);
            
            batchSubjects.forEach(mapping => {
                const examPaper: ExamPaperType = {
                    id: paperId++,
                    examId: exam.examId,
                    examName: exam.examName,
                    examType: exam.examType,
                    batchId: mapping.batchId,
                    batchName: mapping.batchName,
                    courseName: mapping.courseName,
                    subjectId: mapping.subjectId,
                    subjectName: mapping.subjectName,
                    teacherId: mapping.teacherId,
                    teacherName: mapping.teacherName,
                    paperDate: getRandomDateInRange(exam.startDate, exam.endDate),
                    duration: getRandomDuration(mapping.subjectName),
                    maxMarks: getRandomMarks(mapping.subjectName),
                    passingMarks: 0,
                    status: getRandomStatus(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                examPaper.passingMarks = Math.floor(examPaper.maxMarks * 0.4); // 40% passing marks
                examPapers.push(examPaper);
            });
        });
    });
    
    return examPapers;
};

// Helper functions for generating realistic data
function getRandomDateInRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
}

function getRandomDuration(subjectName: string): number {
    const durations: { [key: string]: number[] } = {
        'Mathematics': [90, 120],
        'English': [90, 120],
        'Science': [90, 120],
        'Social Studies': [60, 90],
        'History': [60, 90],
        'Geography': [60, 90],
        'Physical Education': [60, 90],
        'Computer Science': [90, 120],
        'Environmental Science': [60, 90]
    };
    
    const range = durations[subjectName] || [60, 90];
    return range[0] + Math.floor(Math.random() * (range[1] - range[0]));
}

function getRandomMarks(subjectName: string): number {
    const marks: { [key: string]: number[] } = {
        'Mathematics': [80, 100],
        'English': [80, 100],
        'Science': [80, 100],
        'Social Studies': [60, 80],
        'History': [60, 80],
        'Geography': [60, 80],
        'Physical Education': [50, 60],
        'Computer Science': [80, 100],
        'Environmental Science': [60, 80]
    };
    
    const range = marks[subjectName] || [60, 80];
    return range[0] + Math.floor(Math.random() * (range[1] - range[0]) / 10) * 10; // Round to nearest 10
}

function getRandomStatus(): ExamPaperStatus {
    const statuses = [
        ExamPaperStatus.SCHEDULED,
        ExamPaperStatus.SCHEDULED,
        ExamPaperStatus.SCHEDULED, // More weight to scheduled
        ExamPaperStatus.DRAFT,
        ExamPaperStatus.COMPLETED
    ];
    
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Export generated exam papers
export const sampleExamPapers: ExamPaperType[] = generateExamPapersForActiveExams();