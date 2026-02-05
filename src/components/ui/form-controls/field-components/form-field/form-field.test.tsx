import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./form-field";

// Mock Input component for testing
const MockInput = ({ id, ...props }: any) => (
  <input data-testid="mock-input" id={id} {...props} />
);

describe("FormField", () => {
  describe("Label rendering", () => {
    it("renders label when provided", () => {
      render(
        <FormField label="Email">
          <MockInput />
        </FormField>
      );

      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      render(
        <FormField>
          <MockInput />
        </FormField>
      );

      expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });

    it("hides label visually when labelHidden is true", () => {
      render(
        <FormField label="Email" labelHidden={true}>
          <MockInput />
        </FormField>
      );

      const label = screen.getByText("Email");
      expect(label).toBeInTheDocument();
      // The label should still exist for screen readers but be visually hidden
    });
  });

  describe("Description rendering", () => {
    it("renders description when provided", () => {
      render(
        <FormField label="Email" description="We'll never share your email">
          <MockInput />
        </FormField>
      );

      expect(
        screen.getByText("We'll never share your email")
      ).toBeInTheDocument();
    });

    it("does not render description when labelHidden is true", () => {
      render(
        <FormField
          label="Email"
          labelHidden={true}
          description="This should not appear"
        >
          <MockInput />
        </FormField>
      );

      expect(
        screen.queryByText("This should not appear")
      ).not.toBeInTheDocument();
    });
  });

  describe("Error handling", () => {
    it("renders error message when hasError is true", () => {
      render(
        <FormField
          label="Email"
          errorMessage="Invalid email address"
          hasError={true}
        >
          <MockInput />
        </FormField>
      );

      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    it("does not render error message when hasError is false", () => {
      render(
        <FormField
          label="Email"
          errorMessage="Invalid email address"
          hasError={false}
        >
          <MockInput />
        </FormField>
      );

      expect(
        screen.queryByText("Invalid email address")
      ).not.toBeInTheDocument();
    });

    it("does not render error message when errorMessage is not provided", () => {
      render(
        <FormField label="Email" hasError={true}>
          <MockInput />
        </FormField>
      );

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("generates unique ID for input when not provided", () => {
      render(
        <FormField label="Email">
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveAttribute("id");
      expect(input.id).toBeTruthy();
    });

    it("uses provided ID when specified", () => {
      render(
        <FormField label="Email" id="custom-email-id">
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveAttribute("id", "custom-email-id");
    });

    it("sets aria-invalid to true when hasError is true", () => {
      render(
        <FormField
          label="Email"
          errorMessage="Invalid email"
          hasError={true}
        >
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("sets aria-invalid to false when hasError is false", () => {
      render(
        <FormField label="Email" hasError={false}>
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("links input to description with aria-describedby", () => {
      render(
        <FormField label="Email" description="Enter your email address">
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      const ariaDescribedBy = input.getAttribute("aria-describedby");

      expect(ariaDescribedBy).toBeTruthy();
      expect(ariaDescribedBy).toContain("description");
    });

    it("links input to error message with aria-describedby", () => {
      render(
        <FormField
          label="Email"
          errorMessage="Invalid email"
          hasError={true}
        >
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      const ariaDescribedBy = input.getAttribute("aria-describedby");

      expect(ariaDescribedBy).toBeTruthy();
      expect(ariaDescribedBy).toContain("error");
    });

    it("links input to both description and error when both present", () => {
      render(
        <FormField
          label="Email"
          description="Enter your email"
          errorMessage="Invalid email"
          hasError={true}
        >
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      const ariaDescribedBy = input.getAttribute("aria-describedby");

      expect(ariaDescribedBy).toBeTruthy();
      expect(ariaDescribedBy).toContain("description");
      expect(ariaDescribedBy).toContain("error");
    });

    it("label htmlFor matches input id", () => {
      render(
        <FormField label="Email" id="email-field">
          <MockInput />
        </FormField>
      );

      const label = screen.getByText("Email");
      const input = screen.getByTestId("mock-input");

      expect(label).toHaveAttribute("for", "email-field");
      expect(input).toHaveAttribute("id", "email-field");
    });
  });

  describe("Input size variant", () => {
    it("passes inputSize prop to child input", () => {
      render(
        <FormField label="Email" inputSize="large">
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveAttribute("inputSize", "large");
    });

    it("defaults to default size when not specified", () => {
      render(
        <FormField label="Email">
          <MockInput />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveAttribute("inputSize", "default");
    });
  });

  describe("Custom styling", () => {
    it("applies custom container class", () => {
      const { container } = render(
        <FormField label="Email" containerClassName="custom-class">
          <MockInput />
        </FormField>
      );

      const formFieldContainer = container.querySelector(".custom-class");
      expect(formFieldContainer).toBeInTheDocument();
    });

    it("preserves child component className", () => {
      render(
        <FormField label="Email">
          <MockInput className="custom-input-class" />
        </FormField>
      );

      const input = screen.getByTestId("mock-input");
      expect(input).toHaveClass("custom-input-class");
    });
  });
});
