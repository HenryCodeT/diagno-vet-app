import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "../../primitive-inputs/input";
import { FormField } from "../../field-components/form-field";

const searchInputVariants = cva("relative flex w-full", {
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

const searchIconVariants = cva(
  "absolute left-0 top-0 h-full flex items-center justify-center text-font-secondary pointer-events-none",
  {
    variants: {
      inputSize: {
        small: "w-8 pl-3",
        default: "w-10 pl-4",
        large: "w-12 pl-6",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const clearButtonVariants = cva(
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

const searchButtonVariants = cva(
  "h-full px-6 font-medium text-font-inverse bg-primary-80 hover:bg-primary-90 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 rounded-r-lg",
  {
    variants: {
      inputSize: {
        small: "px-3 text-sm",
        default: "px-4 text-base",
        large: "px-6 text-xl",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

interface UseSearchFieldProps {
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
}

const useSearchField = ({
  defaultValue = "",
  value,
  onChange,
  onClear,
  onSubmit,
}: UseSearchFieldProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    },
    [isControlled, onChange]
  );

  const handleClear = React.useCallback(() => {
    if (!isControlled) {
      setInternalValue("");
    }
    onClear?.();
  }, [isControlled, onClear]);

  const handleSubmit = React.useCallback(() => {
    onSubmit?.(composedValue);
  }, [composedValue, onSubmit]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    },
    [handleSubmit, handleClear]
  );

  return {
    value: composedValue,
    onChange: handleChange,
    onClear: handleClear,
    onSubmit: handleSubmit,
    onKeyDown: handleKeyDown,
  };
};

export interface SearchInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "size" | "onSubmit" | "value" | "defaultValue"
    >,
    VariantProps<typeof searchInputVariants> {
  hasSearchIcon?: boolean;
  hasSearchButton?: boolean;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  clearButtonLabel?: string;
  searchButtonLabel?: string;
  inputSize?: "small" | "default" | "large";
  value?: string;
  defaultValue?: string;
}

/**
 * SearchInput - Base search input with icon and clear button
 * Use this component when you need just the search control without label/error wrapper
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      inputSize = "default",
      disabled = false,
      hasSearchIcon = true,
      hasSearchButton = false,
      onClear,
      onSubmit,
      clearButtonLabel = "Clear search",
      searchButtonLabel = "Search",
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const {
      value,
      onChange: handleChange,
      onClear: handleClear,
      onSubmit: handleSubmit,
      onKeyDown,
    } = useSearchField({
      value: controlledValue,
      defaultValue,
      onChange,
      onClear,
      onSubmit,
    });

    const inputPaddingLeft = hasSearchIcon ? "pl-10" : "";
    const inputPaddingRight = hasSearchButton ? "pr-3" : value ? "pr-10" : "";
    const inputRounded = hasSearchButton ? "rounded-r-none" : "";

    return (
      <div className={cn(searchInputVariants({ inputSize }), className)}>
        {hasSearchIcon && (
          <div className={cn(searchIconVariants({ inputSize }))}>
            <Search className="h-4 w-4" />
          </div>
        )}

        <input
          ref={ref}
          type="search"
          className={cn(
            inputVariants({ inputSize }),
            inputPaddingLeft,
            inputPaddingRight,
            inputRounded,
            hasSearchButton && "flex-1"
          )}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          {...props}
        />

        {!hasSearchButton && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(clearButtonVariants({ inputSize }))}
            aria-label={clearButtonLabel}
            tabIndex={-1}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {hasSearchButton && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
            className={cn(searchButtonVariants({ inputSize }))}
            aria-label={searchButtonLabel}
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export interface SearchFieldProps extends Omit<SearchInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
}

/**
 * SearchField - Complete search field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
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
        <SearchInput
          ref={ref}
          inputSize={inputSize}
          className={className}
          {...props}
        />
      </FormField>
    );
  }
);

SearchField.displayName = "SearchField";

export { SearchInput, SearchField, searchInputVariants };
