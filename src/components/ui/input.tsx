import * as React from "react";

import { cn } from "@/components/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            className={cn(
              "block text-sm font-medium text-zinc-900 dark:text-zinc-100",
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };