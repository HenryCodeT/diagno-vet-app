import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse rounded bg-bg-secondary transition-colors duration-500",
  {
    variants: {
      size: {
        small: "h-2",
        default: "h-4",
        large: "h-10",
      },
      shape: {
        rectangle: "",
        circle: "rounded-full",
        text: "rounded-sm",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "rectangle",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, size, shape, width, height, style, ...props }, ref) => {
    const inlineStyles = {
      ...style,
      ...(width && { width: typeof width === "number" ? `${width}px` : width }),
      ...(height && {
        height: typeof height === "number" ? `${height}px` : height,
      }),
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ size, shape, className }))}
        style={inlineStyles}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
