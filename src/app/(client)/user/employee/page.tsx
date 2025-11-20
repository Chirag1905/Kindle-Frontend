'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState, useEffect } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmployeeModal from "./_components/EmployeeModal";
import EmployeeType from "./_components/EmployeeType";
import { transformEmployeeData } from "./_components/EmployeeEnum";
import Profile from "@/app/(others-pages)/profile/employeeProfilePage";

// Sample data type definition moved before component
type ColumnType = {
  key: keyof EmployeeType;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
};

// Sample initial data
const initialData = [
  {
    srNo: 1,
    address: "123 MG Road, Bangalore, Karnataka",
    created_ts: "NOW()",
    date_of_birth: "1980-05-15",
    db_user: "admin",
    department: "Administration",
    designation: "Principal",
    email: "rekha.sharma@school1.edu.in",
    emergency_contact: "9876543210",
    employee_id: "EMP001",
    employee_type: "Teaching Staff",
    experience_years: 15,
    first_name: "Rekha",
    hire_date: "2010-06-01",
    is_active: false,
    last_name: "Sharma",
    phone: "9876543210",
    qualification: "M.Ed",
    salary: 75000.0,
    updated_ts: "NOW()",
    school_id: 1,
  },
  {
    srNo: 2,
    address: "45 Park Street, Kolkata, West Bengal",
    created_ts: "NOW()",
    date_of_birth: "1985-08-22",
    db_user: "admin",
    department: "Administration",
    designation: "Administrative Officer",
    email: "rajiv.das@school2.edu.in",
    emergency_contact: "9876512340",
    employee_id: "EMP002",
    employee_type: "Administrative",
    experience_years: 12,
    first_name: "Rajiv",
    hire_date: "2012-01-15",
    is_active: true,
    last_name: "Das",
    phone: "9876512340",
    qualification: "MBA",
    salary: 60000.0,
    updated_ts: "NOW()",
    school_id: 2,
  },
  {
    srNo: 3,
    address: "89 Sector 15, Chandigarh, Punjab",
    created_ts: "NOW()",
    date_of_birth: "1990-11-10",
    db_user: "admin",
    department: "Maintenance",
    designation: "Lab Assistant",
    email: "anita.singh@school3.edu.in",
    emergency_contact: "9876523450",
    employee_id: "EMP003",
    employee_type: "Lab Staff",
    experience_years: 7,
    first_name: "Anita",
    hire_date: "2017-04-23",
    is_active: true,
    last_name: "Singh",
    phone: "9876523450",
    qualification: "B.Sc",
    salary: 35000.0,
    updated_ts: "NOW()",
    school_id: 3,
  },
  {
    srNo: 4,
    address: "22 MG Road, Pune, Maharashtra",
    created_ts: "NOW()",
    date_of_birth: "1982-03-05",
    db_user: "admin",
    department: "Mathematics",
    designation: "Teacher",
    email: "vivek.patel@school4.edu.in",
    emergency_contact: "9876534560",
    employee_id: "EMP004",
    employee_type: "Teaching Staff",
    experience_years: 13,
    first_name: "Vivek",
    hire_date: "2011-09-01",
    is_active: false,
    last_name: "Patel",
    phone: "9876534560",
    qualification: "M.Sc",
    salary: 55000.0,
    updated_ts: "NOW()",
    school_id: 4,
  },
  {
    srNo: 5,
    address: "67 MG Road, Chennai, Tamil Nadu",
    created_ts: "NOW()",
    date_of_birth: "1978-12-19",
    db_user: "admin",
    department: "English",
    designation: "Teacher",
    email: "sarita.ram@school5.edu.in",
    emergency_contact: "9876545670",
    employee_id: "EMP005",
    employee_type: "Teaching Staff",
    experience_years: 18,
    first_name: "Sarita",
    hire_date: "2008-02-14",
    is_active: true,
    last_name: "Ram",
    phone: "9876545670",
    qualification: "M.A",
    salary: 58000.0,
    updated_ts: "NOW()",
    school_id: 5,
  },
  {
    srNo: 6,
    address: "12 Hill Road, Mumbai, Maharashtra",
    created_ts: "NOW()",
    date_of_birth: "1988-07-30",
    db_user: "admin",
    department: "Library",
    designation: "Librarian",
    email: "deepak.joshi@school1.edu.in",
    emergency_contact: "9876556780",
    employee_id: "EMP006",
    employee_type: "Library Staff",
    experience_years: 9,
    first_name: "Deepak",
    hire_date: "2014-05-20",
    is_active: true,
    last_name: "Joshi",
    phone: "9876556780",
    qualification: "MLIS",
    salary: 42000.0,
    updated_ts: "NOW()",
    school_id: 1,
  },
  {
    srNo: 7,
    address: "3 Park Avenue, Kolkata, West Bengal",
    created_ts: "NOW()",
    date_of_birth: "1992-02-28",
    db_user: "admin",
    department: "Chemistry",
    designation: "Teacher",
    email: "neha.bose@school2.edu.in",
    emergency_contact: "9876567890",
    employee_id: "EMP007",
    employee_type: "Teaching Staff",
    experience_years: 5,
    first_name: "Neha",
    hire_date: "2018-08-01",
    is_active: true,
    last_name: "Bose",
    phone: "9876567890",
    qualification: "M.Sc",
    salary: 48000.0,
    updated_ts: "NOW()",
    school_id: 2,
  },
  {
    srNo: 8,
    address: "45 Sector 10, Chandigarh, Punjab",
    created_ts: "NOW()",
    date_of_birth: "1985-09-15",
    db_user: "admin",
    department: "Student Affairs",
    designation: "Counselor",
    email: "manish.kumar@school3.edu.in",
    emergency_contact: "9876578901",
    employee_id: "EMP008",
    employee_type: "Counseling Staff",
    experience_years: 10,
    first_name: "Manish",
    hire_date: "2013-11-10",
    is_active: true,
    last_name: "Kumar",
    phone: "9876578901",
    qualification: "MA Psychology",
    salary: 40000.0,
    updated_ts: "NOW()",
    school_id: 3,
  },
  {
    srNo: 9,
    address: "99 MG Road, Pune, Maharashtra",
    created_ts: "NOW()",
    date_of_birth: "1979-04-02",
    db_user: "admin",
    department: "History",
    designation: "Teacher",
    email: "priya.desai@school4.edu.in",
    emergency_contact: "9876589012",
    employee_id: "EMP009",
    employee_type: "Teaching Staff",
    experience_years: 17,
    first_name: "Priya",
    hire_date: "2009-07-15",
    is_active: true,
    last_name: "Desai",
    phone: "9876589012",
    qualification: "M.A History",
    salary: 56000.0,
    updated_ts: "NOW()",
    school_id: 4,
  },
  {
    srNo: 10,
    address: "21 Anna Salai, Chennai, Tamil Nadu",
    created_ts: "NOW()",
    date_of_birth: "1983-06-25",
    db_user: "admin",
    department: "Administration",
    designation: "HR Manager",
    email: "rajesh.nair@school5.edu.in",
    emergency_contact: "9876590123",
    employee_id: "EMP010",
    employee_type: "Administrative",
    experience_years: 14,
    first_name: "Rajesh",
    hire_date: "2011-03-22",
    is_active: true,
    last_name: "Nair",
    phone: "9876590123",
    qualification: "MBA HR",
    salary: 65000.0,
    updated_ts: "NOW()",
    school_id: 5,
  }
];

export default function Employee() {
  const [data, setData] = useState(initialData);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EmployeeType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const transformedInitialData: EmployeeType[] = initialData.map(emp => transformEmployeeData(emp));
    setData(transformedInitialData);
  }, []);

  const columns: ColumnType[] = [
    {
      key: "srNo",
      label: "S.No",
      className: "w-16 min-w-[3rem] max-w-[4rem]",
      render: (value) => (
        <div className="truncate text-center">{value}</div>
      )
    },
    {
      key: "employee_id",
      label: "Employee ID",
      render: (value) => (
        <button
          onClick={() => setSelectedEmployeeId(value)}
          className="font-medium text-blue-600 hover:underline"
        >
          {value}
        </button>
      )
    },
    {
      key: "first_name",
      label: "Name",
      render: (value, row) => (
        <span className="font-medium">{value} {row.last_name}</span>
      )
    },
    {
      key: "designation",
      label: "Designation",
      render: (value, row) => (
        <span className="font-medium">{row.designation}</span>
      )
    },
    {
      key: "is_active",
      label: "Status",
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
          }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: EmployeeType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: EmployeeType) => {
    setData((prev) => prev.filter((item) => item.srNo !== row.srNo));
  };

  const handleModalSubmit = (formValues: Omit<EmployeeType, "srNo">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.srNo === editData.srNo
            ? transformEmployeeData({ ...item, ...formValues })
            : item
        )
      );
    } else {
      // Create new record
      const newEmployee = transformEmployeeData({
        srNo: data.length + 1,
        ...formValues
      });
      setData((prev) => [...prev, newEmployee]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Employee" />
      <div className="space-y-6">
        {selectedEmployeeId ? (
          <div>
            <button
              onClick={() => setSelectedEmployeeId(null)}
              className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to List
            </button>
            <Profile
              employeeData={data.find(emp => emp.employee_id === selectedEmployeeId) || null}
            />
          </div>
        ) : isOpen ? (
          <EmployeeModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <CustomTable
            title="Employee"
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
