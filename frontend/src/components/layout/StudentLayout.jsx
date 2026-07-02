import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Search,
  ClipboardList,
  Bookmark,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";

const STUDENT_NAV = [
  { label: "Dashboard",              href: "/student/dashboard",              icon: LayoutDashboard },
  { label: "My Profile",             href: "/student/profile",                icon: User },
  { label: "My Resume",              href: "/student/resume",                 icon: FileText },
  { label: "Recommended Internships",href: "/student/recommended",            icon: Search },
  { label: "Applied Internships",    href: "/student/applications",           icon: ClipboardList },
  { label: "Saved Internships",      href: "/student/saved",                  icon: Bookmark },
  { label: "Notifications",          href: "/student/notifications",          icon: Bell },
  { label: "Settings",               href: "/student/settings",               icon: Settings },
];

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      {/* ── Mobile Backdrop ─────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-full flex-col border-r border-white/5 bg-[#111827]
          transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-[72px]" : "w-64"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/5 px-4 py-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <span className="truncate text-sm font-bold tracking-tight text-white">
              InternConnect
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="ml-auto hidden rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:flex"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 no-scrollbar">
          <ul className="space-y-0.5">
            {STUDENT_NAV.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/10 text-blue-400 shadow-inner ring-1 ring-blue-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-blue-400" : ""}`} />
                      {!collapsed && <span className="truncate">{label}</span>}
                      {isActive && !collapsed && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                      )}
                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-[#1e293b] px-3 py-1.5 text-xs font-medium text-white shadow-xl ring-1 ring-white/10 group-hover:flex">
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
        <div className="border-t border-white/5 p-3">
          <div className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5 ${collapsed ? "justify-center" : ""}`}>
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
        <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-white/5 bg-[#111827]/80 px-6 backdrop-blur-md">
          <button
            id="sidebar-toggle"
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative hidden max-w-xs flex-1 sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search internships, companies…"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/student/notifications"
              className="relative rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#111827]" />
            </Link>
            <Link
              to="/student/settings"
              className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <div className="ml-1 h-6 w-px bg-white/10" />
            <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#0f172a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
