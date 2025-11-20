"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import { BatchType, SubjectTeacherMapping } from "./BatchType";
import SubjectMultiSelect from "./SubjectMultiSelect";
import TeacherMapping from "./TeacherMapping";

// Sample employee data for dropdown (active teachers only)
const employeeOptions = [
  { id: 1, name: "Rekha Sharma", designation: "Principal", employee_id: "EMP001" },
  { id: 4, name: "Vivek Patel", designation: "Math Teacher", employee_id: "EMP004" }, 
  { id: 5, name: "Sarita Ram", designation: "English Teacher", employee_id: "EMP005" },
  { id: 7, name: "Neha Bose", designation: "Science Teacher", employee_id: "EMP007" },
];

// Sample course data for dropdown  
const courseOptions = [
  { id: 1, name: "Class 1", capacity: 40 },
  { id: 2, name: "Class 2", capacity: 45 },
  { id: 3, name: "Class 3", capacity: 50 },
  { id: 4, name: "Class 4", capacity: 35 },
  { id: 5, name: "Class 5", capacity: 42 },
  { id: 6, name: "Class 6", capacity: 38 },
  { id: 7, name: "Class 7", capacity: 36 },
  { id: 8, name: "Class 8", capacity: 40 },
];

let batchDefaultValues: BatchType = {
    id: 0,
    courseId: 0,
    batchName: "",
    capacity: 0,
    batchCoordinatorId: undefined,
    status: true,
    subjects: [], // Initialize with empty array for subjects (backward compatibility)
    subjectTeacherMappings: [], // Initialize with empty array for subject-teacher mappings
};

interface BatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BatchType) => void;
    initialData?: BatchType | null;
}

const BatchModal: React.FC<BatchModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<BatchType>(batchDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(batchDefaultValues);
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ 
            ...prev, 
            [name]: name === 'courseId' || name === 'batchCoordinatorId' || name === 'capacity' ? Number(value) : value 
        }));
    };

    const handleSubjectsChange = (selectedSubjects: number[]) => {
        setFormData((prev) => ({ 
            ...prev, 
            subjects: selectedSubjects 
        }));
    };

    const handleSubjectTeacherMappingsChange = (mappings: SubjectTeacherMapping[]) => {
        setFormData((prev) => ({ 
            ...prev, 
            subjectTeacherMappings: mappings 
        }));
    };

    const handleSave = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {initialData ? "Edit Batch" : "Create New Batch"}
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Section - Batch Information */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Batch Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Batch Name</Label>
                                        <Input
                                            key={`batchName-${formData.id}-${isOpen}`}
                                            type="text"
                                            name="batchName"
                                            placeholder="Enter batch name"
                                            defaultValue={formData.batchName}
                                            onChange={handleChange}
                                            className="mt-1"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label>Course/Class</Label>
                                        <select
                                            name="courseId"
                                            value={formData.courseId || ""}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                        >
                                            <option value="">Select Course</option>
                                            {courseOptions.map((course) => (
                                                <option key={course.id} value={course.id}>
                                                    {course.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label>Capacity</Label>
                                        <Input
                                            key={`capacity-${formData.id}-${isOpen}`}
                                            type="number"
                                            name="capacity"
                                            placeholder="Enter batch capacity"
                                            defaultValue={formData.capacity}
                                            onChange={handleChange}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label>Batch Coordinator</Label>
                                        <select
                                            name="batchCoordinatorId"
                                            value={formData.batchCoordinatorId || ""}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                        >
                                            <option value="">Select Batch Coordinator</option>
                                            {employeeOptions.map((employee) => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.name} ({employee.designation})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-3">
                                    <Switch
                                        label={formData.status ? "Active" : "Inactive"}
                                        checked={formData.status}
                                        onChange={(checked) => {
                                            setFormData((prev) => ({ ...prev, status: checked }));
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Batch Summary */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Course:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.courseId ? courseOptions.find(c => c.id === formData.courseId)?.name : 'Not selected'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.capacity || 0} students
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Subjects:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {(formData.subjects || []).length} selected
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                        <span className={`font-medium ${formData.status ? 'text-green-600' : 'text-red-600'}`}>
                                            {formData.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Subject Selection */}
                    <div className="lg:col-span-1">
                        <SubjectMultiSelect
                            selectedSubjects={formData.subjects || []}
                            onSubjectsChange={handleSubjectsChange}
                        />
                    </div>
                </div>

                {/* Teacher Mapping Section */}
                {(formData.subjects || []).length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <TeacherMapping
                            selectedSubjects={formData.subjects || []}
                            subjectTeacherMappings={formData.subjectTeacherMappings || []}
                            onSubjectTeacherMappingsChange={handleSubjectTeacherMappingsChange}
                        />
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {(formData.subjects || []).length > 0 ? (
                            <>
                                {(formData.subjectTeacherMappings || []).filter(m => m.teacherId).length} of {(formData.subjects || []).length} subjects have teachers assigned
                            </>
                        ) : (
                            'Select subjects to continue'
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={handleSave}
                            disabled={!formData.batchName || !formData.courseId}
                        >
                            {initialData ? "Update Batch" : "Create Batch"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatchModal;
