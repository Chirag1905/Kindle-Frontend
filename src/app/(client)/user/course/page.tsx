'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmpoyeeModal from "./_components/ClassModal";
import { ClassType } from "./_components/ClassType";
import { getAcademicYearNameById } from "@/data/sampleData";


const initialData: ClassType[] = [
  {
    classId: 1,
    academicYearId: 1, // 2023-2024
    className: "Class 1",
    capacity: 40,
    status: true,
  },
  {
    classId: 2,
    academicYearId: 2, // 2024-2025
    className: "Class 2",
    capacity: 45,
    status: true,
  },
  {
    classId: 3,
    academicYearId: 2, // 2024-2025
    className: "Class 3",
    capacity: 50,
    status: true,
  },
  {
    classId: 4,
    academicYearId: 2, // 2024-2025
    className: "Class 4",
    capacity: 35,
    status: false,
  },
  {
    classId: 5,
    academicYearId: 2, // 2024-2025
    className: "Class 5",
    capacity: 42,
    status: true,
  },
  {
    classId: 6,
    academicYearId: 2, // 2024-2025
    className: "Class 6",
    capacity: 48,
    status: true,
  },
  {
    classId: 7,
    academicYearId: 3, // 2025-2026
    className: "Class 7",
    capacity: 55,
    status: true,
  },
  {
    classId: 8,
    academicYearId: 3, // 2025-2026
    className: "Class 8",
    capacity: 60,
    status: true,
  },
  {
    classId: 9,
    academicYearId: 3, // 2025-2026
    className: "Class 9",
    capacity: 65,
    status: true,
  },
  {
    classId: 10,
    academicYearId: 1, // 2023-2024
    className: "Class 10",
    capacity: 70,
    status: false,
  },
];


const columns: { key: keyof ClassType; label: string; render?: (value: ClassType[keyof ClassType], row: ClassType) => React.ReactNode }[] = [
  { key: "classId", label: "ID" },
  { key: "className", label: "Class Name" },
  { 
    key: "academicYearId", 
    label: "Academic Year",
    render: (value: ClassType[keyof ClassType]) => getAcademicYearNameById(Number(value))
  },
  { key: "capacity", label: "Capacity" },
  { key: "status", label: "Status" },
];

export default function Class() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<ClassType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: ClassType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: ClassType) => {
    setData((prev) => prev.filter((item) => item.classId !== row.classId));
  };

  const handleModalSubmit = (formValues: Omit<ClassType, "classId">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.classId === editData.classId ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      const newClassId = Math.max(...data.map(item => item.classId)) + 1;
      setData((prev) => [
        ...prev,
        { classId: newClassId, ...formValues },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Class" />
      <div className="space-y-6">
        {isOpen === true ? (
          <EmpoyeeModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <>

            <CustomTable
              title="Class"
              columns={columns}
              data={data}
              onAdd={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sorting
              enableSearch
            />
          </>
        )}
      </div>
    </div>
  );
}
