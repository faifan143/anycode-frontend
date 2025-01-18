/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/fyp/FYPFormModal.tsx
import CustomSelect from "@/components/common/ui/CustomSelects";
import {
  FinalYearProject,
  FYPFormData,
  JuryMember,
  mockTechnologies,
  Programmer,
  StudentFormData,
} from "@/types/fyp.type";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface FYPFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: FYPFormData) => void;
  project?: FinalYearProject | null;
  juryMembers: JuryMember[];
  programmers: Programmer[];
}

export const FYPFormModal: FC<FYPFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  project,
  juryMembers,
  programmers,
}) => {
  const initialFormState: FYPFormData = {
    title: "",
    description: "",
    students: [],
    juryMembers: [],
    programmers: [],
    startDate: "",
    endDate: "",
    status: "pending",
    price: 0,
    paymentStatus: "pending",
    amountPaid: 0,
    requirements: "",
    technologies: [],
    presentationDate: "",
  };

  const [formData, setFormData] = useState<FYPFormData>(initialFormState);

  useEffect(() => {
    if (project) {
      // Convert the full objects to form data format
      const formattedData: FYPFormData = {
        ...project,
        students: project.students.map((student) => ({
          name: student.name,
          phone: student.phone,
          email: student.email,
          university: student.university,
          department: student.department,
          graduationYear: student.graduationYear,
          id: student.id,
        })),
        juryMembers: project.juryMembers.map((jury) => ({
          name: jury.name,
          title: jury.title,
          specialization: jury.specialization,
          university: jury.university,
          email: jury.email,
          phone: jury.phone,
          id: jury.id,
        })),
        programmers: project.programmers.map((prog) => ({
          name: prog.name,
          specialization: prog.specialization,
          email: prog.email,
          phone: prog.phone,
          rate: prog.rate,
          id: prog.id,
        })),
      };
      setFormData(formattedData);
    } else {
      setFormData(initialFormState);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const updateField = (field: keyof FYPFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addStudent = () => {
    const newStudent: StudentFormData = {
      name: "",
      phone: "",
      email: "",
      university: "",
      department: "",
      graduationYear: new Date().getFullYear().toString(),
    };
    updateField("students", [...formData.students, newStudent]);
  };

  const removeStudent = (index: number) => {
    updateField(
      "students",
      formData.students.filter((_, i) => i !== index)
    );
  };

  const updateStudent = (
    index: number,
    field: keyof StudentFormData,
    value: any
  ) => {
    const updatedStudents = formData.students.map((student, i) =>
      i === index ? { ...student, [field]: value } : student
    );
    updateField("students", updatedStudents);
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
            className="relative bg-gray-900/90 w-full max-w-4xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] no-scrollbar overflow-y-auto"
          >
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">
                  {project ? "تعديل المشروع" : "إضافة مشروع جديد"}
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
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      عنوان المشروع
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      وصف المشروع
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      rows={3}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                </div>

                {/* Students Section */}
                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">الطلاب</h3>
                    <button
                      type="button"
                      onClick={addStudent}
                      className="px-3 py-1.5 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Plus size={16} />
                      إضافة طالب
                    </button>
                  </div>

                  {formData.students.map((student, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                          طالب {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeStudent(index)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={student.name}
                          onChange={(e) =>
                            updateStudent(index, "name", e.target.value)
                          }
                          placeholder="اسم الطالب"
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                          required
                        />
                        <input
                          type="email"
                          value={student.email}
                          onChange={(e) =>
                            updateStudent(index, "email", e.target.value)
                          }
                          placeholder="البريد الإلكتروني"
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                          required
                        />
                        <input
                          type="tel"
                          value={student.phone}
                          onChange={(e) =>
                            updateStudent(index, "phone", e.target.value)
                          }
                          placeholder="رقم الهاتف"
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                          required
                        />
                        <input
                          type="text"
                          value={student.university}
                          onChange={(e) =>
                            updateStudent(index, "university", e.target.value)
                          }
                          placeholder="الجامعة"
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                          required
                        />
                        {/* Department and Graduation Year */}
                        <input
                          type="text"
                          value={student.department}
                          onChange={(e) =>
                            updateStudent(index, "department", e.target.value)
                          }
                          placeholder="القسم"
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                          required
                        />
                        <input
                          type="text"
                          value={student.graduationYear}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "graduationYear",
                              e.target.value
                            )
                          }
                          placeholder="سنة التخرج"
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Jury Members Section */}
                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      لجنة التحكيم
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {juryMembers.map((jury) => (
                        <label
                          key={jury.id}
                          className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.juryMembers.includes(jury.id)}
                            onChange={(e) => {
                              const newJury = e.target.checked
                                ? [...formData.juryMembers, jury.id]
                                : formData.juryMembers.filter(
                                    (id) => id !== jury.id
                                  );
                              updateField("juryMembers", newJury);
                            }}
                            className="ml-3"
                          />
                          <div>
                            <p className="text-white font-medium">
                              {jury.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {jury.title} - {jury.university}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Programmers Section */}
                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      المبرمجون
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {programmers.map((programmer) => (
                        <label
                          key={programmer.id}
                          className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.programmers.includes(
                              programmer.id
                            )}
                            onChange={(e) => {
                              const newProgrammers = e.target.checked
                                ? [...formData.programmers, programmer.id]
                                : formData.programmers.filter(
                                    (id) => id !== programmer.id
                                  );
                              updateField("programmers", newProgrammers);
                            }}
                            className="ml-3"
                          />
                          <div>
                            <p className="text-white font-medium">
                              {programmer.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {programmer.specialization}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Dates */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        تاريخ البدء
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          updateField("startDate", e.target.value)
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        تاريخ الانتهاء المتوقع
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateField("endDate", e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                        required
                      />
                    </div>

                    {/* Price and Payment */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        السعر الإجمالي
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          updateField("price", Number(e.target.value))
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        المبلغ المدفوع
                      </label>
                      <input
                        type="number"
                        value={formData.amountPaid}
                        onChange={(e) =>
                          updateField("amountPaid", Number(e.target.value))
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                        required
                      />
                    </div>

                    {/* Status and Payment Status */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        حالة المشروع
                      </label>
                      <CustomSelect
                        value={formData.status}
                        onChange={(e) => updateField("status", e.target.value)}
                        options={[
                          { id: "pending", label: "معلق" },
                          { id: "in_progress", label: "قيد التنفيذ" },
                          { id: "under_review", label: "قيد المراجعة" },
                          { id: "completed", label: "مكتمل" },
                        ]}
                        placeholder="اختر الحالة"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        حالة الدفع
                      </label>
                      <CustomSelect
                        value={formData.paymentStatus}
                        onChange={(e) =>
                          updateField("paymentStatus", e.target.value)
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
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      متطلبات المشروع
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) =>
                        updateField("requirements", e.target.value)
                      }
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      التقنيات المستخدمة
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {mockTechnologies.map((tech) => (
                        <label
                          key={tech}
                          className="flex items-center p-2 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.technologies.includes(tech)}
                            onChange={(e) => {
                              const newTechs = e.target.checked
                                ? [...formData.technologies, tech]
                                : formData.technologies.filter(
                                    (t) => t !== tech
                                  );
                              updateField("technologies", newTechs);
                            }}
                            className="ml-2"
                          />
                          <span className="text-sm text-white">{tech}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Presentation Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      موعد العرض (اختياري)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.presentationDate}
                      onChange={(e) =>
                        updateField("presentationDate", e.target.value)
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    />
                  </div>
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
                  {project ? "حفظ التغييرات" : "إضافة المشروع"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
