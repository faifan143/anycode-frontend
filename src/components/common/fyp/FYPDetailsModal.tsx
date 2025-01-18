// components/common/fyp/FYPDetailsModal.tsx
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  DollarSign,
  GraduationCap,
  Mail,
  Phone,
  Code,
  BookOpen,
  Clock,
} from "lucide-react";
import { FinalYearProject } from "@/types/fyp.type";

interface FYPDetailsModalProps {
  project: FinalYearProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FYPDetailsModal: FC<FYPDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-orange-500/10 text-orange-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "under_review":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "قيد التنفيذ";
      case "completed":
        return "مكتمل";
      case "under_review":
        return "قيد المراجعة";
      default:
        return "معلق";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "partial":
        return "text-orange-500";
      default:
        return "text-red-500";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "مدفوع";
      case "partial":
        return "مدفوع جزئياً";
      default:
        return "غير مدفوع";
    }
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
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h2>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusText(project.status)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <p className="text-gray-300">{project.description}</p>

                {/* Project Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <Calendar className="text-orange-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">تاريخ البدء</p>
                      <p className="text-white">
                        {new Date(project.startDate).toLocaleDateString("ar")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <DollarSign className="text-green-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">المبلغ المدفوع</p>
                      <p
                        className={getPaymentStatusColor(project.paymentStatus)}
                      >
                        ${project.amountPaid} / ${project.price}
                      </p>
                    </div>
                  </div>
                  {project.presentationDate && (
                    <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                      <Clock className="text-blue-500" size={24} />
                      <div>
                        <p className="text-sm text-gray-400">موعد العرض</p>
                        <p className="text-white">
                          {new Date(project.presentationDate).toLocaleString(
                            "ar"
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Students */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <GraduationCap size={20} />
                  الطلاب
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-gray-800/50 p-4 rounded-lg space-y-2"
                    >
                      <p className="text-white font-medium">{student.name}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400 flex items-center gap-2">
                          <Mail size={16} />
                          {student.email}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Phone size={16} />
                          {student.phone}
                        </p>
                        <p className="text-gray-400">
                          {student.university} - {student.department}
                        </p>
                        <p className="text-gray-400">
                          سنة التخرج: {student.graduationYear}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jury Members */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BookOpen size={20} />
                  لجنة التحكيم
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.juryMembers.map((jury) => (
                    <div
                      key={jury.id}
                      className="bg-gray-800/50 p-4 rounded-lg space-y-2"
                    >
                      <p className="text-white font-medium">{jury.name}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400">{jury.title}</p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Mail size={16} />
                          {jury.email}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Phone size={16} />
                          {jury.phone}
                        </p>
                        <p className="text-gray-400">
                          {jury.university} - {jury.specialization}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programmers */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Code size={20} />
                  المبرمجون
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.programmers.map((programmer) => (
                    <div
                      key={programmer.id}
                      className="bg-gray-800/50 p-4 rounded-lg space-y-2"
                    >
                      <p className="text-white font-medium">
                        {programmer.name}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400">
                          {programmer.specialization}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Mail size={16} />
                          {programmer.email}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Phone size={16} />
                          {programmer.phone}
                        </p>
                        <p className="text-green-500">
                          ${programmer.rate}/ساعة
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">المتطلبات</h3>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {project.requirements}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  التقنيات المستخدمة
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-gray-800/50 text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
