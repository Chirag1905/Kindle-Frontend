'use client';
import UserProfCard from "@/components/employee-profile/UserProfCard";
import UserInfoCard from "@/components/employee-profile/UserInfoCard";
import UserMetaCard from "@/components/employee-profile/UserMetaCard";
import React from "react";
import EmployeeType from "@/app/(client)/admin/employee/_components/EmployeeType";

interface ProfileProps {
  employeeData: EmployeeType | null;
}

export default function Profile({ employeeData }: ProfileProps) {
  if (!employeeData) {
    return <div>No employee data available</div>;
  }

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Employee Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard
            firstName={employeeData.first_name}
            lastName={employeeData.last_name}
            employeeId={employeeData.employee_id}
            isActive={employeeData.is_active}
            department={employeeData.department}
            role={employeeData.designation}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserInfoCard
              email={employeeData.email}
              phone={employeeData.phone}
              emergencyContact={employeeData.emergency_contact}
              dateOfBirth={employeeData.date_of_birth}
              address={employeeData.address}
              qualification={employeeData.qualification}
              updatedTs={employeeData.updated_ts}
            />
            <UserProfCard
              department={employeeData.department}
              designation={employeeData.designation}
              employmentType={employeeData.employee_type}
              hireDate={employeeData.hire_date}
              experienceYears={employeeData.experience_years}
              salary={employeeData.salary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
