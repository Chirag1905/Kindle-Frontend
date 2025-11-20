"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import ColorPicker from "@/components/form/color-picker";
import { AttendanceStatusType } from "./AttendanceStatusType";

let AttendanceDefaultValues: AttendanceStatusType = {
    id: -1,
    statusCode: "",
    statusName: "",
    description: "",
    status: false,
    color: "#33FF57", // Default green color
}
   

interface AttendanceStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AttendanceStatusType) => void;
    initialData?: AttendanceStatusType | null;
}

const AttendanceStatusModal: React.FC<AttendanceStatusModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<AttendanceStatusType>(AttendanceDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(AttendanceDefaultValues);
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
        <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h4 className="px-6 mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                {initialData ? "Edit Attendance Status" : "Create Attendance Status"}
            </h4>

            <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-1">
                    <Label>Status Name</Label>
                    <Input
                        key={`statusName-${formData.id}-${isOpen}`}
                        type="text"
                        name="statusName"
                        placeholder="Status Name"
                        defaultValue={formData.statusName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Status Code</Label>
                    <Input
                        key={`statusCode-${formData.id}-${isOpen}`}
                        type="text"
                        name="statusCode"
                        placeholder="Status Code"
                        defaultValue={formData.statusCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-2">
                    <Label>Description</Label>
                    <Input
                        key={`description-${formData.id}-${isOpen}`}
                        type="text"
                        name="description"
                        placeholder="Description"
                        defaultValue={formData.description}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="col-span-1">
                    <ColorPicker
                        selectedColor={formData.color}
                        onChange={(color) => setFormData(prev => ({ ...prev, color }))}
                        label="Status Color"
                    />
                </div>
                
                <div className="col-span-1">
                    <Label>
                        Status <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2">
                        <Switch
                            label={formData.status === true ? "Active" : "Inactive"}
                            checked={formData.status === true}
                            onChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
                        />
                    </div>
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

export default AttendanceStatusModal;
