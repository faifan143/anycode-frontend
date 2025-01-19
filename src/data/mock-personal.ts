import {
  InternalTask,
  UserIncome,
  UserStats,
  UserTask,
  WorkHours,
} from "@/types/personal.type";

// Mock data
export const mockUserData = {
  tasks: [
    {
      id: "T1",
      title: "مراجعة كود مشروع E-commerce",
      description: "مراجعة وتحسين كود الواجهة الأمامية للمشروع",
      dueDate: "2024-02-20",
      status: "in_progress",
      priority: "high",
      completionPercentage: 75,
    },
    {
      id: "T2",
      title: "تدريب فريق المطورين الجدد",
      description: "تقديم تدريب على React و Next.js",
      dueDate: "2024-02-25",
      status: "pending",
      priority: "medium",
      completionPercentage: 0,
    },
  ] as UserTask[],

  income: [
    {
      id: "I1",
      source: "course",
      amount: 800,
      date: "2024-02-01",
      description: "React.js Course - February Batch",
    },
    {
      id: "I2",
      source: "contract",
      amount: 1200,
      date: "2024-02-05",
      description: "Apricode Supervision - February",
    },
  ] as UserIncome[],

  workHours: [
    {
      date: "2024-02-01",
      hours: 8,
      project: "E-commerce Platform",
      description: "Frontend Development",
    },
    {
      date: "2024-02-02",
      hours: 7,
      project: "Training",
      description: "New Developers Training",
    },
  ] as WorkHours[],

  stats: {
    monthlyWorkHours: 145,
    targetWorkHours: 160,
    totalIncome: 2000,
    companyDeposit: 800,
    personalIncome: 1200,
    baseSalary: 1000,
    bonusAmount: 200,
    taskSuccessRate: 85,
    completedTasks: 17,
    totalTasks: 20,
  } as UserStats,
};

// Add to mockUserData
export const mockInternalTasks: InternalTask[] = [
  {
    id: "IT1",
    title: "تحديث موقع الشركة",
    description: "إضافة صفحة المشاريع الجديدة وتحديث التصميم",
    dueDate: "2024-02-25",
    status: "in_progress",
    bonusAmount: 100,
    type: "development",
    assignedDate: "2024-02-01",
  },
  {
    id: "IT2",
    title: "كتابة محتوى تقني",
    description: "كتابة مقالات عن Next.js و React للمدونة",
    dueDate: "2024-02-20",
    status: "completed",
    bonusAmount: 50,
    type: "content",
    assignedDate: "2024-02-05",
  },
  {
    id: "IT3",
    title: "تدريب المتدربين الجدد",
    description: "تقديم دورة تدريبية في React للمتدربين الجدد",
    dueDate: "2024-02-28",
    status: "pending",
    bonusAmount: 150,
    type: "training",
    assignedDate: "2024-02-10",
  },
];
