import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/ui/form-controls/primitive-inputs/input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the input",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state (shows error border color)",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Input type",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello World",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    defaultValue: "Cannot edit",
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
    placeholder: "Invalid input",
    defaultValue: "error@",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="text-sm text-font-secondary block mb-2">
          Small
        </label>
        <Input inputSize="small" placeholder="Small input" />
      </div>
      <div>
        <label className="text-base text-font-secondary block mb-2">
          Default
        </label>
        <Input inputSize="default" placeholder="Default input" />
      </div>
      <div>
        <label className="text-xl text-font-secondary block mb-2">
          Large
        </label>
        <Input inputSize="large" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <label htmlFor="email-input" className="text-base font-medium block mb-2">
        Email Address
      </label>
      <Input
        id="email-input"
        type="email"
        placeholder="you@example.com"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label htmlFor="password-input" className="text-base font-medium block">
        Password
      </label>
      <Input
        id="password-input"
        type="password"
        placeholder="Enter password"
      />
      <p className="text-sm text-font-secondary">
        Must be at least 8 characters
      </p>
    </div>
  ),
};

export const WithErrorMessage: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label htmlFor="email-error" className="text-base font-medium block">
        Email
      </label>
      <Input
        id="email-error"
        type="email"
        hasError
        defaultValue="invalid-email"
      />
      <p className="text-sm text-font-error">
        Please enter a valid email address
      </p>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="w-96 space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-base font-medium block">
          Full Name
        </label>
        <Input id="name" placeholder="John Doe" />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-base font-medium block">
          Email
        </label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-base font-medium block">
          Phone
        </label>
        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
      </div>

      <div className="space-y-2">
        <label htmlFor="website" className="text-base font-medium block">
          Website
        </label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary-80 text-white rounded-lg font-medium"
      >
        Submit
      </button>
    </form>
  ),
};

export const SearchInput: Story = {
  render: () => (
    <div className="w-96">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-font-disabled">
          🔍
        </span>
      </div>
    </div>
  ),
};
