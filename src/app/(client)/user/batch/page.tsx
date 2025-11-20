'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import BatchModal from "./_components/BatchModal";
import { BatchType } from "./_components/BatchType";
import { getSubjectsByIds, getTeacherById, SubjectType } from "./_components/SubjectType";
import { SubjectTeacherMapping } from "./_components/BatchType";

// Sample data matching our new BatchType interface
const initialData: BatchType[] = [
  {
    id: 1,
    courseId: 1, // Class 1
    batchName: "Batch A",
    capacity: 40,
    batchCoordinatorId: 1, // Rekha Sharma
    status: true,
    subjects: [1, 2, 3, 4, 9], // Mathematics, English, Science, Social Studies, Environmental Science
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 2 }, // Mathematics - Amit Kumar
      { subjectId: 2, teacherId: 3 }, // English - Priya Singh
      { subjectId: 3, teacherId: 4 }, // Science - Vivek Patel
      { subjectId: 4, teacherId: 5 }, // Social Studies - Sarita Ram
      { subjectId: 9, teacherId: 4 }, // Environmental Science - Vivek Patel
    ],
  },
  {
    id: 2,
    courseId: 2, // Class 2
    batchName: "Batch B",
    capacity: 35,
    batchCoordinatorId: 4, // Vivek Patel
    status: true,
    subjects: [1, 2, 3, 4, 5, 9], // Mathematics, English, Science, Social Studies, Physical Education, Environmental Science
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 2 }, // Mathematics - Amit Kumar
      { subjectId: 2, teacherId: 3 }, // English - Priya Singh
      { subjectId: 3, teacherId: 4 }, // Science - Vivek Patel
      { subjectId: 4, teacherId: 5 }, // Social Studies - Sarita Ram
      { subjectId: 5, teacherId: 9 }, // Physical Education - Sunita Verma
      { subjectId: 9, teacherId: 4 }, // Environmental Science - Vivek Patel
    ],
  },
  {
    id: 3,
    courseId: 3, // Class 3
    batchName: "Batch C",
    capacity: 50,
    batchCoordinatorId: 5, // Sarita Ram
    status: false,
    subjects: [1, 2, 3, 4, 6, 9], // Mathematics, English, Science, Social Studies, Computer Science, Environmental Science
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 2 }, // Mathematics - Amit Kumar
      { subjectId: 2, teacherId: 3 }, // English - Priya Singh
      { subjectId: 3, teacherId: 4 }, // Science - Vivek Patel
      { subjectId: 4, teacherId: 5 }, // Social Studies - Sarita Ram
      { subjectId: 6, teacherId: 6 }, // Computer Science - Rajesh Gupta
      { subjectId: 9, teacherId: undefined }, // Environmental Science - Unassigned
    ],
  },
  {
    id: 4,
    courseId: 4, // Class 4
    batchName: "Batch D",
    capacity: 45,
    batchCoordinatorId: 7, // Neha Bose
    status: true,
    subjects: [1, 2, 3, 4, 7, 8, 9], // Mathematics, English, Science, Social Studies, Art & Craft, Music, Environmental Science
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 2 }, // Mathematics - Amit Kumar
      { subjectId: 2, teacherId: 3 }, // English - Priya Singh
      { subjectId: 3, teacherId: 4 }, // Science - Vivek Patel
      { subjectId: 4, teacherId: 5 }, // Social Studies - Sarita Ram
      { subjectId: 7, teacherId: 7 }, // Art & Craft - Neha Bose
      { subjectId: 8, teacherId: 8 }, // Music - Manish Jain
      { subjectId: 9, teacherId: 4 }, // Environmental Science - Vivek Patel
    ],
  },
  {
    id: 5,
    courseId: 5, // Class 5
    batchName: "Batch E",
    capacity: 38,
    batchCoordinatorId: 1, // Rekha Sharma
    status: true,
    subjects: [1, 2, 3, 4, 6, 10, 9], // Mathematics, English, Science, Social Studies, Computer Science, Second Language, Environmental Science
    subjectTeacherMappings: [
      { subjectId: 1, teacherId: 2 }, // Mathematics - Amit Kumar
      { subjectId: 2, teacherId: 3 }, // English - Priya Singh
      { subjectId: 3, teacherId: 4 }, // Science - Vivek Patel
      { subjectId: 4, teacherId: 5 }, // Social Studies - Sarita Ram
      { subjectId: 6, teacherId: 6 }, // Computer Science - Rajesh Gupta
      { subjectId: 10, teacherId: 10 }, // Second Language - Deepak Tiwari
      { subjectId: 9, teacherId: undefined }, // Environmental Science - Unassigned
    ],
  },
];

// Lookup data for displaying names instead of IDs
const employeeLookup = {
  1: "Rekha Sharma",
  4: "Vivek Patel", 
  5: "Sarita Ram",
  7: "Neha Bose",
};

const courseLookup = {
  1: "Class 1",
  2: "Class 2",
  3: "Class 3",
  4: "Class 4",
  5: "Class 5",
  6: "Class 6",
  7: "Class 7",
  8: "Class 8",
};

// Helper functions to get names from IDs
const getCoordinatorName = (id?: number) => {
  return id ? employeeLookup[id as keyof typeof employeeLookup] || `Unknown (ID: ${id})` : 'Not Assigned';
};

const getCourseName = (id: number) => {
  return courseLookup[id as keyof typeof courseLookup] || `Unknown (ID: ${id})`;
};

const columns = [
  { key: "id" as keyof BatchType, label: "Batch ID" },
  { key: "batchName" as keyof BatchType, label: "Batch Name" },
  { 
    key: "courseId" as keyof BatchType, 
    label: "Course/Class",
    render: (value: any) => getCourseName(value)
  },
  { key: "capacity" as keyof BatchType, label: "Capacity" },
  { 
    key: "batchCoordinatorId" as keyof BatchType, 
    label: "Batch Coordinator",
    render: (value: any) => getCoordinatorName(value)
  },
  {
    key: "subjects" as keyof BatchType,
    label: "Subject-Teacher Mapping", 
    render: (value: any, row: BatchType) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return <span className="text-gray-500">No subjects mapped</span>;
      }
      
      const subjects = getSubjectsByIds(value);
      const mappings = row.subjectTeacherMappings || [];
      
      return (
        <div className="flex flex-col gap-1 max-w-xs">
          {subjects.slice(0, 2).map((subject: SubjectType) => {
            const mapping = mappings.find(m => m.subjectId === subject.id);
            const teacher = mapping?.teacherId ? getTeacherById(mapping.teacherId) : null;
            
            return (
              <div key={subject.id} className="flex items-center gap-1 text-xs">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {subject.subjectCode}
                </span>
                <span className="text-gray-400">→</span>
                <span className={`text-xs ${teacher ? 'text-gray-700 dark:text-gray-300' : 'text-red-500'}`}>
                  {teacher ? teacher.name : 'Unassigned'}
                </span>
              </div>
            );
          })}
          {subjects.length > 2 && (
            <div className="text-xs text-gray-500 px-1">
              +{subjects.length - 2} more subjects
            </div>
          )}
        </div>
      );
    }
  },
  { key: "status" as keyof BatchType, label: "Status" },
];

export default function BatchPage() {
  const [data, setData] = useState(initialData);
  const [editData, setEditData] = useState<BatchType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: BatchType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: BatchType) => {
    setData((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleModalSubmit = (formValues: BatchType) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.id === editData.id ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      const newId = Math.max(...data.map(item => item.id)) + 1;
      setData((prev) => [
        ...prev,
        { ...formValues, id: newId },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Batch Management" />
      <div className="space-y-6">
        {!isOpen && (
          <CustomTable
            title="Batch"
            buttonName="Add Batch"
            columns={columns}
            data={data}
            onAdd={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sorting
            enableSearch
          />
        )}
        
        {isOpen && (
          <BatchModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        )}
      </div>
    </div>
  );
}
