import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";


const alertVariants = cva(
  "relative w-full rounded-lg py-3 px-4 flex items-center gap-4",
  {
    variants: {
      variant: {
        default: "bg-bg-tertiary text-font-primary",
        info: "bg-bg-info text-font-info",
        error: "bg-bg-error text-font-error",
        warning: "bg-bg-warning text-font-warning",
        success: "bg-bg-success text-font-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-2 font-bold text-base leading-none", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-normal", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

const AlertIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xl shrink-0", className)}
    {...props}
  />
));
AlertIcon.displayName = "AlertIcon";

export { Alert, AlertTitle, AlertDescription, AlertIcon, alertVariants };
