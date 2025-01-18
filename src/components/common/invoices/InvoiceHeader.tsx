// components/common/invoices/InvoiceHeader.tsx
import { FC } from "react";

interface InvoiceHeaderProps {
  totalItems: number;
}

export const InvoiceHeader: FC<InvoiceHeaderProps> = ({ totalItems }) => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold text-white">الفواتير</h1>
    <div className="text-gray-400 text-sm">إجمالي الفواتير: {totalItems}</div>
  </div>
);
