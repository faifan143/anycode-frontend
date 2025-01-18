"use client";
import { useEffect, useState } from "react";
import { getFilteredInvoices } from "@/data/mock-data";
import { ExpenseCategory, InvoiceType } from "@/types/invoice.type";
import { InvoiceHeader } from "@/components/common/invoices/InvoiceHeader";
import { InvoiceFilters } from "@/components/common/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/common/invoices/InvoiceTable";
import { InvoicePagination } from "@/components/common/invoices/InvoicePagination";

const Invoices = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState({
    type: "" as InvoiceType | "",
    category: "" as ExpenseCategory | string,
    search: "",
    startDate: "",
    endDate: "",
  });
  const [invoicesData, setInvoicesData] = useState({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });

  useEffect(() => {
    const data = getFilteredInvoices(page, pageSize, filters);
    setInvoicesData(data);
  }, [page, pageSize, filters]);

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <InvoiceHeader totalItems={invoicesData.totalItems} />

      <InvoiceFilters filters={filters} onFilterChange={setFilters} />

      <InvoiceTable invoices={invoicesData.items} />

      <InvoicePagination
        page={page}
        pageSize={pageSize}
        totalItems={invoicesData.totalItems}
        totalPages={invoicesData.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Invoices;
