import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "@/components/ui/atoms/skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The predefined height of the skeleton",
    },
    shape: {
      control: "select",
      options: ["rectangle", "circle", "text"],
      description: "The shape of the skeleton",
    },
    width: {
      control: "text",
      description: "Custom width (e.g., '100px', '50%', 200)",
    },
    height: {
      control: "text",
      description: "Custom height (e.g., '100px', '50%', 200)",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "100%",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div>
        <p className="text-sm text-font-secondary mb-2">Small</p>
        <Skeleton size="small" width="100%" />
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-2">Default</p>
        <Skeleton size="default" width="100%" />
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-2">Large</p>
        <Skeleton size="large" width="100%" />
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <div className="text-center">
        <p className="text-sm text-font-secondary mb-2">Circle</p>
        <Skeleton shape="circle" width={64} height={64} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-font-secondary mb-2">Rectangle</p>
        <Skeleton shape="rectangle" height={64} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-font-secondary mb-2">Text</p>
        <Skeleton shape="text" height={20} />
      </div>
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton shape="circle" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton shape="text" width="60%" height={16} />
        <Skeleton shape="text" width="40%" height={14} />
      </div>
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="w-80 border border-border-secondary rounded-lg p-4 space-y-4">
      <Skeleton height={192} className="rounded-lg" />
      <div className="space-y-2">
        <Skeleton shape="text" width="80%" height={20} />
        <Skeleton shape="text" width="60%" height={16} />
      </div>
      <div className="space-y-2">
        <Skeleton shape="text" width="100%" height={14} />
        <Skeleton shape="text" width="100%" height={14} />
        <Skeleton shape="text" width="70%" height={14} />
      </div>
    </div>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-4">
        <Skeleton width="70%" height={32} />
        <div className="flex items-center gap-4">
          <Skeleton shape="circle" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton shape="text" width="30%" height={14} />
            <Skeleton shape="text" width="20%" height={12} />
          </div>
        </div>
      </div>

      <Skeleton height={256} className="rounded-lg" />

      <div className="space-y-3">
        <Skeleton shape="text" width="100%" height={16} />
        <Skeleton shape="text" width="100%" height={16} />
        <Skeleton shape="text" width="100%" height={16} />
        <Skeleton shape="text" width="85%" height={16} />
      </div>

      <div className="space-y-3">
        <Skeleton shape="text" width="100%" height={16} />
        <Skeleton shape="text" width="100%" height={16} />
        <Skeleton shape="text" width="92%" height={16} />
      </div>
    </div>
  ),
};

export const UserList: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton shape="circle" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton shape="text" width="60%" height={16} />
            <Skeleton shape="text" width="40%" height={14} />
          </div>
          <Skeleton width={80} height={32} className="rounded" />
        </div>
      ))}
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-4 gap-4 p-4 bg-bg-secondary rounded">
        <Skeleton shape="text" height={16} />
        <Skeleton shape="text" height={16} />
        <Skeleton shape="text" height={16} />
        <Skeleton shape="text" height={16} />
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-4 p-4 border-b border-border-tertiary"
        >
          <Skeleton shape="text" height={14} />
          <Skeleton shape="text" height={14} />
          <Skeleton shape="text" height={14} />
          <Skeleton shape="text" height={14} />
        </div>
      ))}
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton width={200} height={32} />
        <Skeleton width={120} height={40} className="rounded" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-border-secondary rounded-lg p-4 space-y-3"
          >
            <Skeleton shape="text" width="50%" height={14} />
            <Skeleton width="80%" height={32} />
            <Skeleton shape="text" width="60%" height={12} />
          </div>
        ))}
      </div>

      <div className="border border-border-secondary rounded-lg p-4 space-y-4">
        <Skeleton width="30%" height={24} />
        <Skeleton height={200} />
      </div>
    </div>
  ),
};

export const Form: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="space-y-2">
        <Skeleton shape="text" width="30%" height={14} />
        <Skeleton height={40} className="rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton shape="text" width="30%" height={14} />
        <Skeleton height={40} className="rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton shape="text" width="40%" height={14} />
        <Skeleton height={80} className="rounded" />
      </div>
      <div className="flex gap-4">
        <Skeleton width={100} height={40} className="rounded" />
        <Skeleton width={100} height={40} className="rounded" />
      </div>
    </div>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width="100%" height={100} />
      <Skeleton width="75%" height={80} />
      <Skeleton width="50%" height={60} />
      <Skeleton width="25%" height={40} />
    </div>
  ),
};
