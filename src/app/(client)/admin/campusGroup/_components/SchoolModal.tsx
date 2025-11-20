"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import { SchoolType } from "./SchoolType";

let schoolDefaultValues: SchoolType = {
    id: 0,
    name: "",
    affiliationNumber: "",
    beginningYear: new Date().getFullYear(),
    website: "",
    emailDomain: "",
    founder: "",
    principal: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isActive: true,
    createdTs: "",
    updatedTs: "",
    dbUser: "system",
};

interface SchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SchoolType) => void;
    initialData?: SchoolType | null;
}

const SchoolModal: React.FC<SchoolModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<SchoolType>(schoolDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(schoolDefaultValues);
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
                {initialData ? "Edit School" : "Create School"}
            </h4>

            <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-1">
                    <Label>School Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="School Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Affiliation Number</Label>
                    <Input
                        type="text"
                        name="affiliationNumber"
                        placeholder="Affiliation Number"
                        value={formData.affiliationNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Beginning Year</Label>
                    <Input
                        type="number"
                        name="beginningYear"
                        placeholder="Beginning Year"
                        value={formData.beginningYear}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Website</Label>
                    <Input
                        type="text"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Email Domain</Label>
                    <Input
                        type="text"
                        name="emailDomain"
                        placeholder="Email Domain"
                        value={formData.emailDomain}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Founder</Label>
                    <Input
                        type="text"
                        name="founder"
                        placeholder="Founder"
                        value={formData.founder}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Principal</Label>
                    <Input
                        type="text"
                        name="principal"
                        placeholder="Principal"
                        value={formData.principal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Contact Phone</Label>
                    <Input
                        type="text"
                        name="contactPhone"
                        placeholder="Contact Phone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Contact Email</Label>
                    <Input
                        type="email"
                        name="contactEmail"
                        placeholder="Contact Email"
                        value={formData.contactEmail}
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
                    <Label>City</Label>
                    <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>State</Label>
                    <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Postal Code</Label>
                    <Input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Country</Label>
                    <Input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1 flex items-center">
                    <Label>Status</Label>
                    <Switch
                        label="Active"
                        checked={formData.isActive}
                        onChange={(_event, checked) => {
                            setFormData((prev) => ({ ...prev, isActive: checked }));
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

export default SchoolModal;
