import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-primary-10 border-2 border-border-primary hover:text-font-focus hover:bg-primary-10 hover:border-primary-60 focus-visible:text-font-focus focus-visible:bg-primary-10 focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 active:text-font-active active:bg-primary-20 active:border-primary-100 disabled:text-font-disabled disabled:bg-transparent disabled:border-border-tertiary",
        primary:
          "bg-primary-80 text-font-inverse border border-transparent hover:bg-primary-90 focus-visible:bg-primary-90 focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 active:bg-primary-100 disabled:bg-bg-disabled disabled:text-font-disabled",
        destructive:
          "bg-red-60 text-font-inverse border border-transparent hover:bg-red-80 focus-visible:bg-red-80 focus-visible:ring-2 focus-visible:ring-red-60 focus-visible:ring-offset-2 active:bg-red-100 disabled:bg-bg-disabled disabled:text-font-disabled",
        warning:
          "bg-transparent text-red-60 border-2 border-red-60 hover:bg-red-10 hover:text-font-error hover:border-red-80 focus-visible:bg-red-10 focus-visible:text-red-80 focus-visible:border-red-80 focus-visible:ring-2 focus-visible:ring-red-60 focus-visible:ring-offset-2 active:bg-red-20 active:text-red-100 active:border-red-100 disabled:bg-transparent disabled:text-font-disabled disabled:border-border-tertiary",
        link: "bg-transparent text-font-interactive border border-transparent hover:bg-primary-10 hover:text-font-hover focus-visible:bg-primary-10 focus-visible:text-font-focus focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 active:bg-primary-20 active:text-font-active disabled:bg-transparent disabled:text-font-disabled",
        outlined:
          "bg-transparent border-2 hover:bg-opacity-10 focus-visible:bg-opacity-10 focus-visible:ring-2 focus-visible:ring-offset-2 active:bg-opacity-20",
        menu: "bg-transparent text-font-primary border-0 justify-start hover:bg-primary-80 hover:text-font-inverse focus-visible:bg-primary-80 focus-visible:text-font-inverse active:bg-primary-90 active:text-font-inverse disabled:text-font-disabled disabled:bg-transparent",
      },
      colorScheme: {
        default: "",
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      size: {
        small: "h-8 px-3 py-2 text-sm",
        default: "h-10 px-4 py-3 text-base",
        large: "h-12 px-6 py-4 text-xl",
        icon: "h-10 w-10 p-0",
      },
      isLoading: {
        true: "cursor-wait",
        false: "",
      },
    },
    compoundVariants: [
      // Primary variant with color schemes
      {
        variant: "primary",
        colorScheme: "info",
        class:
          "bg-blue-80 hover:bg-blue-90 focus-visible:bg-blue-90 focus-visible:ring-blue-80 active:bg-blue-100",
      },
      {
        variant: "primary",
        colorScheme: "success",
        class:
          "bg-green-80 hover:bg-green-90 focus-visible:bg-green-90 focus-visible:ring-green-80 active:bg-green-100",
      },
      {
        variant: "primary",
        colorScheme: "warning",
        class:
          "bg-orange-80 hover:bg-orange-90 focus-visible:bg-orange-90 focus-visible:ring-orange-80 active:bg-orange-100",
      },
      {
        variant: "primary",
        colorScheme: "error",
        class:
          "bg-red-80 hover:bg-red-90 focus-visible:bg-red-90 focus-visible:ring-red-80 active:bg-red-100",
      },
      // Outlined variant with color schemes
      {
        variant: "outlined",
        colorScheme: "default",
        class:
          "border-primary-60 text-primary-100 hover:bg-primary-10 focus-visible:bg-primary-10 focus-visible:border-primary-100 focus-visible:ring-primary-80 active:bg-primary-20",
      },
      {
        variant: "outlined",
        colorScheme: "info",
        class:
          "border-blue-60 text-blue-100 hover:bg-blue-10 focus-visible:bg-blue-10 focus-visible:border-blue-100 focus-visible:ring-blue-80 active:bg-blue-20",
      },
      {
        variant: "outlined",
        colorScheme: "success",
        class:
          "border-green-60 text-green-100 hover:bg-green-10 focus-visible:bg-green-10 focus-visible:border-green-100 focus-visible:ring-green-80 active:bg-green-20",
      },
      {
        variant: "outlined",
        colorScheme: "warning",
        class:
          "border-orange-60 text-orange-100 hover:bg-orange-10 focus-visible:bg-orange-10 focus-visible:border-orange-100 focus-visible:ring-orange-80 active:bg-orange-20",
      },
      {
        variant: "outlined",
        colorScheme: "error",
        class:
          "border-red-80 text-red-100 hover:bg-red-10 focus-visible:bg-red-10 focus-visible:border-red-100 focus-visible:ring-red-80 active:bg-red-20",
      },
      // Link variant with color schemes
      {
        variant: "link",
        colorScheme: "info",
        class:
          "text-blue-100 hover:bg-blue-10 hover:text-blue-90 focus-visible:bg-blue-10 focus-visible:text-blue-100 focus-visible:ring-blue-80 active:bg-blue-20",
      },
      {
        variant: "link",
        colorScheme: "success",
        class:
          "text-green-100 hover:bg-green-10 hover:text-green-90 focus-visible:bg-green-10 focus-visible:text-green-100 focus-visible:ring-green-80 active:bg-green-20",
      },
      {
        variant: "link",
        colorScheme: "warning",
        class:
          "text-orange-100 hover:bg-orange-10 hover:text-orange-90 focus-visible:bg-orange-10 focus-visible:text-orange-100 focus-visible:ring-orange-80 active:bg-orange-20",
      },
      {
        variant: "link",
        colorScheme: "error",
        class:
          "text-red-100 hover:bg-red-10 hover:text-red-90 focus-visible:bg-red-10 focus-visible:text-red-100 focus-visible:ring-red-80 active:bg-red-20",
      },
    ],
    defaultVariants: {
      variant: "default",
      colorScheme: "default",
      size: "default",
      isLoading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      colorScheme,
      size,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, colorScheme, size, isLoading, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
