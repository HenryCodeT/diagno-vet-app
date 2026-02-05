import type { Meta, StoryObj } from "@storybook/react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/atoms/alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "error", "warning", "success"],
      description: "The visual style variant of the alert",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icon components for demonstration
const InfoIcon = () => <span>ℹ️</span>;
const ErrorIcon = () => <span>❌</span>;
const WarningIcon = () => <span>⚠️</span>;
const SuccessIcon = () => <span>✅</span>;
const DefaultIcon = () => <span>📢</span>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertIcon>
        <DefaultIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Your account has been successfully updated with the new settings.
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert variant="error">
      <AlertIcon>
        <ErrorIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again to continue.
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertIcon>
        <WarningIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action cannot be undone. Please review your changes carefully.
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <AlertIcon>
        <SuccessIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully!
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert variant="info">
      <div>
        <AlertTitle>Did you know?</AlertTitle>
        <AlertDescription>
          You can customize the appearance of alerts using the variant prop.
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertIcon>
        <WarningIcon />
      </AlertIcon>
      <AlertDescription>
        Please verify your email address to activate your account.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <AlertIcon>
          <DefaultIcon />
        </AlertIcon>
        <div>
          <AlertTitle>Default Alert</AlertTitle>
          <AlertDescription>
            This is a default alert with standard styling.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="info">
        <AlertIcon>
          <InfoIcon />
        </AlertIcon>
        <div>
          <AlertTitle>Info Alert</AlertTitle>
          <AlertDescription>
            This is an informational alert for general updates.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="success">
        <AlertIcon>
          <SuccessIcon />
        </AlertIcon>
        <div>
          <AlertTitle>Success Alert</AlertTitle>
          <AlertDescription>
            This is a success alert for completed actions.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="warning">
        <AlertIcon>
          <WarningIcon />
        </AlertIcon>
        <div>
          <AlertTitle>Warning Alert</AlertTitle>
          <AlertDescription>
            This is a warning alert for cautionary messages.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="error">
        <AlertIcon>
          <ErrorIcon />
        </AlertIcon>
        <div>
          <AlertTitle>Error Alert</AlertTitle>
          <AlertDescription>
            This is an error alert for critical issues.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  ),
};

export const WithActionButton: Story = {
  render: () => (
    <Alert variant="info">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <div className="flex-1">
        <AlertTitle>New update available</AlertTitle>
        <AlertDescription>
          A new version of the application is ready to install.
        </AlertDescription>
      </div>
      <button className="shrink-0 px-3 py-2 bg-primary-80 text-white rounded text-sm font-medium hover:bg-primary-90 transition-colors">
        Update
      </button>
    </Alert>
  ),
};

export const WithDismissButton: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertIcon>
        <WarningIcon />
      </AlertIcon>
      <div className="flex-1">
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          You are using 95% of your available storage space.
        </AlertDescription>
      </div>
      <button
        className="shrink-0 text-font-tertiary hover:text-font-primary transition-colors"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="error">
      <AlertIcon>
        <ErrorIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Multiple Errors Detected</AlertTitle>
        <AlertDescription>
          We encountered several issues while processing your request:
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>Invalid email format provided</li>
            <li>Password does not meet security requirements</li>
            <li>Username is already taken</li>
            <li>Date of birth must be in the past</li>
          </ul>
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const CustomClassName: Story = {
  render: () => (
    <Alert className="border-2 border-primary-80 shadow-medium">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Custom Styled Alert</AlertTitle>
        <AlertDescription>
          This alert has custom border and shadow styling applied.
        </AlertDescription>
      </div>
    </Alert>
  ),
};
