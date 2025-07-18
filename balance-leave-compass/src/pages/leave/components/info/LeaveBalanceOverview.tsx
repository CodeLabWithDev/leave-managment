import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalance } from "@/types/global.models";

interface Props {
  balances: LeaveBalance[];
}

export const LeaveBalanceOverview: React.FC<Props> = ({ balances }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {balances.map((balance) => (
      <Card key={balance.type}>
        <CardHeader>
          <CardTitle>{balance.type} Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total: {balance.total}</p>
          <p>Used: {balance.used}</p>
          <p>Remaining: {balance.total - balance.used}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);
