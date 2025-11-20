"use client";
import React, { useEffect, useRef, useState } from "react";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Input from "@/components/form/input/InputField";

const { RangePicker } = DatePicker;

interface AcademicYear {
  id?: number;
  schoolId?: number;
  yearName: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

interface AcademicYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AcademicYear) => void;
  initialData?: AcademicYear | null;
}

const AcademicYearModal: React.FC<AcademicYearModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {

  const [formData, setFormData] = useState<AcademicYear>({
    schoolId: 1,
    yearName: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for error scrolling
  const fieldRefs = useRef<{
    yearName: React.RefObject<HTMLDivElement>;
    dateRange: React.RefObject<HTMLDivElement>;
    isActive: React.RefObject<HTMLDivElement>;
  }>({
    yearName: React.createRef<HTMLDivElement>(),
    dateRange: React.createRef<HTMLDivElement>(),
    isActive: React.createRef<HTMLDivElement>(),
  });

  /** Populate modal when editing */
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        schoolId: initialData.schoolId || 1,
        yearName: initialData.yearName,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        isActive: initialData.isActive ?? false,
      });
    } else {
      setFormData({
        schoolId: 1,
        yearName: "",
        startDate: "",
        endDate: "",
        isActive: false,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  /** Handle form changes */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /** Handle date range */
  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (dates && dates[0] && dates[1]) {
      setFormData((prev) => ({
        ...prev,
        startDate: dates[0]!.format("YYYY-MM-DD"),
        endDate: dates[1]!.format("YYYY-MM-DD"),
      }));
      setErrors((prev) => ({ ...prev, startDate: "", endDate: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        startDate: "",
        endDate: "",
      }));
    }
  };

  /** Validation */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.yearName.trim()) {
      newErrors.yearName = "Academic year is required";
    }

    if (!formData.startDate || !formData.endDate) {
      newErrors.startDate = "Start and end dates are required";
    }

    // isActive must be explicitly true or false, don't show error if false
    if (formData.isActive === undefined || formData.isActive === null) {
      newErrors.isActive = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Scroll to first error */
  const scrollToFirstError = () => {
    const firstError = Object.keys(errors)[0];
    if (!firstError) return;

    const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
      yearName: fieldRefs.current.yearName,
      startDate: fieldRefs.current.dateRange,
      endDate: fieldRefs.current.dateRange,
      isActive: fieldRefs.current.isActive,
    };

    const ref = refMap[firstError];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  /** Save handler */
  const handleSave = () => {
    if (!validateForm()) {
      setTimeout(scrollToFirstError, 100);
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white py-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="w-auto sm:w-1/2 p-3 mx-auto rounded-2xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h4 className="px-6 mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {initialData ? "Edit Academic Year" : "Create Academic Year"}
        </h4>

        <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Academic Year Input */}
          <div className="col-span-2" ref={fieldRefs.current.yearName}>
            <Label>
              Academic Year <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="yearName"
              placeholder="Enter Academic Year"
              value={formData.yearName}
              onChange={handleChange}
              className={`w-full ${errors.yearName ? "border-red-500" : ""}`}
            />
            {errors.yearName && (
              <p className="mt-1 text-sm text-red-600">{errors.yearName}</p>
            )}
          </div>

          {/* Date Range */}
          <div className="col-span-2" ref={fieldRefs.current.dateRange}>
            <Label>
              Academic Year Date <span className="text-red-500">*</span>
            </Label>
            <RangePicker
              placeholder={["Start Date", "End Date"]}
              className={`w-full rounded-xl px-3 py-2 text-gray-700
              ${errors.startDate ? "border border-red-500" : "border border-gray-300"}
              hover:border-brand-500 transition-all duration-200`}
              onChange={handleDateRangeChange}
              value={
                formData.startDate && formData.endDate
                  ? [dayjs(formData.startDate), dayjs(formData.endDate)]
                  : null
              }
              format="DD-MM-YYYY"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
            )}
          </div>

          {/* Status Switch */}
          <div className="col-span-2" ref={fieldRefs.current.isActive}>
            <Label>
              Status <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2">
              <Switch
                label={formData.isActive ? "Active" : "Inactive"}
                checked={!!formData.isActive}
                onChange={(checked) => {
                  setFormData((prev) => ({
                    ...prev,
                    isActive: checked,
                  }));
                  setErrors((prev) => ({
                    ...prev,
                    isActive: "",
                  }));
                }}
              />
            </div>
            {errors.isActive && (
              <p className="mt-1 text-sm text-red-600">{errors.isActive}</p>
            )}
          </div>
        </div>

        <div className="px-6 flex items-center justify-end w-full gap-3 my-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            {initialData ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcademicYearModal;
