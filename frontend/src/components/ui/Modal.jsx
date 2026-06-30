import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

/**
 * Modal — accessible dialog overlay.
 *
 * @prop {boolean}  isOpen    - Controls visibility
 * @prop {Function} onClose   - Called on backdrop click or Escape key
 * @prop {string}   title     - Modal heading text
 * @prop {string}   size      - "sm" | "md" | "lg" | "xl"
 */
const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  // ── Close on Escape key ────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${SIZES[size] || SIZES.md} animate-fade-in-scale card-glass`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
            <h2 id="modal-title" className="text-base font-semibold text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-surface-muted transition-colors hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
