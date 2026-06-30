import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NAV_LINKS } from "@/utils/constants";

/**
 * Sidebar — collapsible navigation panel for dashboard layouts.
 * Toggle visibility via the `isOpen` and `onClose` props.
 */
const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navLinks = user ? NAV_LINKS[user.role] || [] : [];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform border-r border-surface-border bg-surface-card shadow-card transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
            <span className="gradient-text font-bold">Menu</span>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-surface-muted hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-brand-500/15 text-brand-400 shadow-glow-sm ring-1 ring-brand-500/30"
                          : "text-surface-muted hover:bg-surface-border/40 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info at bottom */}
          {user && (
            <div className="border-t border-surface-border p-4">
              <div className="rounded-xl bg-surface-border/30 px-4 py-3">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-surface-muted truncate capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
