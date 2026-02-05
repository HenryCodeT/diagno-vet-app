import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Input } from "../../primitive-inputs/input";
import { Select } from "../../primitive-inputs/select";

const phoneNumberFieldVariants = cva("flex items-stretch gap-2", {
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

export interface DialCode {
  code: string;
  country: string;
  dialCode: string;
}

export const DEFAULT_DIAL_CODES: DialCode[] = [
  { code: "US", country: "United States", dialCode: "+1" },
  { code: "GB", country: "United Kingdom", dialCode: "+44" },
  { code: "CA", country: "Canada", dialCode: "+1" },
  { code: "AU", country: "Australia", dialCode: "+61" },
  { code: "DE", country: "Germany", dialCode: "+49" },
  { code: "FR", country: "France", dialCode: "+33" },
  { code: "ES", country: "Spain", dialCode: "+34" },
  { code: "IT", country: "Italy", dialCode: "+39" },
  { code: "MX", country: "Mexico", dialCode: "+52" },
  { code: "BR", country: "Brazil", dialCode: "+55" },
  { code: "AR", country: "Argentina", dialCode: "+54" },
  { code: "IN", country: "India", dialCode: "+91" },
  { code: "CN", country: "China", dialCode: "+86" },
  { code: "JP", country: "Japan", dialCode: "+81" },
  { code: "KR", country: "South Korea", dialCode: "+82" },
];

export interface PhoneNumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof phoneNumberFieldVariants> {
  dialCodeList?: DialCode[];
  defaultDialCode?: string;
  dialCodeName?: string;
  dialCodeLabel?: string;
  onDialCodeChange?: (dialCode: string) => void;
  dialCodeRef?: React.Ref<HTMLSelectElement>;
  inputSize?: "small" | "default" | "large";
  hasError?: boolean;
}

const PhoneNumberField = React.forwardRef<
  HTMLInputElement,
  PhoneNumberFieldProps
>(
  (
    {
      className,
      inputSize = "default",
      dialCodeList = DEFAULT_DIAL_CODES,
      defaultDialCode = "+1",
      dialCodeName = "dialCode",
      dialCodeLabel = "Country code",
      onDialCodeChange,
      dialCodeRef,
      disabled,
      hasError,
      ...props
    },
    ref
  ) => {
    const [selectedDialCode, setSelectedDialCode] =
      React.useState(defaultDialCode);

    const handleDialCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDialCode = e.target.value;
      setSelectedDialCode(newDialCode);
      onDialCodeChange?.(newDialCode);
    };

    return (
      <div className={cn(phoneNumberFieldVariants({ inputSize, className }))}>
        <Select
          ref={dialCodeRef}
          name={dialCodeName}
          value={selectedDialCode}
          onChange={handleDialCodeChange}
          inputSize={inputSize ?? "default"}
          disabled={disabled}
          className="w-24 flex-shrink-0"
          aria-label={dialCodeLabel}
        >
          {dialCodeList.map((item) => (
            <option key={item.code} value={item.dialCode}>
              {item.dialCode}
            </option>
          ))}
        </Select>

        <Input
          ref={ref}
          type="tel"
          inputSize={inputSize ?? "default"}
          disabled={disabled}
          hasError={hasError}
          className="flex-1"
          placeholder="Phone number"
          {...props}
        />
      </div>
    );
  }
);

PhoneNumberField.displayName = "PhoneNumberField";

export { PhoneNumberField, phoneNumberFieldVariants };
