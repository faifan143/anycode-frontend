/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/NotificationsManager.tsx
import { AdminNotification } from "@/types/admin.type";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Filter,
  Info,
  Send,
  X,
} from "lucide-react";
import { FC, useState } from "react";

interface NotificationsManagerProps {
  notifications: AdminNotification[];
  onSendNotification: (notification: Partial<AdminNotification>) => void;
  onMarkAsRead: (notificationId: string) => void;
  onDeleteNotification: (notificationId: string) => void;
}

export const NotificationsManager: FC<NotificationsManagerProps> = ({
  notifications,
  onSendNotification,
  onMarkAsRead,
  onDeleteNotification,
}) => {
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as const,
    priority: "medium" as const,
  });

  const [filter, setFilter] = useState("all");

  const getNotificationIcon = (type: AdminNotification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* New Notification Form */}
      <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          إرسال إشعار جديد
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="عنوان الإشعار"
            value={newNotification.title}
            onChange={(e) =>
              setNewNotification((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
          <textarea
            placeholder="نص الإشعار"
            value={newNotification.message}
            onChange={(e) =>
              setNewNotification((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
            rows={3}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={newNotification.type}
              onChange={(e) =>
                setNewNotification((prev) => ({
                  ...prev,
                  type: e.target.value as any,
                }))
              }
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
            >
              <option value="info">معلومات</option>
              <option value="success">نجاح</option>
              <option value="warning">تحذير</option>
              <option value="error">خطأ</option>
            </select>
            <select
              value={newNotification.priority}
              onChange={(e) =>
                setNewNotification((prev) => ({
                  ...prev,
                  priority: e.target.value as any,
                }))
              }
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
            >
              <option value="low">منخفضة</option>
              <option value="medium">متوسطة</option>
              <option value="high">عالية</option>
            </select>
          </div>
          <button
            onClick={() => {
              onSendNotification({
                ...newNotification,
                date: new Date().toISOString(),
                read: false,
              });
              setNewNotification({
                title: "",
                message: "",
                type: "info",
                priority: "medium",
              });
            }}
            className="w-full px-4 py-2 bg-orange-500/90 hover:bg-orange-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send className="h-5 w-5" />
            إرسال الإشعار
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-gray-900/90 rounded-xl border border-gray-800">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">الإشعارات</h2>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
            >
              <option value="all">الكل</option>
              <option value="unread">غير مقروء</option>
              <option value="success">نجاح</option>
              <option value="warning">تحذير</option>
              <option value="error">خطأ</option>
            </select>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              whileHover={{ x: 4 }}
              className={`p-4 rounded-lg border ${
                notification.read
                  ? "bg-gray-800/30 border-gray-700"
                  : "bg-gray-800/50 border-gray-600"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-white flex items-center gap-2">
                      {notification.title}
                      {!notification.read && (
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-500 text-xs rounded-full">
                          جديد
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-500">
                        {new Date(notification.date).toLocaleString("ar")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteNotification(notification.id)}
                    className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">لا توجد إشعارات</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
