import { AngleDownIcon, AngleUpIcon, ArrowRightIcon } from "@/icons";
import React, { useEffect, useRef, useState } from "react";

type CustomPaginationProps = {
  page: number; // current page (1-based index)
  totalPages: number; // total number of pages
  totalElements: number; // total number of records
  rowsPerPage: number; // records per page
  handleChange: (page: number) => void; // when user changes page
  handleChangeRowsPerPage: (rows: number) => void; // when user changes rows per page
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  totalPages,
  totalElements,
  rowsPerPage,
  handleChange,
  handleChangeRowsPerPage,
}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rowsOptions = [10, 25, 50, 100];

  // Generate page numbers dynamically
  const getPageNumbers = () => {
    const pages: number[] = [];
    const delta = 1; // how many pages to show around the current page

    // Always include the first page
    pages.push(1);

    // Calculate range around current page
    for (let i = page - delta; i <= page + delta; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)].sort((a, b) => a - b); // remove duplicates and sort
  };

  const pageNumbers = getPageNumbers();

  // Calculate current item range
  const startItem = totalElements === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, totalElements);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Rows per page selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-15"
            >
              {rowsPerPage}
              <span className="text-gray-500">
                {isDropdownOpen === true ? <AngleUpIcon /> : <AngleDownIcon />}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-15 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 rounded-lg z-10">
                <ul className="max-h-40 overflow-auto">
                  {rowsOptions
                    .filter((size) => size !== rowsPerPage)
                    .map((size) => (
                      <li
                        key={size}
                        onClick={() => {
                          handleChangeRowsPerPage(size);
                          setIsDropdownOpen(false);
                        }}
                        className={`rounded-lg px-3 py-2 cursor-pointer text-sm border-b border-gray-300 dark:border-gray-700 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-700 ${rowsPerPage === size
                          ? "bg-gray-100 dark:bg-gray-700 font-medium"
                          : ""
                          }`}
                      >
                        {size}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Total Elements Info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-medium">{startItem}</span> -{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalElements}</span>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3">
          {/* Previous Button */}
          <button
            onClick={() => handleChange(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-2 py-2 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 disabled:opacity-50"
          >
            <span className="rotate-180">
              <ArrowRightIcon />
            </span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {pageNumbers.map((pg, index) => {
              const prevPage = pageNumbers[index - 1];
              const isCurrent = pg === page;

              // Add dots if there's a gap between numbers
              if (prevPage && pg - prevPage > 1) {
                return (
                  <React.Fragment key={`dots-${index}`}>
                    <span className="px-2">...</span>
                    <button
                      onClick={() => handleChange(pg)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition
                                ${isCurrent
                          ? "bg-brand-500 text-white"
                          : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                      {pg}
                    </button>
                  </React.Fragment>
                );
              }

              // Regular page button
              return (
                <button
                  key={pg}
                  onClick={() => handleChange(pg)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition
                            ${isCurrent
                      ? "bg-brand-500 text-white"
                      : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  {pg}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handleChange(page + 1)}
            disabled={page === totalPages}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            <span>
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
