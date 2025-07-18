import axios from "axios";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
const API_URL = import.meta.env.VITE_API_URL;

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { useAppToast } from "@/hooks/useAppToast";

// Types and models
import { User } from "@/types/global.models";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  onDelete: (user: User) => void;
  initialData: User | null;
  managers: User[];
}

export const UserForm: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  managers,
}) => {
  const { showToast } = useAppToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialData ?? {
      name: "",
      email: "",
      role: "Employee",
      managerId: undefined,
    },
  });

  const role = watch("role");

  useEffect(() => {
    reset(
      initialData ?? {
        name: "",
        email: "",
        role: "Employee",
        managerId: undefined,
      }
    );
  }, [initialData, reset, isOpen]);

  useEffect(() => {
    if (role !== "Employee") {
      setValue("managerId", undefined);
    }
  }, [role, setValue]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const onSubmit = async (data: User) => {
    if (data.role !== "Employee") {
      data.managerId = undefined;
    } else {
      data.managerId = data.managerId ? Number(data.managerId) : undefined;
    }

    try {
      let savedUser;

      if (initialData?.id) {
        // Edit mode: build patch object with only changed fields
        const patch: Partial<User> = {};

        (["name", "email", "password"] as const).forEach((key) => {
          if (data[key] !== initialData[key]) {
            patch[key] = data[key];
          }
        });

        // Safely handle role: ensure it's valid
        if (data.role !== initialData.role) {
          if (
            data.role === "Admin" ||
            data.role === "Manager" ||
            data.role === "Employee"
          ) {
            patch.role = data.role;
          }
        }

        // managerId fix (compare as number | undefined)
        if (data.managerId !== initialData.managerId) {
          patch.managerId = data.managerId;
        }

        if (Object.keys(patch).length === 0) {
          showToast("info", "No Changes", "No fields were updated.");
          onClose();
          return;
        }

        const res = await axios.put(
          `${API_URL}/users/${initialData.id}`,
          patch,
          { headers: getAuthHeaders() }
        );
        savedUser = res.data;

        showToast(
          "success",
          "Updated Successfully",
          `User - ${savedUser.name} updated!`
        );
      } else {
        // Create mode: send full data
        const res = await axios.post(`${API_URL}/users`, data, {
          headers: getAuthHeaders(),
        });
        savedUser = res.data;

        showToast(
          "success",
          "Created Successfully",
          `User - ${savedUser.name} added!`
        );
      }

      onSave(savedUser);
      onClose();
    } catch (error) {
      showToast("error", "Error", "Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    console.log(!initialData?.id);

    if (!initialData?.id) return;
    try {
      await axios.delete(`${API_URL}/users/${initialData.id}`, {
        headers: getAuthHeaders(),
      });
      onDelete(initialData);
      onClose();
      showToast(
        "success",
        "Deleted Successfully",
        `User - ${initialData.name} Removed!`
      );
    } catch (error) {
      showToast("error", "Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Select */}
          <div>
            <Controller
              control={control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-destructive text-xs mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Manager Select (only when Employee) */}
          {role === "Employee" && (
            <div>
              <Controller
                control={control}
                name="managerId"
                rules={{ required: "Manager is required for Employee" }}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value: string) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={String(manager.id)}>
                          {manager.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.managerId && (
                <p className="text-destructive text-xs mt-1">
                  {errors.managerId.message}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between space-x-2">
            {initialData && (
              <Button
                variant="destructive"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}

            <div className="flex gap-2 ml-auto">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
