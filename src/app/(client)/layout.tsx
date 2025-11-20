"use client";

import { useSidebar } from "@/context/SidebarContext";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

import ClientProvider from "../ClientProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <ClientProvider>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <Sidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <Header />
          {/* Page Content */}
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
        </div>
      </div>
    </ClientProvider>
  );
}
