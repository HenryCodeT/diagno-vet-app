import { PhoneNumberField } from "@/components/ui/form-controls";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";


const meta = {
  title: "Components/PhoneNumberField",
  component: PhoneNumberField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
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
      description: "Error state",
    },
  },
} satisfies Meta<typeof PhoneNumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "555-1234",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-96">
      <label htmlFor="phone" className="text-base font-medium block mb-2">
        Phone Number
      </label>
      <PhoneNumberField id="phone" placeholder="555-1234" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <label className="text-sm text-font-secondary block mb-2">
          Small
        </label>
        <PhoneNumberField inputSize="small" placeholder="555-1234" />
      </div>
      <div>
        <label className="text-base text-font-secondary block mb-2">
          Default
        </label>
        <PhoneNumberField inputSize="default" placeholder="555-1234" />
      </div>
      <div>
        <label className="text-xl text-font-secondary block mb-2">
          Large
        </label>
        <PhoneNumberField inputSize="large" placeholder="555-1234" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "555-1234",
  },
};

export const WithError: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <label htmlFor="phone-error" className="text-base font-medium block">
        Phone Number
      </label>
      <PhoneNumberField
        id="phone-error"
        hasError
        defaultValue="12345"
        placeholder="555-1234"
      />
      <p className="text-sm text-font-error">
        Please enter a valid phone number
      </p>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [dialCode, setDialCode] = useState("+1");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
      <div className="w-96 space-y-4">
        <div>
          <label htmlFor="phone-controlled" className="text-base font-medium block mb-2">
            Phone Number
          </label>
          <PhoneNumberField
            id="phone-controlled"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            defaultDialCode={dialCode}
            onDialCodeChange={setDialCode}
            placeholder="555-1234"
          />
        </div>

        <div className="pt-4 border-t border-border-secondary space-y-2">
          <p className="text-sm text-font-secondary">
            <strong>Dial Code:</strong> {dialCode}
          </p>
          <p className="text-sm text-font-secondary">
            <strong>Phone Number:</strong> {phoneNumber || "(empty)"}
          </p>
          <p className="text-sm text-font-secondary">
            <strong>Full Number:</strong> {dialCode} {phoneNumber || "(empty)"}
          </p>
        </div>
      </div>
    );
  },
};

export const CustomDialCodes: Story = {
  render: () => {
    const latinAmericaCodes = [
      { code: "MX", country: "Mexico", dialCode: "+52" },
      { code: "AR", country: "Argentina", dialCode: "+54" },
      { code: "BR", country: "Brazil", dialCode: "+55" },
      { code: "CL", country: "Chile", dialCode: "+56" },
      { code: "CO", country: "Colombia", dialCode: "+57" },
      { code: "PE", country: "Peru", dialCode: "+51" },
    ];

    return (
      <div className="w-96">
        <label htmlFor="phone-latam" className="text-base font-medium block mb-2">
          Phone Number (Latin America)
        </label>
        <PhoneNumberField
          id="phone-latam"
          dialCodeList={latinAmericaCodes}
          defaultDialCode="+52"
          placeholder="555-1234"
        />
      </div>
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      dialCode: "+1",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>

        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-base font-medium block">
            Full Name
          </label>
          <input
            id="contact-name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="John Doe"
            className="flex w-full rounded-lg border-2 border-border-primary bg-bg-primary px-4 py-3 text-base"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-base font-medium block">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="john@example.com"
            className="flex w-full rounded-lg border-2 border-border-primary bg-bg-primary px-4 py-3 text-base"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-phone" className="text-base font-medium block">
            Phone Number
          </label>
          <PhoneNumberField
            id="contact-phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            defaultDialCode={formData.dialCode}
            onDialCodeChange={(dialCode) =>
              setFormData({ ...formData, dialCode })
            }
            placeholder="555-1234"
          />
          <p className="text-sm text-font-secondary">
            We&apos;ll never share your phone number
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary-80 text-white rounded-lg font-medium hover:bg-primary-90 transition-colors"
        >
          Submit
        </button>
      </form>
    );
  },
};
