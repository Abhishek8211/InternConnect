import { useState } from "react";

/**
 * Tooltip — accessible hover tooltip.
 *
 * @prop {string}    content   - Tooltip text
 * @prop {string}    position  - "top" | "bottom" | "left" | "right"
 * @prop {ReactNode} children  - Trigger element
 */
const POSITIONS = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip = ({ content, position = "top", children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <div
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-white shadow-card animate-fade-in-scale ${POSITIONS[position] || POSITIONS.top}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
