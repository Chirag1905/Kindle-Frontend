import React from "react";
import { teacherOptions, subjectOptions, batchOptions } from "./constants";

interface FilterSectionProps {
  selectedTeacherFilter: string;
  setSelectedTeacherFilter: (value: string) => void;
  selectedBatchFilter: string;
  setSelectedBatchFilter: (value: string) => void;
  selectedSubjectFilter: string;
  setSelectedSubjectFilter: (value: string) => void;
  onAddEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  selectedTeacherFilter,
  setSelectedTeacherFilter,
  selectedBatchFilter,
  setSelectedBatchFilter,
  selectedSubjectFilter,
  setSelectedSubjectFilter,
  onAddEvent,
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
              Filter by Teacher:
            </label>
            <select
              value={selectedTeacherFilter}
              onChange={(e) => setSelectedTeacherFilter(e.target.value)}
              className="h-8 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10"
            >
              <option value="">All Teachers</option>
              {teacherOptions.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
              Filter by Batch:
            </label>
            <select
              value={selectedBatchFilter}
              onChange={(e) => setSelectedBatchFilter(e.target.value)}
              className="h-8 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10"
            >
              <option value="">All Batches</option>
              {batchOptions.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
              Filter by Subject:
            </label>
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="h-8 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10"
            >
              <option value="">All Subjects</option>
              {subjectOptions.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Add Event Button */}
        <button
          onClick={onAddEvent}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add Event
        </button>
      </div>
    </div>
  );
};