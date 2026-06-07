import { cn } from "@/lib/utils";

type AlertProps = {
  children: React.ReactNode;
  variant?: "error" | "success" | "info";
  className?: string;
};

const variantClasses: Record<NonNullable<AlertProps["variant"]>, string> = {
  error: "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  info: "border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
};

export function Alert({
  children,
  variant = "info",
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
