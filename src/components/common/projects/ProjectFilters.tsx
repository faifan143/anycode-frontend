/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/projects/ProjectFilters.tsx
import { FC } from "react";
import { Search } from "lucide-react";
import CustomSelect from "@/components/common/ui/CustomSelects";
import { ProjectProgrammer, Client } from "@/types/projects.type";

interface ProjectFiltersProps {
  filters: {
    search: string;
    status: string;
    programmer: string;
    client: string;
    priority: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: any) => void;
  programmers: ProjectProgrammer[];
  clients: Client[];
}

export const ProjectFilters: FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  programmers,
  clients,
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
            { id: "proposed", label: "مقترح" },
            { id: "in_progress", label: "قيد التنفيذ" },
            { id: "on_hold", label: "معلق" },
            { id: "completed", label: "مكتمل" },
            { id: "cancelled", label: "ملغي" },
          ]}
          placeholder="جميع الحالات"
        />

        {/* Priority Filter */}
        <CustomSelect
          value={filters.priority}
          onChange={(e) =>
            onFilterChange({ ...filters, priority: e.target.value })
          }
          options={[
            { id: "urgent", label: "عاجل" },
            { id: "high", label: "مرتفع" },
            { id: "medium", label: "متوسط" },
            { id: "low", label: "منخفض" },
          ]}
          placeholder="جميع الأولويات"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Programmer Filter */}
        <CustomSelect
          value={filters.programmer}
          onChange={(e) =>
            onFilterChange({ ...filters, programmer: e.target.value })
          }
          options={programmers.map((programmer) => ({
            id: programmer.programmerId,
            label: programmer.name,
          }))}
          placeholder="جميع المبرمجين"
        />

        {/* Client Filter */}
        <CustomSelect
          value={filters.client}
          onChange={(e) =>
            onFilterChange({ ...filters, client: e.target.value })
          }
          options={clients.map((client) => ({
            id: client.id,
            label: `${client.name}${
              client.company ? ` - ${client.company}` : ""
            }`,
          }))}
          placeholder="جميع العملاء"
        />

        {/* Date Range */}
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
      </div>
    </div>
  );
};
