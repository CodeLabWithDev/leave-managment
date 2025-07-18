// Js Dependencies
import { useState, useEffect } from "react";
import axios from "axios";

// Types and models
import { User } from "@/types/global.models";

// Components
import { UserOverview } from "./components/info/UserOverview";
import { UserList } from "./components/list/UserList";
import { UserForm } from "./components/form/UserForm";
import { useAppToast } from "@/hooks/useAppToast";

const API_URL = import.meta.env.VITE_API_URL; // your backend URL

export default function UserModule() {
  const [users, setUsers] = useState<User[]>([]);
  const [managers, setManagers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { showToast } = useAppToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [usersRes, managersRes] = await Promise.all([
          axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/users/managers`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(usersRes.data);
        setManagers(managersRes.data);
      } catch (err) {
        showToast("error", "Error!", "Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleSaveUser = (user: User) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id);
      if (exists) {
        return prev.map((u) => (u.id === user.id ? user : u));
      } else {
        return [...prev, user];
      }
    });
  };

  const handleDeleteUser = (user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    setIsFormOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      <UserOverview users={users} />

      {/* Add User */}
      <div className="flex justify-end">
        <button
          className="bg-primary text-white rounded p-2"
          onClick={() => {
            setEditingUser(null);
            setIsFormOpen(true);
          }}
        >
          + Add User
        </button>
      </div>

      {/* User List */}
      <UserList
        users={users}
        onEdit={(user: User) => {
          setEditingUser(user);
          setIsFormOpen(true);
        }}
      />

      {/* User Form */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
        initialData={editingUser}
        managers={managers}
      />
    </div>
  );
}
