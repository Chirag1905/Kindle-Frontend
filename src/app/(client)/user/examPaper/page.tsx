'use client';

import { useState, useEffect, useMemo } from 'react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ExamPaperForm from './_components/ExamPaperForm';
import { ExamPaperType, ExamPaperStatus } from './_components/ExamPaperTypes';

interface Exam {
    examId: number;
    examName: string;
    batches: Batch[];
}

interface Batch {
    batchId: number;
    batchName: string;
    courseId: number;
    courseName: string;
}

export default function ExamPapersPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState<ExamPaperType | null>(null);
    const [examPapers, setExamPapers] = useState<ExamPaperType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExam, setSelectedExam] = useState<number | null>(null);
    const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<ExamPaperStatus | 'ALL'>('ALL');
    const [activeExamsWithBatches, setActiveExamsWithBatches] = useState<Exam[]>([]);

    // Load initial data
    useEffect(() => {
        const mockExamPapers: ExamPaperType[] = [
            {
                id: 1,
                examId: 1,
                examName: "Mid Term Exam - Physics",
                examType: "Mid Term",
                subjectId: 1,
                subjectName: "Physics",
                batchId: 1,
                batchName: "Batch A",
                courseName: "11th Science",
                teacherId: 1,
                teacherName: "Dr. Smith",
                paperDate: "2024-03-15",
                duration: 120,
                maxMarks: 100,
                passingMarks: 35,
                status: ExamPaperStatus.SCHEDULED,
                createdAt: "2024-03-01T00:00:00Z",
                updatedAt: "2024-03-01T00:00:00Z"
            },
            {
                id: 2,
                examId: 2,
                examName: "Final Exam - Mathematics",
                examType: "Final",
                subjectId: 2,
                subjectName: "Mathematics",
                batchId: 2,
                batchName: "Batch B",
                courseName: "12th Science",
                teacherId: 2,
                teacherName: "Prof. Johnson",
                paperDate: "2024-04-20",
                duration: 180,
                maxMarks: 150,
                passingMarks: 50,
                status: ExamPaperStatus.DRAFT,
                createdAt: "2024-03-10T00:00:00Z",
                updatedAt: "2024-03-15T00:00:00Z"
            }
        ];

        const mockExams: Exam[] = [
            {
                examId: 1,
                examName: "Mid Term Exam - Physics",
                batches: [
                    { batchId: 1, batchName: "Batch A", courseId: 1, courseName: "11th Science" }
                ]
            },
            {
                examId: 2,
                examName: "Final Exam - Mathematics",
                batches: [
                    { batchId: 2, batchName: "Batch B", courseId: 1, courseName: "12th Science" }
                ]
            }
        ];

        setExamPapers(mockExamPapers);
        setActiveExamsWithBatches(mockExams);
    }, []);

    // Event handlers
    const handleEditExamPaper = (paper: ExamPaperType) => {
        setSelectedPaper(paper);
        setIsEditing(true);
    };

    const handleSaveExamPaper = (updatedData: Partial<ExamPaperType>) => {
        if (selectedPaper) {
            const updatedPaper = { ...selectedPaper, ...updatedData };
            setExamPapers(papers => 
                papers.map(p => p.id === updatedPaper.id ? updatedPaper : p)
            );
        }
        setIsEditing(false);
        setSelectedPaper(null);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedPaper(null);
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedExam(null);
        setSelectedBatch(null);
        setStatusFilter('ALL');
    };

    // Computed values
    const availableBatches = useMemo(() => {
        if (!selectedExam) return [];
        const exam = activeExamsWithBatches.find(e => e.examId === selectedExam);
        return exam ? exam.batches : [];
    }, [selectedExam, activeExamsWithBatches]);

    const filteredExamPapers = useMemo(() => {
        return examPapers.filter(paper => {
            const matchesSearch = !searchTerm || 
                paper.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                paper.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                paper.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesExam = !selectedExam || paper.examId === selectedExam;
            const matchesBatch = !selectedBatch || paper.batchId === selectedBatch;
            const matchesStatus = statusFilter === 'ALL' || paper.status === statusFilter;
            
            return matchesSearch && matchesExam && matchesBatch && matchesStatus;
        });
    }, [examPapers, searchTerm, selectedExam, selectedBatch, statusFilter]);

    // Utility functions
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const getStatusColor = (status: ExamPaperStatus) => {
        switch (status) {
            case ExamPaperStatus.DRAFT:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case ExamPaperStatus.SCHEDULED:
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            case ExamPaperStatus.IN_PROGRESS:
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
            case ExamPaperStatus.COMPLETED:
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case ExamPaperStatus.CANCELLED:
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const getStatusLabel = (status: ExamPaperStatus) => {
        switch (status) {
            case ExamPaperStatus.DRAFT:
                return 'Draft';
            case ExamPaperStatus.SCHEDULED:
                return 'Scheduled';
            case ExamPaperStatus.IN_PROGRESS:
                return 'In Progress';
            case ExamPaperStatus.COMPLETED:
                return 'Completed';
            case ExamPaperStatus.CANCELLED:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Exam Papers" />
            <div className="space-y-6">
                {!isEditing && (
                    <>
                        {/* Filter Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:gap-4">
                                    {/* Search Input */}
                                    <div className="relative lg:w-80">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search exam papers..."
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Exam Filter */}
                                    <div className="lg:w-48">
                                        <select 
                                            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={selectedExam || ''} 
                                            onChange={(e) => setSelectedExam(e.target.value ? Number(e.target.value) : null)}
                                        >
                                            <option value="">All Exams</option>
                                            {activeExamsWithBatches.map(exam => (
                                                <option key={exam.examId} value={exam.examId}>
                                                    {exam.examName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Batch Filter */}
                                    <div className="lg:w-48">
                                        <select 
                                            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={selectedBatch || ''} 
                                            onChange={(e) => setSelectedBatch(e.target.value ? Number(e.target.value) : null)}
                                            disabled={!selectedExam}
                                        >
                                            <option value="">All Batches</option>
                                            {availableBatches.map(batch => (
                                                <option key={batch.batchId} value={batch.batchId}>
                                                    {batch.batchName} ({batch.courseName})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Status Filter */}
                                    <div className="lg:w-40">
                                        <select 
                                            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={statusFilter} 
                                            onChange={(e) => setStatusFilter(e.target.value as ExamPaperStatus | 'ALL')}
                                        >
                                            <option value="ALL">All Status</option>
                                            <option value="DRAFT">Draft</option>
                                            <option value="SCHEDULED">Scheduled</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Clear Filters Button */}
                                <div className="flex items-end">
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Exam Papers
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {filteredExamPapers.length} paper{filteredExamPapers.length !== 1 ? 's' : ''} found
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            {filteredExamPapers.length > 0 ? (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredExamPapers.map((paper) => (
                                            <div key={paper.id} 
                                                 className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 group">
                                                {/* Card Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                                            {paper.examName}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            {paper.subjectName} • {paper.batchName}
                                                        </p>
                                                    </div>
                                                    <div className="ml-3">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(paper.status)}`}>
                                                            {getStatusLabel(paper.status)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Duration: {formatDuration(paper.duration)}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                        Total Marks: {paper.maxMarks}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        {paper.teacherName}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 7v6m-4-6h8" />
                                                        </svg>
                                                        {new Date(paper.paperDate).toLocaleDateString()}
                                                    </div>
                                                </div>

                                                {/* Card Actions */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                                    <button
                                                        onClick={() => handleEditExamPaper(paper)}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit Paper
                                                    </button>
                                                    <div className="flex items-center space-x-2">
                                                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        No exam papers found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Try adjusting your filters or search criteria to find exam papers.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
                
                {/* Edit Form */}
                {isEditing && (
                    <ExamPaperForm
                        examPaper={selectedPaper}
                        onSave={handleSaveExamPaper}
                        onCancel={handleCancelEdit}
                    />
                )}
            </div>
        </div>
    );
}