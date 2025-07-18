import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/global.models";

interface Props {
  users: User[];
}

export const UserOverview: React.FC<Props> = ({ users }) => {
  const totalManagers = users.filter((u) => u.role === "Manager").length;
  const totalEmployees = users.filter((u) => u.role === "Employee").length;
  const totalUsers = users.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <p className="text-xl font-semibold text-blue-600">Total Managers</p>
          <p className="text-3xl font-bold text-blue-700 ">{totalManagers}</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 ">
        <CardContent className="p-4">
          <p className="text-xl font-semibold text-green-600">
            Total Employees
          </p>
          <p className="text-3xl font-bold text-green-700">{totalEmployees}</p>
        </CardContent>
      </Card>
      <Card className="bg-purple-50">
        <CardContent className="p-4">
          <p className="text-xl font-semibold text-purple-600">Total Users</p>
          <p className="text-3xl font-bold text-purple-700">{totalUsers}</p>
        </CardContent>
      </Card>
    </div>
  );
};
