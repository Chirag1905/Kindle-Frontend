'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmpoyeeModal from "./_components/EmployeeModal";
import { ClassType } from "./_components/ClassType";

// Sample initial data
const initialData: ClassType[] = [
  {
    id: 1,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 1-A",
    capacity: 40,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 2,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 1-B",
    capacity: 45,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 3,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 2-A",
    capacity: 35,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 4,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 2-B",
    capacity: 38,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 5,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 3-A",
    capacity: 42,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 6,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 3-B",
    capacity: 40,
    isActive: false,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-09-01T10:00:00Z",
    dbUser: "system"
  },
  {
    id: 7,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 4-A",
    capacity: 45,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 8,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 4-B",
    capacity: 43,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 9,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 5-A",
    capacity: 40,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  },
  {
    id: 10,
    schoolId: 1001,
    academicYearId: 2025,
    name: "Class 5-B",
    capacity: 38,
    isActive: true,
    createdTs: "2025-08-01T08:00:00Z",
    updatedTs: "2025-08-01T08:00:00Z",
    dbUser: "system"
  }
]

const columns: { key: keyof ClassType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Class Name" },
  { key: "capacity", label: "Capacity" },
  { key: "isActive", label: "Status" },
  { key: "updatedTs", label: "Last Updated" }
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
    setData((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleModalSubmit = (formValues: Omit<ClassType, "id">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.id === editData.id ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      const newId = Math.max(...data.map(item => item.id), 0) + 1;
      setData((prev) => [
        ...prev,
        { id: newId, ...formValues },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Class" />
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
    </div>
  );
}
