// components/common/contracts/ContractCard.tsx
import { FC } from "react";
import { Contract } from "@/types/contracts.type";
import { Calendar, Building2, User, DollarSign } from "lucide-react";

interface ContractCardProps {
  contract: Contract;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

export const ContractCard: FC<ContractCardProps> = ({
  contract,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط";
      case "completed":
        return "مكتمل";
      case "terminated":
        return "منتهي";
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
              {contract.company.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {contract.description}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              contract.status
            )}`}
          >
            {getStatusText(contract.status)}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <User size={16} />
            <span className="text-sm">{contract.supervisor.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Building2 size={16} />
            <span className="text-sm">{contract.company.city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} />
            <span className="text-sm">
              {new Date(contract.startDate).toLocaleDateString("ar")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign size={16} />
            <span className="text-sm">${contract.monthlyRate}/شهرياً</span>
          </div>
        </div>

        {/* Progress and Payment */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
          <div>
            <span className="text-gray-400 text-sm block mb-1">المدة</span>
            <span className="text-white font-bold">
              {contract.contractDuration} شهر
            </span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-sm block mb-1">
              إجمالي المدفوعات
            </span>
            <span className="text-green-500 font-bold">
              ${contract.totalPaid}
            </span>
          </div>
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
