import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@/components/ui/atoms/heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
      description: "The semantic heading level (h1-h6)",
    },
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "tertiary",
        "muted",
        "inverse",
        "interactive",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "The color variant of the heading",
    },
    lineHeight: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The line height of the heading",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 1,
    children: "Heading 1",
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: "Heading 2",
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: "Heading 3",
  },
};

export const H4: Story = {
  args: {
    level: 4,
    children: "Heading 4",
  },
};

export const H5: Story = {
  args: {
    level: 5,
    children: "Heading 5",
  },
};

export const H6: Story = {
  args: {
    level: 6,
    children: "Heading 6",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={2} variant="default">
        Default Color
      </Heading>
      <Heading level={2} variant="secondary">
        Secondary Color
      </Heading>
      <Heading level={2} variant="tertiary">
        Tertiary Color
      </Heading>
      <Heading level={2} variant="muted">
        Muted Color
      </Heading>
      <Heading level={2} variant="interactive">
        Interactive Color
      </Heading>
      <Heading level={2} variant="success">
        Success Color
      </Heading>
      <Heading level={2} variant="warning">
        Warning Color
      </Heading>
      <Heading level={2} variant="error">
        Error Color
      </Heading>
      <Heading level={2} variant="info">
        Info Color
      </Heading>
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <p className="text-sm text-font-secondary mb-2">Small (1.25)</p>
        <Heading level={2} lineHeight="small">
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog.
        </Heading>
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-2">Medium (1.5)</p>
        <Heading level={2} lineHeight="medium">
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog.
        </Heading>
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-2">Large (2)</p>
        <Heading level={2} lineHeight="large">
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog.
        </Heading>
      </div>
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    level: 2,
    children: "Custom Styled Heading",
    className: "text-font-interactive underline",
  },
};
