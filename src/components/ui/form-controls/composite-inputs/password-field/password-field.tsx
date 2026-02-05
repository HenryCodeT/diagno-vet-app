import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "../../primitive-inputs/input";
import { FormField } from "../../field-components/form-field";

const passwordInputVariants = cva("relative flex w-full", {
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

const toggleButtonVariants = cva(
  "absolute right-0 top-0 h-full px-4 text-font-secondary transition-colors duration-150 hover:text-font-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-font-disabled disabled:opacity-60",
  {
    variants: {
      inputSize: {
        small: "px-3",
        default: "px-4",
        large: "px-6",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof passwordInputVariants> {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  passwordIsHiddenLabel?: string;
  passwordIsShownLabel?: string;
  inputSize?: "small" | "default" | "large";
  hasError?: boolean;
}

/**
 * PasswordInput - Base password input with show/hide toggle
 * Use this component when you need just the input control without label/error wrapper
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      inputSize = "default",
      disabled = false,
      hasError,
      showPasswordLabel = "Show password",
      hidePasswordLabel = "Hide password",
      passwordIsHiddenLabel = "Password is hidden",
      passwordIsShownLabel = "Password is shown",
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const buttonLabel = isPasswordVisible
      ? hidePasswordLabel
      : showPasswordLabel;
    const srLabel = isPasswordVisible
      ? passwordIsShownLabel
      : passwordIsHiddenLabel;

    return (
      <div className={cn(passwordInputVariants({ inputSize, className }))}>
        <input
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          className={cn(
            inputVariants({ inputSize }),
            "pr-12" // Add padding for the toggle button
          )}
          disabled={disabled}
          aria-invalid={hasError ?? props["aria-invalid"]}
          aria-label={srLabel}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className={cn(toggleButtonVariants({ inputSize }))}
          aria-label={buttonLabel}
          tabIndex={-1}
        >
          {isPasswordVisible ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export interface PasswordFieldProps extends PasswordInputProps {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  containerClassName?: string;
}

/**
 * PasswordField - Complete password field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
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
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        id={id}
        label={label}
        labelHidden={labelHidden}
        description={description}
        errorMessage={errorMessage}
        hasError={hasError}
        inputSize={inputSize}
        containerClassName={containerClassName}
      >
        <PasswordInput
          ref={ref}
          inputSize={inputSize}
          className={className}
          {...props}
        />
      </FormField>
    );
  }
);

PasswordField.displayName = "PasswordField";

export { PasswordInput, PasswordField, passwordInputVariants };
