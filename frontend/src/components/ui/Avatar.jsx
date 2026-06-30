/**
 * Avatar — user profile picture with fallback initials.
 *
 * @prop {string} src   - Image URL
 * @prop {string} name  - Used to generate initials fallback
 * @prop {string} size  - "sm" | "md" | "lg" | "xl"
 */
const SIZES = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({ src, name = "", size = "md", className = "" }) => {
  const sizeClass = SIZES[size] || SIZES.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-surface-border ${className}`}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={`${sizeClass} inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-semibold text-white ring-2 ring-surface-border ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
