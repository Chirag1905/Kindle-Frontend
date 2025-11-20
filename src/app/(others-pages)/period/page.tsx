import PeriodCalendar from "@/components/period/PeriodCalendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Period Calendar | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Period Calendar page for TailAdmin Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Period Calendar" />
      <PeriodCalendar />
    </div>
  );
}