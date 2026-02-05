import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const dividerVariants = cva(
  "border-solid border-border-primary opacity-60 shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l",
      },
      size: {
        small: "border-t",
        medium: "border-t-2",
        large: "border-t-4",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "medium",
    },
  }
);

const dividerLabelVariants = cva(
  "text-font-tertiary text-sm bg-bg-primary px-4 whitespace-nowrap",
  {
    variants: {
      orientation: {
        horizontal: "relative -top-2.5",
        vertical: "relative -left-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-orientation">,
    VariantProps<typeof dividerVariants> {
  label?: string;
  labelPosition?: "left" | "center" | "right";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      size,
      label,
      labelPosition = "center",
      ...props
    },
    ref
  ) => {
    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation ?? "horizontal"}
          className={cn(dividerVariants({ orientation, size, className }))}
          {...props}
        />
      );
    }

    const isHorizontal = orientation === "horizontal";
    const alignmentClass =
      labelPosition === "left"
        ? "justify-start"
        : labelPosition === "right"
        ? "justify-end"
        : "justify-center";

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation ?? "horizontal"}
        className={cn(
          "flex items-center",
          isHorizontal ? "flex-row" : "flex-col",
          alignmentClass,
          className
        )}
        {...props}
      >
        {labelPosition !== "left" && (
          <div
            className={cn(
              dividerVariants({ orientation, size }),
              isHorizontal ? "flex-1" : "flex-none h-full"
            )}
          />
        )}
        <span className={cn(dividerLabelVariants({ orientation }))}>
          {label}
        </span>
        {labelPosition !== "right" && (
          <div
            className={cn(
              dividerVariants({ orientation, size }),
              isHorizontal ? "flex-1" : "flex-none h-full"
            )}
          />
        )}
      </div>
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
