// components/common/invoices/InvoiceFilters.tsx
import { FC } from "react";
import { Search } from "lucide-react";
import CustomSelect from "@/components/common/ui/CustomSelects";
import { ExpenseCategory, InvoiceType } from "@/types/invoice.type";

interface FiltersState {
  type: InvoiceType | "";
  category: ExpenseCategory | string;
  search: string;
  startDate: string;
  endDate: string;
}

interface InvoiceFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export const InvoiceFilters: FC<InvoiceFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const updateFilter = (key: keyof FiltersState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="بحث..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 pr-10"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>

        {/* Type Filter */}
        <CustomSelect
          onChange={(e) => updateFilter("type", e.target.value)}
          options={[
            { id: "income", label: "دخل" },
            { id: "outcome", label: "خرج" },
          ]}
          placeholder="جميع الأنواع"
          value={filters.type}
        />

        {/* Category Filter */}
        <CustomSelect
          onChange={(e) => updateFilter("category", e.target.value)}
          value={filters.category}
          options={[
            { id: "wages", label: "رواتب" },
            { id: "company", label: "مصاريف شركة" },
            { id: "course", label: "كورسات" },
            { id: "project", label: "مشاريع" },
          ]}
          placeholder="جميع التصنيفات"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => updateFilter("startDate", e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => updateFilter("endDate", e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
        </div>
      </div>
    </div>
  );
};
