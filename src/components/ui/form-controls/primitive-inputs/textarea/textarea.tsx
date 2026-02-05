import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FormField } from "../../field-components/form-field";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-lg border-2 border-border-primary bg-bg-primary px-4 py-3 text-base text-font-primary transition-colors duration-300 placeholder:text-font-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60 aria-invalid:border-border-error aria-invalid:focus-visible:ring-red-60",
  {
    variants: {
      inputSize: {
        small: "min-h-[60px] px-3 py-2 text-sm",
        default: "min-h-[80px] px-4 py-3 text-base",
        large: "min-h-[100px] px-6 py-4 text-xl",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      inputSize: "default",
      resize: "vertical",
    },
  }
);

/**
 * Textarea - Base textarea component
 * Use this component when you need just the textarea control without label/error wrapper
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textareaVariants> & {
      resize?: "none" | "vertical" | "horizontal" | "both";
      hasError?: boolean;
    }
>(({ className, inputSize, resize = "vertical", hasError, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ inputSize, resize, className }))}
      aria-invalid={hasError}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

type AutoResizeTextareaProps = React.ComponentPropsWithoutRef<
  typeof Textarea
> & {
  maxRows?: number;
};

/**
 * AutoResizeTextarea - Textarea that automatically grows with content
 */
const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, inputSize, maxRows, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    let newHeight = textarea.scrollHeight;

    if (maxRows) {
      const lineHeight = parseInt(
        window.getComputedStyle(textarea).lineHeight || "0"
      );
      const maxHeight = lineHeight * maxRows;
      newHeight = Math.min(newHeight, maxHeight);
    }

    textarea.style.height = `${newHeight}px`;
  }, [maxRows]);

  React.useEffect(() => {
    adjustHeight();
  }, [props.value, adjustHeight]);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    adjustHeight();

    textarea.addEventListener("input", adjustHeight);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [adjustHeight]);

  const handleRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <textarea
      className={cn(textareaVariants({ inputSize, resize: "none", className }))}
      ref={handleRef}
      {...props}
    />
  );
});
AutoResizeTextarea.displayName = "AutoResizeTextarea";

type TextareaFieldProps = Omit<
  React.ComponentPropsWithoutRef<typeof Textarea>,
  "hasError"
> & {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
  autoResize?: boolean;
  maxRows?: number;
};

/**
 * TextareaField - Complete textarea field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
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
      autoResize = false,
      maxRows,
      ...props
    },
    ref
  ) => {
    const TextareaComponent = autoResize ? AutoResizeTextarea : Textarea;

    return (
      <FormField
        id={id}
        label={label}
        labelHidden={labelHidden}
        description={description}
        errorMessage={errorMessage}
        hasError={hasError}
        inputSize={inputSize ?? "default"}
        containerClassName={containerClassName}
      >
        <TextareaComponent
          ref={ref}
          inputSize={inputSize ?? "default"}
          maxRows={maxRows}
          className={className}
          {...props}
        />
      </FormField>
    );
  }
);

TextareaField.displayName = "TextareaField";

export { Textarea, AutoResizeTextarea, TextareaField, textareaVariants };
