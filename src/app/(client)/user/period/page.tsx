import PeriodCalendar from "@/components/period/PeriodCalendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Period Calendar | EduRelic ERP",
  description:
    "Manage and view period schedules with an interactive calendar interface",
};

export default function PeriodPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Period Calendar" />
      <PeriodCalendar />
    </div>
  );
}