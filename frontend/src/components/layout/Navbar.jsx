import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Briefcase, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NAV_LINKS } from "@/utils/constants";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  // ── Scroll shadow ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = user ? NAV_LINKS[user.role] || [] : [];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-surface-border bg-surface/80 shadow-card backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-glow-sm transition-all duration-300 group-hover:shadow-glow">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="gradient-text">InternConnect</span>
        </Link>

        {/* ── Desktop Nav Links ────────────────────────────── */}
        {user && (
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `link-underline rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-brand-400"
                        : "text-surface-muted hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* ── Desktop Right Side ───────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                id="user-menu-button"
                onClick={() => setIsDropdownOpen((p) => !p)}
                className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface-card/60 px-3 py-2 text-sm font-medium text-white transition-all hover:border-brand-500/50 hover:bg-surface-card"
              >
                <Avatar src={user.avatar?.url} name={user.name} size="sm" />
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className={`h-4 w-4 text-surface-muted transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 animate-fade-in-scale rounded-xl border border-surface-border bg-surface-card shadow-card">
                  <Link
                    to={`/${user.role}/profile`}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-surface-muted hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost" size="sm">Sign In</Button>
              <Button as={Link} to="/register" variant="primary" size="sm">Get Started</Button>
            </>
          )}
        </div>

        {/* ── Mobile Hamburger ────────────────────────────── */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden rounded-lg p-2 text-surface-muted hover:text-white"
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-card/95 backdrop-blur-xl animate-fade-in">
          <div className="container-page py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-surface-muted hover:text-white hover:bg-surface-border/30 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-red-400 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <div className="mt-2 flex gap-2">
                <Button as={Link} to="/login" variant="ghost" size="sm" className="flex-1" onClick={() => setIsMenuOpen(false)}>Sign In</Button>
                <Button as={Link} to="/register" variant="primary" size="sm" className="flex-1" onClick={() => setIsMenuOpen(false)}>Get Started</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
