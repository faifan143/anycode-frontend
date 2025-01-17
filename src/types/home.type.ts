// types/index.ts
export interface Shift {
  id: string;
  startTime: Date;
  endTime?: Date;
  totalIncome: number;
  status: "open" | "closed";
}
export type fundCategories = "course" | "fyp" | "project" | "contract";
export interface Income {
  id: string;
  amount: number;
  category: fundCategories;
  description: string;
  date: Date;
  shiftId: string;
}

export interface Tab {
  id: fundCategories;
  label: string;
}
