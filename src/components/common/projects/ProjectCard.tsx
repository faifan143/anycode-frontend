// components/common/projects/ProjectCard.tsx
import { Project } from "@/types/projects.type";
import { Briefcase, Calendar, Users } from "lucide-react";
import { FC } from "react";

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-500";
      case "high":
        return "text-orange-500";
      case "medium":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "قيد التنفيذ";
      case "completed":
        return "مكتمل";
      case "on_hold":
        return "معلق";
      case "cancelled":
        return "ملغي";
      default:
        return "مقترح";
    }
  };

  return (
    <div className="bg-gray-900/90 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {project.description}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              project.status
            )}`}
          >
            {getStatusText(project.status)}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Users size={16} />
            <span className="text-sm">
              {project.programmers.length} مبرمجين
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Briefcase size={16} />
            <span className="text-sm">{project.clients.length} عملاء</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} />
            <span className="text-sm">
              {new Date(project.targetEndDate).toLocaleDateString("ar")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full mt-0.5 ${getPriorityColor(project.priority)}" />
            <span className="text-sm text-gray-400">
              {project.priority === "urgent"
                ? "عاجل"
                : project.priority === "high"
                ? "مرتفع"
                : project.priority === "medium"
                ? "متوسط"
                : "منخفض"}
            </span>
          </div>
        </div>

        {/* Progress and Payment */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
          <div>
            <span className="text-gray-400 text-sm block mb-1">الميزانية</span>
            <span className="text-white font-bold">
              ${project.budget.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-sm block mb-1">المدفوع</span>
            <span
              className={
                project.totalPaid >= project.budget
                  ? "text-green-500"
                  : "text-orange-500"
              }
            >
              ${project.totalPaid.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md bg-gray-800/50 text-gray-300 text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-gray-800/50 text-gray-300 text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onViewDetails}
            className="px-3 py-1 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            التفاصيل
          </button>
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm text-white bg-orange-500/90 hover:bg-orange-500 rounded-lg transition-colors"
          >
            تعديل
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm text-white bg-red-500/90 hover:bg-red-500 rounded-lg transition-colors"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};
