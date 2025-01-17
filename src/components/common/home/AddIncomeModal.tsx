// components/common/home/AddIncomeModal.tsx
import { categoryOptions } from "@/data/mock-data";
import { fundCategories } from "@/types/home.type";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import CustomSelect from "../ui/CustomSelects";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    category: fundCategories;
    amount: number;
    description: string;
  }) => void;
  activeCategory: fundCategories;
}

export const AddIncomeModal: FC<AddIncomeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  activeCategory,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category: activeCategory,
      amount: Number(amount),
      description: `${
        categoryOptions[activeCategory].find((opt) => opt.id === selectedOption)
          ?.label
      } - ${description}`,
    });
    setAmount("");
    setDescription("");
    setSelectedOption("");
    onClose();
  };

  useEffect(() => {
    setSelectedOption("");
  }, [activeCategory]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed -inset-8 z-50 flex items-center justify-center p-4"
          dir="rtl"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-8 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-gray-900/90 w-full max-w-md rounded-xl border border-gray-800 shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">إضافة دخل جديد</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Category Select */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  {activeCategory === "course" && "نوع الدورة"}
                  {activeCategory === "fyp" && "نوع مشروع التخرج"}
                  {activeCategory === "project" && "نوع المشروع"}
                  {activeCategory === "contract" && "نوع العقد"}
                </label>
                <CustomSelect
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  options={categoryOptions[activeCategory]}
                  placeholder={
                    activeCategory === "course"
                      ? "اختر الدورة"
                      : activeCategory === "fyp"
                      ? "اختر نوع مشروع التخرج"
                      : activeCategory === "project"
                      ? "اختر نوع المشروع"
                      : "اختر نوع العقد"
                  }
                  required
                />
              </div>
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  المبلغ
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                  required
                />
              </div>
              {/* Description Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  الوصف
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="أدخل وصفاً"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 resize-none h-24"
                  required
                />
              </div>
              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-orange-500/90 hover:bg-orange-500 text-white py-2.5 rounded-lg transition-colors font-medium"
              >
                إضافة الدخل
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
