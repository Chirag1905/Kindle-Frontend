import React, { ReactNode } from "react";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

type BaseProps = {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLTableCellElement>; // <-- allows colSpan, rowSpan, style, etc.

// Props for TableCell
// interface TableCellProps {
//   children: ReactNode; // Cell content
//   isHeader?: boolean; // If true, renders as <th>, otherwise <td>
//   className?: string; // Optional className for styling
// }

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

const TableCell: React.FC<BaseProps> = ({ children, isHeader = false, className, ...rest }) => {
  if (isHeader) {
    // cast rest to proper th attrs
    return <th className={className} {...(rest as React.ThHTMLAttributes<HTMLTableCellElement>)}>{children}</th>;
  }
  return <td className={className} {...(rest as React.TdHTMLAttributes<HTMLTableCellElement>)}>{children}</td>;
};

// TableCell Component
// const TableCell: React.FC<TableCellProps> = ({
//   children,
//   isHeader = false,
//   className,
// }) => {
//   const CellTag = isHeader ? "th" : "td";
//   return <CellTag className={` ${className}`}>{children}</CellTag>;
// };

export { Table, TableHeader, TableBody, TableRow, TableCell };
