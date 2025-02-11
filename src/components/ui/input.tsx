import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  message?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, message, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            message
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-input focus-visible:ring-ring",
            className
          )}
          ref={ref}
          {...props}
        />
        {message && (
          <p className="absolute left-2 mt-1 text-xs text-red-500">{message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
