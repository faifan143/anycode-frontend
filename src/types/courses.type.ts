// types/courses.type.ts
export interface Student {
  id: string;
  name: string;
  phone: string;
  joinDate: string;
  paymentStatus: "paid" | "pending" | "partial";
  amount: number;
}

export interface Teacher {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialization: string;
  salary: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  teacher: Teacher;
  students: Student[];
  startDate: string;
  endDate: string;
  schedule: string;
  price: number;
  status: "ongoing" | "completed" | "upcoming";
  totalStudents: number;
  maxStudents: number;
}

// Form specific types
export interface StudentFormData {
  id?: string;
  name: string;
  phone: string;
  joinDate: string;
  paymentStatus: "paid" | "pending" | "partial";
  amount: number;
}

export interface CourseFormData {
  id?: string;
  name: string;
  description: string;
  teacherId: string; // Store only the teacher ID in form
  students: StudentFormData[];
  startDate: string;
  endDate: string;
  schedule: string;
  price: number;
  status: "ongoing" | "completed" | "upcoming";
  maxStudents: number;
}
