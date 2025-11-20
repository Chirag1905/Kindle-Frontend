"use client";
import React, { useState } from "react";
import { SubjectType, subjectData } from "./SubjectType";

interface SubjectMultiSelectProps {
  selectedSubjects: number[];
  onSubjectsChange: (selectedIds: number[]) => void;
  className?: string;
}

const SubjectMultiSelect: React.FC<SubjectMultiSelectProps> = ({
  selectedSubjects,
  onSubjectsChange,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter subjects based on search term
  const filteredSubjects = subjectData.filter(subject =>
    subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle individual subject toggle
  const handleSubjectToggle = (subjectId: number) => {
    const updatedSelection = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    
    onSubjectsChange(updatedSelection);
  };

  // Handle select all mandatory subjects
  const handleSelectMandatory = () => {
    const mandatorySubjects = subjectData
      .filter(subject => !subject.isOptional)
      .map(subject => subject.id);
    
    const uniqueSelection = Array.from(new Set([...selectedSubjects, ...mandatorySubjects]));
    onSubjectsChange(uniqueSelection);
  };

  // Handle clear all
  const handleClearAll = () => {
    onSubjectsChange([]);
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Select Subjects
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose subjects for this batch ({selectedSubjects.length} selected)
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={handleSelectMandatory}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400"
        >
          All Mandatory
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:border-red-700 dark:text-red-400"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Subject List */}
      <div className="h-80 overflow-y-auto border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="p-3 space-y-2">
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">🔍</div>
              <div>No subjects found</div>
            </div>
          ) : (
            filteredSubjects.map((subject) => (
              <label
                key={subject.id}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  selectedSubjects.includes(subject.id)
                    ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-900/30 dark:border-blue-400"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectToggle(subject.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {subject.subjectName}
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {subject.subjectCode}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    {subject.isOptional ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">
                        Optional
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                        Mandatory
                      </span>
                    )}
                    {subject.credits && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {subject.credits} credits
                      </span>
                    )}
                  </div>
                  
                  {subject.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {subject.description}
                    </p>
                  )}
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Mandatory:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedSubjects.filter(id => {
                const subject = subjectData.find(s => s.id === id);
                return subject && !subject.isOptional;
              }).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Optional:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedSubjects.filter(id => {
                const subject = subjectData.find(s => s.id === id);
                return subject && subject.isOptional;
              }).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectMultiSelect;