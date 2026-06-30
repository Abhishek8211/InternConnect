import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

/**
 * Input — styled text input with optional label, error, and icon.
 *
 * @prop {string}    label      - Field label text
 * @prop {string}    error      - Validation error message
 * @prop {ReactNode} leftIcon   - Icon displayed on the left
 * @prop {ReactNode} rightIcon  - Icon displayed on the right
 */
const Input = forwardRef(
  ({ label, error, leftIcon: LeftIcon, rightIcon: RightIcon, id, className = "", ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-muted">
              <LeftIcon className="h-4 w-4" />
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "input-base",
              LeftIcon ? "pl-10" : "",
              RightIcon ? "pr-10" : "",
              error
                ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/25"
                : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          {RightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-muted">
              <RightIcon className="h-4 w-4" />
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
