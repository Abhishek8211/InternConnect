/**
 * Badge — small label chip for statuses, tags, and categories.
 *
 * @prop {string}    variant  - "brand" | "accent" | "success" | "warning" | "danger" | "neutral"
 * @prop {ReactNode} icon     - Optional icon to prepend
 */
const BADGE_VARIANTS = {
  brand:   "badge-brand",
  accent:  "badge-accent",
  success: "badge-success",
  warning: "badge-warning",
  danger:  "badge-danger",
  neutral: "badge bg-surface-border/60 text-surface-muted ring-1 ring-surface-border",
};

const Badge = ({ children, variant = "neutral", icon: Icon, className = "" }) => {
  return (
    <span className={`${BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral} ${className}`}>
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {children}
    </span>
  );
};

export default Badge;
