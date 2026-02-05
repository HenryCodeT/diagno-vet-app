import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Rating } from "@/components/ui/atoms/rating";

const meta = {
  title: "Components/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
      description: "Current rating value (supports decimals)",
    },
    maxValue: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum rating value",
    },
    size: {
      control: "select",
      options: ["small", "default", "large", "xlarge"],
      description: "Size variant",
    },
    interactive: {
      control: "boolean",
      description: "Whether rating is clickable",
    },
    showValue: {
      control: "boolean",
      description: "Show numeric value",
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
  },
};

export const Values: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={0} />
      <Rating value={1} />
      <Rating value={2} />
      <Rating value={3} />
      <Rating value={4} />
      <Rating value={5} />
    </div>
  ),
};

export const PartialRatings: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={0.5} />
      <Rating value={1.5} />
      <Rating value={2.5} />
      <Rating value={3.5} />
      <Rating value={4.5} />
      <Rating value={4.7} />
      <Rating value={4.9} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={4} size="small" />
      <Rating value={4} size="default" />
      <Rating value={4} size="large" />
      <Rating value={4} size="xlarge" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating
        value={4.5}
        fillColor="hsl(var(--warning-60))"
        emptyColor="hsl(var(--neutral-30))"
      />
      <Rating
        value={4.5}
        fillColor="hsl(var(--error-60))"
        emptyColor="hsl(var(--neutral-30))"
      />
      <Rating
        value={4.5}
        fillColor="hsl(var(--success-60))"
        emptyColor="hsl(var(--neutral-30))"
      />
      <Rating
        value={4.5}
        fillColor="hsl(var(--info-60))"
        emptyColor="hsl(var(--neutral-30))"
      />
      <Rating
        value={4.5}
        fillColor="#FFD700"
        emptyColor="#E0E0E0"
      />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={4.5} showValue />
      <Rating value={3.7} showValue />
      <Rating value={2.8} showValue />
    </div>
  ),
};

export const CustomValueFormat: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating
        value={4.5}
        showValue
        formatValue={(value) => `${value} stars`}
      />
      <Rating
        value={4.5}
        showValue
        formatValue={(value) => `${value.toFixed(1)}/5.0`}
      />
      <Rating
        value={4.5}
        showValue
        formatValue={(value, max) => `${Math.round((value / max) * 100)}%`}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = useState(3);

    return (
      <div className="space-y-4">
        <p className="text-sm text-font-secondary">
          Click on a star to rate (Current: {rating})
        </p>
        <Rating
          value={rating}
          interactive
          onChange={setRating}
        />
      </div>
    );
  },
};

export const InteractiveWithValue: Story = {
  render: () => {
    const [rating, setRating] = useState(4);

    return (
      <div className="space-y-4">
        <p className="text-sm text-font-secondary">
          Hover and click to rate
        </p>
        <Rating
          value={rating}
          interactive
          onChange={setRating}
          showValue
          formatValue={(value) => `${value}/5`}
        />
      </div>
    );
  },
};

export const CustomMaxValue: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-font-secondary mb-2">Out of 3</p>
        <Rating value={2.5} maxValue={3} showValue />
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-2">Out of 7</p>
        <Rating value={5} maxValue={7} showValue />
      </div>
      <div>
        <p className="text-sm text-font-secondary mb-2">Out of 10</p>
        <Rating value={8.5} maxValue={10} showValue />
      </div>
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => {
    const HeartIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );

    const ThumbIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
      </svg>
    );

    return (
      <div className="space-y-4">
        <Rating
          value={4}
          icon={HeartIcon}
          fillColor="hsl(var(--error-60))"
        />
        <Rating
          value={3}
          icon={ThumbIcon}
          fillColor="hsl(var(--info-60))"
          maxValue={5}
        />
      </div>
    );
  },
};

export const ProductRating: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="border-2 border-border-primary rounded-lg p-4">
        <h4 className="font-semibold mb-2">Wireless Headphones</h4>
        <div className="flex items-center gap-2 mb-4">
          <Rating value={4.5} size="small" />
          <span className="text-sm text-font-secondary">(128 reviews)</span>
        </div>
        <p className="text-sm text-font-secondary">
          Premium noise-cancelling headphones with 30-hour battery life
        </p>
      </div>

      <div className="border-2 border-border-primary rounded-lg p-4">
        <h4 className="font-semibold mb-2">Mechanical Keyboard</h4>
        <div className="flex items-center gap-2 mb-4">
          <Rating value={4.8} size="small" />
          <span className="text-sm text-font-secondary">(342 reviews)</span>
        </div>
        <p className="text-sm text-font-secondary">
          RGB backlit mechanical keyboard with hot-swappable switches
        </p>
      </div>
    </div>
  ),
};

export const ReviewsList: Story = {
  render: () => {
    const reviews = [
      { author: "John Doe", rating: 5, comment: "Excellent product! Highly recommend." },
      { author: "Jane Smith", rating: 4, comment: "Good quality, fast shipping." },
      { author: "Bob Johnson", rating: 3.5, comment: "Decent, but could be better." },
      { author: "Alice Brown", rating: 5, comment: "Perfect! Exactly what I needed." },
    ];

    return (
      <div className="w-96 space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b-medium border-border-primary pb-4 last:border-b-0"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm">{review.author}</p>
              <Rating value={review.rating} size="small" />
            </div>
            <p className="text-sm text-font-secondary">{review.comment}</p>
          </div>
        ))}
      </div>
    );
  },
};

export const RatingSummary: Story = {
  render: () => {
    const ratings = [
      { stars: 5, count: 125, percentage: 65 },
      { stars: 4, count: 42, percentage: 22 },
      { stars: 3, count: 15, percentage: 8 },
      { stars: 2, count: 6, percentage: 3 },
      { stars: 1, count: 4, percentage: 2 },
    ];

    return (
      <div className="w-96 border-2 border-border-primary rounded-lg p-6">
        <div className="flex items-center gap-4 mb-large">
          <div className="text-center">
            <div className="text-4xl font-bold">4.5</div>
            <Rating value={4.5} size="small" className="mt-2" />
            <div className="text-sm text-font-secondary mt-2">
              192 reviews
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-20">
                <span className="text-sm">{rating.stars}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-warning-60"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="flex-1 h-2 bg-neutral-20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning-60 transition-all"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <span className="text-sm text-font-secondary w-12 text-right">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const InteractiveReview: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      setSubmitted(true);
    };

    const handleReset = () => {
      setRating(0);
      setSubmitted(false);
    };

    if (submitted) {
      return (
        <div className="w-96 border-2 border-border-primary rounded-lg p-6 text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-12 w-12 mx-auto text-success-60"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Thank you for your review!</h3>
          <p className="text-sm text-font-secondary mb-4">
            Your {rating}-star rating has been submitted.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-neutral-20 hover:bg-neutral-30 rounded-lg text-sm transition-colors"
          >
            Submit Another Review
          </button>
        </div>
      );
    }

    return (
      <div className="w-96 border-2 border-border-primary rounded-lg p-6">
        <h3 className="font-semibold mb-3">Rate this product</h3>
        <p className="text-sm text-font-secondary mb-4">
          Click on the stars to rate
        </p>
        <div className="flex items-center justify-center mb-large">
          <Rating
            value={rating}
            interactive
            onChange={setRating}
            size="large"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
            rating === 0
              ? "bg-neutral-20 text-font-disabled cursor-not-allowed"
              : "bg-info-60 text-font-inverse hover:bg-info-70"
          }`}
        >
          Submit Review
        </button>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-3">Small</p>
        <div className="space-y-2">
          <Rating value={5} size="small" />
          <Rating value={4.5} size="small" />
          <Rating value={3} size="small" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Default</p>
        <div className="space-y-2">
          <Rating value={5} size="default" />
          <Rating value={4.5} size="default" />
          <Rating value={3} size="default" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Large</p>
        <div className="space-y-2">
          <Rating value={5} size="large" />
          <Rating value={4.5} size="large" />
          <Rating value={3} size="large" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">XLarge</p>
        <div className="space-y-2">
          <Rating value={5} size="xlarge" />
          <Rating value={4.5} size="xlarge" />
          <Rating value={3} size="xlarge" />
        </div>
      </div>
    </div>
  ),
};
