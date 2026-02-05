import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FieldLabel } from "../../field-components/field-label";
import { FieldDescription } from "../../field-components/field-description";
import { FieldError } from "../../field-components/field-error";

const sliderVariants = cva(
  "relative flex touch-none select-none items-center",
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full flex-col",
      },
      inputSize: {
        small: "",
        default: "",
        large: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      inputSize: "default",
    },
  }
);

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-neutral-40",
  {
    variants: {
      orientation: {
        horizontal: "h-2 w-full",
        vertical: "w-2 h-full",
      },
      inputSize: {
        small: "",
        default: "",
        large: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", inputSize: "small", class: "h-1" },
      { orientation: "horizontal", inputSize: "default", class: "h-2" },
      { orientation: "horizontal", inputSize: "large", class: "h-3" },
      { orientation: "vertical", inputSize: "small", class: "w-1" },
      { orientation: "vertical", inputSize: "default", class: "w-2" },
      { orientation: "vertical", inputSize: "large", class: "w-3" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      inputSize: "default",
    },
  }
);

const sliderRangeVariants = cva("absolute bg-primary-80 rounded-full", {
  variants: {
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const sliderThumbVariants = cva(
  "block h-5 w-5 rounded-full border-2 border-primary-80 bg-bg-primary ring-offset-bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      inputSize: {
        small: "h-4 w-4",
        default: "h-5 w-5",
        large: "h-6 w-6",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

/**
 * Slider - Base slider component using Radix UI
 * Use this component when you need just the slider control without label/error wrapper
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
    VariantProps<typeof sliderVariants> & {
      trackClassName?: string;
      rangeClassName?: string;
      thumbClassName?: string;
      inputSize?: "small" | "default" | "large";
    }
>(
  (
    {
      className,
      orientation = "horizontal",
      inputSize = "default",
      trackClassName,
      rangeClassName,
      thumbClassName,
      ...props
    },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(sliderVariants({ orientation, inputSize, className }))}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          sliderTrackVariants({ orientation, inputSize }),
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          className={cn(sliderRangeVariants({ orientation }), rangeClassName)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(sliderThumbVariants({ inputSize }), thumbClassName)}
      />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = SliderPrimitive.Root.displayName;

/**
 * SliderField - Complete slider field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const SliderField = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof Slider>, "defaultValue" | "value" | "onValueChange" | "onChange"> & {
    label?: string;
    labelHidden?: boolean;
    description?: string;
    errorMessage?: string;
    hasError?: boolean;
    containerClassName?: string;
    isValueHidden?: boolean;
    formatValue?: ((value: number) => string) | string;
    defaultValue?: number;
    value?: number;
    onChange?: (value: number) => void;
  }
>(
  (
    {
      id,
      label,
      labelHidden = false,
      description,
      errorMessage,
      hasError = false,
      inputSize = "default",
      containerClassName,
      className,
      isValueHidden = false,
      formatValue,
      defaultValue,
      value: controlledValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const fieldId = React.useId();
    const generatedId = id || fieldId;
    const descriptionId = description
      ? `${generatedId}-description`
      : undefined;
    const errorId =
      hasError && errorMessage ? `${generatedId}-error` : undefined;

    const ariaDescribedBy =
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? 0);

    const currentValue = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (values: number[]) => {
        const newValue = values[0];
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const displayValue = React.useMemo(() => {
      if (isValueHidden) return null;

      if (typeof formatValue === "function") {
        return formatValue(currentValue);
      } else if (typeof formatValue === "string") {
        return formatValue.replace("{value}", String(currentValue));
      } else {
        return currentValue;
      }
    }, [currentValue, formatValue, isValueHidden]);

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <FieldLabel
              htmlFor={generatedId}
              visuallyHidden={labelHidden}
              hasError={hasError}
              inputSize={inputSize}
            >
              {label}
            </FieldLabel>
            {!isValueHidden && displayValue !== null && (
              <span className="text-sm text-font-secondary font-medium">
                {displayValue}
              </span>
            )}
          </div>
        )}

        {description && !labelHidden && (
          <FieldDescription id={descriptionId} inputSize={inputSize}>
            {description}
          </FieldDescription>
        )}

        <Slider
          ref={ref}
          id={generatedId}
          inputSize={inputSize}
          aria-describedby={ariaDescribedBy}
          className={className}
          defaultValue={defaultValue ? [defaultValue] : undefined}
          value={controlledValue !== undefined ? [controlledValue] : undefined}
          onValueChange={handleValueChange}
          {...props}
        />

        {hasError && errorMessage && (
          <FieldError id={errorId} inputSize={inputSize}>
            {errorMessage}
          </FieldError>
        )}
      </div>
    );
  }
);

SliderField.displayName = "SliderField";

export { Slider, SliderField, sliderVariants };
