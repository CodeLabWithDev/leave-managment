import { User } from "@/types/global.models";

export const userList: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    contactNumber: "1234567890",
    role: "Manager",
    createdAt: "06-15-2017",
    updatedAt: null,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    contactNumber: "9876543210",
    role: "Employee",
    managerId: 1,
    createdAt: "06-15-2017",
    updatedAt: null,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    contactNumber: "5555555555",
    role: "Admin",
    createdAt: "06-15-2017",
    updatedAt: null,
  },
];

export const managers: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    contactNumber: "1234567890",
    role: "Manager",
    createdAt: "06-15-2017",
    updatedAt: null,
  },
];
