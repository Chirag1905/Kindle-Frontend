"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable, { renderStatus } from "@/components/tables/CustomTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useModal } from "@/hooks/useModal";
import StudentModal from "./_components/StudentModal";
import StudentProfileModal from "./_components/StudentProfileModal";
import { sampleStudents } from "@/data/sampleData";
import type { Student } from "./_components/StudentType";

export default function StudentPage() {
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>(sampleStudents);
    const [editData, setEditData] = useState<Student | null>(null);
    const [profileStudent, setProfileStudent] = useState<Student | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: isProfileOpen, openModal: openProfileModal, closeModal: closeProfileModal } = useModal();

    // Navigate to student profile modal
    const handleStudentProfile = (studentId: number) => {
        const student = students.find(s => s.id === studentId);
        if (student) {
            setProfileStudent(student);
            openProfileModal();
        }
    };

    // Handle creating new student - open modal
    const handleCreateStudent = () => {
        setEditData(null); // clear edit data
        openModal();
    };

    // Handle editing existing student - open modal
    const handleEditStudent = (student: Student) => {
        setEditData(student); // pass data to modal
        openModal();
    };

    // Handle deleting student
    const handleDeleteStudent = (student: Student) => {
        if (confirm("Are you sure you want to delete this student?")) {
            setStudents(prev => prev.filter(s => s.id !== student.id));
        }
    };

    // Handle modal form submission
    const handleModalSubmit = (formValues: Student) => {
        if (editData) {
            // Update record
            setStudents((prev) =>
                prev.map((item) =>
                    item.id === editData.id ? { ...item, ...formValues } : item
                )
            );
        } else {
            // Create new record
            const newId = Math.max(...students.map(item => item.id || 0)) + 1;
            setStudents((prev) => [
                ...prev,
                { ...formValues, id: newId },
            ]);
        }
    };

    // Table column configuration
    const columns = [
        {
            key: "registrationNumber" as keyof Student,
            label: "Registration No.",
            sortable: true,
            render: (value: Student[keyof Student], student: Student) => (
                <button
                    onClick={() => handleStudentProfile(student.id!)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                    {String(value)}
                </button>
            )
        },
        {
            key: "firstName" as keyof Student,
            label: "Full Name",
            sortable: true,
            render: (value: Student[keyof Student], student: Student) => (
                `${student.firstName} ${student.lastName}`
            )
        },
        {
            key: "class" as keyof Student,
            label: "Class/Batch",
            sortable: true,
            render: (value: Student[keyof Student], student: Student) => (
                `${student.class} - ${student.batch}`
            )
        },
        {
            key: "email" as keyof Student,
            label: "Email",
            sortable: true
        },
        {
            key: "parentGuardianName" as keyof Student,
            label: "Parent/Guardian",
            sortable: true
        },
        {
            key: "admissionDate" as keyof Student,
            label: "Admission Date",
            sortable: true,
            render: (value: Student[keyof Student]) => new Date(String(value)).toLocaleDateString()
        },
        {
            key: "status" as keyof Student,
            label: "Status",
            sortable: true,
            render: (value: Student[keyof Student]) => renderStatus(value)
        }
    ];

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Student" />
            
            {!isOpen && !isProfileOpen && (
                <CustomTable
                    title="Student"
                    data={students}
                    columns={columns}
                    enableSearch={true}
                    onAdd={handleCreateStudent}
                    onEdit={handleEditStudent}
                    onDelete={handleDeleteStudent}
                    initialRowsPerPage={10}
                />
            )}
            
            {isOpen && (
                <StudentModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                    initialData={editData}
                />
            )}
            
            {isProfileOpen && profileStudent && (
                <StudentProfileModal
                    isOpen={isProfileOpen}
                    onClose={closeProfileModal}
                    student={profileStudent}
                />
            )}
        </div>
    );
}