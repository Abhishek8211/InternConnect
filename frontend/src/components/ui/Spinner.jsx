/**
 * Spinner — loading indicator.
 *
 * @prop {string}  size       - "sm" | "md" | "lg"
 * @prop {boolean} fullScreen - Centers the spinner in the full viewport
 */
const SIZES = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

const Spinner = ({ size = "md", fullScreen = false }) => {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-spin rounded-full border-brand-500 border-t-transparent ${SIZES[size] || SIZES.md}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;
