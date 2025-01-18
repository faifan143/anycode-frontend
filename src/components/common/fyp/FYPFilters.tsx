/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/fyp/FYPFilters.tsx
import { FC } from "react";
import { Search } from "lucide-react";
import CustomSelect from "@/components/common/ui/CustomSelects";
import { ProjectStatus, Programmer } from "@/types/fyp.type";

interface FYPFiltersProps {
  filters: {
    search: string;
    status: ProjectStatus | "";
    programmer: string;
    startDate: string;
    endDate: string;
    university: string;
  };
  onFilterChange: (filters: any) => void;
  programmers: Programmer[];
}

export const FYPFilters: FC<FYPFiltersProps> = ({
  filters,
  onFilterChange,
  programmers,
}) => {
  return (
    <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="بحث..."
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 pr-10"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>

        {/* Status Filter */}
        <CustomSelect
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          options={[
            { id: "pending", label: "معلق" },
            { id: "in_progress", label: "قيد التنفيذ" },
            { id: "under_review", label: "قيد المراجعة" },
            { id: "completed", label: "مكتمل" },
          ]}
          placeholder="جميع الحالات"
        />

        {/* Programmer Filter */}
        <CustomSelect
          value={filters.programmer}
          onChange={(e) =>
            onFilterChange({ ...filters, programmer: e.target.value })
          }
          options={programmers.map((programmer) => ({
            id: programmer.id,
            label: programmer.name,
          }))}
          placeholder="جميع المبرمجين"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dates */}
        <div className="relative">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              onFilterChange({ ...filters, startDate: e.target.value })
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              onFilterChange({ ...filters, endDate: e.target.value })
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
        </div>

        {/* University Filter */}
        <CustomSelect
          value={filters.university}
          onChange={(e) =>
            onFilterChange({ ...filters, university: e.target.value })
          }
          options={[
            { id: "damascus", label: "جامعة دمشق" },
            { id: "aleppo", label: "جامعة حلب" },
            { id: "tishreen", label: "جامعة تشرين" },
            { id: "baath", label: "جامعة البعث" },
          ]}
          placeholder="جميع الجامعات"
        />
      </div>
    </div>
  );
};
