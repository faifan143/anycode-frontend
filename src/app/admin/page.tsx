"use client";
import { ExpenseModal } from "@/components/common/admin/ExpenseModal";
import { FundMonitorDashboard } from "@/components/common/admin/FundMonitorDashboard";
import { NotificationsManager } from "@/components/common/admin/NotificationsManager";
import { TransferModal } from "@/components/common/admin/TransferModal";
import { UserTargetsMonitor } from "@/components/common/admin/UserTargetsMonitor";
import {
  mockFunds,
  mockNotifications,
  mockUserTargets,
} from "@/data/mock-admin";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  BookOpen,
  Building2,
  DollarSign,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const AdminPanel = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<
    "funds" | "users" | "notifications"
  >("funds");

  // Modal states
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Calculate totals
  const totalBalance = mockFunds.reduce((sum, fund) => sum + fund.balance, 0);
  const companyFund = mockFunds.find((f) => f.type === "company")!;
  const additionalFund = mockFunds.find((f) => f.type === "additional")!;
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  const renderTabContent = () => {
    switch (activeTab) {
      case "funds":
        return (
          <FundMonitorDashboard
            funds={mockFunds}
            onExportReport={() => console.log("Exporting report")}
            onViewTransactions={(id) => console.log("Viewing transactions", id)}
          />
        );
      case "users":
        return (
          <UserTargetsMonitor
            users={mockUserTargets}
            onSendNotification={(userId) =>
              console.log("Sending notification to", userId)
            }
            onUpdateTarget={(userId, newTarget) =>
              console.log("Updating target", userId, newTarget)
            }
          />
        );
      case "notifications":
        return (
          <NotificationsManager
            notifications={mockNotifications}
            onSendNotification={(notification) =>
              console.log("Sending notification", notification)
            }
            onMarkAsRead={(id) => console.log("Marking as read", id)}
            onDeleteNotification={(id) =>
              console.log("Deleting notification", id)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsTransferModalOpen(true)}
            className="px-4 py-2 bg-blue-500/90 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <ArrowRightLeft size={18} />
            تحويل للمصروفات
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpenseModalOpen(true)}
            className="px-4 py-2 bg-orange-500/90 hover:bg-orange-500 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            إضافة مصروف
          </motion.button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">إجمالي الصناديق</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${totalBalance.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500">+15%</span>
            <span className="text-gray-400">هذا الشهر</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">صندوق الشركة</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${companyFund.balance.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">المستخدمون النشطون</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {mockUserTargets.length}
              </h3>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/90 p-4 rounded-xl border border-gray-800"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">صندوق المصروفات</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                ${additionalFund.balance.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8 space-x-reverse" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("funds")}
            className={`pb-4 px-1 relative ${
              activeTab === "funds"
                ? "text-orange-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            الصناديق
            {activeTab === "funds" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-4 px-1 relative ${
              activeTab === "users"
                ? "text-orange-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            المستخدمون
            {activeTab === "users" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`pb-4 px-1 relative flex items-center gap-2 ${
              activeTab === "notifications"
                ? "text-orange-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            الإشعارات
            {unreadNotifications > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                {unreadNotifications}
              </span>
            )}
            {activeTab === "notifications" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
              />
            )}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>

      {/* Modals */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={(expense) => {
          console.log("New expense:", expense);
          setIsExpenseModalOpen(false);
        }}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSubmit={(transfer) => {
          console.log("New transfer:", transfer);
          setIsTransferModalOpen(false);
        }}
        companyFund={companyFund}
        additionalFund={additionalFund}
      />
    </div>
  );
};

export default AdminPanel;
