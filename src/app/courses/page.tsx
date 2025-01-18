"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { CourseCard } from "@/components/common/courses/CourseCard";
import { CourseFilters } from "@/components/common/courses/CourseFilters";
import { CourseDetailsModal } from "@/components/common/courses/CourseDetailsModal";
import { CourseFormModal } from "@/components/common/courses/CourseFormModal";
import { Course } from "@/types/courses.type";
import { getFilteredCourses, mockTeachers } from "@/data/mock-data";

const Courses = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    teacher: "",
    startDate: "",
    endDate: "",
  });

  const [coursesData, setCoursesData] = useState({
    items: [] as Course[],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const data = getFilteredCourses(page, pageSize, filters);
    setCoursesData(data);
  }, [page, pageSize, filters]);

  const handleAddCourse = (courseData: Partial<Course>) => {
    // Here you would typically make an API call to add the course
    console.log("Adding course:", courseData);
    setIsFormModalOpen(false);
  };

  const handleEditCourse = (courseData: Partial<Course>) => {
    // Here you would typically make an API call to update the course
    console.log("Editing course:", courseData);
    setIsFormModalOpen(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    // Here you would typically make an API call to delete the course
    console.log("Deleting course:", courseId);
  };

  const openAddModal = () => {
    setSelectedCourse(null);
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setIsEditMode(true);
    setIsFormModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">الدورات التدريبية</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          إضافة دورة
        </button>
      </div>

      {/* Filters */}
      <CourseFilters
        filters={filters}
        onFilterChange={setFilters}
        teachers={mockTeachers}
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {coursesData.items.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={() => openEditModal(course)}
            onDelete={() => handleDeleteCourse(course.id)}
            onViewDetails={() => {
              setSelectedCourse(course);
              setIsDetailsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {coursesData.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            السابق
          </button>
          <button
            onClick={() =>
              setPage((p) => Math.min(coursesData.totalPages, p + 1))
            }
            disabled={page === coursesData.totalPages}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      )}

      {/* Modals */}
      <CourseDetailsModal
        course={selectedCourse}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <CourseFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={isEditMode ? handleEditCourse : handleAddCourse}
        course={isEditMode ? selectedCourse : null}
        teachers={mockTeachers}
      />
    </div>
  );
};

export default Courses;
