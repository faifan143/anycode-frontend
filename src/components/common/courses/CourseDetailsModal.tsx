// components/common/courses/CourseDetailsModal.tsx
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import { Course } from "@/types/courses.type";

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseDetailsModal: FC<CourseDetailsModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  if (!course) return null;

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
            className="relative bg-gray-900/90 w-full max-w-3xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] no-scrollbar overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white">{course.name}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>
                      تاريخ البدء:{" "}
                      {new Date(course.startDate).toLocaleDateString("ar")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>
                      تاريخ الانتهاء:{" "}
                      {new Date(course.endDate).toLocaleDateString("ar")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    <span>المواعيد: {course.schedule}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} />
                    <span>
                      عدد الطلاب: {course.totalStudents}/{course.maxStudents}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign size={16} />
                    <span>السعر: ${course.price}</span>
                  </div>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <GraduationCap size={20} />
                  معلومات المدرس
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-white">{course.teacher.name}</p>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone size={16} />
                      <span>{course.teacher.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail size={16} />
                      <span>{course.teacher.email}</span>
                    </div>
                    <p className="text-gray-400">
                      {course.teacher.specialization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Students List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users size={20} />
                  قائمة الطلاب
                </h3>
                <div className="overflow-hidden rounded-lg border border-gray-800">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          الاسم
                        </th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          رقم الهاتف
                        </th>

                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          حالة الدفع
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {course.students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-800/30">
                          <td className="px-4 py-2 text-sm text-white">
                            {student.name}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-400">
                            {student.phone}
                          </td>

                          <td className="px-4 py-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                student.paymentStatus === "paid"
                                  ? "bg-green-500/10 text-green-500"
                                  : student.paymentStatus === "pending"
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                              }`}
                            >
                              {student.paymentStatus === "paid"
                                ? "مدفوع"
                                : student.paymentStatus === "pending"
                                ? "غير مدفوع"
                                : "مدفوع جزئياً"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
