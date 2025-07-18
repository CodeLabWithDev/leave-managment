import * as React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Loading({ className, ...props }: LoadingProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
        className
      )}
      {...props}
    >
      <Loader className="h-10 w-10 animate-spin text-primary" />
      <span className="mt-2 text-sm text-muted-foreground">Loading...</span>
    </div>
  );
}
