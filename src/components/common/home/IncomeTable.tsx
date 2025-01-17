import { Income } from "@/types/home.type";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

interface TableProps {
  data: Income[];
  category: string;
  onAddIncome: () => void;
}

export const IncomeTable = ({ data, onAddIncome }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total amount
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((curr) => curr + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((curr) => curr - 1);
    }
  };

  return (
    <div
      className="bg-gray-900/90 rounded-xl border border-gray-800 overflow-hidden"
      dir="rtl"
    >
      {/* Header with Total */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-6">
          <h2 className="text-white font-bold">سجل الدخل</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">المجموع:</span>
            <span className="text-orange-500 font-bold">${totalAmount}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddIncome}
          className="bg-orange-500/90 hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          <span>إضافة دخل</span>
        </motion.button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-right text-gray-400">التاريخ</th>
              <th className="px-4 py-3 text-right text-gray-400">الوصف</th>
              <th className="px-4 py-3 text-right text-gray-400">المبلغ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-4 py-3 text-gray-300">
                  {new Date(item.date).toLocaleDateString("ar")}
                </td>
                <td className="px-4 py-3 text-gray-300">{item.description}</td>
                <td className="px-4 py-3 text-orange-500 font-bold">
                  ${item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-800 flex items-center justify-between">
        <div className="text-gray-400 text-sm">
          عرض {startIndex + 1}-{Math.min(endIndex, data.length)} من{" "}
          {data.length}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight size={20} />
          </motion.button>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-white font-medium">{currentPage}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
