import { forwardRef } from "react";

/**
 * Button — the primary interactive element.
 *
 * @prop {string}  variant  - "primary" | "secondary" | "ghost" | "danger" | "outline"
 * @prop {string}  size     - "sm" | "md" | "lg"
 * @prop {boolean} isLoading  - Shows a spinner and disables the button
 * @prop {boolean} fullWidth  - Makes the button full width
 * @prop {string}  as        - Render as a different element (e.g. Link)
 */
const VARIANTS = {
  primary:   "bg-brand-500 text-white hover:bg-brand-600 shadow-glow-sm hover:shadow-glow active:scale-95",
  secondary: "bg-white text-slate-700 border border-slate-200 hover:border-brand-500/50 hover:bg-slate-50",
  ghost:     "text-slate-600 hover:text-brand-600 hover:bg-slate-100",
  danger:    "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 hover:border-red-500/60",
  outline:   "border border-brand-500/50 text-brand-600 hover:bg-brand-50",
  gradient:  "gradient-bg text-white shadow-glow-sm hover:shadow-glow active:scale-95",
};

const SIZES = {
  sm: "px-4 py-2 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      className = "",
      as: Tag = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Tag
        ref={ref}
        disabled={Tag === "button" ? isDisabled : undefined}
        className={[
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:pointer-events-none disabled:opacity-50",
          VARIANTS[variant] || VARIANTS.primary,
          SIZES[size] || SIZES.md,
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </Tag>
    );
  }
);

Button.displayName = "Button";
export default Button;
