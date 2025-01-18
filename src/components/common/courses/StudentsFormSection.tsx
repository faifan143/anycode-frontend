/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/courses/StudentFormSection.tsx
import { FC } from "react";
import { Plus, Trash2 } from "lucide-react";
import CustomSelect from "@/components/common/ui/CustomSelects";
import { StudentFormData } from "@/types/courses.type";

interface StudentFormSectionProps {
  students: StudentFormData[];
  onAddStudent: () => void;
  onRemoveStudent: (index: number) => void;
  onUpdateStudent: (
    index: number,
    field: keyof StudentFormData,
    value: any
  ) => void;
}

export const StudentFormSection: FC<StudentFormSectionProps> = ({
  students,
  onAddStudent,
  onRemoveStudent,
  onUpdateStudent,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">الطلاب المسجلين</h3>
        <button
          type="button"
          onClick={onAddStudent}
          className="px-3 py-1.5 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          إضافة طالب
        </button>
      </div>

      <div className="space-y-4">
        {students.map((student, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">طالب {index + 1}</span>
              <button
                type="button"
                onClick={() => onRemoveStudent(index)}
                className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  اسم الطالب
                </label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) =>
                    onUpdateStudent(index, "name", e.target.value)
                  }
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={student.phone}
                  onChange={(e) =>
                    onUpdateStudent(index, "phone", e.target.value)
                  }
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                  required
                />
              </div>

              {/* Payment Status */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  حالة الدفع
                </label>
                <CustomSelect
                  value={student.paymentStatus}
                  onChange={(e) =>
                    onUpdateStudent(index, "paymentStatus", e.target.value)
                  }
                  options={[
                    { id: "paid", label: "مدفوع" },
                    { id: "partial", label: "مدفوع جزئياً" },
                    { id: "pending", label: "غير مدفوع" },
                  ]}
                  placeholder="اختر حالة الدفع"
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  المبلغ المدفوع ($)
                </label>
                <input
                  type="number"
                  value={student.amount}
                  onChange={(e) =>
                    onUpdateStudent(index, "amount", Number(e.target.value))
                  }
                  min="0"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
