import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-primary-80 data-[state=unchecked]:bg-neutral-60 aria-invalid:data-[state=unchecked]:bg-bg-error",
  {
    variants: {
      inputSize: {
        small: "h-4 w-7",
        default: "h-5 w-9",
        large: "h-6 w-11",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-bg-primary border border-transparent shadow-soft transition-transform duration-300 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      inputSize: {
        small: "h-3 w-3 data-[state=checked]:translate-x-3",
        default: "h-4 w-4 data-[state=checked]:translate-x-4",
        large: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
    VariantProps<typeof switchVariants> & { hasError?: boolean }
>(({ className, inputSize, hasError, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ inputSize, className }))}
    aria-invalid={hasError}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(switchThumbVariants({ inputSize }))}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants };
