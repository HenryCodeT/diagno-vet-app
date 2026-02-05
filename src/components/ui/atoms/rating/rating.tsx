import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ============================================================================
// Rating Utilities
// ============================================================================

const isIconFilled = (currentIconIndex: number, ratingValue: number): boolean => {
  return currentIconIndex <= ratingValue;
};

const isIconEmpty = (currentIconIndex: number, ratingValue: number): boolean => {
  return currentIconIndex - 1 >= ratingValue;
};

const isIconMixed = (currentIconIndex: number, ratingValue: number): boolean => {
  return currentIconIndex > ratingValue && currentIconIndex - 1 < ratingValue;
};

// ============================================================================
// Default Star Icon
// ============================================================================

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ============================================================================
// Rating Icon Components
// ============================================================================

const RatingIcon: React.FC<{
  icon: React.ReactNode;
  fillColor?: string;
  className?: string;
}> = ({ icon, fillColor, className }) => {
  return (
    <span className={cn("relative inline-flex", className)} aria-hidden="true">
      <span className="inline-flex" style={fillColor ? { color: fillColor } : undefined}>
        {icon}
      </span>
    </span>
  );
};

const RatingMixedIcon: React.FC<{
  fillIcon: React.ReactNode;
  emptyIcon: React.ReactNode;
  value: number;
  fillColor?: string;
  emptyColor?: string;
}> = ({ fillIcon, emptyIcon, value, fillColor, emptyColor }) => {
  const widthPercentage = `${(value % 1) * 100}%`;

  return (
    <span className="relative inline-flex" aria-hidden="true">
      {/* Empty icon layer */}
      <span
        className="inline-flex"
        style={emptyColor ? { color: emptyColor } : undefined}
      >
        {emptyIcon}
      </span>
      {/* Filled icon layer - overlayed with width percentage */}
      <span
        className="absolute top-0 left-0 inline-flex overflow-hidden"
        style={{
          width: widthPercentage,
          color: fillColor,
        }}
      >
        {fillIcon}
      </span>
    </span>
  );
};

// ============================================================================
// Rating Variants
// ============================================================================

const ratingVariants = cva("inline-flex items-center gap-2", {
  variants: {
    size: {
      small: "[&_svg]:h-4 [&_svg]:w-4",
      default: "[&_svg]:h-5 [&_svg]:w-5",
      large: "[&_svg]:h-6 [&_svg]:w-6",
      xlarge: "[&_svg]:h-8 [&_svg]:w-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// ============================================================================
// Rating Component
// ============================================================================

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  /**
   * Current rating value (supports decimals for partial stars)
   */
  value?: number;

  /**
   * Maximum rating value
   * @default 5
   */
  maxValue?: number;

  /**
   * Custom icon to display for filled state
   */
  icon?: React.ReactNode;

  /**
   * Custom icon to display for empty state (defaults to icon prop)
   */
  emptyIcon?: React.ReactNode;

  /**
   * Color for filled icons
   */
  fillColor?: string;

  /**
   * Color for empty icons
   */
  emptyColor?: string;

  /**
   * Whether the rating is interactive (clickable)
   * @default false
   */
  interactive?: boolean;

  /**
   * Callback fired when rating value changes (only in interactive mode)
   */
  onChange?: (value: number) => void;

  /**
   * Whether to show the numeric value
   * @default false
   */
  showValue?: boolean;

  /**
   * Format function for the displayed value
   */
  formatValue?: (value: number, maxValue: number) => string;

  /**
   * Accessible label for screen readers
   */
  label?: string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      value = 0,
      maxValue = 5,
      icon,
      emptyIcon,
      fillColor = "var(--color-warning-60)",
      emptyColor = "var(--color-neutral-40)",
      interactive = false,
      onChange,
      showValue = false,
      formatValue,
      label,
      ...props
    },
    ref
  ) => {
    const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);

    const filledIcon = icon ?? <StarIcon />;
    const _emptyIcon = emptyIcon ?? icon ?? <StarIcon />;

    const currentValue = hoveredValue ?? value;

    const items = React.useMemo(() => {
      return new Array(Math.ceil(maxValue)).fill(1).map((_, index) => {
        const currentIconIndex = index + 1;

        const handleClick = () => {
          if (interactive && onChange) {
            onChange(currentIconIndex);
          }
        };

        const handleMouseEnter = () => {
          if (interactive) {
            setHoveredValue(currentIconIndex);
          }
        };

        const handleMouseLeave = () => {
          if (interactive) {
            setHoveredValue(null);
          }
        };

        const iconProps = interactive
          ? {
              onClick: handleClick,
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              className: "cursor-pointer transition-transform hover:scale-110",
            }
          : {};

        if (isIconFilled(currentIconIndex, currentValue)) {
          return (
            <RatingIcon
              key={index}
              icon={filledIcon}
              fillColor={fillColor}
              className={iconProps.className}
              {...iconProps}
            />
          );
        }

        if (isIconEmpty(currentIconIndex, currentValue)) {
          return (
            <RatingIcon
              key={index}
              icon={_emptyIcon}
              fillColor={emptyColor}
              className={iconProps.className}
              {...iconProps}
            />
          );
        }

        if (isIconMixed(currentIconIndex, currentValue)) {
          return (
            <RatingMixedIcon
              key={index}
              fillIcon={filledIcon}
              emptyIcon={_emptyIcon}
              value={currentValue}
              fillColor={fillColor}
              emptyColor={emptyColor}
            />
          );
        }

        return null;
      });
    }, [maxValue, currentValue, filledIcon, _emptyIcon, fillColor, emptyColor, interactive, onChange]);

    const displayValue = React.useMemo(() => {
      if (!showValue) return null;
      if (formatValue) {
        return formatValue(value, maxValue);
      }
      return `${value}/${maxValue}`;
    }, [showValue, formatValue, value, maxValue]);

    const ariaLabel = label ?? `${value} out of ${maxValue} rating`;

    return (
      <div
        ref={ref}
        className={cn(ratingVariants({ size, className }))}
        role={interactive ? "slider" : "img"}
        aria-label={ariaLabel}
        aria-valuemin={interactive ? 0 : undefined}
        aria-valuemax={interactive ? maxValue : undefined}
        aria-valuenow={interactive ? value : undefined}
        tabIndex={interactive ? 0 : undefined}
        onMouseLeave={() => interactive && setHoveredValue(null)}
        {...props}
      >
        {items}
        {displayValue && (
          <span className="ml-2 text-sm text-font-secondary">
            {displayValue}
          </span>
        )}
        <span className="sr-only">{ariaLabel}</span>
      </div>
    );
  }
);

Rating.displayName = "Rating";

export { Rating, ratingVariants };
