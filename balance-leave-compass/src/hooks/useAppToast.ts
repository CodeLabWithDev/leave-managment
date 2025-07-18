// hooks/useAppToast.ts
import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning" | "default";

export function useAppToast() {
  const showToast = (
    type: ToastType,
    message: string,
    description?: string
  ) => {
    // always dismiss existing toasts first
    toast.dismiss();

    switch (type) {
      case "success":
        toast.success(message, { description });
        break;
      case "error":
        toast.error(message, { description });
        break;
      case "info":
        toast.info(message, { description });
        break;
      case "warning":
        toast.warning(message, { description });
        break;
      default:
        toast(message, { description });
        break;
    }
  };

  const dismissAll = () => toast.dismiss();

  return { showToast, dismissAll };
}
