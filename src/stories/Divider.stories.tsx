import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "@/components/ui/atoms/divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the divider",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The thickness of the divider",
    },
    label: {
      control: "text",
      description: "Optional label text to display on the divider",
    },
    labelPosition: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Position of the label (only applies when label is provided)",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "OR",
  },
};

export const LabelLeft: Story = {
  args: {
    label: "Start",
    labelPosition: "left",
  },
};

export const LabelRight: Story = {
  args: {
    label: "End",
    labelPosition: "right",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-xl w-full">
      <div>
        <p className="text-sm text-font-secondary mb-3">Small</p>
        <Divider size="small" />
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-3">Medium</p>
        <Divider size="medium" />
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-3">Large</p>
        <Divider size="large" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-32 gap-4">
      <div className="flex-1 bg-bg-secondary flex items-center justify-center">
        Content 1
      </div>
      <Divider orientation="vertical" />
      <div className="flex-1 bg-bg-secondary flex items-center justify-center">
        Content 2
      </div>
      <Divider orientation="vertical" />
      <div className="flex-1 bg-bg-secondary flex items-center justify-center">
        Content 3
      </div>
    </div>
  ),
};

export const VerticalWithLabel: Story = {
  render: () => (
    <div className="flex h-32 gap-4">
      <div className="flex-1 bg-bg-secondary flex items-center justify-center">
        Content 1
      </div>
      <Divider orientation="vertical" label="OR" />
      <div className="flex-1 bg-bg-secondary flex items-center justify-center">
        Content 2
      </div>
    </div>
  ),
};

export const FormSeparator: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="space-y-3">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-border-secondary rounded-lg"
        />
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-border-secondary rounded-lg"
        />
      </div>

      <Divider label="OR" />

      <button className="w-full py-3 px-4 bg-primary-80 text-white rounded-lg">
        Continue with Google
      </button>
    </div>
  ),
};

export const SectionDivider: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
        <p className="text-font-secondary">
          Update your personal details and contact information.
        </p>
      </div>

      <Divider />

      <div>
        <h3 className="text-xl font-semibold mb-3">Security Settings</h3>
        <p className="text-font-secondary">
          Manage your password and authentication preferences.
        </p>
      </div>

      <Divider />

      <div>
        <h3 className="text-xl font-semibold mb-3">Notifications</h3>
        <p className="text-font-secondary">
          Configure how you want to receive updates and alerts.
        </p>
      </div>
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    label: "Custom Styled",
    className: "border-primary-80 opacity-100",
  },
};
