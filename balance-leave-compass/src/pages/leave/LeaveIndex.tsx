import { useState } from "react";
import { Leave, LeaveBalance } from "@/types/global.models";
import { LeaveBalanceOverview } from "./components/info/LeaveBalanceOverview";
import { LeaveList } from "./components/list/LeaveList";
import { LeaveForm } from "./components/form/LeaveForm";
import { Button } from "@/components/ui/button";

const fakeBalances: LeaveBalance[] = [
  { type: "Annual", total: 18, used: 5 },
  { type: "Sick", total: 8, used: 2 },
  { type: "Personal", total: 6, used: 1 },
];

const fakeLeaves: Leave[] = [
  {
    id: 1,
    title: "Vacation",
    type: "Annual",
    startDate: "2025-08-01",
    endDate: "2025-08-05",
    isHalfDay: false,
    reason: "Goa trip",
  },
  {
    id: 2,
    title: "Fever",
    type: "Sick",
    startDate: "2025-07-10",
    endDate: "2025-07-10",
    isHalfDay: true,
    reason: "Sick leave",
  },
];

export default function MyLeavePage() {
  const [leaves, setLeaves] = useState<Leave[]>(fakeLeaves);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveLeave = (leave: Leave) => {
    setLeaves((prev) =>
      leave.id
        ? prev.map((l) => (l.id === leave.id ? leave : l))
        : [...prev, { ...leave, id: prev.length + 1 }]
    );
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Leave</h2>
      <LeaveBalanceOverview balances={fakeBalances} />

      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingLeave(null);
            setIsFormOpen(true);
          }}
        >
          + Apply Leave
        </Button>
      </div>

      <LeaveList
        leaves={leaves}
        onEdit={(leave: Leave) => {
          setEditingLeave(leave);
          setIsFormOpen(true);
        }}
      />

      <LeaveForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveLeave}
        initialData={editingLeave}
      />
    </div>
  );
}
