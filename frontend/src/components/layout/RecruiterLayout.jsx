import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Users,
  BarChart3,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";

const RECRUITER_NAV = [
  { label: "Dashboard",        href: "/recruiter/dashboard",  icon: LayoutDashboard },
  { label: "Post Internship",  href: "/recruiter/post",       icon: PlusCircle },
  { label: "Manage Internships",href: "/recruiter/listings",  icon: List },
  { label: "Applicants",       href: "/recruiter/applicants", icon: Users },
  { label: "Analytics",        href: "/recruiter/analytics",  icon: BarChart3 },
  { label: "Company Profile",  href: "/recruiter/company",    icon: Building2 },
  { label: "Settings",         href: "/recruiter/settings",   icon: Settings },
];

const RecruiterLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b1120]">
      {/* ── Mobile Backdrop ─────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-full flex-col
          border-r border-white/[0.06] bg-[#0f1929]
          transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-[72px]" : "w-64"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 shadow-lg shadow-violet-500/30">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight text-white">
                InternConnect
              </span>
              <span className="text-[10px] font-medium text-violet-400 uppercase tracking-widest">
                Recruiter
              </span>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
          {/* Desktop collapse */}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="ml-auto hidden rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-white lg:flex"
            title={collapsed ? "Expand" : "Collapse"}
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 no-scrollbar">
          <ul className="space-y-0.5">
            {RECRUITER_NAV.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-violet-600/25 to-purple-500/10 text-violet-300 shadow-inner ring-1 ring-violet-500/25"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-violet-400" : ""}`} />
                      {!collapsed && <span className="truncate">{label}</span>}
                      {isActive && !collapsed && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                      )}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-[#1a2540] px-3 py-1.5 text-xs font-medium text-white shadow-xl ring-1 ring-white/10 group-hover:flex z-50">
                          {label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-white/[0.06] p-3">
          <div
            className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user?.name}</p>
                <p className="truncate text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={handleLogout}
                title="Logout"
                className="ml-auto rounded-lg p-1.5 text-slate-500 transition-colors hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-white/[0.06] bg-[#0f1929]/80 px-6 backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative hidden max-w-sm flex-1 sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search applicants, internships…"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/recruiter/post"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 sm:flex"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Post Internship
            </Link>
            <button className="relative rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#0f1929]" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#0b1120]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
