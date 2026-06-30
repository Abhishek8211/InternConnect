/**
 * Card — glassmorphism container with optional hover lift effect.
 *
 * @prop {boolean}   hover     - Adds hover lift + glow effect
 * @prop {boolean}   padded    - Adds standard padding (default true)
 * @prop {string}    className - Extra tailwind classes
 */
const Card = ({ children, hover = false, padded = true, className = "", ...props }) => {
  return (
    <div
      className={[
        "card-glass",
        padded ? "p-6" : "",
        hover
          ? "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-brand-500/30"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
