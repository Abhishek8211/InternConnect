import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  ClipboardList,
  FileBarChart2,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";

const ADMIN_NAV = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard",    href: "/admin/dashboard",    icon: LayoutDashboard },
    ],
  },
  {
    group: "Management",
    items: [
      { label: "Users",        href: "/admin/users",        icon: Users },
      { label: "Students",     href: "/admin/students",     icon: GraduationCap },
      { label: "Companies",    href: "/admin/companies",    icon: Building2 },
      { label: "Internships",  href: "/admin/internships",  icon: Briefcase },
      { label: "Applications", href: "/admin/applications", icon: ClipboardList },
    ],
  },
  {
    group: "Insights",
    items: [
      { label: "Reports",      href: "/admin/reports",      icon: FileBarChart2 },
      { label: "Analytics",    href: "/admin/analytics",    icon: BarChart3 },
      { label: "Settings",     href: "/admin/settings",     icon: Settings },
    ],
  },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#08090f]">
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
          border-r border-white/[0.05] bg-[#0d0f1a]
          transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-[72px]" : "w-64"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/[0.05] px-4 py-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-orange-500 shadow-lg shadow-rose-500/30">
            <Shield className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight text-white">
                InternConnect
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                Admin Panel
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
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
          {ADMIN_NAV.map(({ group, items }) => (
            <div key={group} className="mb-5">
              {!collapsed && (
                <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {group}
                </p>
              )}
              <ul className="space-y-0.5">
                {items.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <NavLink
                      to={href}
                      onClick={() => setSidebarOpen(false)}
                      title={collapsed ? label : undefined}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                        ${isActive
                          ? "bg-gradient-to-r from-rose-600/25 to-orange-500/10 text-rose-300 shadow-inner ring-1 ring-rose-500/25"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-rose-400" : ""}`} />
                          {!collapsed && <span className="truncate">{label}</span>}
                          {isActive && !collapsed && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-rose-400" />
                          )}
                          {collapsed && (
                            <span className="pointer-events-none absolute left-full z-50 ml-2 hidden whitespace-nowrap rounded-lg bg-[#1a1c2e] px-3 py-1.5 text-xs font-medium text-white shadow-xl ring-1 ring-white/10 group-hover:flex">
                              {label}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-white/[0.05] p-3">
          <div
            className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user?.name}</p>
                <p className="truncate text-xs text-rose-400 font-medium capitalize">Administrator</p>
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
        <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-white/[0.05] bg-[#0d0f1a]/80 px-6 backdrop-blur-md">
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
                placeholder="Search users, companies, internships…"
                className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0d0f1a]" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
              {user?.name && (
                <span className="hidden text-xs font-medium text-slate-300 sm:block">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#08090f]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
