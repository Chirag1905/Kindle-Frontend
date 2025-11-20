"use client";
import React, { useState, useEffect } from "react";
import { SubjectType, subjectData, TeacherType, getActiveTeachers } from "./SubjectType";
import { SubjectTeacherMapping } from "./BatchType";

interface SubjectSelectionProps {
  selectedSubjects: number[];
  subjectTeacherMappings: SubjectTeacherMapping[];
  onSubjectsChange: (selectedIds: number[]) => void;
  onSubjectTeacherMappingsChange: (mappings: SubjectTeacherMapping[]) => void;
  className?: string;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  selectedSubjects,
  subjectTeacherMappings,
  onSubjectsChange,
  onSubjectTeacherMappingsChange,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const activeTeachers = getActiveTeachers();

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

    // Update subject-teacher mappings
    const updatedMappings = selectedSubjects.includes(subjectId)
      ? subjectTeacherMappings.filter(mapping => mapping.subjectId !== subjectId)
      : [...subjectTeacherMappings, { subjectId, teacherId: undefined }];
    
    onSubjectTeacherMappingsChange(updatedMappings);
  };

  // Handle teacher assignment for a subject
  const handleTeacherChange = (subjectId: number, teacherId: number | undefined) => {
    const updatedMappings = subjectTeacherMappings.map(mapping =>
      mapping.subjectId === subjectId
        ? { ...mapping, teacherId }
        : mapping
    );
    onSubjectTeacherMappingsChange(updatedMappings);
  };

  // Get assigned teacher for a subject
  const getAssignedTeacher = (subjectId: number): number | undefined => {
    const mapping = subjectTeacherMappings.find(m => m.subjectId === subjectId);
    return mapping?.teacherId;
  };

  // Handle select all mandatory subjects
  const handleSelectMandatory = () => {
    const mandatorySubjects = subjectData
      .filter(subject => !subject.isOptional)
      .map(subject => subject.id);
    
    const uniqueSelection = Array.from(new Set([...selectedSubjects, ...mandatorySubjects]));
    onSubjectsChange(uniqueSelection);

    // Add mappings for new subjects
    const newMappings = mandatorySubjects
      .filter(subjectId => !subjectTeacherMappings.some(m => m.subjectId === subjectId))
      .map(subjectId => ({ subjectId, teacherId: undefined }));
    
    onSubjectTeacherMappingsChange([...subjectTeacherMappings, ...newMappings]);
  };

  // Handle clear all
  const handleClearAll = () => {
    onSubjectsChange([]);
    onSubjectTeacherMappingsChange([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Map Subjects to Batch
        </h3>
        <div className="text-sm text-gray-500">
          {selectedSubjects.length} selected
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleSelectMandatory}
          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
        >
          Add All Mandatory
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search subjects by name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Subject List */}
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md dark:border-gray-700">
        <div className="p-2 space-y-2">
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No subjects found matching your search.
            </div>
          ) : (
            filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className={`p-3 border rounded-md transition-colors ${
                  selectedSubjects.includes(subject.id)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleSubjectToggle(subject.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {subject.subjectName}
                      </h4>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {subject.subjectCode}
                      </span>
                      {subject.isOptional ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Optional
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Mandatory
                        </span>
                      )}
                    </div>
                    
                    {subject.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {subject.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {subject.credits && (
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Credits: {subject.credits}
                        </p>
                      )}
                      
                      {/* Teacher Assignment - only show if subject is selected */}
                      {selectedSubjects.includes(subject.id) && (
                        <div className="mt-2 w-48">
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Assign Teacher:
                          </label>
                          <select
                            value={getAssignedTeacher(subject.id) || ""}
                            onChange={(e) => handleTeacherChange(
                              subject.id, 
                              e.target.value ? Number(e.target.value) : undefined
                            )}
                            className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          >
                            <option value="">Select Teacher</option>
                            {activeTeachers.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Mandatory: </span>
            <span className="font-medium text-green-600 dark:text-green-400">
              {selectedSubjects.filter(id => {
                const subject = subjectData.find(s => s.id === id);
                return subject && !subject.isOptional;
              }).length}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Optional: </span>
            <span className="font-medium text-yellow-600 dark:text-yellow-400">
              {selectedSubjects.filter(id => {
                const subject = subjectData.find(s => s.id === id);
                return subject && subject.isOptional;
              }).length}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Teachers Assigned: </span>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {subjectTeacherMappings.filter(mapping => mapping.teacherId !== undefined).length} / {selectedSubjects.length}
            </span>
          </div>
        </div>
        
        {/* Show unassigned subjects warning */}
        {selectedSubjects.length > 0 && subjectTeacherMappings.some(mapping => mapping.teacherId === undefined) && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200">
            <strong>Warning:</strong> Some subjects don't have teachers assigned yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectSelection;