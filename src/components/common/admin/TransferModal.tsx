// components/admin/TransferModal.tsx
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Fund } from "@/types/admin.type";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transfer: { amount: number; description: string }) => void;
  companyFund: Fund;
  additionalFund: Fund;
}

export const TransferModal: FC<TransferModalProps> = ({
  isOpen,
  onClose,
  companyFund,
  additionalFund,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form handling logic
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed -inset-8 z-50 flex items-center justify-center p-4"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-8 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-gray-900/90 w-full max-w-lg rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] no-scrollbar"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">
                  تحويل إلى صندوق المصروفات
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Current Balances */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400">صندوق الشركة</div>
                    <div className="text-lg font-medium text-white">
                      ${companyFund.balance.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400">صندوق المصروفات</div>
                    <div className="text-lg font-medium text-white">
                      ${additionalFund.balance.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    مبلغ التحويل
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                    placeholder="أدخل المبلغ"
                    max={companyFund.balance}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    سبب التحويل
                  </label>
                  <textarea
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                    placeholder="أدخل سبب التحويل"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500/90 text-white rounded-lg hover:bg-orange-500"
                >
                  تحويل
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
