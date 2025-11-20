'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import ExamModal from "./_components/AttendanceStatusModal";
import { AttendanceStatusType } from "./_components/AttendanceStatusType";


  const initialData: AttendanceStatusType[] = [
  {
    id: 1,
    statusCode: "P",
    statusName: "Present",
    description: "Student is present",
    status: true,
    color: "#33FF57" // Green
  },
  {
    id: 2,
    statusCode: "A",
    statusName: "Absent",
    description: "Student is absent",
    status: false,
    color: "#FF3333" // Red
  },
  {
    id: 3,
    statusCode: "L",
    statusName: "Late",
    description: "Student is late",
    status: true,
    color: "#FF8C33" // Orange
  },
  {
    id: 4,
    statusCode: "E",
    statusName: "Excused",
    description: "Student is excused",
    status: true,
    color: "#3357FF" // Blue
  }
];

const columns = [
  { key: "id" as keyof AttendanceStatusType, label: "Status ID" },
  { key: "statusCode" as keyof AttendanceStatusType, label: "Status Code" },
  { key: "statusName" as keyof AttendanceStatusType, label: "Status Name" },
  { key: "description" as keyof AttendanceStatusType, label: "Description" },
  { 
    key: "color" as keyof AttendanceStatusType, 
    label: "Color",
    render: (value: any) => (
      <div className="flex items-center justify-center gap-2">
        <div
          className="w-6 h-6 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: value }}
        />
        <span className="font-mono text-sm text-gray-600">{value}</span>
      </div>
    )
  },
  { key: "status" as keyof AttendanceStatusType, label: "Status" }
];

export default function AttendanceStatus() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<AttendanceStatusType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: AttendanceStatusType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: AttendanceStatusType) => {
    setData((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleModalSubmit = (formValues: Omit<AttendanceStatusType, "id">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.id === editData.id ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      setData((prev) => [
        ...prev,
        { id: prev.length + 1, ...formValues },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Attendance Status" />
      <div className="space-y-6">
        {isOpen === true ? (
          <ExamModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <CustomTable
            title="Attendance Status"
            columns={columns}
            data={data}
            onAdd={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sorting
            enableSearch
          />
        )}
      </div>
    </div>
  );
}
