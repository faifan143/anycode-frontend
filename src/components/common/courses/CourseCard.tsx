// components/common/courses/CourseCard.tsx
import { FC } from "react";
import { Course } from "@/types/courses.type";
import { Calendar, Users, GraduationCap, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
}

export const CourseCard: FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
  onViewDetails,
}) => (
  <div className="bg-gray-900/90 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{course.name}</h3>
          <p className="text-sm text-gray-400">{course.description}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.status === "ongoing"
              ? "bg-green-500/10 text-green-500"
              : course.status === "completed"
              ? "bg-gray-500/10 text-gray-500"
              : "bg-orange-500/10 text-orange-500"
          }`}
        >
          {course.status === "ongoing"
            ? "جارية"
            : course.status === "completed"
            ? "منتهية"
            : "قادمة"}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Users size={16} />
          <span className="text-sm">
            {course.totalStudents}/{course.maxStudents} طالب
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <GraduationCap size={16} />
          <span className="text-sm">{course.teacher.name}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">
            {new Date(course.startDate).toLocaleDateString("ar")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={16} />
          <span className="text-sm">{course.schedule}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end pt-2 border-t border-gray-800">
        <button
          onClick={() => onViewDetails(course)}
          className="px-3 py-1 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          التفاصيل
        </button>
        <button
          onClick={() => onEdit(course)}
          className="px-3 py-1 text-sm text-white bg-orange-500/90 hover:bg-orange-500 rounded-lg transition-colors"
        >
          تعديل
        </button>
        <button
          onClick={() => onDelete(course.id)}
          className="px-3 py-1 text-sm text-white bg-red-500/90 hover:bg-red-500 rounded-lg transition-colors"
        >
          حذف
        </button>
      </div>
    </div>
  </div>
);
