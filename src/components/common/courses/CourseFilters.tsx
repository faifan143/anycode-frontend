/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/courses/CourseFilters.tsx
import { FC } from "react";
import { Search } from "lucide-react";
import CustomSelect from "@/components/common/ui/CustomSelects";

interface CourseFiltersProps {
  filters: {
    search: string;
    status: string;
    teacher: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: any) => void;
  teachers: Array<{ id: string; name: string }>;
}

export const CourseFilters: FC<CourseFiltersProps> = ({
  filters,
  onFilterChange,
  teachers,
}) => (
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
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        options={[
          { id: "ongoing", label: "جارية" },
          { id: "completed", label: "منتهية" },
          { id: "upcoming", label: "قادمة" },
        ]}
        placeholder="جميع الحالات"
      />

      {/* Teacher Filter */}
      <CustomSelect
        value={filters.teacher}
        onChange={(e) =>
          onFilterChange({ ...filters, teacher: e.target.value })
        }
        options={teachers.map((teacher) => ({
          id: teacher.id,
          label: teacher.name,
        }))}
        placeholder="جميع المدرسين"
      />
    </div>

    {/* Date Range */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
