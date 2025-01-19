"use client";
import { mockInternalTasks, mockUserData } from "@/data/mock-personal";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Timer,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const Personal = () => {
  const [selectedMonth] = useState(new Date());

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">الصفحة الشخصية</h1>
        <div className="text-gray-400">
          {selectedMonth.toLocaleDateString("ar", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Work Hours */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">ساعات العمل</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {mockUserData.stats.monthlyWorkHours}
                <span className="text-sm text-gray-400 mr-1">
                  / {mockUserData.stats.targetWorkHours}
                </span>
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-800 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{
                  width: `${
                    (mockUserData.stats.monthlyWorkHours /
                      mockUserData.stats.targetWorkHours) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Total Income */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">إجمالي الدخل</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${mockUserData.stats.totalIncome.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-400">عائد الشركة:</span>
            <span className="text-green-500">
              ${mockUserData.stats.companyDeposit.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* Expected Salary */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">الراتب المتوقع</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                $
                {(
                  mockUserData.stats.baseSalary + mockUserData.stats.bonusAmount
                ).toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Wallet className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            راتب أساسي: ${mockUserData.stats.baseSalary} + مكافأة: $
            {mockUserData.stats.bonusAmount}
          </div>
        </motion.div>

        {/* Task Success Rate */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">نسبة إنجاز المهام</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {mockUserData.stats.taskSuccessRate}%
              </h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Target className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            {mockUserData.stats.completedTasks} من{" "}
            {mockUserData.stats.totalTasks} مهمة مكتملة
          </div>
        </motion.div>
      </div>

      {/* Tasks and Income */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Tasks */}
        <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">المهام الحالية</h2>
            <span className="text-sm text-gray-400">
              {mockUserData.tasks.length} مهام
            </span>
          </div>
          <div className="space-y-4">
            {mockUserData.tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ x: 4 }}
                className="p-3 bg-gray-800/50 rounded-lg border border-gray-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {task.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-500/10 text-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {task.priority === "high"
                      ? "عالية"
                      : task.priority === "medium"
                      ? "متوسطة"
                      : "منخفضة"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {new Date(task.dueDate).toLocaleDateString("ar")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-800 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          task.status === "completed"
                            ? "bg-green-500"
                            : task.status === "in_progress"
                            ? "bg-orange-500"
                            : "bg-gray-600"
                        }`}
                        style={{ width: `${task.completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">
                      {task.completionPercentage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Income Sources */}
        <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">
              إدخال إلى الشركة
            </h2>
            <span className="text-sm text-gray-400">
              {mockUserData.income.length} مصادر
            </span>
          </div>
          <div className="space-y-4">
            {mockUserData.income.map((income) => (
              <motion.div
                key={income.id}
                whileHover={{ x: 4 }}
                className="p-3 bg-gray-800/50 rounded-lg border border-gray-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">
                      {income.description}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {income.source === "course"
                        ? "كورس"
                        : income.source === "fyp"
                        ? "مشروع تخرج"
                        : income.source === "contract"
                        ? "عقد"
                        : "مشروع"}
                    </p>
                  </div>
                  <span className="text-green-500 font-medium">
                    ${income.amount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(income.date).toLocaleDateString("ar")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Hours Chart */}
      <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">سجل ساعات العمل</h2>
          <span className="text-sm text-gray-400">
            معدل يومي: {(mockUserData.stats.monthlyWorkHours / 20).toFixed(1)}{" "}
            ساعات
          </span>
        </div>
        {/* Work Hours List */}
        <div className="space-y-4">
          {mockUserData.workHours.map((entry, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              className="p-3 bg-gray-800/50 rounded-lg border border-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium text-white">
                      {entry.hours} ساعات
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{entry.project}</p>
                  <p className="text-sm text-gray-400">{entry.description}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(entry.date).toLocaleDateString("ar")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              مهام الشركة الداخلية
            </h2>
            <p className="text-sm text-gray-400">
              المكافأة المتوقعة: $
              {mockInternalTasks
                .filter((task) => task.status === "completed")
                .reduce((sum, task) => sum + task.bonusAmount, 0)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-gray-800/50 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">
                {
                  mockInternalTasks.filter(
                    (task) => task.status === "completed"
                  ).length
                }{" "}
                مكتملة
              </span>
            </div>
            <div className="px-3 py-1 bg-gray-800/50 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-400">
                {
                  mockInternalTasks.filter(
                    (task) => task.status === "in_progress"
                  ).length
                }{" "}
                جارية
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mockInternalTasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ x: 4 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-white flex items-center gap-2">
                    {task.title}
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        task.type === "development"
                          ? "bg-blue-500/10 text-blue-500"
                          : task.type === "content"
                          ? "bg-purple-500/10 text-purple-500"
                          : task.type === "marketing"
                          ? "bg-pink-500/10 text-pink-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {task.type === "development"
                        ? "تطوير"
                        : task.type === "content"
                        ? "محتوى"
                        : task.type === "marketing"
                        ? "تسويق"
                        : "تدريب"}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-500">
                    +${task.bonusAmount}
                  </div>
                  <div className="text-sm text-gray-400">مكافأة</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      يستحق: {new Date(task.dueDate).toLocaleDateString("ar")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      تم التعيين:{" "}
                      {new Date(task.assignedDate).toLocaleDateString("ar")}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === "completed"
                      ? "bg-green-500/10 text-green-500"
                      : task.status === "in_progress"
                      ? "bg-orange-500/10 text-orange-500"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {task.status === "completed"
                    ? "مكتمل"
                    : task.status === "in_progress"
                    ? "قيد التنفيذ"
                    : "معلق"}
                </span>
              </div>

              {task.status === "in_progress" && (
                <div className="mt-4 flex items-center gap-3">
                  <button className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
                    إكمال المهمة
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                    طلب مساعدة
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm text-gray-400">
                إجمالي المكافآت المحتملة
              </div>
              <div className="text-xl font-medium text-white">
                $
                {mockInternalTasks.reduce(
                  (sum, task) => sum + task.bonusAmount,
                  0
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">نسبة الإنجاز</div>
              <div className="text-xl font-medium text-green-500">
                {Math.round(
                  (mockInternalTasks.filter(
                    (task) => task.status === "completed"
                  ).length /
                    mockInternalTasks.length) *
                    100
                )}
                %
              </div>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{
                width: `${
                  (mockInternalTasks.filter(
                    (task) => task.status === "completed"
                  ).length /
                    mockInternalTasks.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Income Distribution */}
        <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            توزيع الدخل
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">عائد شخصي</span>
                <span className="text-white">
                  ${mockUserData.stats.personalIncome}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{
                    width: `${
                      (mockUserData.stats.personalIncome /
                        mockUserData.stats.totalIncome) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">عائد الشركة</span>
                <span className="text-white">
                  ${mockUserData.stats.companyDeposit}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div
                  className="h-2 bg-orange-500 rounded-full"
                  style={{
                    width: `${
                      (mockUserData.stats.companyDeposit /
                        mockUserData.stats.totalIncome) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Task Completion Stats */}
        <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            إحصائيات المهام
          </h3>
          <div className="mt-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">مكتملة</p>
                <p className="text-lg font-medium text-white">
                  {mockUserData.stats.completedTasks}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Timer className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">قيد التنفيذ</p>
                <p className="text-lg font-medium text-white">
                  {mockUserData.stats.totalTasks -
                    mockUserData.stats.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Review */}
        <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            تقييم الأداء
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">معدل إنجاز المهام</span>
              <span className="text-lg font-medium text-green-500">
                {mockUserData.stats.taskSuccessRate}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">معدل الحضور</span>
              <span className="text-lg font-medium text-blue-500">
                {(
                  (mockUserData.stats.monthlyWorkHours /
                    mockUserData.stats.targetWorkHours) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">الإنتاجية</span>
              <span className="text-lg font-medium text-orange-500">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
