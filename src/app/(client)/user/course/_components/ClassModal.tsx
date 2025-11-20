"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
import { ClassType } from "./ClassType";
import { sampleAcademicYears } from "@/data/sampleData";

let classDefaultValues: ClassType = {
    classId: 0,
    academicYearId: 0,
    className: "",
    capacity: 0,
    status: true,
};

interface ClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ClassType) => void;
    initialData?: ClassType | null;
}

const ClassModal: React.FC<ClassModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<ClassType>(classDefaultValues);
    const [dropdownLabel, setDropdownLabel] = useState("Select Academic Year");

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            // Find the academic year name for the dropdown
            const academicYear = sampleAcademicYears.find(year => year.id === initialData.academicYearId);
            setDropdownLabel(academicYear?.academicYearName || "Select Academic Year");
        } else {
            setFormData(classDefaultValues);
            setDropdownLabel("Select Academic Year");
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h4 className="px-6 mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                {initialData ? "Edit Class" : "Create Class"}
            </h4>

            <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-1">
                    <Label>Class Name</Label>
                    <Input
                        type="text"
                        name="className"
                        placeholder="Class Name"
                        defaultValue={formData.className}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Academic Year</Label>
                    <CustomDropdown
                        buttonLabel={dropdownLabel}
                        menuItems={initialData ? [] : sampleAcademicYears.map((year) => ({
                            label: year.academicYearName,
                            onClick: () => {
                                setFormData((prev) => ({ ...prev, academicYearId: year.id || 0 }));
                                setDropdownLabel(year.academicYearName);
                            },
                        }))}
                        className={initialData ? "pointer-events-none opacity-60" : ""}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Capacity</Label>
                    <Input
                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        defaultValue={formData.capacity}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1 flex items-center">
                    <Switch
                        label="Active"
                        checked={formData.status}
                        onChange={(checked) => {
                            setFormData((prev) => ({ ...prev, status: checked }));
                        }}
                    />
                </div>
            </div>

            <div className="px-6 flex items-center justify-end w-full gap-3 my-6">
                <Button size="sm" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                    {initialData ? "Update" : "Create"}
                </Button>
            </div>
        </div>
    );
};

export default ClassModal;
