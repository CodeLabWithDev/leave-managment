import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leave, LeaveType } from "@/types/global.models";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leave: Leave) => void;
  initialData: Leave | null;
}

const leaveTypes: LeaveType[] = ["Annual", "Sick", "Personal"];

export const LeaveForm: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const { register, handleSubmit, control, reset } = useForm<Leave>({
    defaultValues: initialData ?? {
      title: "",
      startDate: "",
      endDate: "",
      type: "Annual",
      isHalfDay: false,
      reason: "",
    },
  });

  useEffect(() => {
    reset(
      initialData ?? {
        title: "",
        startDate: "",
        endDate: "",
        type: "Annual",
        isHalfDay: false,
        reason: "",
      }
    );
  }, [initialData, reset, isOpen]);

  const onSubmit = (data: Leave) => {
    if (initialData?.id) {
      data.id = initialData.id;
    }
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Leave" : "Apply Leave"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Title"
            {...register("title", { required: true })}
          />

          {/* Leave Type */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Input type="date" {...register("startDate", { required: true })} />
          <Input type="date" {...register("endDate", { required: true })} />

          {/* Full or Half day */}
          <Controller
            control={control}
            name="isHalfDay"
            render={({ field }) => (
              <Select
                value={field.value ? "half" : "full"}
                onValueChange={(val) => field.onChange(val === "half")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Full or Half Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Day</SelectItem>
                  <SelectItem value="half">Half Day</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Input placeholder="Reason" {...register("reason")} />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
