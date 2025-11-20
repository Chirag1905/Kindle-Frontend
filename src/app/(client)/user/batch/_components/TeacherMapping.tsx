"use client";
import React from "react";
import { getSubjectsByIds, getActiveTeachers, getTeacherById } from "./SubjectType";
import { SubjectTeacherMapping } from "./BatchType";

interface TeacherMappingProps {
  selectedSubjects: number[];
  subjectTeacherMappings: SubjectTeacherMapping[];
  onSubjectTeacherMappingsChange: (mappings: SubjectTeacherMapping[]) => void;
  className?: string;
}

const TeacherMapping: React.FC<TeacherMappingProps> = ({
  selectedSubjects,
  subjectTeacherMappings,
  onSubjectTeacherMappingsChange,
  className = ""
}) => {
  const selectedSubjectData = getSubjectsByIds(selectedSubjects);
  const activeTeachers = getActiveTeachers();

  // Handle teacher assignment for a subject
  const handleTeacherChange = (subjectId: number, teacherId: number | undefined) => {
    const existingMapping = subjectTeacherMappings.find(m => m.subjectId === subjectId);
    
    if (existingMapping) {
      // Update existing mapping
      const updatedMappings = subjectTeacherMappings.map(mapping =>
        mapping.subjectId === subjectId
          ? { ...mapping, teacherId }
          : mapping
      );
      onSubjectTeacherMappingsChange(updatedMappings);
    } else {
      // Create new mapping
      const newMapping = { subjectId, teacherId };
      onSubjectTeacherMappingsChange([...subjectTeacherMappings, newMapping]);
    }
  };

  // Get assigned teacher for a subject
  const getAssignedTeacher = (subjectId: number): number | undefined => {
    const mapping = subjectTeacherMappings.find(m => m.subjectId === subjectId);
    return mapping?.teacherId;
  };

  // Count assignments
  const assignedCount = subjectTeacherMappings.filter(m => m.teacherId !== undefined).length;
  const totalCount = selectedSubjects.length;

  if (selectedSubjects.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">👨‍🏫</div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Teacher Assignment
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select subjects above to assign teachers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Assign Teachers
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Map teachers to selected subjects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            assignedCount === totalCount
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : assignedCount > 0
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {assignedCount}/{totalCount} Assigned
          </div>
        </div>
      </div>

      {/* Teacher Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedSubjectData.map((subject) => {
          const assignedTeacherId = getAssignedTeacher(subject.id);
          const assignedTeacher = assignedTeacherId ? getTeacherById(assignedTeacherId) : null;
          
          return (
            <div
              key={subject.id}
              className={`p-4 border rounded-lg transition-all duration-200 ${
                assignedTeacher
                  ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                  : 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
              }`}
            >
              {/* Subject Info */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {subject.subjectName}
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {subject.subjectCode}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
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
              </div>

              {/* Teacher Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assign Teacher:
                </label>
                <select
                  value={assignedTeacherId || ""}
                  onChange={(e) => handleTeacherChange(
                    subject.id,
                    e.target.value ? Number(e.target.value) : undefined
                  )}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    assignedTeacher
                      ? 'border-green-300 bg-white dark:border-green-600 dark:bg-gray-800'
                      : 'border-red-300 bg-white dark:border-red-600 dark:bg-gray-800'
                  } dark:text-white`}
                >
                  <option value="">Select Teacher</option>
                  {activeTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.designation}
                    </option>
                  ))}
                </select>

                {/* Assigned Teacher Display */}
                {assignedTeacher && (
                  <div className="mt-2 p-2 bg-white rounded border border-green-200 dark:bg-gray-800 dark:border-green-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {assignedTeacher.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {assignedTeacher.designation} • {assignedTeacher.employeeId}
                        </div>
                        {assignedTeacher.specialization && (
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            Specializes in: {assignedTeacher.specialization.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary and Warnings */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Assigned:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {assignedCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Unassigned:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalCount - assignedCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Total Subjects:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalCount}
            </span>
          </div>
        </div>
        
        {/* Warning for unassigned subjects */}
        {assignedCount < totalCount && (
          <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-700">
            <div className="flex items-center gap-2">
              <div className="text-yellow-600 dark:text-yellow-400">⚠️</div>
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Incomplete Assignment:</strong> {totalCount - assignedCount} subject(s) still need teacher assignment.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMapping;