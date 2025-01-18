// types/project.types.ts
export interface Client {
  id: string;
  name: string;
  company?: string;
  phone: string;
  country: string;
  city: string;
}

export interface ProjectProgrammer {
  programmerId: string;
  name: string;
  role: "lead" | "senior" | "junior";
  hoursPerWeek: number;
  startDate: string;
  endDate?: string;
  tasks: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed" | "delayed";
  deliverables: string[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "paid" | "overdue";
  milestoneId?: string; // if payment is tied to a milestone
}

export type ProjectStatus =
  | "proposed"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "cancelled";

export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export interface Project {
  id: string;
  title: string;
  description: string;
  clients: Client[];
  programmers: ProjectProgrammer[];
  startDate: string;
  targetEndDate: string;
  actualEndDate?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  budget: number;
  totalPaid: number;
  milestones: Milestone[];
  payments: Payment[];
  technologies: string[];
  repository?: string;
  projectManager?: string; // ID of the programmer who manages the project
  requirements: string;
  features: string[];
}

// Form Types
export interface ProjectFormData
  extends Omit<
    Project,
    "id" | "programmers" | "clients" | "milestones" | "payments"
  > {
  programmerIds: string[];
  clientIds: string[];
}

// Mock Technologies
export const mockTechnologies = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "NestJS",
  "Django",
  "Laravel",
  "Spring Boot",
  "Flask",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "Firebase",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "React Native",
  "Flutter",
  "iOS",
  "Android",
];
