/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/projects/ProjectFormModal.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Project,
  ProjectFormData,
  Client,
  ProjectProgrammer,
  mockTechnologies,
} from "@/types/projects.type";
import CustomSelect from "@/components/common/ui/CustomSelects";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: ProjectFormData) => void;
  project?: Project | null;
  clients: Client[];
  programmers: ProjectProgrammer[];
}

export const ProjectFormModal: FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  project,
  clients,
  programmers,
}) => {
  const initialFormState: ProjectFormData = {
    title: "",
    description: "",
    clientIds: [],
    programmerIds: [],
    totalPaid: 0,
    startDate: "",
    targetEndDate: "",
    status: "proposed",
    priority: "medium",
    budget: 0,
    requirements: "",
    features: [],
    technologies: [],
  };

  const [formData, setFormData] = useState<ProjectFormData>(initialFormState);
  const [feature, setFeature] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        clientIds: project.clients.map((client) => client.id),
        programmerIds: project.programmers.map((prog) => prog.programmerId),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const updateField = (field: keyof ProjectFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (feature.trim()) {
      updateField("features", [...formData.features, feature.trim()]);
      setFeature("");
    }
  };

  const removeFeature = (index: number) => {
    updateField(
      "features",
      formData.features.filter((_, i) => i !== index)
    );
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
            className="relative bg-gray-900/90 w-full max-w-4xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
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
                {/* Clients */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    العملاء
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {clients.map((client) => (
                      <label
                        key={client.id}
                        className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.clientIds.includes(client.id)}
                          onChange={(e) => {
                            const newClients = e.target.checked
                              ? [...formData.clientIds, client.id]
                              : formData.clientIds.filter(
                                  (id) => id !== client.id
                                );
                            updateField("clientIds", newClients);
                          }}
                          className="ml-3"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {client.name}
                          </p>
                          {client.company && (
                            <p className="text-gray-400 text-sm">
                              {client.company}
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Programmers */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    المبرمجون
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {programmers.map((programmer) => (
                      <label
                        key={programmer.programmerId}
                        className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.programmerIds.includes(
                            programmer.programmerId
                          )}
                          onChange={(e) => {
                            const newProgrammers = e.target.checked
                              ? [
                                  ...formData.programmerIds,
                                  programmer.programmerId,
                                ]
                              : formData.programmerIds.filter(
                                  (id) => id !== programmer.programmerId
                                );
                            updateField("programmerIds", newProgrammers);
                          }}
                          className="ml-3"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {programmer.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {programmer.role}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dates */}
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
                      تاريخ الانتهاء المتوقع
                    </label>
                    <input
                      type="date"
                      value={formData.targetEndDate}
                      onChange={(e) =>
                        updateField("targetEndDate", e.target.value)
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>

                  {/* Status and Priority */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      الحالة
                    </label>
                    <CustomSelect
                      value={formData.status}
                      onChange={(e) => updateField("status", e.target.value)}
                      options={[
                        { id: "proposed", label: "مقترح" },
                        { id: "in_progress", label: "قيد التنفيذ" },
                        { id: "on_hold", label: "معلق" },
                        { id: "completed", label: "مكتمل" },
                        { id: "cancelled", label: "ملغي" },
                      ]}
                      placeholder="اختر الحالة"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      الأولوية
                    </label>
                    <CustomSelect
                      value={formData.priority}
                      onChange={(e) => updateField("priority", e.target.value)}
                      options={[
                        { id: "urgent", label: "عاجل" },
                        { id: "high", label: "مرتفع" },
                        { id: "medium", label: "متوسط" },
                        { id: "low", label: "منخفض" },
                      ]}
                      placeholder="اختر الأولوية"
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      الميزانية
                    </label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) =>
                        updateField("budget", Number(e.target.value))
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                </div>
                {/* Features */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => setFeature(e.target.value)}
                      placeholder="أضف ميزة جديدة"
                      className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-orange-500/90 hover:bg-orange-500 text-white rounded-lg"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg"
                      >
                        <span className="text-white">{feat}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
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
                              : formData.technologies.filter((t) => t !== tech);
                            updateField("technologies", newTechs);
                          }}
                          className="ml-2"
                        />
                        <span className="text-sm text-white">{tech}</span>
                      </label>
                    ))}
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
                    placeholder="أدخل متطلبات المشروع..."
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    required
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
