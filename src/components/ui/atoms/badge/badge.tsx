import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-80 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      style: {
        solid: "",
        outlined: "bg-transparent border-2",
        subtle: "",
      },
      size: {
        small: "px-2 py-1.5 text-xs",
        default: "px-3 py-2 text-sm",
        large: "px-4 py-3 text-base",
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: "default",
        style: "solid",
        class: "bg-bg-accent text-font-inverse",
      },
      {
        variant: "info",
        style: "solid",
        class: "bg-info-80 text-font-inverse",
      },
      {
        variant: "success",
        style: "solid",
        class: "bg-success-80 text-font-inverse",
      },
      {
        variant: "warning",
        style: "solid",
        class: "bg-warning-80 text-font-primary",
      },
      {
        variant: "error",
        style: "solid",
        class: "bg-error-80 text-font-inverse",
      },
      // Outlined variants
      {
        variant: "default",
        style: "outlined",
        class: "border-border-primary text-font-primary",
      },
      {
        variant: "info",
        style: "outlined",
        class: "border-info-80 text-info-80",
      },
      {
        variant: "success",
        style: "outlined",
        class: "border-success-80 text-success-80",
      },
      {
        variant: "warning",
        style: "outlined",
        class: "border-warning-80 text-warning-80",
      },
      {
        variant: "error",
        style: "outlined",
        class: "border-error-80 text-error-80",
      },
      // Subtle variants
      {
        variant: "default",
        style: "subtle",
        class: "bg-neutral-20 text-font-primary",
      },
      {
        variant: "info",
        style: "subtle",
        class: "bg-info-20 text-info-80",
      },
      {
        variant: "success",
        style: "subtle",
        class: "bg-success-20 text-success-80",
      },
      {
        variant: "warning",
        style: "subtle",
        class: "bg-warning-20 text-warning-80",
      },
      {
        variant: "error",
        style: "subtle",
        class: "bg-error-20 text-error-80",
      },
    ],
    defaultVariants: {
      variant: "default",
      style: "solid",
      size: "default",
    },
  }
);

const dotVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    variant: {
      default: "bg-neutral-80",
      info: "bg-info-80",
      success: "bg-success-80",
      warning: "bg-warning-80",
      error: "bg-error-80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});


export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style">,
    VariantProps<typeof badgeVariants> {
  variant?: "default" | "info" | "success" | "warning" | "error";
  style?: "solid" | "outlined" | "subtle";
  size?: "small" | "default" | "large";
  dot?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      style = "solid",
      size = "default",
      dot = false,
      onRemove,
      removeLabel = "Remove",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, style, size, className }))}
        {...props}
      >
        {dot && <span className={cn(dotVariants({ variant }))} />}
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 -mr-2 hover:opacity-70 transition-opacity"
            aria-label={removeLabel}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
