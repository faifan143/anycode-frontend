/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FinalYearProject, ProjectStatus } from "@/types/fyp.type";
import {
  getFilteredProjects,
  mockProgrammers,
  mockJuryMembers,
} from "@/data/mock-data";
import { FYPCard } from "@/components/common/fyp/FYPCard";
import { FYPFilters } from "@/components/common/fyp/FYPFilters";
import { FYPFormModal } from "@/components/common/fyp/FYPFormModal";
import { FYPDetailsModal } from "@/components/common/fyp/FYPDetailsModal";

const FinalYearProjects = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [filters, setFilters] = useState({
    search: "",
    status: "" as ProjectStatus | "",
    programmer: "",
    startDate: "",
    endDate: "",
    university: "",
  });

  const [projectsData, setProjectsData] = useState({
    items: [] as FinalYearProject[],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    summaries: {
      totalProjects: 0,
      inProgress: 0,
      completed: 0,
      totalValue: 0,
      collectedAmount: 0,
    },
  });

  const [selectedProject, setSelectedProject] =
    useState<FinalYearProject | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const data = getFilteredProjects(page, pageSize, filters);
    setProjectsData(data);
  }, [page, pageSize, filters]);

  const handleAddProject = (projectData: any) => {
    console.log("Adding project:", projectData);
    setIsFormModalOpen(false);
  };

  const handleEditProject = (projectData: any) => {
    console.log("Editing project:", projectData);
    setIsFormModalOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    console.log("Deleting project:", projectId);
  };

  const openAddModal = () => {
    setSelectedProject(null);
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const openEditModal = (project: FinalYearProject) => {
    setSelectedProject(project);
    setIsEditMode(true);
    setIsFormModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">إجمالي المشاريع</h3>
          <p className="text-2xl font-bold text-white">
            {projectsData.summaries.totalProjects}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">قيد التنفيذ</h3>
          <p className="text-2xl font-bold text-orange-500">
            {projectsData.summaries.inProgress}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">القيمة الإجمالية</h3>
          <p className="text-2xl font-bold text-green-500">
            ${projectsData.summaries.totalValue}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">المبالغ المحصلة</h3>
          <p className="text-2xl font-bold text-blue-500">
            ${projectsData.summaries.collectedAmount}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">مشاريع التخرج</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          إضافة مشروع
        </button>
      </div>

      {/* Filters */}
      <FYPFilters
        filters={filters}
        onFilterChange={setFilters}
        programmers={mockProgrammers}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.items.map((project) => (
          <FYPCard
            key={project.id}
            project={project}
            onEdit={() => openEditModal(project)}
            onDelete={() => handleDeleteProject(project.id)}
            onViewDetails={() => {
              setSelectedProject(project);
              setIsDetailsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {projectsData.totalPages > 1 && (
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
              setPage((p) => Math.min(projectsData.totalPages, p + 1))
            }
            disabled={page === projectsData.totalPages}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      )}

      {/* Modals */}
      <FYPFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={isEditMode ? handleEditProject : handleAddProject}
        project={isEditMode ? selectedProject : null}
        juryMembers={mockJuryMembers}
        programmers={mockProgrammers}
      />

      <FYPDetailsModal
        project={selectedProject}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default FinalYearProjects;
