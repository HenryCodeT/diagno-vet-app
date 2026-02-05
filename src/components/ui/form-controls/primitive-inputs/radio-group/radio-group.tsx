import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const radioGroupVariants = cva("grid gap-3", {
  variants: {
    direction: {
      vertical: "grid-flow-row",
      horizontal: "grid-flow-col auto-cols-max",
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

const radioItemVariants = cva(
  "aspect-square h-4 w-4 rounded-full border-2 border-border-primary text-primary-80 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:opacity-60 data-[state=checked]:border-primary-80 aria-invalid:border-border-error aria-invalid:focus-visible:ring-red-60",
  {
    variants: {
      inputSize: {
        small: "h-3.5 w-3.5",
        default: "h-4 w-4",
        large: "h-5 w-5",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
    VariantProps<typeof radioGroupVariants>
>(({ className, direction = "vertical", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ direction, className }))}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
    VariantProps<typeof radioItemVariants> & { hasError?: boolean }
>(({ className, inputSize, hasError, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ inputSize, className }))}
      aria-invalid={hasError}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioItemVariants };
