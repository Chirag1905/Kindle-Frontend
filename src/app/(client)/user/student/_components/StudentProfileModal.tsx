"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import { renderStatus } from "@/components/tables/CustomTable";
import { Student, getGenderDisplayName, getBloodGroupDisplayName } from "./StudentType";

interface StudentProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
}

export default function StudentProfileModal({ isOpen, onClose, student }: StudentProfileModalProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Student Profile
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Detailed information for {student.firstName} {student.lastName}
                    </p>
                </div>
                <Button 
                    variant="outline"
                    onClick={onClose}
                >
                    Back to Students
                </Button>
            </div>

            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div className="text-white">
                        <h2 className="text-2xl font-bold">
                            {student.firstName} {student.lastName}
                        </h2>
                        <p className="text-white/80 text-lg">
                            {student.registrationNumber}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                            student.status
                                ? 'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500'
                                : 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500'
                        }`}>
                            {student.status ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                            Personal Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        First Name
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.firstName}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Last Name
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.lastName}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Date of Birth
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {new Date(student.dateOfBirth).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Gender
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {getGenderDisplayName(student.gender)}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Class
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.class}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Batch
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.batch}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Email
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.email || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Phone
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.phone || 'Not provided'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Address
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {student.address || 'Not provided'}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Admission Date
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {new Date(student.admissionDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Parent/Guardian & Medical Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                            Parent/Guardian Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Parent/Guardian Name
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {student.parentGuardianName}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Parent Phone
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.parentPhone}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Parent Email
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {student.parentEmail || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 mt-8">
                            Medical Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Blood Group
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {student.bloodGroup ? getBloodGroupDisplayName(student.bloodGroup) : 'Not provided'}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Medical Conditions
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {student.medicalConditions || 'None reported'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}