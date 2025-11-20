'use client';
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import CustomPagination from "../pagination/CustomPagination";
import { PencilIcon, PlusIcon, TrashBinIcon } from "@/icons";
import { Skeleton } from "antd";

// Status Renderer Helper Function
export const renderStatus = (status: unknown): React.ReactNode => {
  const isActive = status === true || status === 'active' || status === 'Active' || status === 1;

  return (
    <span className={`inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive
      ? 'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500'
      : 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500'
      }`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

interface RowWithId {
  id: number;
}

interface TableColumn<T extends RowWithId> {
  key: keyof T;
  label: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T extends RowWithId> {
  title?: string;
  buttonName?: string;
  columns: TableColumn<T>[];
  data: T[];
  onAdd?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  initialRowsPerPage?: number;
  filter?: boolean;
  sorting?: boolean;
  enableSearch?: boolean;
  loading?: boolean;
}

export default function CustomTable<T extends RowWithId>({
  title = "Custom Table",
  buttonName = "Add New",
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  initialRowsPerPage = 10,
  filter = false,
  sorting = false,
  enableSearch = false,
  loading = false,
}: TableProps<T>) {
  // console.log("🚀 ~ CustomTable ~ data:", data)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / initialRowsPerPage));
  const [totalElements, setTotalElements] = useState(Math.ceil(data.length / initialRowsPerPage));
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate the number of columns for the "No data" row to span
  const hasActionsColumn = onEdit || onDelete;
  const totalColumns = columns.length + (hasActionsColumn ? 1 : 0);

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header */}
      <div className="flex flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title} Listing</h3>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {filter && (
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <svg className="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.29004 5.90393H17.7067" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.7075 14.0961H2.29085" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="" stroke="" stroke-width="1.5"></path><path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="" stroke="" stroke-width="1.5"></path></svg>
                Filter
              </button>
            </div>
          )}
          {enableSearch && (
            <form>
              <div className="relative">
                <button
                  type="button"
                  className="absolute -translate-y-1/2 left-4 top-1/2"
                >
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                    />
                  </svg>
                </button>
                <input
                  placeholder={`Search ${title}...`}
                  className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 xl:w-[300px]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </form>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <PlusIcon /> {buttonName}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">

        <Table>
          {/* Table Header */}
          <TableHeader className="text-center border-t border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  isHeader
                  className={`px-4 py-3 border border-gray-100 dark:border-white/[0.05] ${col.className || ''}`}
                >
                  <div className="flex items-center justify-center cursor-pointer">
                    <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                      {col.label}
                    </p>
                    {sorting && (
                      <button className="flex flex-col ml-2 gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" fill="none" className="text-gray-300 dark:text-gray-700"><path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" fill="none" className="text-gray-300 dark:text-gray-700 "><path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z"></path></svg></button>
                    )}
                  </div>
                </TableCell>
              ))}
              {hasActionsColumn && (
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 border border-gray-100 dark:border-white/[0.05]"
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableBody>
              {[...Array(rowsPerPage)].map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {[...Array(totalColumns)].map((_, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className="px-4 py-4 border border-gray-100 dark:border-white/[0.05]"
                    >
                      <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            // {/* Table Body */}
            <TableBody className="text-center divide-y divide-gray-100 dark:divide-white/[0.05]">
              {!data || data.length === 0 ? (
                <TableRow>
                  <TableCell
                    {...{ colSpan: totalColumns }} // Span across all columns
                    className="text-center py-10 dark:text-white"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>No data</title>
                        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fillRule="nonzero" stroke="#d9d9d9">
                            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p className="mt-4 text-gray-500 dark:text-gray-400">
                        No data available
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.map((col) => (
                      <TableCell key={String(col.key)} className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap">
                        {col.render ? col.render(row[col.key], row,) : (
                          // Auto-render status columns with color (exact match only)
                          String(col.key) === 'isActive' ?
                            renderStatus(row[col.key]) :
                            String(row[col.key])
                        )}
                      </TableCell>
                    ))}
                    {hasActionsColumn && (
                      <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          {onEdit && (
                            <button
                              className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                              onClick={() => onEdit(row?.id)}
                            >
                              <PencilIcon />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                              onClick={() => onDelete(row?.id)}
                            >
                              <TrashBinIcon />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Pagination */}
      {!loading && data?.length > 0 && (
        <CustomPagination
          page={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          rowsPerPage={rowsPerPage}
          handleChange={(newPage) => setCurrentPage(newPage)}
          handleChangeRowsPerPage={(rows) => { setRowsPerPage(rows); setCurrentPage(1); }}
        />
      )}
    </div>
  );
}