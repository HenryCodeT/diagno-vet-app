"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "../../primitive-inputs/input";
import { FormField } from "../../field-components/form-field";

const comboboxVariants = cva("relative w-full", {
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

const dropdownVariants = cva(
  "absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border-2 border-border-primary bg-bg-primary shadow-medium",
  {
    variants: {
      inputSize: {
        small: "text-sm",
        default: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const optionVariants = cva(
  "flex items-center gap-2 cursor-pointer px-4 py-2.5 transition-colors duration-150",
  {
    variants: {
      inputSize: {
        small: "px-3 py-2 text-sm",
        default: "px-4 py-2.5 text-base",
        large: "px-6 py-3 text-lg",
      },
      isHighlighted: {
        true: "bg-primary-10 text-font-primary",
        false: "text-font-secondary hover:bg-neutral-10 hover:text-font-primary",
      },
      isSelected: {
        true: "font-medium",
        false: "",
      },
    },
    defaultVariants: {
      inputSize: "default",
      isHighlighted: false,
      isSelected: false,
    },
  }
);

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface UseComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  onInputChange?: (inputValue: string) => void;
  filterFn?: (option: ComboboxOption, inputValue: string) => boolean;
}

const useCombobox = ({
  options,
  value,
  onChange,
  onInputChange,
  filterFn,
}: UseComboboxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  // Default filter function
  const defaultFilterFn = React.useCallback(
    (option: ComboboxOption, query: string) => {
      return option.label.toLowerCase().includes(query.toLowerCase());
    },
    []
  );

  const filter = filterFn || defaultFilterFn;

  // Filter options based on input
  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) => filter(option, inputValue));
  }, [options, inputValue, filter]);

  // Get selected option label
  const selectedOption = React.useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  // Sync input value with selected option
  React.useEffect(() => {
    if (!isOpen && selectedOption) {
      setInputValue(selectedOption.label);
    } else if (!isOpen && !selectedOption) {
      setInputValue("");
    }
  }, [isOpen, selectedOption]);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);
      setHighlightedIndex(0);
      onInputChange?.(newValue);
    },
    [onInputChange]
  );

  const handleSelect = React.useCallback(
    (option: ComboboxOption) => {
      if (option.disabled) return;
      onChange?.(option.value);
      setInputValue(option.label);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange]
  );

  const handleClear = React.useCallback(() => {
    onChange?.("");
    setInputValue("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, [onChange]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          if (selectedOption) {
            setInputValue(selectedOption.label);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, filteredOptions, highlightedIndex, handleSelect, selectedOption]
  );

  const handleFocus = React.useCallback(() => {
    setIsOpen(true);
    if (selectedOption) {
      setInputValue("");
    }
  }, [selectedOption]);

  const handleBlur = React.useCallback(() => {
    // Delay to allow click events on options
    setTimeout(() => {
      setIsOpen(false);
      if (selectedOption) {
        setInputValue(selectedOption.label);
      } else {
        setInputValue("");
      }
    }, 150);
  }, [selectedOption]);

  return {
    isOpen,
    setIsOpen,
    inputValue,
    filteredOptions,
    highlightedIndex,
    selectedOption,
    handleInputChange,
    handleSelect,
    handleClear,
    handleKeyDown,
    handleFocus,
    handleBlur,
  };
};

export interface ComboboxInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "value" | "onChange"
    >,
    VariantProps<typeof comboboxVariants> {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  onInputChange?: (inputValue: string) => void;
  filterFn?: (option: ComboboxOption, inputValue: string) => boolean;
  emptyMessage?: string;
  clearable?: boolean;
  hasError?: boolean;
}

/**
 * ComboboxInput - Base combobox input with autocomplete functionality
 * Use this component when you need just the combobox control without label/error wrapper
 */
const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  (
    {
      className,
      inputSize = "default",
      disabled = false,
      options,
      value,
      onChange,
      onInputChange,
      filterFn,
      emptyMessage = "No se encontraron resultados",
      clearable = true,
      hasError = false,
      placeholder,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const {
      isOpen,
      inputValue,
      filteredOptions,
      highlightedIndex,
      selectedOption,
      handleInputChange,
      handleSelect,
      handleClear,
      handleKeyDown,
      handleFocus,
      handleBlur,
    } = useCombobox({
      options,
      value,
      onChange,
      onInputChange,
      filterFn,
    });

    return (
      <div
        ref={containerRef}
        className={cn(comboboxVariants({ inputSize }), className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            autoComplete="off"
            className={cn(
              inputVariants({ inputSize }),
              "pr-16",
              hasError && "border-border-error focus-visible:ring-red-60"
            )}
            disabled={disabled}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            {...props}
          />

          <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-3">
            {clearable && selectedOption && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-font-secondary hover:text-font-primary transition-colors rounded"
                aria-label="Limpiar selección"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-font-secondary transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>

        {isOpen && (
          <ul
            role="listbox"
            className={cn(dropdownVariants({ inputSize }))}
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-font-secondary text-center">
                {emptyMessage}
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                  className={cn(
                    optionVariants({
                      inputSize,
                      isHighlighted: index === highlightedIndex,
                      isSelected: option.value === value,
                    }),
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.value === value && (
                    <Check className="h-4 w-4 text-primary-60 flex-shrink-0" />
                  )}
                  <span className={option.value !== value ? "pl-6" : ""}>
                    {option.label}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  }
);

ComboboxInput.displayName = "ComboboxInput";

export interface ComboboxFieldProps extends Omit<ComboboxInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
  required?: boolean;
}

/**
 * ComboboxField - Complete combobox field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const ComboboxField = React.forwardRef<HTMLInputElement, ComboboxFieldProps>(
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
        <ComboboxInput
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

ComboboxField.displayName = "ComboboxField";

export { ComboboxInput, ComboboxField, comboboxVariants };
