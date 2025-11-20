"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import DatePicker from "@/components/form/date-picker";
import { ExamType, ExamTypeEnum } from "./ExamType";
import ClassMultiSelect from "./ClassMultiSelect";

let ExamDefaultValues: ExamType = {
    examId: -1,
    examName: "",
    type: ExamTypeEnum.UNIT_TEST,
    startDate: "",
    endDate: "",
    description: "",
    status: false,
    selectedClasses: [],
}

interface ExamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ExamType) => void;
    initialData?: ExamType | null;
}

const ExamModal: React.FC<ExamModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<ExamType>(ExamDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(ExamDefaultValues);
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClassesChange = (selectedClasses: number[]) => {
        setFormData((prev) => ({ 
            ...prev, 
            selectedClasses: selectedClasses 
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
                    {initialData ? "Edit Exam" : "Create New Exam"}
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
                    {/* Left Section - Exam Information */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Exam Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Exam Name</Label>
                                        <Input
                                            type="text"
                                            name="examName"
                                            placeholder="Enter exam name"
                                            defaultValue={formData.examName}
                                            onChange={handleChange}
                                            className="mt-1"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label>Exam Type</Label>
                                        <select
                                            name="type"
                                            className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                            value={formData.type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ExamTypeEnum }))}
                                        >
                                            {Object.values(ExamTypeEnum).map((type) => (
                                                <option key={type} value={type}>
                                                    {type.split('_').map(word => 
                                                        word.charAt(0) + word.slice(1).toLowerCase()
                                                    ).join(' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <DatePicker
                                            id="exam-start-date"
                                            defaultDate={formData.startDate ? new Date(formData.startDate) : undefined}
                                            label="Start Date"
                                            onChange={(selectedDates) => {
                                                const date = selectedDates[0];
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    startDate: date ? date.toISOString().split('T')[0] : "",
                                                }));
                                            }}
                                            placeholder="Select start date"
                                        />
                                    </div>

                                    <div>
                                        <DatePicker
                                            id="exam-end-date"
                                            defaultDate={formData.endDate ? new Date(formData.endDate) : undefined}
                                            label="End Date"
                                            onChange={(selectedDates) => {
                                                const date = selectedDates[0];
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    endDate: date ? date.toISOString().split('T')[0] : "",
                                                }));
                                            }}
                                            placeholder="Select end date"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Label>Description</Label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        placeholder="Enter exam description"
                                        defaultValue={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                    />
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

                            {/* Exam Summary */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Exam Type:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.type.split('_').map(word => 
                                                word.charAt(0) + word.slice(1).toLowerCase()
                                            ).join(' ')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.startDate && formData.endDate 
                                                ? `${formData.startDate} to ${formData.endDate}` 
                                                : 'Not set'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Classes:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {(formData.selectedClasses || []).length} selected
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

                    {/* Right Section - Class Selection */}
                    <div className="lg:col-span-1">
                        <ClassMultiSelect
                            selectedClasses={formData.selectedClasses || []}
                            onClassesChange={handleClassesChange}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {(formData.selectedClasses || []).length > 0 ? (
                            <>
                                Exam will be conducted for {(formData.selectedClasses || []).length} class(es)
                            </>
                        ) : (
                            'Select classes to continue'
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={handleSave}
                            disabled={!formData.examName || !formData.startDate || !formData.endDate}
                        >
                            {initialData ? "Update Exam" : "Create Exam"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamModal;
