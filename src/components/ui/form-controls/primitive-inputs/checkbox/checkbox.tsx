import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer relative h-5 w-5 shrink-0 rounded-sm border-2 border-border-primary transition-all duration-150 focus-visible:outline-none focus-visible:outline-medium focus-visible:outline-offset-medium focus-visible:outline-transparent focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:opacity-60 data-[state=checked]:bg-primary-80 data-[state=checked]:border-transparent data-[state=checked]:text-font-inverse data-[state=indeterminate]:bg-primary-80 data-[state=indeterminate]:border-transparent data-[state=indeterminate]:text-font-inverse aria-invalid:border-border-error aria-invalid:focus-visible:ring-red-60"
);

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  hasError?: boolean;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, hasError, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ className }))}
    aria-invalid={hasError || props["aria-invalid"]}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current transition-all duration-150"
      )}
    >
      {props.checked === "indeterminate" ? (
        <Minus className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
