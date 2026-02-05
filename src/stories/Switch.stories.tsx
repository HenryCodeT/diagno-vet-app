import { Switch } from "@/components/ui/form-controls";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";


const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the switch",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state (shows error background color)",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
    defaultChecked: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Switch inputSize="small" defaultChecked />
        <span className="text-xs text-font-secondary">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch inputSize="default" defaultChecked />
        <span className="text-xs text-font-secondary">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch inputSize="large" defaultChecked />
        <span className="text-xs text-font-secondary">Large</span>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Unchecked</div>
        <Switch defaultChecked={false} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Checked</div>
        <Switch defaultChecked={true} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Disabled</div>
        <Switch disabled defaultChecked={false} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Disabled Checked</div>
        <Switch disabled defaultChecked={true} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Error</div>
        <Switch hasError defaultChecked={false} />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Switch
          id="airplane-mode"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label
          htmlFor="airplane-mode"
          className="text-base font-medium cursor-pointer"
        >
          Airplane Mode
        </label>
      </div>
    );
  },
};

export const SettingsList: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    return (
      <div className="w-96 space-y-4">
        <div className="flex items-center justify-between py-3">
          <div>
            <label
              htmlFor="notifications"
              className="text-base font-medium cursor-pointer block"
            >
              Push Notifications
            </label>
            <p className="text-sm text-font-secondary">
              Receive push notifications
            </p>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <label
              htmlFor="marketing"
              className="text-base font-medium cursor-pointer block"
            >
              Marketing Emails
            </label>
            <p className="text-sm text-font-secondary">
              Receive emails about new products
            </p>
          </div>
          <Switch
            id="marketing"
            checked={marketing}
            onCheckedChange={setMarketing}
          />
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <label
              htmlFor="analytics"
              className="text-base font-medium cursor-pointer block"
            >
              Analytics
            </label>
            <p className="text-sm text-font-secondary">
              Help us improve by sharing usage data
            </p>
          </div>
          <Switch
            id="analytics"
            checked={analytics}
            onCheckedChange={setAnalytics}
          />
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled-switch"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label htmlFor="controlled-switch" className="text-base">
            {checked ? "On" : "Off"}
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChecked(true)}
            className="px-3 py-2 bg-primary-80 text-white rounded text-sm"
          >
            Turn On
          </button>
          <button
            onClick={() => setChecked(false)}
            className="px-3 py-2 bg-neutral-60 text-white rounded text-sm"
          >
            Turn Off
          </button>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      weeklyDigest: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(settings, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Notification Settings</h3>

          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-base cursor-pointer">
              Email Notifications
            </label>
            <Switch
              id="email"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="sms" className="text-base cursor-pointer">
              SMS Notifications
            </label>
            <Switch
              id="sms"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, smsNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="push" className="text-base cursor-pointer">
              Push Notifications
            </label>
            <Switch
              id="push"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, pushNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="digest" className="text-base cursor-pointer">
              Weekly Digest
            </label>
            <Switch
              id="digest"
              checked={settings.weeklyDigest}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, weeklyDigest: checked })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary-80 text-white rounded-lg font-medium"
        >
          Save Settings
        </button>
      </form>
    );
  },
};

export const DifferentSizesWithLabels: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Switch inputSize="small" id="small-switch" defaultChecked />
        <label htmlFor="small-switch" className="text-sm">
          Small Switch
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Switch inputSize="default" id="default-switch" defaultChecked />
        <label htmlFor="default-switch" className="text-base">
          Default Switch
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Switch inputSize="large" id="large-switch" defaultChecked />
        <label htmlFor="large-switch" className="text-xl">
          Large Switch
        </label>
      </div>
    </div>
  ),
};
