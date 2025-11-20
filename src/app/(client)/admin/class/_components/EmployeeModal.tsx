"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import DatePicker from "@/components/form/date-picker";
import { EmployeeType } from "./ClassType";

let employeeDefaultValues: EmployeeType = {
    srNo: 0,
    address: "",
    created_ts: "",
    date_of_birth: "",
    db_user: "",
    department: "",
    designation: "",
    email: "",
    emergency_contact: "",
    employee_id: "",
    employee_type: "TEACHER",
    experience_years: 0,
    first_name: "",
    hire_date: "",
    is_active: false,
    last_name: "",
    phone: "",
    qualification: "",
    salary: 0,
    updated_ts: "",
    school_id: 0,
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EmployeeType) => void;
    initialData?: EmployeeType | null;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<EmployeeType>(employeeDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(employeeDefaultValues);
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
                {initialData ? "Edit Employee" : "Create Employee"}
            </h4>

            <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-1">
                    <Label>First Name</Label>
                    <Input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Phone</Label>
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-2">
                    <Label>Address</Label>
                    <Input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Designation</Label>
                    <Input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Department</Label>
                    <Input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Qualification</Label>
                    <Input
                        type="text"
                        name="qualification"
                        placeholder="Qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Salary</Label>
                    <Input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Employee Type</Label>
                    <Input
                        type="text"
                        name="employee_type"
                        placeholder="Employee Type"
                        value={formData.employee_type}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Experience Years</Label>
                    <Input
                        type="number"
                        name="experience_years"
                        placeholder="Experience Years"
                        value={formData.experience_years}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Date of Birth</Label>
                    <DatePicker
                        id="date-of-birth"
                        placeholder="Select date of birth"
                        value={formData.date_of_birth}
                        onChange={(_dates, dateStr) => {
                            setFormData((prev) => ({ ...prev, date_of_birth: dateStr }));
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Hire Date</Label>
                    <DatePicker
                        id="hire-date"
                        placeholder="Select hire date"
                        value={formData.hire_date}
                        onChange={(_dates, dateStr) => {
                            setFormData((prev) => ({ ...prev, hire_date: dateStr }));
                        }}
                    />
                </div>
                <div className="col-span-1 flex items-center">
                    <Label>Status</Label>
                    <Switch
                        label="Active"
                        checked={formData.is_active}
                        onChange={(_event, checked) => {
                            setFormData((prev) => ({ ...prev, is_active: checked }));
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

export default EmployeeModal;
