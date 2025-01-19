/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/contracts/ContractFormModal.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Contract,
  ContractFormData,
  ContractCompany,
  Supervisor,
} from "@/types/contracts.type";
import CustomSelect from "@/components/common/ui/CustomSelects";

interface ContractFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contractData: ContractFormData) => void;
  contract?: Contract | null;
  companies: ContractCompany[];
  supervisors: Supervisor[];
}

export const ContractFormModal: FC<ContractFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  contract,
  companies,
  supervisors,
}) => {
  const initialFormState: ContractFormData = {
    companyId: "",
    supervisorId: "",
    startDate: "",
    status: "pending",
    monthlyRate: 0,
    description: "",
    responsibilities: [],
    termsAndConditions: "",
    contractDuration: 12,
  };

  const [formData, setFormData] = useState<ContractFormData>(initialFormState);
  const [responsibility, setResponsibility] = useState("");

  useEffect(() => {
    if (contract) {
      setFormData({
        ...contract,
        companyId: contract.company.id,
        supervisorId: contract.supervisor.id,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [contract]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const updateField = (field: keyof ContractFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addResponsibility = () => {
    if (responsibility.trim()) {
      updateField("responsibilities", [
        ...formData.responsibilities,
        responsibility.trim(),
      ]);
      setResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    updateField(
      "responsibilities",
      formData.responsibilities.filter((_, i) => i !== index)
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
            className="relative bg-gray-900/90 w-full max-w-3xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">
                  {contract ? "تعديل العقد" : "إضافة عقد جديد"}
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
                {/* Company Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    الشركة
                  </label>
                  <CustomSelect
                    value={formData.companyId}
                    onChange={(e) => updateField("companyId", e.target.value)}
                    options={companies.map((company) => ({
                      id: company.id,
                      label: company.name,
                    }))}
                    placeholder="اختر الشركة"
                    required
                  />
                </div>

                {/* Supervisor Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    المشرف
                  </label>
                  <CustomSelect
                    value={formData.supervisorId}
                    onChange={(e) =>
                      updateField("supervisorId", e.target.value)
                    }
                    options={supervisors
                      .filter(
                        (s) =>
                          s.availability === "available" ||
                          (contract && contract.supervisor.id === s.id)
                      )
                      .map((supervisor) => ({
                        id: supervisor.id,
                        label: `${supervisor.name} (${supervisor.specialization})`,
                      }))}
                    placeholder="اختر المشرف"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    وصف العقد
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={3}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    required
                  />
                </div>

                {/* Dates and Rate */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      المبلغ الشهري
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyRate}
                      onChange={(e) =>
                        updateField("monthlyRate", Number(e.target.value))
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                      مدة العقد (بالشهور)
                    </label>
                    <input
                      type="number"
                      value={formData.contractDuration}
                      onChange={(e) =>
                        updateField("contractDuration", Number(e.target.value))
                      }
                      min="1"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                      required
                    />
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) => setResponsibility(e.target.value)}
                      placeholder="أضف مسؤولية جديدة"
                      className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                    />
                    <button
                      type="button"
                      onClick={addResponsibility}
                      className="px-4 py-2 bg-orange-500/90 hover:bg-orange-500 text-white rounded-lg"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.responsibilities.map((resp, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg"
                      >
                        <span className="text-white">{resp}</span>
                        <button
                          type="button"
                          onClick={() => removeResponsibility(index)}
                          className="text-red-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    الشروط والأحكام
                  </label>
                  <textarea
                    value={formData.termsAndConditions}
                    onChange={(e) =>
                      updateField("termsAndConditions", e.target.value)
                    }
                    rows={4}
                    placeholder="أدخل شروط وأحكام العقد..."
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
                  {contract ? "حفظ التغييرات" : "إضافة العقد"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
