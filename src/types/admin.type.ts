// types/admin.types.ts
export type FundType =
  | "courses"
  | "fyps"
  | "projects"
  | "contracts"
  | "company"
  | "additional";

export interface Fund {
  id: string;
  type: FundType;
  name: string;
  balance: number;
  monthlyTarget: number;
  currentMonth: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  fundId: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  description: string;
  date: string;
  category?: string;
}

export interface CompanyExpense {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: "salary" | "utilities" | "rent" | "equipment" | "other";
  status: "pending" | "approved" | "paid";
}

export interface UserTarget {
  userId: string;
  name: string;
  role: string;
  monthlyTarget: number;
  currentProgress: number;
  tasks: {
    completed: number;
    total: number;
  };
  lastActive: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  userId?: string;
  date: string;
  read: boolean;
}
