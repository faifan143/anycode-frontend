// types/invoice.types.ts

// Type of invoice (income or outcome)
export type InvoiceType = "income" | "outcome";

// Categories for expenses
export type ExpenseCategory =
  | "wages"
  | "company"
  | "course"
  | "project"
  | "other";

// Main invoice interface
export interface Invoice {
  id: string;
  date: string;
  type: InvoiceType;
  amount: number;
  description: string;
  category: ExpenseCategory;
  employee?: string;
  reference?: string;
  status?: "pending" | "completed" | "cancelled";
}
