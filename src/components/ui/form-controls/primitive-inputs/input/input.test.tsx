import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  describe("Basic rendering", () => {
    it("renders input element", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("defaults to textbox role when no type specified", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("renders with specified type", () => {
      render(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("renders password input", () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe("User interaction", () => {
    it("accepts user input", async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole("textbox");
      await user.type(input, "Hello World");

      expect(input).toHaveValue("Hello World");
    });

    it("calls onChange handler when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "A");

      expect(handleChange).toHaveBeenCalled();
    });

    it("can be cleared", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="Initial value" />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input).toHaveValue("Initial value");

      await user.clear(input);
      expect(input).toHaveValue("");
    });
  });

  describe("Placeholder", () => {
    it("displays placeholder text", () => {
      render(<Input placeholder="Enter your email" />);
      const input = screen.getByPlaceholderText("Enter your email");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Disabled state", () => {
    it("can be disabled", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("does not accept input when disabled", async () => {
      const user = userEvent.setup();
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      await user.type(input, "Should not work");

      expect(input).toHaveValue("");
    });
  });

  describe("Size variants", () => {
    it("applies small size class", () => {
      render(<Input inputSize="small" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-8");
    });

    it("applies default size class", () => {
      render(<Input inputSize="default" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-10");
    });

    it("applies large size class", () => {
      render(<Input inputSize="large" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-12");
    });
  });

  describe("Custom attributes", () => {
    it("accepts custom className", () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
    });

    it("accepts id attribute", () => {
      render(<Input id="email-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "email-input");
    });

    it("accepts name attribute", () => {
      render(<Input name="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "email");
    });

    it("accepts required attribute", () => {
      render(<Input required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("accepts aria-invalid attribute", () => {
      render(<Input aria-invalid={true} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("accepts aria-describedby attribute", () => {
      render(<Input aria-describedby="helper-text" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "helper-text");
    });
  });

  describe("Value control", () => {
    it("accepts defaultValue", () => {
      render(<Input defaultValue="Initial value" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("Initial value");
    });

    it("accepts controlled value", () => {
      const { rerender } = render(<Input value="Controlled" onChange={() => {}} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("Controlled");

      rerender(<Input value="Updated" onChange={() => {}} />);
      expect(input).toHaveValue("Updated");
    });
  });

  describe("Forward ref", () => {
    it("forwards ref to input element", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe("INPUT");
    });

    it("allows ref.current.focus()", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("applies error styling with aria-invalid", () => {
      render(<Input aria-invalid={true} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("aria-invalid:border-border-error");
    });

    it("shows disabled cursor when disabled", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:cursor-not-allowed");
    });
  });
});
