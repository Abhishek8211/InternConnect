import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NAV_LINKS } from "@/utils/constants";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  const navLinks = user ? NAV_LINKS[user.role] || [] : [];
  const homeLinks = [
    { label: "Featured", href: "#featured" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const renderLinks = (onClick = () => {}) => {
    const links = user ? navLinks : isHomePage ? homeLinks : [];
    return links.map((link) => {
      const isAnchor = link.href.startsWith("#");
      if (isAnchor) {
        return (
          <a
            key={link.href}
            href={link.href}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-brand-600"
            onClick={onClick}
          >
            {link.label}
          </a>
        );
      }
      return (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "text-brand-600"
                : "text-slate-700 hover:text-brand-600"
            }`
          }
          onClick={onClick}
        >
          {link.label}
        </NavLink>
      );
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl"
          : isHomePage
            ? "bg-transparent"
            : "border-b border-slate-200 bg-white/80"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-glow-sm transition-all duration-300 group-hover:shadow-glow">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="gradient-text">InternConnect</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">{renderLinks()}</div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                id="user-menu-button"
                onClick={() => setIsDropdownOpen((p) => !p)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:border-brand-500/50 hover:bg-slate-50"
              >
                <Avatar src={user.avatar?.url} name={user.name} size="sm" />
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 animate-fade-in-scale rounded-xl border border-slate-200 bg-white shadow-card">
                  <Link
                    to={`/${user.role}/profile`}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 transition-colors hover:text-brand-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 transition-colors hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost" size="sm">
                Sign In
              </Button>
              <Button as={Link} to="/register" variant="primary" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          id="mobile-menu-toggle"
          className="rounded-lg p-2 text-slate-600 hover:text-brand-600 md:hidden"
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl animate-fade-in md:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {renderLinks(() => setIsMenuOpen(false))}
            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-red-500 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <div className="mt-2 flex gap-2">
                <Button
                  as={Link}
                  to="/login"
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
