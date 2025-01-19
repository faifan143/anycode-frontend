// components/common/contracts/ContractDetailsModal.tsx
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  DollarSign,
  User,
  Building2,
  Mail,
  MapPin,
  ClipboardList,
  FileText,
} from "lucide-react";
import { Contract } from "@/types/contracts.type";

interface ContractDetailsModalProps {
  contract: Contract | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContractDetailsModal: FC<ContractDetailsModalProps> = ({
  contract,
  isOpen,
  onClose,
}) => {
  if (!contract) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "completed":
        return "bg-blue-500/10 text-blue-500";
      case "terminated":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-orange-500/10 text-orange-500";
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
            className="relative bg-gray-900/90 w-full max-w-4xl rounded-xl border border-gray-800 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/90 backdrop-blur-sm">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {contract.company.name}
                </h2>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(
                    contract.status
                  )}`}
                >
                  {contract.status === "active"
                    ? "نشط"
                    : contract.status === "completed"
                    ? "مكتمل"
                    : contract.status === "terminated"
                    ? "منتهي"
                    : "معلق"}
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
                <p className="text-gray-300">{contract.description}</p>

                {/* Contract Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <Calendar className="text-orange-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">تاريخ البدء</p>
                      <p className="text-white">
                        {new Date(contract.startDate).toLocaleDateString("ar")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <DollarSign className="text-green-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">المبلغ الشهري</p>
                      <p className="text-white">${contract.monthlyRate}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <ClipboardList className="text-blue-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">مدة العقد</p>
                      <p className="text-white">
                        {contract.contractDuration} شهر
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                    <DollarSign className="text-purple-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">إجمالي المدفوعات</p>
                      <p className="text-white">${contract.totalPaid}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Building2 size={20} />
                  معلومات الشركة
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                  <p className="text-white font-medium text-lg">
                    {contract.company.name}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-400 flex items-center gap-2">
                      <Mail size={16} />
                      {contract.company.email}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <MapPin size={16} />
                      {contract.company.city}, {contract.company.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Supervisor Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User size={20} />
                  معلومات المشرف
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                  <p className="text-white font-medium text-lg">
                    {contract.supervisor.name}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      {contract.supervisor.specialization}
                    </p>
                    <p className="text-gray-400">
                      المعدل الشهري: ${contract.supervisor.rate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ClipboardList size={20} />
                  المسؤوليات
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {contract.responsibilities.map((responsibility, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
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
                          الشهر
                        </th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          المبلغ
                        </th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">
                          الحالة
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {contract.payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-4 py-2 text-sm text-white">
                            {new Date(payment.date).toLocaleDateString("ar")}
                          </td>
                          <td className="px-4 py-2 text-sm text-white">
                            {payment.month}
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
                              {payment.status === "paid"
                                ? "مدفوع"
                                : payment.status === "pending"
                                ? "معلق"
                                : "متأخر"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText size={20} />
                  الشروط والأحكام
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="space-y-2 text-gray-300 whitespace-pre-wrap">
                    {contract.termsAndConditions}
                  </div>
                </div>
              </div>

              {/* Contract Duration Summary */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">مدة العقد</p>
                    <p className="text-white font-medium">
                      {contract.contractDuration} شهر
                    </p>
                  </div>
                  {contract.endDate && (
                    <div className="text-right space-y-1">
                      <p className="text-gray-400 text-sm">تاريخ الانتهاء</p>
                      <p className="text-white font-medium">
                        {new Date(contract.endDate).toLocaleDateString("ar")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mt-6 p-4 bg-orange-500/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-orange-500 text-sm">إجمالي قيمة العقد</p>
                    <p className="text-white font-medium">
                      $
                      {(
                        contract.monthlyRate * contract.contractDuration
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-green-500 text-sm">المبلغ المدفوع</p>
                    <p className="text-white font-medium">
                      ${contract.totalPaid.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status History - Optional */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">حالة العقد</p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        contract.status
                      )}`}
                    >
                      {contract.status === "active"
                        ? "نشط"
                        : contract.status === "completed"
                        ? "مكتمل"
                        : contract.status === "terminated"
                        ? "منتهي"
                        : "معلق"}
                    </span>
                    {contract.status === "active" && (
                      <span className="text-gray-400 text-sm">
                        منذ{" "}
                        {new Date(contract.startDate).toLocaleDateString("ar")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
