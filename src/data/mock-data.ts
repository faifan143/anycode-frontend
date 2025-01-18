// mocks/mockData.ts

import { Income, Shift } from "@/types/home.type";
import { ExpenseCategory, Invoice, InvoiceType } from "@/types/invoice.type";

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

export const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2024-01-15",
    type: "income",
    amount: 1500,
    description: "React.js Course Payment",
    category: "course",
    status: "completed",
  },
  {
    id: "INV-002",
    date: "2024-01-16",
    type: "outcome",
    amount: 800,
    description: "Monthly Salary - Ahmed",
    category: "wages",
    employee: "Ahmed Hassan",
    status: "completed",
  },
  {
    id: "INV-003",
    date: "2024-01-17",
    type: "income",
    amount: 2500,
    description: "E-commerce Website Development",
    category: "project",
    reference: "PRJ-2024-001",
    status: "completed",
  },
  {
    id: "INV-004",
    date: "2024-01-18",
    type: "outcome",
    amount: 200,
    description: "Office Internet Bill",
    category: "company",
    status: "completed",
  },
  {
    id: "INV-005",
    date: "2024-01-19",
    type: "income",
    amount: 3000,
    description: "Flutter Mobile App Development",
    category: "project",
    reference: "PRJ-2024-002",
    status: "completed",
  },
  {
    id: "INV-006",
    date: "2024-01-20",
    type: "outcome",
    amount: 750,
    description: "Monthly Salary - Sara",
    category: "wages",
    employee: "Sara Ahmed",
    status: "completed",
  },
  {
    id: "INV-007",
    date: "2024-01-21",
    type: "income",
    amount: 800,
    description: "Web Development Course - Group A",
    category: "course",
    status: "completed",
  },
  {
    id: "INV-008",
    date: "2024-01-22",
    type: "outcome",
    amount: 300,
    description: "Office Supplies and Equipment",
    category: "company",
    status: "completed",
  },
  {
    id: "INV-009",
    date: "2024-01-23",
    type: "income",
    amount: 1200,
    description: "UI/UX Design Course",
    category: "course",
    status: "completed",
  },
  {
    id: "INV-010",
    date: "2024-01-24",
    type: "outcome",
    amount: 150,
    description: "Office Utilities",
    category: "company",
    status: "completed",
  },
  {
    id: "INV-011",
    date: "2024-01-25",
    type: "income",
    amount: 4000,
    description: "CRM System Development",
    category: "project",
    reference: "PRJ-2024-003",
    status: "pending",
  },
  {
    id: "INV-012",
    date: "2024-01-26",
    type: "outcome",
    amount: 900,
    description: "Monthly Salary - Mohammad",
    category: "wages",
    employee: "Mohammad Khalil",
    status: "pending",
  },
];

// Helper function to get filtered and paginated data
export const getFilteredInvoices = (
  page: number,
  pageSize: number,
  filters: {
    type?: InvoiceType;
    category?: ExpenseCategory;
    search?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }
) => {
  let filtered = [...mockInvoices];

  // Apply filters
  if (filters.type) {
    filtered = filtered.filter((invoice) => invoice.type === filters.type);
  }

  if (filters.category) {
    filtered = filtered.filter(
      (invoice) => invoice.category === filters.category
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (invoice) =>
        invoice.description.toLowerCase().includes(searchLower) ||
        invoice.id.toLowerCase().includes(searchLower) ||
        invoice.employee?.toLowerCase().includes(searchLower) ||
        invoice.reference?.toLowerCase().includes(searchLower)
    );
  }

  if (filters.startDate) {
    filtered = filtered.filter((invoice) => invoice.date >= filters.startDate!);
  }

  if (filters.endDate) {
    filtered = filtered.filter((invoice) => invoice.date <= filters.endDate!);
  }

  if (filters.status) {
    filtered = filtered.filter((invoice) => invoice.status === filters.status);
  }

  // Sort by date (newest first)
  filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate pagination
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
    summaries: {
      totalIncome: filtered
        .filter((i) => i.type === "income")
        .reduce((sum, i) => sum + i.amount, 0),
      totalOutcome: filtered
        .filter((i) => i.type === "outcome")
        .reduce((sum, i) => sum + i.amount, 0),
    },
  };
};

// data/mock-courses.ts
import { Course, Teacher } from "@/types/courses.type";

export const mockTeachers: Teacher[] = [
  {
    id: "T1",
    name: "أحمد حسن",
    phone: "+963 934 567 890",
    email: "ahmed.hassan@anycode.com",
    specialization: "React & Next.js",
    salary: 1200,
  },
  {
    id: "T2",
    name: "سارة خالد",
    phone: "+963 955 123 456",
    email: "sara.khalid@anycode.com",
    specialization: "UI/UX Design",
    salary: 1000,
  },
  // Add more teachers...
];

export const mockCourses: Course[] = [
  {
    id: "C1",
    name: "React.js Advanced Development",
    description: "دورة متقدمة في تطوير تطبيقات React.js",
    teacher: mockTeachers[0],
    students: [
      {
        id: "S1",
        name: "محمد علي",
        phone: "+963 944 111 222",
        joinDate: "2024-01-15",
        paymentStatus: "paid",
        amount: 500,
      },
      // Add more students...
    ],
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    schedule: "السبت والاثنين 6-8 مساءً",
    price: 500,
    status: "ongoing",
    totalStudents: 15,
    maxStudents: 20,
  },
  // Add more courses...
];

export const getFilteredCourses = (
  page: number,
  pageSize: number,
  filters: {
    search?: string;
    status?: string;
    teacher?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  let filtered = [...mockCourses];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (course) =>
        course.name.toLowerCase().includes(searchLower) ||
        course.teacher.name.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter((course) => course.status === filters.status);
  }

  if (filters.teacher) {
    filtered = filtered.filter(
      (course) => course.teacher.id === filters.teacher
    );
  }

  if (filters.startDate) {
    filtered = filtered.filter(
      (course) => course.startDate >= filters.startDate!
    );
  }

  if (filters.endDate) {
    filtered = filtered.filter((course) => course.endDate <= filters.endDate!);
  }

  // Sort by start date
  filtered.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
  };
};

// data/mock-fyp.ts
import {
  FinalYearProject,
  JuryMember,
  Programmer,
  ProjectStatus,
} from "@/types/fyp.type";

export const mockJuryMembers: JuryMember[] = [
  {
    id: "J1",
    name: "د. أحمد حسن",
    title: "Professor",
    specialization: "Computer Science",
    university: "Damascus University",
    email: "ahmed.hassan@damascus.edu",
    phone: "+963 944 123 456",
  },
  {
    id: "J2",
    name: "د. سارة خالد",
    title: "Associate Professor",
    specialization: "Software Engineering",
    university: "Aleppo University",
    email: "sara.khalid@aleppo.edu",
    phone: "+963 955 789 012",
  },
];

export const mockProgrammers: Programmer[] = [
  {
    id: "P1",
    name: "محمد علي",
    specialization: "Full Stack Development",
    email: "mohammad.ali@anycode.com",
    phone: "+963 934 567 890",
    rate: 25,
  },
  {
    id: "P2",
    name: "ريم أحمد",
    specialization: "Mobile Development",
    email: "reem.ahmad@anycode.com",
    phone: "+963 956 123 456",
    rate: 30,
  },
];

export const mockProjects: FinalYearProject[] = [
  {
    id: "FYP-001",
    title: "نظام إدارة المستشفيات المتكامل",
    description:
      "تطوير نظام شامل لإدارة المستشفيات يشمل إدارة المرضى والمواعيد والسجلات الطبية",
    students: [
      {
        id: "S1",
        name: "عمر محمد",
        phone: "+963 945 111 222",
        email: "omar.m@student.damascus.edu",
        university: "Damascus University",
        department: "Software Engineering",
        graduationYear: "2024",
      },
    ],
    juryMembers: [mockJuryMembers[0]],
    programmers: [mockProgrammers[0]],
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    status: "in_progress",
    price: 2500,
    paymentStatus: "partial",
    amountPaid: 1000,
    requirements:
      "- واجهة مستخدم سهلة الاستخدام\n- إدارة المواعيد\n- السجلات الطبية الإلكترونية\n- تقارير وإحصائيات",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
];

export const getFilteredProjects = (
  page: number,
  pageSize: number,
  filters: {
    search?: string;
    status?: ProjectStatus;
    programmer?: string;
    startDate?: string;
    endDate?: string;
    university?: string;
  }
) => {
  let filtered = [...mockProjects];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.students.some(
          (student) =>
            student.name.toLowerCase().includes(searchLower) ||
            student.university.toLowerCase().includes(searchLower)
        )
    );
  }

  if (filters.status) {
    filtered = filtered.filter((project) => project.status === filters.status);
  }

  if (filters.programmer) {
    filtered = filtered.filter((project) =>
      project.programmers.some((prog) => prog.id === filters.programmer)
    );
  }

  if (filters.university) {
    filtered = filtered.filter((project) =>
      project.students.some(
        (student) =>
          student.university.toLowerCase() === filters.university?.toLowerCase()
      )
    );
  }

  if (filters.startDate) {
    filtered = filtered.filter(
      (project) => project.startDate >= filters.startDate!
    );
  }

  if (filters.endDate) {
    filtered = filtered.filter(
      (project) => project.endDate <= filters.endDate!
    );
  }

  // Sort by start date (newest first)
  filtered.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
    summaries: {
      totalProjects: filtered.length,
      inProgress: filtered.filter((p) => p.status === "in_progress").length,
      completed: filtered.filter((p) => p.status === "completed").length,
      totalValue: filtered.reduce((sum, p) => sum + p.price, 0),
      collectedAmount: filtered.reduce((sum, p) => sum + p.amountPaid, 0),
    },
  };
};
