import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldDescriptionVariants = cva(
  "text-sm text-font-secondary transition-colors duration-150",
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

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof fieldDescriptionVariants>
>(({ className, inputSize, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(fieldDescriptionVariants({ inputSize, className }))}
      {...props}
    />
  );
});

FieldDescription.displayName = "FieldDescription";

export { FieldDescription, fieldDescriptionVariants };
