/**
 * FormField Usage Examples
 * 
 * This file demonstrates how to use the FormField wrapper with different input types.
 * FormField provides a consistent way to add labels, descriptions, and error messages
 * to any input component.
 */

import { FormField } from "./form-field";
import { Input } from "../../primitive-inputs/input";
import { Select } from "../../primitive-inputs/select";
import { Checkbox } from "../../primitive-inputs/checkbox";
import { Switch } from "../../primitive-inputs/switch";
import { Textarea } from "../../primitive-inputs/textarea";

// Example 1: Input with FormField
export const InputExample = () => (
  <FormField
    label="Email"
    description="We'll never share your email"
    errorMessage="Please enter a valid email"
    hasError={false}
  >
    <Input type="email" placeholder="Enter your email" />
  </FormField>
);

// Example 2: Input with error
export const InputWithError = () => (
  <FormField
    label="Email"
    errorMessage="Email is required"
    hasError={true}
  >
    <Input type="email" />
  </FormField>
);

// Example 3: Select with FormField
export const SelectExample = () => (
  <FormField
    label="Country"
    description="Select your country"
    errorMessage="Please select a country"
    hasError={false}
  >
    <Select>
      <option value="">Choose...</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
    </Select>
  </FormField>
);

// Example 4: Checkbox with FormField
export const CheckboxExample = () => (
  <FormField
    label="Accept terms"
    description="You must accept the terms to continue"
    errorMessage="You must accept the terms"
    hasError={false}
  >
    <Checkbox />
  </FormField>
);

// Example 5: Switch with FormField
export const SwitchExample = () => (
  <FormField
    label="Enable notifications"
    description="Receive push notifications"
    errorMessage="Please enable notifications"
    hasError={false}
  >
    <Switch />
  </FormField>
);

// Example 6: Textarea with FormField
export const TextareaExample = () => (
  <FormField
    label="Message"
    description="Enter your message here"
    errorMessage="Message is required"
    hasError={false}
    inputSize="large"
  >
    <Textarea rows={5} />
  </FormField>
);

// Example 7: Without label (hidden label for accessibility)
export const HiddenLabelExample = () => (
  <FormField
    label="Search"
    labelHidden={true}
    description="Search for products"
  >
    <Input type="search" placeholder="Search..." />
  </FormField>
);

