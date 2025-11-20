"use client";
import React, { useState, useMemo } from 'react';

// Batch type for exam selection
export interface BatchSelectionType {
    id: number;
    batchName: string;
    courseName: string;
    capacity: number;
    currentStudents: number;
    status: boolean;
}

// Sample batch data
const sampleBatches: BatchSelectionType[] = [
    { id: 1, batchName: "Batch A", courseName: "Class 1", capacity: 40, currentStudents: 35, status: true },
    { id: 2, batchName: "Batch B", courseName: "Class 2", capacity: 35, currentStudents: 32, status: true },
    { id: 3, batchName: "Batch C", courseName: "Class 3", capacity: 50, currentStudents: 45, status: true },
    { id: 4, batchName: "Batch D", courseName: "Class 4", capacity: 35, currentStudents: 30, status: true },
    { id: 5, batchName: "Batch E", courseName: "Class 5", capacity: 42, currentStudents: 38, status: true },
    { id: 6, batchName: "Batch F", courseName: "Class 6", capacity: 38, currentStudents: 35, status: false },
    { id: 7, batchName: "Batch G", courseName: "Class 7", capacity: 36, currentStudents: 33, status: true },
    { id: 8, batchName: "Batch H", courseName: "Class 8", capacity: 40, currentStudents: 37, status: true },
];

interface BatchMultiSelectProps {
    selectedBatches: number[];
    onBatchesChange: (selectedBatches: number[]) => void;
}

const BatchMultiSelect: React.FC<BatchMultiSelectProps> = ({
    selectedBatches,
    onBatchesChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showInactiveFilter, setShowInactiveFilter] = useState(false);

    const filteredBatches = useMemo(() => {
        return sampleBatches.filter(batch => {
            const matchesSearch = batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                batch.courseName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = showInactiveFilter ? true : batch.status;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, showInactiveFilter]);

    const handleBatchToggle = (batchId: number) => {
        if (selectedBatches.includes(batchId)) {
            onBatchesChange(selectedBatches.filter(id => id !== batchId));
        } else {
            onBatchesChange([...selectedBatches, batchId]);
        }
    };

    const handleSelectAll = () => {
        const allActiveBatchIds = filteredBatches.map(batch => batch.id);
        onBatchesChange(allActiveBatchIds);
    };

    const handleClearAll = () => {
        onBatchesChange([]);
    };

    const getBatchById = (id: number) => sampleBatches.find(batch => batch.id === id);

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Batch Selection
                </h3>
                
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search batches or classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowInactiveFilter(!showInactiveFilter)}
                            className={`px-3 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                                showInactiveFilter
                                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300`}
                        >
                            {showInactiveFilter ? 'Show All' : 'Active Only'}
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedBatches.length} of {filteredBatches.length} batches selected
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                        >
                            Select All
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            </div>

            {/* Batch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredBatches.map((batch) => {
                    const isSelected = selectedBatches.includes(batch.id);
                    const utilizationPercentage = Math.round((batch.currentStudents / batch.capacity) * 100);
                    
                    return (
                        <div
                            key={batch.id}
                            onClick={() => handleBatchToggle(batch.id)}
                            className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                isSelected
                                    ? 'border-brand-300 bg-brand-50 dark:bg-brand-900/20'
                                    : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/50'
                            }`}
                        >
                            {/* Selection Indicator */}
                            <div className={`absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                    ? 'border-brand-500 bg-brand-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            }`}>
                                {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>

                            {/* Batch Info */}
                            <div className="pr-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {batch.batchName} ({batch.courseName})
                                    </h4>
                                    {!batch.status && (
                                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                            Inactive
                                        </span>
                                    )}
                                </div>
                                
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Course: {batch.courseName}
                                </div>

                                {/* Capacity Info */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {batch.currentStudents}/{batch.capacity} students
                                    </span>
                                    <span className={`font-medium ${
                                        utilizationPercentage > 90 ? 'text-red-600' :
                                        utilizationPercentage > 75 ? 'text-orange-600' :
                                        'text-green-600'
                                    }`}>
                                        {utilizationPercentage}%
                                    </span>
                                </div>

                                {/* Utilization Bar */}
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                    <div
                                        className={`h-1.5 rounded-full ${
                                            utilizationPercentage > 90 ? 'bg-red-500' :
                                            utilizationPercentage > 75 ? 'bg-orange-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${utilizationPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredBatches.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-lg mb-2">No batches found</div>
                    <div className="text-sm">Try adjusting your search or filter criteria</div>
                </div>
            )}

            {/* Selected Batches Summary */}
            {selectedBatches.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Selected Batches ({selectedBatches.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedBatches.map((batchId) => {
                            const batch = getBatchById(batchId);
                            if (!batch) return null;
                            
                            return (
                                <div
                                    key={batchId}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {batch.batchName}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        ({batch.courseName})
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBatchToggle(batchId);
                                        }}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BatchMultiSelect;