// data/mock-projects.ts
import {
  Project,
  Client,
  ProjectProgrammer,
  ProjectStatus,
} from "@/types/projects.type";

export const mockClients: Client[] = [
  {
    id: "C1",
    name: "محمد العلي",
    company: "Tech Solutions LLC",
    phone: "+971 50 123 4567",
    country: "الإمارات",
    city: "دبي",
  },
  {
    id: "C2",
    name: "أحمد خالد",
    company: "Digital Innovation Co",
    phone: "+966 55 987 6543",
    country: "السعودية",
    city: "الرياض",
  },
];

export const mockProgrammers: ProjectProgrammer[] = [
  {
    programmerId: "P1",
    name: "فيصل أحمد",
    role: "lead",
    hoursPerWeek: 40,
    startDate: "2024-01-01",
    tasks: ["System Architecture", "Code Review", "Team Management"],
  },
  {
    programmerId: "P2",
    name: "سارة محمد",
    role: "senior",
    hoursPerWeek: 35,
    startDate: "2024-01-15",
    tasks: ["Frontend Development", "UI/UX Implementation"],
  },
  {
    programmerId: "P3",
    name: "عمر خالد",
    role: "junior",
    hoursPerWeek: 30,
    startDate: "2024-02-01",
    tasks: ["Backend Development", "API Implementation"],
  },
];

export const mockProjects: Project[] = [
  {
    id: "PRJ-001",
    title: "منصة التجارة الإلكترونية",
    description:
      "منصة متكاملة للتجارة الإلكترونية مع نظام إدارة المخزون والمدفوعات",
    clients: [mockClients[0]],
    programmers: [mockProgrammers[0], mockProgrammers[1]],
    startDate: "2024-01-15",
    targetEndDate: "2024-06-15",
    status: "in_progress",
    priority: "high",
    budget: 50000,
    totalPaid: 20000,
    milestones: [
      {
        id: "M1",
        title: "تطوير واجهة المستخدم",
        description: "تصميم وتطوير واجهة المستخدم الرئيسية",
        dueDate: "2024-03-15",
        status: "completed",
        deliverables: ["الصفحة الرئيسية", "صفحة المنتجات", "سلة التسوق"],
      },
    ],
    payments: [
      {
        id: "PAY1",
        amount: 20000,
        date: "2024-01-15",
        status: "paid",
        milestoneId: "M1",
      },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    repository: "https://github.com/org/ecommerce-platform",
    projectManager: "P1",
    requirements: `- نظام إدارة المنتجات
- نظام إدارة المخزون
- بوابة الدفع الإلكتروني
- نظام إدارة العملاء
- التقارير والإحصائيات`,
    features: [
      "إدارة المنتجات",
      "سلة التسوق",
      "نظام الدفع",
      "إدارة المخزون",
      "لوحة تحكم المشرف",
    ],
  },
];

export const getFilteredProjects = (
  page: number,
  pageSize: number,
  filters: {
    search?: string;
    status?: ProjectStatus;
    programmer?: string;
    client?: string;
    startDate?: string;
    endDate?: string;
    priority?: string;
  }
) => {
  let filtered = [...mockProjects];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter((project) => project.status === filters.status);
  }

  if (filters.programmer) {
    filtered = filtered.filter((project) =>
      project.programmers.some(
        (prog) => prog.programmerId === filters.programmer
      )
    );
  }

  if (filters.client) {
    filtered = filtered.filter((project) =>
      project.clients.some((client) => client.id === filters.client)
    );
  }

  if (filters.priority) {
    filtered = filtered.filter(
      (project) => project.priority === filters.priority
    );
  }

  if (filters.startDate) {
    filtered = filtered.filter(
      (project) => project.startDate >= filters.startDate!
    );
  }

  if (filters.endDate) {
    filtered = filtered.filter(
      (project) => project.targetEndDate <= filters.endDate!
    );
  }

  // Sort by priority and start date
  filtered.sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

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
      totalValue: filtered.reduce((sum, p) => sum + p.budget, 0),
      collectedAmount: filtered.reduce((sum, p) => sum + p.totalPaid, 0),
    },
  };
};
