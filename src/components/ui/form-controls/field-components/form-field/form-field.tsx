import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FieldLabel } from "../field-label";
import { FieldDescription } from "../field-description";
import { FieldError } from "../field-error";

const formFieldVariants = cva("space-y-2", {
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

type FormFieldProps = VariantProps<typeof formFieldVariants> & {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
  children: React.ReactElement;
  id?: string;
  inputSize?: "small" | "default" | "large";
};

/**
 * FormField - Generic wrapper for form inputs with label, description, and error message
 *
 * This component provides consistent form field structure for any input component.
 * It handles:
 * - Label rendering with error state
 * - Description text
 * - Error message display
 * - Accessibility attributes (aria-describedby, aria-invalid)
 * - ID generation and management
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   description="We'll never share your email"
 *   errorMessage="Invalid email"
 *   hasError={true}
 * >
 *   <Input type="email" />
 * </FormField>
 * ```
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      labelHidden = false,
      description,
      errorMessage,
      hasError = false,
      inputSize = "default",
      containerClassName,
      children,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const fieldId = React.useId();
    const generatedId = providedId || fieldId;
    const descriptionId = description
      ? `${generatedId}-description`
      : undefined;
    const errorId =
      hasError && errorMessage ? `${generatedId}-error` : undefined;

    const ariaDescribedBy =
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    const childWithProps = React.cloneElement(children, {
      id: generatedId,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": hasError,
      inputSize: inputSize,
      className: cn(children.props.className),
    } as any);

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ inputSize }), containerClassName)}
        {...props}
      >
        {label && (
          <FieldLabel
            htmlFor={generatedId}
            visuallyHidden={labelHidden}
            hasError={hasError}
            inputSize={inputSize}
          >
            {label}
          </FieldLabel>
        )}

        {description && !labelHidden && (
          <FieldDescription id={descriptionId} inputSize={inputSize}>
            {description}
          </FieldDescription>
        )}

        {childWithProps}

        {hasError && errorMessage && (
          <FieldError id={errorId} inputSize={inputSize}>
            {errorMessage}
          </FieldError>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField, formFieldVariants };
