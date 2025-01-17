// components/Tabs.tsx

import { fundCategories, Tab } from "@/types/home.type";
import { motion } from "framer-motion";

interface TabsProps {
  tabs: Tab[];
  activeTab: fundCategories;
  onTabChange: (tabId: fundCategories) => void;
}

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <div
      className="flex space-x-2 bg-gray-900/90 p-2 rounded-xl border border-gray-800"
      dir="rtl"
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === tab.id
              ? "bg-orange-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};
