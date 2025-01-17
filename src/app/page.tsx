// page.tsx
"use client";
import { AddIncomeModal } from "@/components/common/home/AddIncomeModal";
import { IncomeTable } from "@/components/common/home/IncomeTable";
import { ShiftControls } from "@/components/common/home/ShiftControls";
import {
  CloseShiftModal,
  OpenShiftModal,
} from "@/components/common/home/ShiftModals";
import { Tabs } from "@/components/common/home/Tabs";
import { getCurrentShift, getIncomeByCategory } from "@/data/mock-data";
import { fundCategories, Shift, Tab } from "@/types/home.type";
import { useEffect, useState } from "react";

const tabs: Tab[] = [
  { id: "course", label: "كورسات" },
  { id: "fyp", label: "مشاريع تخرج" },
  { id: "project", label: "مشاريع نظامية" },
  { id: "contract", label: "عقود" },
];

export default function Page() {
  const [currentShift, setCurrentShift] = useState<Shift | null>(
    getCurrentShift() as Shift
  );
  const [activeTab, setActiveTab] = useState<fundCategories>("course");
  const [incomeData, setIncomeData] = useState(getIncomeByCategory("courses"));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isOpenShiftModalOpen, setIsOpenShiftModalOpen] = useState(false);
  const [isCloseShiftModalOpen, setIsCloseShiftModalOpen] = useState(false);

  useEffect(() => {
    setIncomeData(getIncomeByCategory(activeTab));
  }, [activeTab]);
  const handleOpenShift = () => {
    setIsOpenShiftModalOpen(true);
  };

  const handleCloseShift = () => {
    setIsCloseShiftModalOpen(true);
  };

  const handleConfirmOpenShift = () => {
    // Add your logic here to open a new shift
    setCurrentShift({
      id: Date.now().toString(),
      totalIncome: 0,
      status: "open",
      startTime: Date.now(),
    });
    setIsOpenShiftModalOpen(false);
  };

  const handleConfirmCloseShift = () => {
    // Add your logic here to close the current shift
    setCurrentShift(null);
    setIsCloseShiftModalOpen(false);
  };

  const handleAddIncome = (data: {
    category: string;
    amount: number;
    description: string;
  }) => {
    console.log(data);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <ShiftControls
        currentShift={currentShift!}
        onOpenShift={handleOpenShift}
        onCloseShift={handleCloseShift}
      />

      {currentShift && (
        <>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <IncomeTable
            data={incomeData.filter((income) => income.category === activeTab)}
            category={activeTab}
            onAddIncome={() => setIsAddModalOpen(true)}
          />
        </>
      )}

      <OpenShiftModal
        isOpen={isOpenShiftModalOpen}
        onClose={() => setIsOpenShiftModalOpen(false)}
        onConfirm={handleConfirmOpenShift}
      />

      <CloseShiftModal
        isOpen={isCloseShiftModalOpen}
        onClose={() => setIsCloseShiftModalOpen(false)}
        onConfirm={handleConfirmCloseShift}
        totalIncome={currentShift?.totalIncome || 0}
      />
      <AddIncomeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddIncome}
        activeCategory={activeTab}
      />
    </div>
  );
}
