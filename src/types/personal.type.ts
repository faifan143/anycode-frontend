// types/user.types.ts
export interface UserTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "in_progress" | "pending";
  priority: "high" | "medium" | "low";
  completionPercentage: number;
}

export interface UserIncome {
  id: string;
  source: "course" | "fyp" | "contract" | "project";
  amount: number;
  date: string;
  description: string;
}

export interface WorkHours {
  date: string;
  hours: number;
  project?: string;
  description?: string;
}

export interface UserStats {
  monthlyWorkHours: number;
  targetWorkHours: number;
  totalIncome: number;
  companyDeposit: number;
  personalIncome: number;
  baseSalary: number;
  bonusAmount: number;
  taskSuccessRate: number;
  completedTasks: number;
  totalTasks: number;
}

export interface InternalTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "in_progress" | "pending";
  bonusAmount: number;
  type: "content" | "development" | "marketing" | "training";
  assignedDate: string;
}
