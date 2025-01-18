// types/fyp.types.ts
export interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  university: string;
  department: string;
  graduationYear: string;
}

export interface JuryMember {
  id: string;
  name: string;
  title: string; // e.g., "Professor", "Associate Professor"
  specialization: string;
  university: string;
  email: string;
  phone: string;
}

export interface Programmer {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  rate: number; // hourly/project rate
}

export type ProjectStatus =
  | "pending"
  | "in_progress"
  | "under_review"
  | "completed";

export interface FinalYearProject {
  id: string;
  title: string;
  description: string;
  students: Student[];
  juryMembers: JuryMember[];
  programmers: Programmer[];
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  price: number;
  paymentStatus: "paid" | "partial" | "pending";
  amountPaid: number;
  requirements: string;
  technologies: string[];
  presentationDate?: string;
}

// Form Data Types
export interface StudentFormData extends Omit<Student, "id"> {
  id?: string;
}

export interface JuryMemberFormData extends Omit<JuryMember, "id"> {
  id?: string;
}

export interface ProgrammerFormData extends Omit<Programmer, "id"> {
  id?: string;
}

export interface FYPFormData {
  id?: string;
  title: string;
  description: string;
  students: StudentFormData[];
  juryMembers: JuryMemberFormData[];
  programmers: ProgrammerFormData[];
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  price: number;
  paymentStatus: "paid" | "partial" | "pending";
  amountPaid: number;
  requirements: string;
  technologies: string[];
  presentationDate?: string;
}

// Mock Data
export const mockTechnologies = [
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Django",
  "Laravel",
  "Spring Boot",
  "Flutter",
  "React Native",
  "ASP.NET Core",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "AWS",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "AI",
  "Blockchain",
  "IoT",
];
