// components/common/invoices/InvoicePagination.tsx

import { FC } from "react";

interface InvoicePaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const InvoicePagination: FC<InvoicePaginationProps> = ({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
}) => (
  <div className="flex justify-between items-center">
    <div className="text-sm text-gray-400">
      عرض {(page - 1) * pageSize + 1} إلى{" "}
      {Math.min(page * pageSize, totalItems)} من {totalItems} فاتورة
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  </div>
);
