"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import { Student, GenderEnum, BloodGroupEnum, GenderOptions, BloodGroupOptions, ClassOptions, BatchOptions } from "./StudentType";

// Custom controlled input component for the modal
const ControlledInput: React.FC<{
    type?: string;
    name: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent) => void;
    className?: string;
    disabled?: boolean;
}> = ({ type = "text", name, placeholder, value, onChange, onKeyPress, className = "", disabled = false }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            disabled={disabled}
            className={`h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
        />
    );
};

const StudentDefaultValues: Omit<Student, "id"> = {
    schoolId: 1,
    registrationNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: GenderEnum.MALE,
    email: "",
    phone: "",
    address: "",
    class: "1st",
    batch: "2024-2025",
    parentGuardianName: "",
    parentPhone: "",
    parentEmail: "",
    admissionDate: "",
    bloodGroup: BloodGroupEnum.O_POSITIVE,
    medicalConditions: "",
    status: true,
};

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Student, "id">) => void;
    initialData?: Student | null;
}

const StudentModal: React.FC<StudentModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<Omit<Student, "id">>(StudentDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                schoolId: initialData.schoolId,
                registrationNumber: initialData.registrationNumber,
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                dateOfBirth: initialData.dateOfBirth,
                gender: initialData.gender,
                email: initialData.email || "",
                phone: initialData.phone || "",
                address: initialData.address || "",
                class: initialData.class,
                batch: initialData.batch,
                parentGuardianName: initialData.parentGuardianName,
                parentPhone: initialData.parentPhone,
                parentEmail: initialData.parentEmail || "",
                admissionDate: initialData.admissionDate,
                bloodGroup: initialData.bloodGroup,
                medicalConditions: initialData.medicalConditions || "",
                status: initialData.status,
            });
        } else {
            setFormData(StudentDefaultValues);
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData((prev) => ({ 
            ...prev, 
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value 
        }));
    };

    const handleSave = () => {
        // Generate registration number if creating new student
        const submitData = { ...formData };
        if (!initialData && !formData.registrationNumber) {
            const timestamp = Date.now().toString().slice(-6);
            submitData.registrationNumber = `EDU2024${timestamp}`;
        }
        
        onSubmit(submitData);
        onClose();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {initialData ? "Edit Student" : "Add New Student"}
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
            <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Student Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Student Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>First Name</Label>
                                <ControlledInput
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <ControlledInput
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {initialData && (
                            <div>
                                <Label>Registration Number</Label>
                                <ControlledInput
                                    type="text"
                                    name="registrationNumber"
                                    placeholder="Registration number"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    className="mt-1"
                                    disabled
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Date of Birth</Label>
                                <ControlledInput
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Gender</Label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                >
                                    {GenderOptions.map((gender) => (
                                        <option key={gender} value={gender}>
                                            {gender.charAt(0) + gender.slice(1).toLowerCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Class *</Label>
                                <select
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                >
                                    {ClassOptions.map((classOption: string) => (
                                        <option key={classOption} value={classOption}>
                                            {classOption}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label>Batch *</Label>
                                <select
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                >
                                    {BatchOptions.map((batchOption: string) => (
                                        <option key={batchOption} value={batchOption}>
                                            {batchOption}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Email</Label>
                                <ControlledInput
                                    type="email"
                                    name="email"
                                    placeholder="student@example.com"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <ControlledInput
                                    type="tel"
                                    name="phone"
                                    placeholder="+91-9876543210"
                                    value={formData.phone || ""}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Address</Label>
                            <textarea
                                name="address"
                                placeholder="Enter complete address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                            />
                        </div>

                        <div>
                            <Label>Admission Date</Label>
                            <ControlledInput
                                type="date"
                                name="admissionDate"
                                value={formData.admissionDate}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Parent/Guardian & Medical Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Parent/Guardian Information
                        </h3>
                        
                        <div>
                            <Label>Parent/Guardian Name</Label>
                            <ControlledInput
                                type="text"
                                name="parentGuardianName"
                                placeholder="Enter parent/guardian name"
                                value={formData.parentGuardianName}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Parent Phone</Label>
                                <ControlledInput
                                    type="tel"
                                    name="parentPhone"
                                    placeholder="+91-9876543210"
                                    value={formData.parentPhone}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Parent Email</Label>
                                <ControlledInput
                                    type="email"
                                    name="parentEmail"
                                    placeholder="parent@example.com"
                                    value={formData.parentEmail || ""}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">
                            Medical Information
                        </h3>

                        <div>
                            <Label>Blood Group</Label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                            >
                                <option value="">Select Blood Group</option>
                                {BloodGroupOptions.map((bloodGroup) => (
                                    <option key={bloodGroup} value={bloodGroup}>
                                        {bloodGroup}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Medical Conditions</Label>
                            <textarea
                                name="medicalConditions"
                                placeholder="Any medical conditions, allergies, or special needs"
                                value={formData.medicalConditions}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Switch
                                label={formData.status ? "Active" : "Inactive"}
                                checked={formData.status}
                                onChange={(checked) => {
                                    setFormData(prev => ({ ...prev, status: checked }));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button 
                    size="sm" 
                    onClick={handleSave}
                    disabled={!formData.firstName || !formData.lastName || !formData.parentGuardianName || !formData.parentPhone}
                >
                    {initialData ? "Update" : "Create"}
                </Button>
            </div>
        </div>
    );
};

export default StudentModal;