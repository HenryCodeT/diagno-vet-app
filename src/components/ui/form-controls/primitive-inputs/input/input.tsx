import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border-2 border-border-primary bg-bg-primary px-4 py-3 text-base text-font-primary transition-colors duration-300 file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-font-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60 aria-invalid:border-border-error aria-invalid:focus-visible:ring-red-60",
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

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    hasError?: boolean;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, className }))}
        ref={ref}
        aria-invalid={hasError ?? props["aria-invalid"]}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
