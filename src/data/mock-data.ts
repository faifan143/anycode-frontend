// mocks/mockData.ts

import { Income, Shift } from "@/types/home.type";

// Mock current time for consistent dates
const TODAY = new Date();
const YESTERDAY = new Date(TODAY);
YESTERDAY.setDate(YESTERDAY.getDate() - 1);

export const mockShifts: Shift[] = [
  {
    id: "shift_1",
    startTime: new Date(YESTERDAY.setHours(9, 0, 0)),
    endTime: new Date(YESTERDAY.setHours(17, 0, 0)),
    totalIncome: 5200,
    status: "closed",
  },
  {
    id: "shift_2",
    startTime: new Date(TODAY.setHours(9, 0, 0)),
    totalIncome: 3800,
    status: "open",
  },
];

export const mockIncome: Income[] = [
  // Courses Income
  {
    id: "course_1",
    amount: 1200,
    category: "course",
    description: "دورة React.js - دفعة أولى",
    date: YESTERDAY,
    shiftId: "shift_1",
  },
  {
    id: "course_2",
    amount: 800,
    category: "course",
    description: "دورة Flutter - دفعة كاملة",
    date: YESTERDAY,
    shiftId: "shift_1",
  },
  {
    id: "course_3",
    amount: 1500,
    category: "course",
    description: "دورة Full Stack - قسط أول",
    date: TODAY,
    shiftId: "shift_2",
  },

  // Final Year Projects
  {
    id: "fyp_1",
    amount: 2000,
    category: "fyp",
    description: "مشروع نظام إدارة مستشفى - دفعة أولى",
    date: YESTERDAY,
    shiftId: "shift_1",
  },
  {
    id: "fyp_2",
    amount: 1500,
    category: "fyp",
    description: "مشروع متجر إلكتروني - دفعة نهائية",
    date: TODAY,
    shiftId: "shift_2",
  },
  {
    id: "fyp_3",
    amount: 1200,
    category: "fyp",
    description: "مشروع تطبيق موبايل - دفعة أولى",
    date: TODAY,
    shiftId: "shift_2",
  },

  // Regular Projects
  {
    id: "project_1",
    amount: 3000,
    category: "project",
    description: "موقع شركة عقارات - دفعة مقدمة",
    date: YESTERDAY,
    shiftId: "shift_1",
  },
  {
    id: "project_2",
    amount: 2500,
    category: "project",
    description: "نظام محاسبة - دفعة نهائية",
    date: TODAY,
    shiftId: "shift_2",
  },
  {
    id: "project_3",
    amount: 1800,
    category: "project",
    description: "تطبيق إدارة مخزون - دفعة أولى",
    date: TODAY,
    shiftId: "shift_2",
  },

  // Contracts
  {
    id: "contract_1",
    amount: 5000,
    category: "contract",
    description: "عقد صيانة سنوي - شركة تقنية",
    date: YESTERDAY,
    shiftId: "shift_1",
  },
  {
    id: "contract_2",
    amount: 4500,
    category: "contract",
    description: "عقد تطوير برمجيات - مؤسسة تعليمية",
    date: TODAY,
    shiftId: "shift_2",
  },
  {
    id: "contract_3",
    amount: 3800,
    category: "contract",
    description: "عقد دعم تقني - شركة تجارية",
    date: TODAY,
    shiftId: "shift_2",
  },
];

// Helper functions
export const getIncomeByCategory = (category: string): Income[] => {
  return mockIncome.filter((item) => item.category === category);
};

export const getTotalIncomeForShift = (shiftId: string): number => {
  return mockIncome
    .filter((item) => item.shiftId === shiftId)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const getCurrentShift = (): Shift | undefined => {
  return mockShifts.find((shift) => shift.status === "open");
};

export const getShiftById = (shiftId: string): Shift | undefined => {
  return mockShifts.find((shift) => shift.id === shiftId);
};

// Categories summary
export const getCategorySummary = () => {
  return {
    courses: getIncomeByCategory("course").reduce(
      (sum, item) => sum + item.amount,
      0
    ),
    fyp: getIncomeByCategory("fyp").reduce((sum, item) => sum + item.amount, 0),
    projects: getIncomeByCategory("project").reduce(
      (sum, item) => sum + item.amount,
      0
    ),
    contracts: getIncomeByCategory("contract").reduce(
      (sum, item) => sum + item.amount,
      0
    ),
  };
};

// Daily summary
export const getDailySummary = (date: Date) => {
  const dateString = date.toDateString();
  return mockIncome
    .filter((item) => item.date.toDateString() === dateString)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const categoryOptions = {
  course: [
    { id: "react", label: "React.js دورة" },
    { id: "flutter", label: "Flutter دورة" },
    { id: "nodejs", label: "Node.js دورة" },
    { id: "fullstack", label: "Full Stack دورة" },
    { id: "web", label: "تطوير الويب دورة" },
  ],
  fyp: [
    { id: "hospital", label: "نظام إدارة مستشفى" },
    { id: "ecommerce", label: "متجر إلكتروني" },
    { id: "school", label: "نظام إدارة مدرسة" },
    { id: "delivery", label: "تطبيق توصيل" },
    { id: "pos", label: "نظام نقاط البيع" },
  ],
  project: [
    { id: "website", label: "تطوير موقع" },
    { id: "app", label: "تطوير تطبيق" },
    { id: "dashboard", label: "لوحة تحكم" },
    { id: "crm", label: "نظام إدارة العملاء" },
    { id: "erp", label: "نظام إدارة الموارد" },
  ],
  contract: [
    { id: "maintenance", label: "عقد صيانة" },
    { id: "development", label: "عقد تطوير" },
    { id: "support", label: "عقد دعم فني" },
    { id: "consulting", label: "عقد استشارات" },
    { id: "hosting", label: "عقد استضافة" },
  ],
};
