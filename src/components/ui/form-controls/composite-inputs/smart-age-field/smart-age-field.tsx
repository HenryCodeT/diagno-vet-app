"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Calendar, Calculator } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "../../primitive-inputs/input";
import { FormField } from "../../field-components/form-field";
import { calculateAge } from "@/lib/validations/report";

const smartAgeVariants = cva("relative w-full", {
  variants: {
    inputSize: {
      small: "",
      default: "",
      large: "",
    },
  },
  defaultVariants: {
    inputSize: "default",
  },
});

const ageBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-10 text-primary-80 font-medium",
  {
    variants: {
      inputSize: {
        small: "text-xs px-2 py-1",
        default: "text-sm px-3 py-1.5",
        large: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

export interface SmartAgeInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "value" | "onChange" | "type"
    >,
    VariantProps<typeof smartAgeVariants> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  hasError?: boolean;
  maxDate?: Date;
  minDate?: Date;
  showAge?: boolean;
  agePrefix?: string;
}

/**
 * SmartAgeInput - Date input that automatically calculates and displays age
 * Use this component when you need to capture birth date and show calculated age
 */
const SmartAgeInput = React.forwardRef<HTMLInputElement, SmartAgeInputProps>(
  (
    {
      className,
      inputSize = "default",
      disabled = false,
      value,
      onChange,
      hasError = false,
      maxDate = new Date(),
      minDate,
      showAge = true,
      agePrefix = "Edad:",
      placeholder = "dd/mm/aaaa",
      ...props
    },
    ref
  ) => {
    // Format date to YYYY-MM-DD for input
    const formatDateForInput = (date: Date | undefined): string => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Parse date from input value
    const parseDateFromInput = (value: string): Date | undefined => {
      if (!value) return undefined;
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    };

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = parseDateFromInput(e.target.value);
        onChange?.(date);
      },
      [onChange]
    );

    // Calculate age from value
    const ageInfo = React.useMemo(() => {
      if (!value) return null;
      return calculateAge(value);
    }, [value]);

    return (
      <div className={cn(smartAgeVariants({ inputSize }), className)}>
        <div className="relative">
          <input
            ref={ref}
            type="date"
            className={cn(
              inputVariants({ inputSize }),
              "pr-12",
              hasError && "border-border-error focus-visible:ring-red-60"
            )}
            disabled={disabled}
            value={formatDateForInput(value)}
            onChange={handleChange}
            max={maxDate ? formatDateForInput(maxDate) : undefined}
            min={minDate ? formatDateForInput(minDate) : undefined}
            {...props}
          />
          <div className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none">
            <Calendar className="h-4 w-4 text-font-secondary" />
          </div>
        </div>

        {showAge && ageInfo && (
          <div className="mt-2">
            <span className={cn(ageBadgeVariants({ inputSize }))}>
              <Calculator className="h-3.5 w-3.5" />
              {agePrefix} {ageInfo.display}
            </span>
          </div>
        )}
      </div>
    );
  }
);

SmartAgeInput.displayName = "SmartAgeInput";

export interface SmartAgeFieldProps extends Omit<SmartAgeInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
  required?: boolean;
}

/**
 * SmartAgeField - Complete age field with label, description, error message, and age calculation
 * Use this component for form fields that need to capture birth date and display calculated age
 */
const SmartAgeField = React.forwardRef<HTMLInputElement, SmartAgeFieldProps>(
  (
    {
      id,
      label,
      labelHidden = false,
      description,
      errorMessage,
      hasError = false,
      inputSize,
      containerClassName,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const size = inputSize ?? "default";
    return (
      <FormField
        id={id}
        label={label ? `${label}${required ? " *" : ""}` : undefined}
        labelHidden={labelHidden}
        description={description}
        errorMessage={errorMessage}
        hasError={hasError}
        inputSize={size}
        containerClassName={containerClassName}
      >
        <SmartAgeInput
          ref={ref}
          inputSize={size}
          className={className}
          hasError={hasError}
          {...props}
        />
      </FormField>
    );
  }
);

SmartAgeField.displayName = "SmartAgeField";

export { SmartAgeInput, SmartAgeField, smartAgeVariants };
