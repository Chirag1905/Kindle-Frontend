'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useEffect, useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import AcademicYearModal from "./_components/AcademicYearModal";
import { useModal } from "@/hooks/useModal";
import { useSelector } from "react-redux";
import { deleteAcademicYearFailure, deleteAcademicYearRequest, deleteAcademicYearSuccess, getAcademicYearFailure, getAcademicYearRequest, getAcademicYearSuccess, postAcademicYearFailure, postAcademicYearRequest, postAcademicYearSuccess, putAcademicYearFailure, putAcademicYearRequest, putAcademicYearSuccess } from "@/Redux/features/academicYear/academicYearSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "antd";

type AcademicYearData = {
  id: number;
  yearName: string;
  startDate: string;
  endDate: string;
  isActive: string;
};

interface RootState {
  academicYear: {
    academicYearData: {
      data: { data: AcademicYearData[] };
      loading: boolean;
      error: string | null;
    };
    academicYearPostData: {
      data?: { message?: string };
      loading: boolean;
      error?: string | null;
    };
    academicYearPutData: {
      data?: { message?: string };
      loading: boolean;
      error?: string | null;
    };
    academicYearDeleteData: {
      data?: { message?: string };
      loading: boolean;
      error?: string | null;
    };
  };
}

const columns: { key: keyof AcademicYearData; label: string }[] = [
  { key: "id", label: "Sr No" },
  { key: "yearName", label: "Academic Year Name" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "isActive", label: "Status" },
];

export default function AcademicYear() {
  const dispatch = useDispatch();
  const theme = localStorage?.getItem("theme") || "light";
  const { academicYearData, academicYearPostData, academicYearPutData, academicYearDeleteData } = useSelector(
    (state: RootState) => state.academicYear
  );
  const [data, setData] = useState<AcademicYearData[]>([]);

  const [editData, setEditData] = useState<AcademicYearData | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (id: number) => {
    const row = data.find(item => item.id === id);
    setEditData(row || null);
    openModal();
  };

  const handleModalSubmit = (formData: AcademicYearData) => {
    if (formData.id) {
      dispatch(putAcademicYearRequest(formData));
    } else {
      dispatch(postAcademicYearRequest(formData));
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this academic year?",
      content: "This action cannot be undone. The selected record will be permanently deleted.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: () => {
        try {
          dispatch(deleteAcademicYearRequest({ id }));
        } catch (err) {
          console.error("Error deleting data:", err);
          toast.error(
            typeof err === "string"
              ? err
              : (err as Error)?.message || "An unexpected error occurred. Please try again.",
            {
              position: "top-right",
              duration: 3000,
              style: {
                fontSize: "14px",
                background: theme === "dark" ? "#1f2937" : "#ffffff",
                color: theme === "dark" ? "#f9fafb" : "#111827",
              },
            },
          );
        }
      },
    });
  };

  // Effect for data update
  useEffect(() => {
    if (academicYearData?.data?.data) {
      setData(academicYearData?.data?.data || []);
    }
  }, [academicYearData]);

  // Effect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAcademicYearRequest({}));
      } catch (error) {
        console.error("Error fetching campus group data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const configs = [
      {
        data: academicYearPostData,
        success: postAcademicYearSuccess,
        failure: postAcademicYearFailure,
        close: true,
      },
      {
        data: academicYearPutData,
        success: putAcademicYearSuccess,
        failure: putAcademicYearFailure,
        close: true,
      },
      {
        data: academicYearDeleteData,
        success: deleteAcademicYearSuccess,
        failure: deleteAcademicYearFailure,
        close: false,
      },
    ];

    configs.forEach(({ data, success, failure, close }) => {
      // ✅ Handle Success
      if (data?.data?.message) {
        toast.success(data.data.message, {
          position: "top-right",
          duration: 4000,
          style: {
            fontSize: "14px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
          },
        });

        dispatch(success(null));
        if (close) closeModal();
      }

      // ❌ Handle Error
      if (data?.error) {
        toast.error(data.error || "An unexpected error occurred. Please try again.", {
          position: "top-right",
          duration: 3000,
          style: {
            fontSize: "14px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
          },
        });

        dispatch(success(null));
        dispatch(failure(null));
      }
    });
  }, [
    academicYearPostData,
    academicYearPutData,
    academicYearDeleteData,
    dispatch,
    closeModal,
    theme,
  ]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Academic Year Management" />
      <div className="space-y-6">
        {isOpen === true ? (
          <AcademicYearModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <CustomTable
            title="Academic Years"
            columns={columns}
            data={data}
            onAdd={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={academicYearData?.loading}
            sorting
            enableSearch
          />
        )}
      </div>
    </div>
  );
}
