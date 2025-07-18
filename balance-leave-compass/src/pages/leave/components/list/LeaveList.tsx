import React from "react";
import { Leave } from "@/types/global.models";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  leaves: Leave[];
  onEdit: (leave: Leave) => void;
}

export const LeaveList: React.FC<Props> = ({ leaves, onEdit }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Dates</TableHead>
        <TableHead>Half Day</TableHead>
        <TableHead>Reason</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {leaves.map((leave) => (
        <TableRow key={leave.id}>
          <TableCell>{leave.title}</TableCell>
          <TableCell>{leave.type}</TableCell>
          <TableCell>
            {leave.startDate} → {leave.endDate}
          </TableCell>
          <TableCell>{leave.isHalfDay ? "Yes" : "No"}</TableCell>
          <TableCell>{leave.reason}</TableCell>
          <TableCell>
            <Button size="sm" onClick={() => onEdit(leave)}>
              Edit
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
