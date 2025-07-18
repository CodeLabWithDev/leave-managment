"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

// Icons
import { ArrowUpDown } from "lucide-react";

// Types
import { User } from "@/types/global.models";
interface Props {
  users: User[];
  onEdit: (user: User) => void;
}


export const UserList: React.FC<Props> = ({ users, onEdit }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          className="font-medium flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    {
      accessorKey: "manager",
      header: "Manager Name",
      cell: ({ row }) => row?.original.manager?.name ?? "-",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button size="sm" onClick={() => onEdit(row.original)}>
          Edit
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
