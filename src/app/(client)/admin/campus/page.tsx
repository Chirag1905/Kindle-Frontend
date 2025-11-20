'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmpoyeeModal from "./_components/SchoolModal";
import { SchoolType } from "./_components/SchoolType";

const initialData: SchoolType[] = [
  {
    id: 1,
    name: "Green Valley Public School",
    affiliationNumber: "AFF12345",
    beginningYear: 2005,
    website: "https://greenvalley.edu",
    emailDomain: "greenvalley.edu",
    founder: "Mr. Sharma",
    principal: "Mrs. Mehta",
    contactPhone: "9876543210",
    contactEmail: "info@greenvalley.edu",
    address: "123 Main Street, Green Valley",
    city: "Jaipur",
    state: "Rajasthan",
    postalCode: "302001",
    country: "India",
    isActive: true,
    createdTs: "2025-01-01T10:00:00Z",
    updatedTs: "2025-01-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 2,
    name: "Sunrise Academy",
    affiliationNumber: "AFF23456",
    beginningYear: 2010,
    website: "https://sunriseacademy.edu",
    emailDomain: "sunriseacademy.edu",
    founder: "Mrs. Kapoor",
    principal: "Mr. Rathi",
    contactPhone: "9876501234",
    contactEmail: "info@sunriseacademy.edu",
    address: "456 Sunrise Road",
    city: "Delhi",
    state: "Delhi",
    postalCode: "110001",
    country: "India",
    isActive: true,
    createdTs: "2025-02-01T10:00:00Z",
    updatedTs: "2025-02-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 3,
    name: "Bluebird International School",
    affiliationNumber: "AFF34567",
    beginningYear: 2000,
    website: "https://bluebird.edu",
    emailDomain: "bluebird.edu",
    founder: "Mr. Verma",
    principal: "Mrs. Joshi",
    contactPhone: "9876512345",
    contactEmail: "info@bluebird.edu",
    address: "789 Bluebird Avenue",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
    isActive: false,
    createdTs: "2025-03-01T10:00:00Z",
    updatedTs: "2025-03-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 4,
    name: "Lotus Valley School",
    affiliationNumber: "AFF45678",
    beginningYear: 1995,
    website: "https://lotusvalley.edu",
    emailDomain: "lotusvalley.edu",
    founder: "Dr. Bansal",
    principal: "Mr. Nair",
    contactPhone: "9876523456",
    contactEmail: "info@lotusvalley.edu",
    address: "12 Lotus Street",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560001",
    country: "India",
    isActive: true,
    createdTs: "2025-04-01T10:00:00Z",
    updatedTs: "2025-04-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 5,
    name: "Springfield Public School",
    affiliationNumber: "AFF56789",
    beginningYear: 2012,
    website: "https://springfield.edu",
    emailDomain: "springfield.edu",
    founder: "Mr. Desai",
    principal: "Mrs. Rao",
    contactPhone: "9876534567",
    contactEmail: "info@springfield.edu",
    address: "34 Springfield Road",
    city: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600001",
    country: "India",
    isActive: true,
    createdTs: "2025-05-01T10:00:00Z",
    updatedTs: "2025-05-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 6,
    name: "Silver Oaks School",
    affiliationNumber: "AFF67890",
    beginningYear: 2008,
    website: "https://silveroaks.edu",
    emailDomain: "silveroaks.edu",
    founder: "Mrs. Malhotra",
    principal: "Mr. Dutta",
    contactPhone: "9876545678",
    contactEmail: "info@silveroaks.edu",
    address: "56 Oak Lane",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500001",
    country: "India",
    isActive: false,
    createdTs: "2025-06-01T10:00:00Z",
    updatedTs: "2025-06-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 7,
    name: "Riverdale High School",
    affiliationNumber: "AFF78901",
    beginningYear: 2018,
    website: "https://riverdale.edu",
    emailDomain: "riverdale.edu",
    founder: "Mr. Khanna",
    principal: "Mrs. Jain",
    contactPhone: "9876556789",
    contactEmail: "info@riverdale.edu",
    address: "78 River Street",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411001",
    country: "India",
    isActive: true,
    createdTs: "2025-07-01T10:00:00Z",
    updatedTs: "2025-07-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 8,
    name: "Starlight Convent School",
    affiliationNumber: "AFF89012",
    beginningYear: 1998,
    website: "https://starlight.edu",
    emailDomain: "starlight.edu",
    founder: "Sister Maria",
    principal: "Mr. Fernandes",
    contactPhone: "9876567890",
    contactEmail: "info@starlight.edu",
    address: "90 Star Lane",
    city: "Kolkata",
    state: "West Bengal",
    postalCode: "700001",
    country: "India",
    isActive: true,
    createdTs: "2025-08-01T10:00:00Z",
    updatedTs: "2025-08-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 9,
    name: "Evergreen Public School",
    affiliationNumber: "AFF90123",
    beginningYear: 2011,
    website: "https://evergreen.edu",
    emailDomain: "evergreen.edu",
    founder: "Mr. Gupta",
    principal: "Mrs. Singh",
    contactPhone: "9876578901",
    contactEmail: "info@evergreen.edu",
    address: "102 Evergreen Road",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "380001",
    country: "India",
    isActive: true,
    createdTs: "2025-09-01T10:00:00Z",
    updatedTs: "2025-09-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 10,
    name: "Harmony International School",
    affiliationNumber: "AFF01234",
    beginningYear: 2003,
    website: "https://harmony.edu",
    emailDomain: "harmony.edu",
    founder: "Dr. Patel",
    principal: "Mr. Choudhary",
    contactPhone: "9876589012",
    contactEmail: "info@harmony.edu",
    address: "150 Harmony Lane",
    city: "Lucknow",
    state: "Uttar Pradesh",
    postalCode: "226001",
    country: "India",
    isActive: false,
    createdTs: "2025-10-01T10:00:00Z",
    updatedTs: "2025-10-15T10:00:00Z",
    dbUser: "system",
  },
];

const columns: { key: keyof SchoolType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "School Name" },
  { key: "affiliationNumber", label: "Affiliation No." },
  { key: "beginningYear", label: "Established" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "contactPhone", label: "Phone" },
  { key: "isActive", label: "Status" },
];

export default function School() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<SchoolType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: SchoolType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: SchoolType) => {
    setData((prev) => prev.filter((item) => item.srNo !== row.srNo));
  };

  const handleModalSubmit = (formValues: Omit<SchoolType, "srNo">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.srNo === editData.srNo ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      setData((prev) => [
        ...prev,
        { srNo: prev.length + 1, ...formValues },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="School" />
      <div className="space-y-6">
        {isOpen === true ? (
          <EmpoyeeModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <CustomTable
            title="School"
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
