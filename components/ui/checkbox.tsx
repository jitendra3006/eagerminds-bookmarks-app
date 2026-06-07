import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
};

export function Checkbox({
  label,
  description,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? props.name;

  return (
    <div className="flex items-start gap-3">
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          "mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-600 dark:bg-zinc-950",
          className,
        )}
        {...props}
      />
      <div>
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          {label}
        </label>
        {description ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
