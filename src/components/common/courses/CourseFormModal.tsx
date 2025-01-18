/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/courses/CourseFormModal.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Course,
  Teacher,
  CourseFormData,
  StudentFormData,
} from "@/types/courses.type";
import CustomSelect from "@/components/common/ui/CustomSelects";
import { StudentFormSection } from "./StudentsFormSection";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: CourseFormData) => void;
  course?: Course | null;
  teachers: Teacher[];
}

export const CourseFormModal: FC<CourseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  course,
  teachers,
}) => {
  const initialFormState: CourseFormData = {
    name: "",
    description: "",
    teacherId: "",
    startDate: "",
    endDate: "",
    schedule: "",
    price: 0,
    maxStudents: 20,
    status: "upcoming",
    students: [],
  };

  const [formData, setFormData] = useState<CourseFormData>(initialFormState);

  useEffect(() => {
    if (course) {
      setFormData({
        id: course.id,
        name: course.name,
        description: course.description,
        teacherId: course.teacher.id,
        startDate: course.startDate,
        endDate: course.endDate,
        schedule: course.schedule,
        price: course.price,
        maxStudents: course.maxStudents,
        status: course.status,
        students: course.students.map((student) => ({
          ...student,
        })),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const updateField = (field: keyof CourseFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddStudent = () => {
    const newStudent: StudentFormData = {
      name: "",
      phone: "",
      paymentStatus: "pending",
      amount: 0,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setFormData((prev) => ({
      ...prev,
      students: [...prev.students, newStudent],
    }));
  };

  const handleRemoveStudent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateStudent = (
    index: number,
    field: keyof StudentFormData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.map((student, i) =>
        i === index ? { ...student, [field]: value } : student
      ),
    }));
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
            className="relative bg-gray-900/90 w-full max-w-3xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">
                  {course ? "تعديل الدورة" : "إضافة دورة جديدة"}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-4 space-y-6">
                {/* Course Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    اسم الدورة
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    وصف الدورة
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={3}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    required
                  />
                </div>

                {/* Teacher */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    المدرس
                  </label>
                  <CustomSelect
                    value={formData.teacherId}
                    onChange={(e) => updateField("teacherId", e.target.value)}
                    options={teachers.map((teacher) => ({
                      id: teacher.id,
                      label: teacher.name,
                    }))}
                    placeholder="اختر المدرس"
                    required
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      تاريخ البدء
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateField("startDate", e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => updateField("endDate", e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                </div>

                {/* Schedule and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      مواعيد الدورة
                    </label>
                    <input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => updateField("schedule", e.target.value)}
                      placeholder="مثال: السبت والاثنين 6-8 مساءً"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      سعر الدورة ($)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        updateField("price", Number(e.target.value))
                      }
                      min="0"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                </div>

                {/* Max Students and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      الحد الأقصى للطلاب
                    </label>
                    <input
                      type="number"
                      value={formData.maxStudents}
                      onChange={(e) =>
                        updateField("maxStudents", Number(e.target.value))
                      }
                      min="1"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      حالة الدورة
                    </label>
                    <CustomSelect
                      value={formData.status}
                      onChange={(e) => updateField("status", e.target.value)}
                      options={[
                        { id: "upcoming", label: "قادمة" },
                        { id: "ongoing", label: "جارية" },
                        { id: "completed", label: "منتهية" },
                      ]}
                      placeholder="اختر الحالة"
                      required
                    />
                  </div>
                </div>

                {/* Students Section */}
                <div className="pt-4 border-t border-gray-800">
                  <StudentFormSection
                    students={formData.students || []}
                    onAddStudent={handleAddStudent}
                    onRemoveStudent={handleRemoveStudent}
                    onUpdateStudent={handleUpdateStudent}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-800 flex justify-end gap-3 sticky bottom-0 bg-gray-900/90 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors"
                >
                  {course ? "حفظ التغييرات" : "إضافة الدورة"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
