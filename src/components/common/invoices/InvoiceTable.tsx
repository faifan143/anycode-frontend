// components/common/invoices/InvoiceTable.tsx
import { Invoice } from "@/types/invoice.type";
import { FC } from "react";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export const InvoiceTable: FC<InvoiceTableProps> = ({ invoices }) => (
  <div className="bg-gray-900/90 rounded-xl border border-gray-800 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-800/50">
          <tr>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              رقم الفاتورة
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              التاريخ
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              النوع
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              التصنيف
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              الوصف
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              المبلغ
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-800/30">
              <td className="px-4 py-3 text-sm text-white">{invoice.id}</td>
              <td className="px-4 py-3 text-sm text-white">
                {new Date(invoice.date).toLocaleDateString("ar")}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.type === "income"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {invoice.type === "income" ? "دخل" : "مصروفات"}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-white">
                {invoice.category}
              </td>
              <td className="px-4 py-3 text-sm text-white">
                {invoice.description}
              </td>
              <td className="px-4 py-3 text-sm font-medium">
                <span
                  className={
                    invoice.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  ${invoice.amount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
