import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/atoms/button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "destructive",
        "warning",
        "link",
        "outlined",
        "menu",
      ],
      description: "The visual style variant of the button",
    },
    colorScheme: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "The color scheme for certain variants",
    },
    size: {
      control: "select",
      options: ["small", "default", "large", "icon"],
      description: "The size of the button",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state with spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Menu: Story = {
  args: {
    variant: "menu",
    children: "Menu Item",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    isLoading: true,
    children: "Please wait",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap items-center">
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="warning">Warning</Button>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Button variant="link">Link</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="menu">Menu</Button>
      </div>
    </div>
  ),
};

export const PrimaryColorSchemes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary">Default</Button>
      <Button variant="primary" colorScheme="info">
        Info
      </Button>
      <Button variant="primary" colorScheme="success">
        Success
      </Button>
      <Button variant="primary" colorScheme="warning">
        Warning
      </Button>
      <Button variant="primary" colorScheme="error">
        Error
      </Button>
    </div>
  ),
};

export const OutlinedColorSchemes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="outlined" colorScheme="default">
        Default
      </Button>
      <Button variant="outlined" colorScheme="info">
        Info
      </Button>
      <Button variant="outlined" colorScheme="success">
        Success
      </Button>
      <Button variant="outlined" colorScheme="warning">
        Warning
      </Button>
      <Button variant="outlined" colorScheme="error">
        Error
      </Button>
    </div>
  ),
};

export const LinkColorSchemes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="link">Default</Button>
      <Button variant="link" colorScheme="info">
        Info
      </Button>
      <Button variant="link" colorScheme="success">
        Success
      </Button>
      <Button variant="link" colorScheme="warning">
        Warning
      </Button>
      <Button variant="link" colorScheme="error">
        Error
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="small">Small</Button>
      <Button size="default">Default</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary" isLoading>
        Loading
      </Button>
      <Button variant="destructive" isLoading>
        Deleting
      </Button>
      <Button variant="outlined" isLoading>
        Processing
      </Button>
      <Button variant="link" isLoading>
        Submitting
      </Button>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="default" disabled>
        Default
      </Button>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
      <Button variant="warning" disabled>
        Warning
      </Button>
      <Button variant="link" disabled>
        Link
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Button variant="primary">
          <span>📤</span>
          <span>Upload</span>
        </Button>
        <Button variant="destructive">
          <span>🗑️</span>
          <span>Delete</span>
        </Button>
        <Button variant="outlined">
          <span>⚙️</span>
          <span>Settings</span>
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button variant="primary">
          <span>Save</span>
          <span>✓</span>
        </Button>
        <Button variant="link">
          <span>Learn More</span>
          <span>→</span>
        </Button>
      </div>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button size="icon" variant="primary">
        ✓
      </Button>
      <Button size="icon" variant="destructive">
        ✕
      </Button>
      <Button size="icon" variant="outlined">
        ⚙️
      </Button>
      <Button size="icon" variant="default">
        ℹ️
      </Button>
    </div>
  ),
};

export const MenuItems: Story = {
  render: () => (
    <div className="w-64 border border-border-secondary rounded-lg p-2 space-y-2">
      <Button variant="menu" className="w-full">
        Profile
      </Button>
      <Button variant="menu" className="w-full">
        Settings
      </Button>
      <Button variant="menu" className="w-full">
        Billing
      </Button>
      <div className="border-t border-border-tertiary my-2" />
      <Button variant="menu" className="w-full text-font-error">
        Logout
      </Button>
    </div>
  ),
};

export const FormActions: Story = {
  render: () => (
    <div className="flex gap-4 justify-end">
      <Button variant="outlined">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </div>
  ),
};

export const DialogActions: Story = {
  render: () => (
    <div className="flex gap-4 justify-end">
      <Button variant="link">Cancel</Button>
      <Button variant="destructive">Delete Account</Button>
    </div>
  ),
};
