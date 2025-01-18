// components/common/projects/ProjectDetailsModal.tsx
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  DollarSign,
  Users,
  Code,
  Briefcase,
  CheckCircle,
  Clock,
  Link,
} from "lucide-react";
import { Project } from "@/types/projects.type";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailsModal: FC<ProjectDetailsModalProps> = ({
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
      case "on_hold":
        return "bg-yellow-500/10 text-yellow-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in_progress":
        return "text-orange-500";
      case "delayed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-gray-900/90 w-full max-w-5xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  {project.title}
                </h2>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-${project.priority}-500/10 text-${project.priority}-500`}
                  >
                    {project.priority}
                  </span>
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <p className="text-sm text-gray-400">الميزانية</p>
                      <p className="text-white">
                        ${project.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <Users className="text-blue-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">المبرمجون</p>
                      <p className="text-white">{project.programmers.length}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <Briefcase className="text-purple-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">العملاء</p>
                      <p className="text-white">{project.clients.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clients */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Briefcase size={20} />
                  العملاء
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.clients.map((client) => (
                    <div
                      key={client.id}
                      className="bg-gray-800/50 p-4 rounded-lg space-y-2"
                    >
                      <p className="text-white font-medium">{client.name}</p>
                      <div className="space-y-1 text-sm">
                        {client.company && (
                          <p className="text-gray-400">{client.company}</p>
                        )}
                        <p className="text-gray-400">{client.phone}</p>
                        <p className="text-gray-400">
                          {client.city}, {client.country}
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
                      key={programmer.programmerId}
                      className="bg-gray-800/50 p-4 rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-white font-medium">
                          {programmer.name}
                        </p>
                        <span
                          className={`text-sm ${
                            programmer.role === "lead"
                              ? "text-orange-500"
                              : programmer.role === "senior"
                              ? "text-blue-500"
                              : "text-green-500"
                          }`}
                        >
                          {programmer.role}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400">
                          {programmer.hoursPerWeek} ساعة/أسبوع
                        </p>
                        <div className="space-y-1">
                          {programmer.tasks.map((task, index) => (
                            <p
                              key={index}
                              className="text-gray-400 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                              {task}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle size={20} />
                  المراحل
                </h3>
                <div className="space-y-4">
                  {project.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="bg-gray-800/50 p-4 rounded-lg space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {milestone.description}
                          </p>
                        </div>
                        <span
                          className={getMilestoneStatusColor(milestone.status)}
                        >
                          {milestone.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                          <Clock size={16} />
                          تاريخ التسليم:{" "}
                          {new Date(milestone.dueDate).toLocaleDateString("ar")}
                        </p>
                        <div className="space-y-1">
                          {milestone.deliverables.map((deliverable, index) => (
                            <p
                              key={index}
                              className="text-sm text-gray-400 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                              {deliverable}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <DollarSign size={20} />
                  المدفوعات
                </h3>
                <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          التاريخ
                        </th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          المبلغ
                        </th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          الحالة
                        </th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          المرحلة
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {project.payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-4 py-2 text-sm text-white">
                            {new Date(payment.date).toLocaleDateString("ar")}
                          </td>
                          <td className="px-4 py-2 text-sm text-white">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                payment.status === "paid"
                                  ? "bg-green-500/10 text-green-500"
                                  : payment.status === "pending"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-400">
                            {payment.milestoneId
                              ? project.milestones.find(
                                  (m) => m.id === payment.milestoneId
                                )?.title
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Repository */}
              {project.repository && (
                <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <Link size={20} />
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    مستودع المشروع
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
