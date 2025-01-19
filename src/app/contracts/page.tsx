/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  Contract,
  ContractStatus,
  mockSupervisors,
} from "@/types/contracts.type";
import { getFilteredContracts, mockCompanies } from "@/data/mock-contracts";
import { ContractCard } from "@/components/common/contracts/ContractCard";
import { ContractFormModal } from "@/components/common/contracts/ContractFormModal";
import { ContractDetailsModal } from "@/components/common/contracts/ContractDetailsModal";
import CustomSelect from "@/components/common/ui/CustomSelects";

const Contracts = () => {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    status: "" as ContractStatus | "",
    supervisor: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  // Data state
  const [contractsData, setContractsData] = useState({
    items: [] as Contract[],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    summaries: {
      totalContracts: 0,
      activeContracts: 0,
      totalMonthlyRevenue: 0,
      totalRevenue: 0,
    },
  });

  // Modal states
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load data
  useEffect(() => {
    const data = getFilteredContracts(page, pageSize, filters);
    setContractsData(data);
  }, [page, pageSize, filters]);

  // Event handlers
  const handleAddContract = (contractData: any) => {
    console.log("Adding contract:", contractData);
    setIsFormModalOpen(false);
  };

  const handleEditContract = (contractData: any) => {
    console.log("Editing contract:", contractData);
    setIsFormModalOpen(false);
  };

  const handleDeleteContract = (contractId: string) => {
    console.log("Deleting contract:", contractId);
  };

  const openAddModal = () => {
    setSelectedContract(null);
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const openEditModal = (contract: Contract) => {
    setSelectedContract(contract);
    setIsEditMode(true);
    setIsFormModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">إجمالي العقود</h3>
          <p className="text-2xl font-bold text-white">
            {contractsData.summaries.totalContracts}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">العقود النشطة</h3>
          <p className="text-2xl font-bold text-green-500">
            {contractsData.summaries.activeContracts}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">الدخل الشهري</h3>
          <p className="text-2xl font-bold text-orange-500">
            ${contractsData.summaries.totalMonthlyRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <h3 className="text-gray-400 text-sm">إجمالي العائدات</h3>
          <p className="text-2xl font-bold text-blue-500">
            ${contractsData.summaries.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">العقود</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-orange-500/90 hover:bg-orange-500 text-white transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          إضافة عقد
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
            />
          </div>

          {/* Status Filter */}
          <CustomSelect
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value as ContractStatus,
              }))
            }
            options={[
              { id: "active", label: "نشط" },
              { id: "completed", label: "مكتمل" },
              { id: "terminated", label: "منتهي" },
              { id: "pending", label: "معلق" },
            ]}
            placeholder="جميع الحالات"
          />

          {/* Company Filter */}
          <CustomSelect
            value={filters.company}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, company: e.target.value }))
            }
            options={mockCompanies.map((company) => ({
              id: company.id,
              label: company.name,
            }))}
            placeholder="جميع الشركات"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Supervisor Filter */}
          <CustomSelect
            value={filters.supervisor}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, supervisor: e.target.value }))
            }
            options={mockSupervisors.map((supervisor) => ({
              id: supervisor.id,
              label: supervisor.name,
            }))}
            placeholder="جميع المشرفين"
          />

          {/* Date Range */}
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, startDate: e.target.value }))
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, endDate: e.target.value }))
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contractsData.items.map((contract) => (
          <ContractCard
            key={contract.id}
            contract={contract}
            onEdit={() => openEditModal(contract)}
            onDelete={() => handleDeleteContract(contract.id)}
            onViewDetails={() => {
              setSelectedContract(contract);
              setIsDetailsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {contractsData.items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">لا توجد عقود متاحة</p>
        </div>
      )}

      {/* Pagination */}
      {contractsData.totalPages > 1 && (
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
              setPage((p) => Math.min(contractsData.totalPages, p + 1))
            }
            disabled={page === contractsData.totalPages}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      )}

      {/* Modals */}
      <ContractFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={isEditMode ? handleEditContract : handleAddContract}
        contract={isEditMode ? selectedContract : null}
        companies={mockCompanies}
        supervisors={mockSupervisors}
      />

      <ContractDetailsModal
        contract={selectedContract}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default Contracts;
