// components/admin/FundMonitorDashboard.tsx
import { Fund } from "@/types/admin.type";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  DollarSign,
  Download,
  FileText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { FC, useState } from "react";

interface FundMonitorDashboardProps {
  funds: Fund[];
  onExportReport: () => void;
  onViewTransactions: (fundId: string) => void;
}

export const FundMonitorDashboard: FC<FundMonitorDashboardProps> = ({
  funds,
  onExportReport,
  onViewTransactions,
}) => {
  const [selectedFund, setSelectedFund] = useState<string>(funds[0]?.id);
  const [timeRange, setTimeRange] = useState("month");

  const currentFund = funds.find((f) => f.id === selectedFund);
  const totalFunds = funds.reduce((sum, fund) => sum + fund.balance, 0);
  const totalTarget = funds.reduce((sum, fund) => sum + fund.monthlyTarget, 0);
  const totalProgress = funds.reduce((sum, fund) => sum + fund.currentMonth, 0);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">إجمالي الصناديق</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${totalFunds.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500">
              +{Math.round((totalProgress / totalTarget) * 100)}%
            </span>
            <span className="text-gray-400">من الهدف</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">الأهداف الشهرية</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${totalTarget.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BarChart className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-gray-400">المحقق:</span>
            <span className="text-blue-500">
              ${totalProgress.toLocaleString()}
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 flex items-center justify-between"
        >
          <button
            onClick={onExportReport}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>تصدير التقرير</span>
          </button>
          <span className="text-sm text-gray-500">Excel</span>
        </motion.div>
      </div>

      {/* Fund Selector and Time Range */}
      <div className="flex justify-between items-center">
        <div className="space-x-2 space-x-reverse">
          {funds.map((fund) => (
            <button
              key={fund.id}
              onClick={() => setSelectedFund(fund.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedFund === fund.id
                  ? "bg-orange-500/90 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {fund.name}
            </button>
          ))}
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
          <option value="week">أسبوع</option>
          <option value="month">شهر</option>
          <option value="quarter">ربع سنوي</option>
          <option value="year">سنة</option>
        </select>
      </div>

      {/* Selected Fund Details */}
      {currentFund && (
        <div className="bg-gray-900/90 rounded-xl border border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                {currentFund.name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  currentFund.currentMonth >= currentFund.monthlyTarget
                    ? "bg-green-500/10 text-green-500"
                    : currentFund.currentMonth >=
                      currentFund.monthlyTarget * 0.7
                    ? "bg-orange-500/10 text-orange-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {Math.round(
                  (currentFund.currentMonth / currentFund.monthlyTarget) * 100
                )}
                % من الهدف
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400">الرصيد الحالي</div>
                <div className="text-xl font-medium text-white mt-1">
                  ${currentFund.balance.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400">الهدف الشهري</div>
                <div className="text-xl font-medium text-white mt-1">
                  ${currentFund.monthlyTarget.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400">المحقق هذا الشهر</div>
                <div className="text-xl font-medium text-white mt-1">
                  ${currentFund.currentMonth.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">التقدم نحو الهدف</span>
                <span className="text-white">
                  {Math.round(
                    (currentFund.currentMonth / currentFund.monthlyTarget) * 100
                  )}
                  %
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    currentFund.currentMonth >= currentFund.monthlyTarget
                      ? "bg-green-500"
                      : currentFund.currentMonth >=
                        currentFund.monthlyTarget * 0.7
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (currentFund.currentMonth / currentFund.monthlyTarget) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">آخر المعاملات</h3>
                <button
                  onClick={() => onViewTransactions(currentFund.id)}
                  className="text-orange-500 hover:text-orange-400 text-sm flex items-center gap-1"
                >
                  عرض الكل
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {currentFund.transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-3 bg-gray-800/30 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "income"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-white">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(transaction.date).toLocaleDateString("ar")}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fund Analytics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Performance */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-white font-medium mb-3">الأداء الشهري</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">الهدف</span>
                    <span className="text-sm text-white">
                      ${currentFund.monthlyTarget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">المحقق</span>
                    <span className="text-sm text-white">
                      ${currentFund.currentMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">المتبقي</span>
                    <span className="text-sm text-white">
                      $
                      {Math.max(
                        0,
                        currentFund.monthlyTarget - currentFund.currentMonth
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Summary */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-white font-medium mb-3">ملخص المعاملات</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-400">دخل</span>
                    </div>
                    <span className="text-sm text-green-500">
                      +$
                      {currentFund.transactions
                        .filter((t) => t.type === "income")
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-400">مصروفات</span>
                    </div>
                    <span className="text-sm text-red-500">
                      -$
                      {currentFund.transactions
                        .filter((t) => t.type === "expense")
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-3">
              <button
                className="px-4 py-2 bg-orange-500/90 hover:bg-orange-500 text-white rounded-lg transition-colors flex items-center gap-2"
                onClick={() => onViewTransactions(currentFund.id)}
              >
                <FileText className="h-4 w-4" />
                تقرير مفصل
              </button>
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                onClick={() => onExportReport()}
              >
                <Download className="h-4 w-4" />
                تصدير البيانات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
