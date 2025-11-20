"use client";
import React, { useState, useMemo } from 'react';
import { sampleClasses, Class, Batch } from '@/data/sampleData';

// Types for class selection - reuse from central data
export interface ClassSelectionType extends Class {
  batches: BatchInClassType[];
}

export interface BatchInClassType extends Batch {}

// Use centralized sample data instead of local definition
export { sampleClasses };

interface ClassMultiSelectProps {
    selectedClasses: number[];
    onClassesChange: (selectedClasses: number[]) => void;
}

const ClassMultiSelect: React.FC<ClassMultiSelectProps> = ({
    selectedClasses,
    onClassesChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showInactiveFilter, setShowInactiveFilter] = useState(false);
    const [expandedClasses, setExpandedClasses] = useState<number[]>([]);

    const filteredClasses = useMemo(() => {
        return sampleClasses.filter(classItem => {
            const matchesSearch = classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                classItem.batches.some(batch => 
                                    batch.batchName.toLowerCase().includes(searchTerm.toLowerCase())
                                );
            const matchesStatus = showInactiveFilter ? true : classItem.status;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, showInactiveFilter]);

    const handleClassToggle = (classId: number) => {
        if (selectedClasses.includes(classId)) {
            onClassesChange(selectedClasses.filter(id => id !== classId));
        } else {
            onClassesChange([...selectedClasses, classId]);
        }
    };

    const handleSelectAll = () => {
        const activeClasses = filteredClasses.filter(c => c.status).map(c => c.id);
        onClassesChange(activeClasses);
    };

    const handleClearAll = () => {
        onClassesChange([]);
    };

    const toggleExpandClass = (classId: number) => {
        if (expandedClasses.includes(classId)) {
            setExpandedClasses(expandedClasses.filter(id => id !== classId));
        } else {
            setExpandedClasses([...expandedClasses, classId]);
        }
    };

    const selectedCount = selectedClasses.length;
    const totalActiveClasses = filteredClasses.filter(c => c.status).length;

    return (
        <div className="space-y-4">
            {/* Header with selection summary */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Classes ({selectedCount} selected)
                </h3>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                    >
                        Select All Active ({totalActiveClasses})
                    </button>
                    <button
                        type="button"
                        onClick={handleClearAll}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* Search and filters */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search classes or batches..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showInactiveFilter}
                        onChange={(e) => setShowInactiveFilter(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Show inactive</span>
                </label>
            </div>

            {/* Classes list */}
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg dark:border-gray-700">
                {filteredClasses.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No classes found matching your criteria.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredClasses.map((classItem) => (
                            <div key={classItem.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                                {/* Class header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedClasses.includes(classItem.id)}
                                            onChange={() => handleClassToggle(classItem.id)}
                                            disabled={!classItem.status}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 disabled:opacity-50"
                                        />
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${
                                                classItem.status 
                                                    ? 'text-gray-900 dark:text-white' 
                                                    : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                                {classItem.className}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {classItem.batches.length} batch{classItem.batches.length !== 1 ? 'es' : ''} • 
                                                {classItem.totalStudents || 0} students
                                            </p>
                                        </div>
                                        {!classItem.status && (
                                            <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full dark:bg-red-500/10 dark:text-red-400">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleExpandClass(classItem.id)}
                                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <svg
                                            className={`w-5 h-5 transition-transform ${
                                                expandedClasses.includes(classItem.id) ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Expanded batches */}
                                {expandedClasses.includes(classItem.id) && (
                                    <div className="mt-3 ml-6 space-y-2">
                                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Batches in {classItem.className}:
                                        </h5>
                                        {classItem.batches.map((batch) => (
                                            <div key={batch.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg dark:bg-gray-700">
                                                <div>
                                                    <span className={`font-medium ${
                                                        batch.status 
                                                            ? 'text-gray-900 dark:text-white' 
                                                            : 'text-gray-500 dark:text-gray-400'
                                                    }`}>
                                                        {batch.batchName}
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                        (Capacity: {batch.capacity})
                                                    </span>
                                                </div>
                                                {!batch.status && (
                                                    <span className="px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded-full dark:bg-red-500/10 dark:text-red-400">
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selection summary */}
            {selectedCount > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-500/10">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                        <strong>{selectedCount}</strong> class{selectedCount !== 1 ? 'es' : ''} selected
                        {selectedCount > 0 && (
                            <span className="ml-1">
                                ({selectedClasses.reduce((total, classId) => {
                                    const classItem = sampleClasses.find(c => c.id === classId);
                                    return total + (classItem?.batches.length || 0);
                                }, 0)} batch{selectedClasses.reduce((total, classId) => {
                                    const classItem = sampleClasses.find(c => c.id === classId);
                                    return total + (classItem?.batches.length || 0);
                                }, 0) !== 1 ? 'es' : ''} included)
                            </span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ClassMultiSelect;