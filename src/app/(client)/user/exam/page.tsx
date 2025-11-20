'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import ExamModal from "./_components/ExamModal";
import { ExamType, ExamTypeEnum } from "./_components/ExamType";
import { BatchSelectionType } from "./_components/BatchMultiSelect";

// Sample batch data for display (matching the data in BatchMultiSelect)
const sampleBatches: BatchSelectionType[] = [
    { id: 1, batchName: "Batch A", courseName: "Class 1", capacity: 40, currentStudents: 35, status: true },
    { id: 2, batchName: "Batch B", courseName: "Class 2", capacity: 35, currentStudents: 32, status: true },
    { id: 3, batchName: "Batch C", courseName: "Class 3", capacity: 50, currentStudents: 45, status: true },
    { id: 4, batchName: "Batch D", courseName: "Class 4", capacity: 35, currentStudents: 30, status: true },
    { id: 5, batchName: "Batch E", courseName: "Class 5", capacity: 42, currentStudents: 38, status: true },
    { id: 6, batchName: "Batch F", courseName: "Class 6", capacity: 38, currentStudents: 35, status: false },
    { id: 7, batchName: "Batch G", courseName: "Class 7", capacity: 36, currentStudents: 33, status: true },
    { id: 8, batchName: "Batch H", courseName: "Class 8", capacity: 40, currentStudents: 37, status: true },
];

// Helper function to get batch names from IDs
const getBatchNames = (batchIds: number[] | undefined): string => {
    if (!batchIds || batchIds.length === 0) return 'No batches selected';
    
    const batchNames = batchIds
        .map(id => {
            const batch = sampleBatches.find(b => b.id === id);
            return batch ? `${batch.batchName} (${batch.courseName})` : `Batch ${id}`;
        })
        .join(', ');
    
    return batchNames;
};



const initialData: ExamType[] = [
  {
    examId: 1,
    examName: "First Term Assessment",
    type: ExamTypeEnum.MID_TERM,
    startDate: "2024-03-15",
    endDate: "2024-03-25",
    description: "First term comprehensive evaluation",
    status: true,
    selectedBatches: [1, 2, 3] // Batch A, Batch B, Batch C
  },
  {
    examId: 2,
    examName: "Monthly Quiz Series",
    type: ExamTypeEnum.UNIT_TEST,
    startDate: "2024-04-05",
    endDate: "2024-04-05",
    description: "Monthly assessment quiz",
    status: false,
    selectedBatches: [4, 5] // Batch D, Batch E
  },
  {
    examId: 3,
    examName: "Final Examination",
    type: ExamTypeEnum.UNIT_TEST,
    startDate: "2024-12-10",
    endDate: "2024-12-20",
    description: "End of year examination",
    status: true,
    selectedBatches: [1, 3, 5, 7] // Batch A, Batch C, Batch E, Batch G
  },
  {
    examId: 4,
    examName: "Practical Assessment",
    type: ExamTypeEnum.HALF_YEARLY,
    startDate: "2024-11-01",
    endDate: "2024-11-10",
    description: "Laboratory evaluation",
    status: true,
    selectedBatches: [2, 4, 6, 8] // Batch B, Batch D, Batch F, Batch H
  }
];

const columns: { key: keyof ExamType; label: string; render?: (value: any, row: ExamType) => React.ReactNode }[] = [
  { key: "examId", label: "Exam ID" },
  { key: "examName", label: "Exam Name" },
  { key: "type", label: "Exam Type" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { 
    key: "selectedBatches", 
    label: "Batches",
    render: (value: number[] | undefined, row: ExamType) => {
      if (!value || value.length === 0) {
        return (
          <span className="text-gray-400 text-sm italic">
            No batches selected
          </span>
        );
      }
      
      const batchNames = value
        .map(id => {
          const batch = sampleBatches.find(b => b.id === id);
          return batch ? `${batch.batchName} (${batch.courseName})` : `Batch ${id}`;
        })
        .slice(0, 3); // Show only first 3 batches
      
      const remainingCount = value.length - 3;
      
      return (
        <div className="flex flex-wrap gap-1">
          {batchNames.map((name, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
            >
              {name}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              +{remainingCount} more
            </span>
          )}
        </div>
      );
    }
  },
  { key: "status", label: "Status" }
];

export default function Exam() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<ExamType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: ExamType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: ExamType) => {
    setData((prev) => prev.filter((item) => item.examId !== row.examId));
  };

  const handleModalSubmit = (formValues: Omit<ExamType, "examId">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.examId === editData.examId ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      setData((prev) => [
        ...prev,
        { examId: prev.length + 1, ...formValues },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Exam" />
      <div className="space-y-6">
        {!isOpen && (
          <CustomTable
            title="Exam"
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
          <ExamModal
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
