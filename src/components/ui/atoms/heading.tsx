import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-sans", {
  variants: {
    level: {
      1: "text-6xl font-light",
      2: "text-5xl font-normal",
      3: "text-4xl font-medium",
      4: "text-2xl font-semibold",
      5: "text-2xl font-bold",
      6: "text-base font-extrabold",
    },
    variant: {
      default: "text-font-primary",
      secondary: "text-font-secondary",
      tertiary: "text-font-tertiary",
      muted: "text-font-disabled",
      inverse: "text-font-inverse",
      interactive: "text-font-interactive",
      success: "text-font-success",
      warning: "text-font-warning",
      error: "text-font-error",
      info: "text-font-info",
    },
    lineHeight: {
      small: "leading-tight",
      medium: "leading-normal",
      large: "leading-loose",
    },
  },
  defaultVariants: {
    level: 1,
    variant: "default",
    lineHeight: "small",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, variant, lineHeight, ...props }, ref) => {
    const Comp = `h${level}` as const;

    return (
      <Comp
        className={cn(
          headingVariants({ level, variant, lineHeight, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
