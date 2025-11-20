'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import ExamModal from "./_components/ExamModal";
import { ExamType, ExamTypeEnum } from "./_components/ExamType";
import { ClassSelectionType, sampleClasses } from "./_components/ClassMultiSelect";

// Helper function to get class names from IDs and show their batches
const getClassNames = (classIds: number[] | undefined): string => {
    if (!classIds || classIds.length === 0) return 'No classes selected';
    
    const classNames = classIds
        .map(id => {
            const classItem = sampleClasses.find(c => c.id === id);
            if (!classItem) return `Class ${id}`;
            
            const batchNames = classItem.batches.map(b => b.batchName).join(', ');
            return `${classItem.className} (${batchNames})`;
        })
        .join('; ');
    
    return classNames;
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
    selectedClasses: [1, 2] // Class 1, Class 2
  },
  {
    examId: 2,
    examName: "Monthly Quiz Series",
    type: ExamTypeEnum.UNIT_TEST,
    startDate: "2024-04-05",
    endDate: "2024-04-05",
    description: "Monthly assessment quiz",
    status: false,
    selectedClasses: [3] // Class 3
  },
  {
    examId: 3,
    examName: "Final Examination",
    type: ExamTypeEnum.UNIT_TEST,
    startDate: "2024-12-10",
    endDate: "2024-12-20",
    description: "End of year examination",
    status: true,
    selectedClasses: [1, 3, 4] // Class 1, Class 3, Class 4
  },
  {
    examId: 4,
    examName: "Practical Assessment",
    type: ExamTypeEnum.HALF_YEARLY,
    startDate: "2024-11-01",
    endDate: "2024-11-10",
    description: "Laboratory evaluation",
    status: true,
    selectedClasses: [2, 4] // Class 2, Class 4
  }
];

const columns: { key: keyof ExamType; label: string; render?: (value: any, row: ExamType) => React.ReactNode }[] = [
  { key: "examId", label: "Exam ID" },
  { key: "examName", label: "Exam Name" },
  { key: "type", label: "Exam Type" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { 
    key: "selectedClasses", 
    label: "Classes & Batches",
    render: (value: number[] | undefined, row: ExamType) => {
      if (!value || value.length === 0) {
        return (
          <span className="text-gray-400 text-sm italic">
            No classes selected
          </span>
        );
      }
      
      const classDetails = value
        .map(id => {
          const classItem = sampleClasses.find(c => c.id === id);
          if (!classItem) return {
            className: `Class ${id}`,
            batchCount: 0,
            batches: ''
          };
          
          return {
            className: classItem.className,
            batchCount: classItem.batches.length,
            batches: classItem.batches.map(b => b.batchName).slice(0, 2).join(', ')
          };
        })
        .slice(0, 2); // Show only first 2 classes
      
      const remainingCount = value.length - 2;
      
      return (
        <div className="flex flex-wrap gap-1">
          {classDetails.map((detail, index) => (
            <div key={index} className="inline-flex flex-col">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                {detail.className} ({detail.batchCount} batches)
              </span>
              <span className="text-xs text-gray-500 mt-0.5 px-2">
                {detail.batches}{detail.batchCount > 2 ? '...' : ''}
              </span>
            </div>
          ))}
          {remainingCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              +{remainingCount} more class{remainingCount !== 1 ? 'es' : ''}
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
