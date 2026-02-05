import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FieldDescription, FieldError, FieldLabel } from "@/components/ui/form-controls";
import { TextareaField, Textarea, AutoResizeTextarea } from "@/components/ui/form-controls";

const meta = {
  title: "Components/Textarea",
  component: TextareaField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
    },
    autoResize: {
      control: "boolean",
      description: "Auto-resize with content",
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
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// TextareaField Stories - Complete field composition
// ============================================================================

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    description: "Tell us about yourself in a few sentences",
    placeholder: "I am a...",
  },
};

export const WithError: Story = {
  args: {
    label: "Comment",
    hasError: true,
    errorMessage: "Comment must be at least 10 characters",
    defaultValue: "Too short",
    placeholder: "Enter your comment...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextareaField
        label="Small"
        inputSize="small"
        placeholder="Small textarea..."
        rows={3}
      />
      <TextareaField
        label="Default"
        inputSize="default"
        placeholder="Default textarea..."
        rows={3}
      />
      <TextareaField
        label="Large"
        inputSize="large"
        placeholder="Large textarea..."
        rows={3}
      />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextareaField
        label="No Resize"
        resize="none"
        placeholder="Cannot be resized"
        rows={3}
      />
      <TextareaField
        label="Vertical Resize (Default)"
        resize="vertical"
        placeholder="Can resize vertically"
        rows={3}
      />
      <TextareaField
        label="Horizontal Resize"
        resize="horizontal"
        placeholder="Can resize horizontally"
        rows={3}
      />
      <TextareaField
        label="Both Directions"
        resize="both"
        placeholder="Can resize in both directions"
        rows={3}
      />
    </div>
  ),
};

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-96 space-y-4">
        <TextareaField
          label="Auto-resize Textarea"
          description="This textarea grows automatically as you type"
          autoResize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start typing and watch it grow..."
          rows={3}
        />

        <div className="pt-4 border-t border-border-secondary">
          <p className="text-sm text-font-secondary">
            <strong>Characters:</strong> {value.length}
          </p>
          <p className="text-sm text-font-secondary">
            <strong>Lines:</strong> {value.split("\n").length}
          </p>
        </div>
      </div>
    );
  },
};

export const AutoResizeWithMaxRows: Story = {
  render: () => (
    <div className="w-96">
      <TextareaField
        label="Limited Auto-resize"
        description="Auto-resizes up to 6 lines, then scrolls"
        autoResize
        maxRows={6}
        placeholder="Type multiple lines... After 6 lines, it will scroll instead of growing"
        rows={3}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Message",
    disabled: true,
    defaultValue: "This textarea is disabled and cannot be edited.",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Message",
    labelHidden: true,
    placeholder: "Enter your message...",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxLength = 200;
    const hasError = value.length > maxLength;

    return (
      <div className="w-96 space-y-4">
        <TextareaField
          label="Feedback"
          description={`Maximum ${maxLength} characters`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hasError={hasError}
          errorMessage={
            hasError ? `Exceeded maximum by ${value.length - maxLength} characters` : undefined
          }
          placeholder="Share your feedback..."
          rows={4}
        />

        <div className="pt-4 border-t border-border-secondary space-y-2">
          <p className="text-sm text-font-secondary">
            <strong>Character count:</strong> {value.length} / {maxLength}
          </p>
          <div className="w-full bg-neutral-20 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                hasError ? "bg-bg-error" : "bg-primary-80"
              )}
              style={{ width: `${Math.min((value.length / maxLength) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [errors, setErrors] = useState<{ message?: string }>({});

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newMessage = e.target.value;
      setFormData({ ...formData, message: newMessage });

      if (newMessage.length < 10 && newMessage.length > 0) {
        setErrors({ message: "Message must be at least 10 characters" });
      } else {
        setErrors({ message: undefined });
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="text-xl font-semibold">Contact Us</h3>

        <div className="space-y-2">
          <FieldLabel htmlFor="contact-name">Name</FieldLabel>
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
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
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
          <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
          <input
            id="contact-subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            placeholder="How can we help?"
            className="flex w-full rounded-lg border-2 border-border-primary bg-bg-primary px-4 py-3 text-base"
          />
        </div>

        <TextareaField
          label="Message"
          description="Please provide as much detail as possible"
          value={formData.message}
          onChange={handleMessageChange}
          hasError={!!errors.message}
          errorMessage={errors.message}
          placeholder="Tell us more about your inquiry..."
          rows={5}
        />

        <button
          type="submit"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message ||
            !!errors.message
          }
          className="w-full py-3 bg-primary-80 text-white rounded-lg font-medium hover:bg-primary-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </form>
    );
  },
};

// ============================================================================
// Textarea Stories - Base component without field wrapper
// ============================================================================

export const TextareaBasic: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-font-secondary mb-4">
        This is the <code>Textarea</code> component - just the textarea control,
        no label/error wrapper
      </p>
      <Textarea placeholder="Enter text..." rows={4} />
    </div>
  ),
};

export const TextareaCustomComposition: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const hasError = value.length > 0 && value.length < 10;

    return (
      <div className="w-96 space-y-2">
        <p className="text-sm text-font-secondary mb-4">
          Custom composition using <code>Textarea</code> with separate Label,
          FieldDescription, and FieldError components
        </p>

        <FieldLabel htmlFor="custom-textarea" hasError={hasError}>
          Comments
        </FieldLabel>

        <FieldDescription>Use Textarea for custom field layouts</FieldDescription>

        <Textarea
          id="custom-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hasError={hasError}
          placeholder="Enter your comments..."
          rows={4}
        />

        {hasError && (
          <FieldError>Comment must be at least 10 characters</FieldError>
        )}
      </div>
    );
  },
};

export const AutoResizeTextareaBasic: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-font-secondary mb-4">
        Using the <code>AutoResizeTextarea</code> component directly
      </p>
      <AutoResizeTextarea
        placeholder="This textarea grows automatically..."
        rows={3}
      />
    </div>
  ),
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
