import type { Meta, StoryObj } from "@storybook/react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/atoms/card";
import { Button } from "@/components/ui/atoms/button";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "elevated", "filled"],
      description: "Visual style variant",
    },
    padding: {
      control: "select",
      options: ["none", "small", "default", "large"],
      description: "Internal padding",
    },
    interactive: {
      control: "boolean",
      description: "Adds hover and click effects",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          This is the main content area of the card. You can put any content here.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>Card with border and no shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          This card has a border and subtle hover shadow.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-96">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>Card with shadow elevation</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          This card has a shadow that increases on hover.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Filled: Story = {
  render: () => (
    <Card variant="filled" className="w-96">
      <CardHeader>
        <CardTitle>Filled Card</CardTitle>
        <CardDescription>Card with background color</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          This card has a filled background with no shadow.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="outlined" className="w-64">
        <CardContent className="p-6 text-center">
          <p className="font-medium">Outlined</p>
        </CardContent>
      </Card>
      <Card variant="elevated" className="w-64">
        <CardContent className="p-6 text-center">
          <p className="font-medium">Elevated</p>
        </CardContent>
      </Card>
      <Card variant="filled" className="w-64">
        <CardContent className="p-6 text-center">
          <p className="font-medium">Filled</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const PaddingSizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Card padding="none">
        <CardContent className="p-3 bg-bg-secondary">
          <p className="text-sm">No padding (none)</p>
        </CardContent>
      </Card>
      <Card padding="small">
        <CardContent>
          <p className="text-sm">Small padding</p>
        </CardContent>
      </Card>
      <Card padding="default">
        <CardContent>
          <p className="text-sm">Default padding</p>
        </CardContent>
      </Card>
      <Card padding="large">
        <CardContent>
          <p className="text-sm">Large padding</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card interactive className="w-64" onClick={() => alert("Card clicked!")}>
        <CardContent className="p-6 text-center">
          <p className="font-medium">Click me!</p>
          <p className="text-sm text-font-secondary mt-2">
            Interactive card
          </p>
        </CardContent>
      </Card>
      <Card className="w-64">
        <CardContent className="p-6 text-center">
          <p className="font-medium">Regular</p>
          <p className="text-sm text-font-secondary mt-2">
            Non-interactive
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card has a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          The footer is useful for action buttons or additional information.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outlined" size="small">
          Cancel
        </Button>
        <Button variant="primary" size="small">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="outlined" interactive className="w-80">
      <div className="aspect-video bg-neutral-20 rounded-t-lg -m-medium mb-0" />
      <CardHeader className="pt-4">
        <CardTitle>MacBook Pro 14&quot;</CardTitle>
        <CardDescription>M3 Pro chip, 18GB RAM, 512GB SSD</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold text-primary-80">$1,999</p>
        <p className="text-sm text-font-secondary mt-2">
          Free shipping • In stock
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const UserProfileCard: Story = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary-80 flex items-center justify-center text-font-inverse font-bold">
            JD
          </div>
          <div>
            <CardTitle className="text-xl">John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          Passionate about building great user experiences and scalable
          applications.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outlined" size="small" className="flex-1">
          Message
        </Button>
        <Button variant="primary" size="small" className="flex-1">
          Follow
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="filled">
        <CardContent className="text-center">
          <p className="text-xxxl font-bold text-primary-80">2.4K</p>
          <p className="text-sm text-font-secondary mt-2">Followers</p>
        </CardContent>
      </Card>
      <Card variant="filled">
        <CardContent className="text-center">
          <p className="text-xxxl font-bold text-primary-80">128</p>
          <p className="text-sm text-font-secondary mt-2">Following</p>
        </CardContent>
      </Card>
      <Card variant="filled">
        <CardContent className="text-center">
          <p className="text-xxxl font-bold text-primary-80">42</p>
          <p className="text-sm text-font-secondary mt-2">Posts</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">New Message</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
          <button className="text-font-secondary hover:text-font-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base">
          You have a new message from Sarah Johnson.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outlined" size="small">
          Dismiss
        </Button>
        <Button variant="primary" size="small">
          View Message
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardDescription>For individuals</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xxxl font-bold">$9</p>
          <p className="text-sm text-font-secondary mb-4">/month</p>
          <ul className="space-y-2 text-sm">
            <li>✓ 10 projects</li>
            <li>✓ 5GB storage</li>
            <li>✓ Basic support</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outlined" className="w-full">
            Choose Plan
          </Button>
        </CardFooter>
      </Card>

      <Card variant="elevated" className="border-2 border-primary-80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pro</CardTitle>
            <span className="text-xs bg-primary-80 text-font-inverse px-2 py-1.5 rounded font-medium">
              Popular
            </span>
          </div>
          <CardDescription>For small teams</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xxxl font-bold">$29</p>
          <p className="text-sm text-font-secondary mb-4">/month</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Unlimited projects</li>
            <li>✓ 100GB storage</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced analytics</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full">
            Choose Plan
          </Button>
        </CardFooter>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <CardDescription>For large organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xxxl font-bold">Custom</p>
          <p className="text-sm text-font-secondary mb-4">pricing</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Unlimited everything</li>
            <li>✓ Dedicated support</li>
            <li>✓ Custom integrations</li>
            <li>✓ SLA guarantee</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outlined" className="w-full">
            Contact Sales
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-96 p-6">
      <p className="text-base">
        This is a simple card with just content. No header or footer needed for
        basic use cases.
      </p>
    </Card>
  ),
};
