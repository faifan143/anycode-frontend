import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { FC } from "react";

interface OpenShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface CloseShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalIncome: number;
}

export const OpenShiftModal: FC<OpenShiftModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
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
              <h2 className="text-xl font-bold text-white">فتح وردية جديدة</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <p className="text-gray-300 text-center">
                هل أنت متأكد من أنك تريد فتح وردية جديدة؟
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 bg-orange-500/90 hover:bg-orange-500 text-white py-2.5 rounded-lg transition-colors font-medium"
                >
                  فتح وردية
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-lg transition-colors font-medium"
                >
                  إلغاء
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const CloseShiftModal: FC<CloseShiftModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalIncome,
}) => {
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
              <h2 className="text-xl font-bold text-white">إغلاق الوردية</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">إجمالي الدخل</span>
                  <span className="text-orange-500 font-bold text-xl">
                    ${totalIncome}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle className="text-yellow-500" size={20} />
                <p className="text-yellow-500 text-sm">
                  سيتم إغلاق الوردية وحفظ جميع المعاملات. لا يمكن التراجع عن هذا
                  الإجراء.
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 bg-red-500/90 hover:bg-red-500 text-white py-2.5 rounded-lg transition-colors font-medium"
                >
                  إغلاق الوردية
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-lg transition-colors font-medium"
                >
                  إلغاء
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
