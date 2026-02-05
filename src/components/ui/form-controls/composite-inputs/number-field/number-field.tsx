import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "../../primitive-inputs/input";
import { FormField } from "../../field-components/form-field";

const numberInputVariants = cva("relative flex items-stretch", {
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

const buttonVariants = cva(
  "flex items-center justify-center text-font-secondary hover:text-font-primary hover:bg-bg-secondary transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-font-secondary disabled:hover:bg-transparent border-border-primary",
  {
    variants: {
      inputSize: {
        small: "w-8 h-8",
        default: "w-10 h-10",
        large: "w-12 h-12",
      },
      position: {
        start: "border-r-2 rounded-l-lg",
        end: "border-l-medium rounded-r-lg",
      },
    },
    defaultVariants: {
      inputSize: "default",
      position: "start",
    },
  }
);

const getCorrectSteppingValue = ({
  max,
  min,
  step,
  value,
}: {
  max: number;
  min: number;
  step: number;
  value: number;
}) => {
  const remainder = (value - min) % step;
  value = value - remainder + Math.round(remainder / step) * step;

  value = Math.max(min, value);
  if (value > max) {
    value = max - ((max - min) % step);
  }

  return value;
};

interface UseNumberFieldProps {
  defaultValue?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const useNumberField = ({
  defaultValue = 0,
  value: controlledValue,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  isDisabled,
  isReadOnly,
  onChange,
  onStepChange,
  onIncrease,
  onDecrease,
}: UseNumberFieldProps) => {
  const isControlled = controlledValue !== undefined;

  max = Math.max(min, max);

  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    getCorrectSteppingValue({ min, max, step, value: defaultValue })
  );

  const value = isControlled
    ? getCorrectSteppingValue({ min, max, step, value: controlledValue })
    : uncontrolledValue;

  const [inputValue, setInputValue] = React.useState<number | string>(value);

  const shouldDisableIncrease = isDisabled || isReadOnly || value + step > max;
  const shouldDisableDecrease = isDisabled || isReadOnly || value - step < min;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const parsedValue = parseFloat(e.target.value);

      if (isNaN(parsedValue)) {
        setInputValue(value);
        return;
      }

      const newValue = getCorrectSteppingValue({
        min,
        max,
        step,
        value: parsedValue,
      });

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      onStepChange?.(newValue);
      setInputValue(newValue);
    },
    [min, max, step, value, isControlled, onStepChange]
  );

  const handleIncrease = React.useCallback(() => {
    const newValue = value + step;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onStepChange?.(newValue);
    onIncrease?.();
    setInputValue(newValue);
  }, [step, value, isControlled, onIncrease, onStepChange]);

  const handleDecrease = React.useCallback(() => {
    const newValue = value - step;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onStepChange?.(newValue);
    onDecrease?.();
    setInputValue(newValue);
  }, [step, value, isControlled, onDecrease, onStepChange]);

  const handleWheel = React.useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      e.currentTarget.blur();
    },
    []
  );

  React.useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setInputValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

  return {
    step,
    value,
    inputValue,
    handleChange,
    handleBlur,
    handleIncrease,
    handleDecrease,
    handleWheel,
    shouldDisableIncrease,
    shouldDisableDecrease,
  };
};

export interface NumberInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "size" | "onChange"
    >,
    VariantProps<typeof numberInputVariants> {
  step?: number;
  min?: number;
  max?: number;
  isReadOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  increaseButtonLabel?: string;
  decreaseButtonLabel?: string;
  inputSize?: "small" | "default" | "large";
}

/**
 * NumberInput - Base number input with increment/decrement buttons
 * Use this component when you need just the number control without label/error wrapper
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      inputSize = "default",
      disabled = false,
      step = 1,
      min,
      max,
      isReadOnly = false,
      value: controlledValue,
      defaultValue,
      onChange,
      onStepChange,
      onIncrease,
      onDecrease,
      increaseButtonLabel = "Increase",
      decreaseButtonLabel = "Decrease",
      ...props
    },
    ref
  ) => {
    const {
      value,
      inputValue,
      handleChange,
      handleBlur,
      handleIncrease,
      handleDecrease,
      handleWheel,
      shouldDisableIncrease,
      shouldDisableDecrease,
    } = useNumberField({
      defaultValue: defaultValue ? Number(defaultValue) : undefined,
      value: controlledValue ? Number(controlledValue) : undefined,
      step,
      min,
      max,
      isDisabled: disabled,
      isReadOnly,
      onChange,
      onStepChange,
      onIncrease,
      onDecrease,
    });

    return (
      <div className={cn(numberInputVariants({ inputSize }), className)}>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={shouldDisableDecrease}
          className={cn(buttonVariants({ inputSize, position: "start" }))}
          aria-label={`${decreaseButtonLabel} ${value - step}`}
          tabIndex={-1}
        >
          <Minus className="h-4 w-4" />
        </button>

        <input
          ref={ref}
          type="number"
          className={cn(
            inputVariants({ inputSize }),
            "text-center rounded-none border-x-0 flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          disabled={disabled}
          readOnly={isReadOnly}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={handleWheel}
          step={step}
          min={min}
          max={max}
          {...props}
        />

        <button
          type="button"
          onClick={handleIncrease}
          disabled={shouldDisableIncrease}
          className={cn(buttonVariants({ inputSize, position: "end" }))}
          aria-label={`${increaseButtonLabel} ${value + step}`}
          tabIndex={-1}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export interface NumberFieldProps extends Omit<NumberInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
}

/**
 * NumberField - Complete number field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
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
        <NumberInput
          ref={ref}
          inputSize={inputSize}
          className={className}
          {...props}
        />
      </FormField>
    );
  }
);

NumberField.displayName = "NumberField";

export { NumberInput, NumberField, numberInputVariants };
