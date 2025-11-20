"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import DatePicker from "@/components/form/date-picker";
import { DepartmentEnum, DesignationEnum, EmploymentEnum } from "./EmployeeEnum";
import EmployeeType from "./EmployeeType";

const employeeDefaultValues: EmployeeType = {
    srNo: 0,
    address: "",
    created_ts: "",
    date_of_birth: "",
    db_user: "",
    department: DepartmentEnum.DEFAULT,
    designation: DesignationEnum.DEFAULT,
    email: "",
    emergency_contact: "",
    employee_id: "",
    employee_type: EmploymentEnum.DEFAULT,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: EmployeeType) => ({ ...prev, [name]: value }));
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
                        defaultValue={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        defaultValue={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Phone</Label>
                    <div className="flex gap-3">
                        <select
                            name="phone_code"
                            className="w-24 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900"
                        >
                            <option value="+91">+91</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                            <option value="+86">+86</option>
                            <option value="+81">+81</option>
                        </select>
                        <Input
                            type="tel"
                            name="phone"
                            className="w-full"
                            defaultValue={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <Label>Address</Label>
                    <Input
                        type="text"
                        name="address"
                        placeholder="Address"
                        defaultValue={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Employee Type</Label>
                    <select
                        name="employee_type"
                        value={formData.employee_type}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        onChange={handleChange}
                    >
                        {Object.values(EmploymentEnum).map((employee) => (
                            <option
                                key={employee}
                                value={employee}
                                className={`${employee === EmploymentEnum.DEFAULT ? 'text-gray-400' : ''}`}
                            >{employee}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-1">
                    <Label>Department</Label>
                    <select
                        name="department"
                        value={formData.department}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        onChange={handleChange}
                    >
                        {Object.values(DepartmentEnum).map((department) => (
                            <option
                                key={department}
                                value={department}
                                className={`${department === DepartmentEnum.DEFAULT ? 'text-gray-400' : ''}`}
                            >{department}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-1">
                    <Label>Designation</Label>
                    <select
                        name="designation"
                        value={formData.designation}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        onChange={handleChange}
                    >
                        {Object.values(DesignationEnum).map((designation) => (
                            <option
                                key={designation}
                                value={designation}
                                className={`${designation === DesignationEnum.DEFAULT ? 'text-gray-400' : ''}`}
                            >{designation}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-1">
                    <Label>Qualification</Label>
                    <Input
                        type="text"
                        name="qualification"
                        placeholder="Qualification"
                        defaultValue={formData.qualification}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Salary</Label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        placeholder="Enter salary"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Experience Years</Label>
                    <input
                        type="number"
                        name="experience_years"
                        value={formData.experience_years}
                        placeholder="Enter years"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Date of Birth</Label>
                    <DatePicker
                        id="date-of-birth"
                        placeholder="Select date of birth"
                        defaultDate={formData.date_of_birth}
                        onChange={(_dates, dateStr) => {
                            setFormData((prev: EmployeeType) => ({ ...prev, date_of_birth: dateStr }));
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Hire Date</Label>
                    <DatePicker
                        id="hire-date"
                        placeholder="Select hire date"
                        defaultDate={formData.hire_date}
                        onChange={(_dates, dateStr) => {
                            setFormData((prev: EmployeeType) => ({ ...prev, hire_date: dateStr }));
                        }}
                    />
                </div>
                <div className="col-span-1 flex items-center">
                    <Label>Status</Label>
                    <Switch
                        label="Active"
                        defaultChecked={formData.is_active}
                        onChange={(checked) => {
                            setFormData((prev: EmployeeType) => ({ ...prev, is_active: checked }));
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
