import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border-2 border-border-primary bg-bg-primary px-4 py-3 text-base text-font-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-80 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60 aria-invalid:border-border-error aria-invalid:focus:ring-red-60",
  {
    variants: {
      inputSize: {
        small: "h-8 px-3 py-2 text-sm",
        default: "h-10 px-4 py-3 text-base",
        large: "h-12 px-6 py-4 text-xl",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> &
    VariantProps<typeof selectVariants>
>(({ className, inputSize, children, ...props }, ref) => {
  return (
    <select
      className={cn(selectVariants({ inputSize, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

export { Select, selectVariants };
