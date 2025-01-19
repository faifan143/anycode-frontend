/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Project, ProjectStatus } from "@/types/projects.type";
import {
  getFilteredProjects,
  mockClients,
  mockProgrammers,
} from "@/data/mock-projects";
import { ProjectCard } from "@/components/common/projects/ProjectCard";
import { ProjectFilters } from "@/components/common/projects/ProjectFilters";
import { ProjectFormModal } from "@/components/common/projects/ProjectFormModal";
import { ProjectDetailsModal } from "@/components/common/projects/ProjectDetailsModal";

const Projects = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [filters, setFilters] = useState({
    search: "",
    status: "" as ProjectStatus | "",
    programmer: "",
    client: "",
    priority: "",
    startDate: "",
    endDate: "",
  });

  const [projectsData, setProjectsData] = useState({
    items: [] as Project[],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    summaries: {
      totalProjects: 0,
      inProgress: 0,
      totalValue: 0,
      collectedAmount: 0,
    },
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const data = getFilteredProjects(page, pageSize, filters);
    setProjectsData(data);
  }, [page, pageSize, filters]);

  const handleAddProject = (projectData: any) => {
    // Here you would typically make an API call to add the project
    console.log("Adding project:", projectData);
    setIsFormModalOpen(false);
  };

  const handleEditProject = (projectData: any) => {
    // Here you would typically make an API call to update the project
    console.log("Editing project:", projectData);
    setIsFormModalOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    // Here you would typically make an API call to delete the project
    console.log("Deleting project:", projectId);
  };

  const openAddModal = () => {
    setSelectedProject(null);
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsEditMode(true);
    setIsFormModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header Stats */}
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
            ${projectsData.summaries.totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">المبالغ المحصلة</h3>
          <p className="text-2xl font-bold text-blue-500">
            ${projectsData.summaries.collectedAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">المشاريع</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          إضافة مشروع
        </button>
      </div>

      {/* Filters */}
      <ProjectFilters
        filters={filters}
        onFilterChange={setFilters}
        programmers={mockProgrammers}
        clients={mockClients}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.items.map((project) => (
          <ProjectCard
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

      {/* Empty State */}
      {projectsData.items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">لا توجد مشاريع متاحة</p>
        </div>
      )}

      {/* Modals */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={isEditMode ? handleEditProject : handleAddProject}
        project={isEditMode ? selectedProject : null}
        clients={mockClients}
        programmers={mockProgrammers}
      />

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default Projects;
