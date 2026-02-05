import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  NumberField,
  NumberInput,
} from "@/components/ui/form-controls/composite-inputs/number-field";
import { FieldLabel } from "@/components/ui/form-controls";

const meta = {
  title: "Components/NumberField",
  component: NumberField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the number field",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    step: {
      control: "number",
      description: "Step increment value",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Description/helper text",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// NumberField Stories - Complete field composition
// ============================================================================

export const Default: Story = {
  args: {
    label: "Quantity",
    defaultValue: 1,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Quantity",
    description: "Select the number of items",
    defaultValue: 1,
    min: 1,
    max: 99,
  },
};

export const WithError: Story = {
  args: {
    label: "Quantity",
    hasError: true,
    errorMessage: "Quantity must be between 1 and 10",
    defaultValue: 15,
    min: 1,
    max: 10,
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Age",
    description: "Must be between 18 and 100",
    defaultValue: 25,
    min: 18,
    max: 100,
  },
};

export const WithStep: Story = {
  args: {
    label: "Price",
    description: "Increments by $0.25",
    defaultValue: 5,
    step: 0.25,
    min: 0,
    max: 100,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <NumberField
        label="Small"
        inputSize="small"
        defaultValue={1}
        min={0}
        max={10}
      />
      <NumberField
        label="Default"
        inputSize="default"
        defaultValue={1}
        min={0}
        max={10}
      />
      <NumberField
        label="Large"
        inputSize="large"
        defaultValue={1}
        min={0}
        max={10}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Quantity",
    disabled: true,
    defaultValue: 5,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Score",
    isReadOnly: true,
    defaultValue: 100,
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Quantity",
    labelHidden: true,
    defaultValue: 1,
  },
};

export const Controlled: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1);
    const pricePerItem = 29.99;
    const total = quantity * pricePerItem;

    return (
      <div className="w-96 space-y-4">
        <NumberField
          label="Quantity"
          description="Number of items to purchase"
          value={quantity}
          onStepChange={setQuantity}
          min={1}
          max={99}
        />

        <div className="pt-4 border-t border-border-secondary space-y-2">
          <p className="text-sm text-font-secondary">
            <strong>Price per item:</strong> ${pricePerItem.toFixed(2)}
          </p>
          <p className="text-base font-semibold">
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
        </div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    const min = 1;
    const max = 10;
    const hasError = value < min || value > max;

    return (
      <div className="w-96">
        <NumberField
          label="Rating"
          description={`Please rate from ${min} to ${max}`}
          value={value}
          onStepChange={setValue}
          hasError={hasError}
          errorMessage={
            hasError
              ? `Rating must be between ${min} and ${max}`
              : undefined
          }
          min={min}
          max={max}
        />
      </div>
    );
  },
};

export const ShoppingCart: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, name: "MacBook Pro", price: 1999, quantity: 1 },
      { id: 2, name: "Magic Mouse", price: 79, quantity: 2 },
      { id: 3, name: "USB-C Cable", price: 19, quantity: 3 },
    ]);

    const updateQuantity = (id: number, newQuantity: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    };

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div className="w-96 space-y-6">
        <h3 className="text-xl font-semibold">Shopping Cart</h3>

        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-font-secondary">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <NumberField
              label={`Quantity for ${item.name}`}
              labelHidden
              value={item.quantity}
              onStepChange={(val) => updateQuantity(item.id, val)}
              min={0}
              max={99}
              inputSize="small"
            />
          </div>
        ))}

        <div className="pt-4 border-t-2 border-border-primary">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  },
};

export const DecimalPrecision: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <NumberField
        label="Price (dollars)"
        description="Increments by $1.00"
        defaultValue={10}
        step={1}
        min={0}
      />
      <NumberField
        label="Price (quarters)"
        description="Increments by $0.25"
        defaultValue={5}
        step={0.25}
        min={0}
      />
      <NumberField
        label="Price (pennies)"
        description="Increments by $0.01"
        defaultValue={9.99}
        step={0.01}
        min={0}
      />
    </div>
  ),
};

export const TemperatureControl: Story = {
  render: () => {
    const [tempC, setTempC] = useState(20);
    const tempF = (tempC * 9) / 5 + 32;

    return (
      <div className="w-96 space-y-4">
        <NumberField
          label="Temperature"
          description="Adjust the temperature"
          value={tempC}
          onStepChange={setTempC}
          min={-40}
          max={50}
          step={0.5}
        />

        <div className="pt-4 border-t border-border-secondary space-y-2">
          <p className="text-sm text-font-secondary">
            <strong>Celsius:</strong> {tempC.toFixed(1)}°C
          </p>
          <p className="text-sm text-font-secondary">
            <strong>Fahrenheit:</strong> {tempF.toFixed(1)}°F
          </p>
        </div>
      </div>
    );
  },
};

// ============================================================================
// NumberInput Stories - Base component without field wrapper
// ============================================================================

export const NumberInputBasic: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-font-secondary mb-4">
        This is the <code>NumberInput</code> component - just the number input
        with +/- buttons, no label/error wrapper
      </p>
      <NumberInput defaultValue={1} min={0} max={10} />
    </div>
  ),
};

export const NumberInputCustomComposition: Story = {
  render: () => {
    const [value, setValue] = useState(5);

    return (
      <div className="w-96 space-y-2">
        <p className="text-sm text-font-secondary mb-4">
          Custom composition using <code>NumberInput</code> with separate Label
        </p>

        <FieldLabel htmlFor="custom-number">Quantity</FieldLabel>

        <NumberInput
          id="custom-number"
          value={value}
          onStepChange={setValue}
          min={1}
          max={99}
        />

        <p className="text-sm text-font-secondary">
          Current value: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const NumberInputSizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <FieldLabel inputSize="small" className="mb-2 block">
          Small
        </FieldLabel>
        <NumberInput inputSize="small" defaultValue={1} min={0} max={10} />
      </div>
      <div>
        <FieldLabel className="mb-2 block">Default</FieldLabel>
        <NumberInput inputSize="default" defaultValue={1} min={0} max={10} />
      </div>
      <div>
        <FieldLabel inputSize="large" className="mb-2 block">
          Large
        </FieldLabel>
        <NumberInput inputSize="large" defaultValue={1} min={0} max={10} />
      </div>
    </div>
  ),
};
