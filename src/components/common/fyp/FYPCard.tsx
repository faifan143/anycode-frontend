// components/common/fyp/FYPCard.tsx
import { FC } from "react";
import { FinalYearProject } from "@/types/fyp.type";
import { Calendar, Users, Code, GraduationCap } from "lucide-react";

interface FYPCardProps {
  project: FinalYearProject;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

export const FYPCard: FC<FYPCardProps> = ({
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
            className={`px-4 py-1 rounded-full text-xs font-medium ${getStatusColor(
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
            <span className="text-sm">{project.students.length} طلاب</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <GraduationCap size={16} />
            <span className="text-sm">{project.juryMembers.length} محكمين</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Code size={16} />
            <span className="text-sm">
              {project.programmers.length} مبرمجين
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} />
            <span className="text-sm">
              {new Date(project.endDate).toLocaleDateString("ar")}
            </span>
          </div>
        </div>

        {/* Price and Payment Status */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
          <div>
            <span className="text-gray-400 text-sm block mb-1">السعر</span>
            <span className="text-white font-bold">${project.price}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-sm block mb-1">المدفوع</span>
            <span
              className={`font-bold ${
                project.paymentStatus === "paid"
                  ? "text-green-500"
                  : project.paymentStatus === "partial"
                  ? "text-orange-500"
                  : "text-red-500"
              }`}
            >
              ${project.amountPaid}
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
