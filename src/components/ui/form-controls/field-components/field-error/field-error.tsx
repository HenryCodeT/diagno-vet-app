import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldErrorVariants = cva(
  "text-sm text-font-error font-medium transition-colors duration-150",
  {
    variants: {
      inputSize: {
        small: "text-xs",
        default: "text-sm",
        large: "text-base",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof fieldErrorVariants>
>(({ className, inputSize, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(fieldErrorVariants({ inputSize, className }))}
      {...props}
    />
  );
});

FieldError.displayName = "FieldError";

export { FieldError, fieldErrorVariants };
