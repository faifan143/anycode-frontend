// components/admin/UserTargetsMonitor.tsx
import { FC } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Mail,
} from "lucide-react";
import { UserTarget } from "@/types/admin.type";

interface UserTargetsMonitorProps {
  users: UserTarget[];
  onSendNotification: (userId: string) => void;
  onUpdateTarget: (userId: string, newTarget: number) => void;
}

export const UserTargetsMonitor: FC<UserTargetsMonitorProps> = ({
  users,
  onSendNotification,
  onUpdateTarget,
}) => {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">متوسط الإنجاز</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {Math.round(
                  users.reduce(
                    (acc, user) =>
                      acc + (user.currentProgress / user.monthlyTarget) * 100,
                    0
                  ) / users.length
                )}
                %
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Target className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">المهام المكتملة</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {users.reduce((acc, user) => acc + user.tasks.completed, 0)}/
                {users.reduce((acc, user) => acc + user.tasks.total, 0)}
              </h3>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">المستخدمون النشطون</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {users.length}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-gray-900/90 rounded-xl border border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">أداء الموظفين</h2>
        </div>
        <div className="p-4 space-y-4">
          {users.map((user) => (
            <motion.div
              key={user.userId}
              whileHover={{ x: 4 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* User Info */}
                <div className="space-y-2">
                  <h3 className="font-medium text-white">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.role}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>
                      آخر نشاط: {new Date(user.lastActive).toLocaleString("ar")}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">التقدم الشهري</span>
                    <span className="text-white">
                      ${user.currentProgress.toLocaleString()} / $
                      {user.monthlyTarget.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        user.currentProgress / user.monthlyTarget >= 0.8
                          ? "bg-green-500"
                          : user.currentProgress / user.monthlyTarget >= 0.5
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${
                          (user.currentProgress / user.monthlyTarget) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() =>
                      onUpdateTarget(user.userId, user.monthlyTarget)
                    }
                    className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600"
                  >
                    <Target className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onSendNotification(user.userId)}
                    className="p-2 bg-orange-500/20 rounded-lg text-orange-500 hover:bg-orange-500/30"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Tasks Progress */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-400">
                    المهام المكتملة: {user.tasks.completed}/{user.tasks.total}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-400">
                    نسبة الإنجاز:{" "}
                    {Math.round(
                      (user.currentProgress / user.monthlyTarget) * 100
                    )}
                    %
                  </span>
                </div>
              </div>

              {/* Warning for Low Performance */}
              {user.currentProgress / user.monthlyTarget < 0.5 && (
                <div className="mt-4 p-2 bg-red-500/10 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">
                    تحذير: نسبة الإنجاز منخفضة
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
