'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState, useMemo } from "react";
import { sampleExamPapers, activeExamsWithBatches, batchSubjectMappings } from "./_components/ExamPaperData";
import { ExamPaperType, ExamPaperStatus, getStatusColor, getStatusLabel, formatDuration } from "./_components/ExamPaperTypes";
import ExamPaperForm from "./_components/ExamPaperForm";

export default function ExamPaperPage() {
    const [examPapers, setExamPapers] = useState<ExamPaperType[]>(sampleExamPapers);
    const [selectedExam, setSelectedExam] = useState<number | null>(null);
    const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<ExamPaperStatus | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPaper, setSelectedPaper] = useState<ExamPaperType | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Filter exam papers based on selected filters
    const filteredExamPapers = useMemo(() => {
        return examPapers.filter(paper => {
            const matchesExam = selectedExam ? paper.examId === selectedExam : true;
            const matchesBatch = selectedBatch ? paper.batchId === selectedBatch : true;
            const matchesStatus = statusFilter !== 'ALL' ? paper.status === statusFilter : true;
            const matchesSearch = searchTerm ? (
                paper.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                paper.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                paper.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                paper.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                paper.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
            ) : true;
            
            return matchesExam && matchesBatch && matchesStatus && matchesSearch;
        });
    }, [selectedExam, selectedBatch, statusFilter, searchTerm, examPapers]);

    // Get unique batches from filtered exam papers
    const availableBatches = useMemo(() => {
        const batchIds = selectedExam 
            ? activeExamsWithBatches.find(exam => exam.examId === selectedExam)?.selectedBatches || []
            : [...new Set(examPapers.map(paper => paper.batchId))];
        
        return batchSubjectMappings
            .filter(mapping => batchIds.includes(mapping.batchId))
            .reduce((acc, mapping) => {
                if (!acc.find(batch => batch.batchId === mapping.batchId)) {
                    acc.push({
                        batchId: mapping.batchId,
                        batchName: mapping.batchName,
                        courseName: mapping.courseName
                    });
                }
                return acc;
            }, [] as Array<{batchId: number, batchName: string, courseName: string}>);
    }, [selectedExam, examPapers]);

    const handleEditExamPaper = (paper: ExamPaperType) => {
        setSelectedPaper(paper);
        setIsEditing(true);
    };

    const handleSaveExamPaper = (updatedPaper: Partial<ExamPaperType>) => {
        if (selectedPaper) {
            setExamPapers(prev => prev.map(paper => 
                paper.id === selectedPaper.id ? { ...paper, ...updatedPaper } : paper
            ));
        }
        setSelectedPaper(null);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setSelectedPaper(null);
        setIsEditing(false);
    };

    const clearAllFilters = () => {
        setSelectedExam(null);
        setSelectedBatch(null);
        setStatusFilter('ALL');
        setSearchTerm('');
    };

    const hasActiveFilters = selectedExam || selectedBatch || statusFilter !== 'ALL' || searchTerm;

    return (
        <div className="mx-auto max-w-7xl">
            <PageBreadcrumb pageTitle="Exam Papers" />
            
            <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                {/* Modern Filters */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30">
                    <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
                        {/* Left side filters - main row */}
                        <div className="flex flex-wrap items-center gap-3 min-w-0 flex-1">
                            {/* Search */}
                            <div className="relative flex-shrink-0">
                                <input
                                    type="text"
                                    placeholder="Search papers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-48 rounded-xl border-0 bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:ring-gray-700 dark:focus:ring-brand-400"
                                />
                                <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Exam Filter */}
                            <select
                                value={selectedExam || ''}
                                onChange={(e) => setSelectedExam(e.target.value ? parseInt(e.target.value) : null)}
                                className="rounded-xl border-0 bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:ring-gray-700 dark:focus:ring-brand-400"
                            >
                                <option value="">All Exams</option>
                                {activeExamsWithBatches.map(exam => (
                                    <option key={exam.examId} value={exam.examId}>{exam.examName}</option>
                                ))}
                            </select>

                            {/* Batch Filter */}
                            <select
                                value={selectedBatch || ''}
                                onChange={(e) => setSelectedBatch(e.target.value ? parseInt(e.target.value) : null)}
                                className="rounded-xl border-0 bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:ring-gray-700 dark:focus:ring-brand-400"
                            >
                                <option value="">All Batches</option>
                                {availableBatches.map(batch => (
                                    <option key={batch.batchId} value={batch.batchId}>
                                        {batch.batchName} ({batch.courseName})
                                    </option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as ExamPaperStatus | 'ALL')}
                                className="rounded-xl border-0 bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:ring-gray-700 dark:focus:ring-brand-400"
                            >
                                <option value="ALL">All Status</option>
                                {Object.values(ExamPaperStatus).map(status => (
                                    <option key={status} value={status}>{getStatusLabel(status)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Right side - Clear filters and results */}
                        <div className="flex items-center gap-4">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear Filters
                                </button>
                            )}
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                <span className="text-brand-600 dark:text-brand-400">{filteredExamPapers.length}</span> papers found
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredExamPapers.map((paper) => (
                        <div key={paper.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                        {paper.examName}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                        {paper.subjectName}
                                    </p>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(paper.status)} whitespace-nowrap ml-2`}>
                                    {getStatusLabel(paper.status)}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Batch:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {paper.batchName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Course:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {paper.courseName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Teacher:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {paper.teacherName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {new Date(paper.paperDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatDuration(paper.duration)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Max Marks:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {paper.maxMarks}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => handleEditExamPaper(paper)}
                                    className="flex-1 px-3 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30"
                                >
                                    Edit Paper
                                </button>
                                <button
                                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredExamPapers.length === 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
    return (
        <div>
            <PageBreadcrumb pageTitle="Exam Papers" />
            <div className="space-y-6">
                {!isEditing && (
                    <>
                        {/* Filter Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6">
                            {/* Filters content stays the same */}
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
