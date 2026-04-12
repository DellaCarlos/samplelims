import { cn } from "../lib/utils";

export function StatusIndicator({ active, showLabel = false, className }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-block h-2.5 w-2.5 rounded-full",
          active ? "bg-success" : "bg-destructive"
        )}
      />
      {showLabel && (
        <span className={cn("text-sm", active ? "text-success" : "text-destructive")}>
          {active ? "Active" : "Inactive"}
        </span>
      )}
    </span>
  );
}