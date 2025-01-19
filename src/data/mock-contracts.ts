// data/mock-contracts.ts
import {
  Contract,
  ContractCompany,
  ContractStatus,
  mockSupervisors,
} from "@/types/contracts.type";

export const mockCompanies: ContractCompany[] = [
  {
    id: "C1",
    name: "Apricode",
    email: "contact@apricode.dev",
    country: "Armenia",
    city: "Yerevan",
  },
  {
    id: "C2",
    name: "TechVision",
    email: "info@techvision.com",
    country: "UAE",
    city: "Dubai",
  },
];

export const mockContracts: Contract[] = [
  {
    id: "CNT-001",
    company: mockCompanies[0],
    supervisor: mockSupervisors[0],
    startDate: "2024-01-01",
    status: "active",
    monthlyRate: 3000,
    description: "إشراف وقيادة فرق التطوير في شركة Apricode",
    responsibilities: [
      "مراجعة الكود وضمان الجودة",
      "تدريب وتوجيه المطورين",
      "إدارة المشاريع وتوزيع المهام",
      "التواصل مع إدارة الشركة",
      "تقديم تقارير أسبوعية عن التقدم",
    ],
    payments: [
      {
        id: "P1",
        amount: 3000,
        date: "2024-01-05",
        status: "paid",
        month: "2024-01",
      },
      {
        id: "P2",
        amount: 3000,
        date: "2024-02-05",
        status: "pending",
        month: "2024-02",
      },
    ],
    totalPaid: 3000,
    contractDuration: 12,
    termsAndConditions: `1. مدة العقد 12 شهر قابلة للتجديد
2. الدفع في بداية كل شهر
3. ساعات العمل: 40 ساعة أسبوعياً
4. إمكانية العمل عن بعد
5. فترة إشعار للإنهاء: شهر واحد`,
  },
];

export const getFilteredContracts = (
  page: number,
  pageSize: number,
  filters: {
    search?: string;
    status?: ContractStatus;
    supervisor?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  let filtered = [...mockContracts];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (contract) =>
        contract.company.name.toLowerCase().includes(searchLower) ||
        contract.supervisor.name.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter(
      (contract) => contract.status === filters.status
    );
  }

  if (filters.supervisor) {
    filtered = filtered.filter(
      (contract) => contract.supervisor.id === filters.supervisor
    );
  }

  if (filters.company) {
    filtered = filtered.filter(
      (contract) => contract.company.id === filters.company
    );
  }

  if (filters.startDate) {
    filtered = filtered.filter(
      (contract) => contract.startDate >= filters.startDate!
    );
  }

  if (filters.endDate) {
    filtered = filtered.filter((contract) =>
      contract.endDate ? contract.endDate <= filters.endDate! : true
    );
  }

  // Sort by start date (newest first)
  filtered.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
    summaries: {
      totalContracts: filtered.length,
      activeContracts: filtered.filter((c) => c.status === "active").length,
      totalMonthlyRevenue: filtered
        .filter((c) => c.status === "active")
        .reduce((sum, c) => sum + c.monthlyRate, 0),
      totalRevenue: filtered.reduce((sum, c) => sum + c.totalPaid, 0),
    },
  };
};
