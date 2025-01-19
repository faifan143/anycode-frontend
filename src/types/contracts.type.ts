// types/contract.types.ts
export interface ContractCompany {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
}

export interface Supervisor {
  id: string;
  name: string;
  specialization: string;
  rate: number; // monthly rate
  availability: "available" | "assigned";
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "paid" | "overdue";
  month: string; // e.g., "2024-01"
}

export type ContractStatus = "active" | "completed" | "terminated" | "pending";

export interface Contract {
  id: string;
  company: ContractCompany;
  supervisor: Supervisor;
  startDate: string;
  endDate?: string;
  status: ContractStatus;
  monthlyRate: number;
  description: string;
  responsibilities: string[];
  payments: Payment[];
  totalPaid: number;
  contractDuration: number; // in months
  termsAndConditions: string;
}

// Form Types
export interface ContractFormData {
  id?: string;
  companyId: string;
  supervisorId: string;
  startDate: string;
  endDate?: string;
  status: ContractStatus;
  monthlyRate: number;
  description: string;
  responsibilities: string[];
  termsAndConditions: string;
  contractDuration: number;
}

// Mock Data
export const mockSupervisors: Supervisor[] = [
  {
    id: "S1",
    name: "فيصل فنصة",
    specialization: "Full Stack Development",
    rate: 3000,
    availability: "available",
  },
  {
    id: "S2",
    name: "أحمد محمد",
    specialization: "Mobile Development",
    rate: 2800,
    availability: "assigned",
  },
];
