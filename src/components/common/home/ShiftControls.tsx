// components/ShiftControls.tsx

import { Shift } from "@/types/home.type";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";

interface ShiftControlsProps {
  currentShift: Shift | null;
  onOpenShift: () => void;
  onCloseShift: () => void;
}

export const ShiftControls = ({
  currentShift,
  onOpenShift,
  onCloseShift,
}: ShiftControlsProps) => {
  return (
    <div className="flex justify-between items-center bg-gray-900/90 p-4 rounded-xl border border-gray-800">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={currentShift ? onCloseShift : onOpenShift}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          currentShift
            ? "bg-red-500/90 hover:bg-red-500 text-white"
            : "bg-orange-500/90 hover:bg-orange-500 text-white"
        }`}
      >
        {currentShift ? (
          <>
            <Square size={18} />
            <span>إغلاق الوردية</span>
          </>
        ) : (
          <>
            <Play size={18} />
            <span>فتح وردية</span>
          </>
        )}
      </motion.button>{" "}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">الوردية الحالية</span>
          <span className="text-white font-bold">
            {currentShift ? "مفتوحة" : "مغلقة"}
          </span>
        </div>
        {currentShift && (
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">الدخل الإجمالي</span>
            <span className="text-orange-500 font-bold">
              ${currentShift.totalIncome}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
