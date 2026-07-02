import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  Users, GraduationCap, Building2, Briefcase, ClipboardList,
  CheckCircle2, Clock, AlertTriangle, Shield, UserPlus,
  ArrowUpRight, ChevronRight, RefreshCw, TrendingUp,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { formatDistanceToNow } from "date-fns";

const STATUS_PIE_COLORS = {
  pending:     "#f59e0b",
  reviewed:    "#38bdf8",
  shortlisted: "#06b6d4",
  accepted:    "#10b981",
  rejected:    "#ef4444",
};

const ROLE_COLORS = {
  student:   "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",
  recruiter: "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/25",
  admin:     "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25",
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1c2e] p-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold text-slate-400">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize text-slate-300">{p.name}:</span>
          <span className="font-semibold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Uses GET /api/v1/admin/stats
      const res = await fetch("/api/v1/admin/stats", { credentials: "include" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to load");
      setStats(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-lg font-semibold text-white">Could not load dashboard</p>
        <p className="text-sm text-slate-400">{error}</p>
        <button onClick={fetchStats} className="mt-2 rounded-xl bg-rose-600/20 px-4 py-2 text-sm font-medium text-rose-400 ring-1 ring-rose-500/30 hover:bg-rose-600/30">
          Retry
        </button>
      </div>
    );
  }

  const { totalUsers, totalInternships, totalApplications, totalCompanies, usersByRole, recentUsers, applicationsByStatus } = stats;

  const studentCount   = usersByRole?.find(r => r._id === "student")?.count   || 0;
  const recruiterCount = usersByRole?.find(r => r._id === "recruiter")?.count || 0;
  const adminCount     = usersByRole?.find(r => r._id === "admin")?.count     || 0;

  const statCards = [
    { label: "Total Users",    value: totalUsers,         sub: `${studentCount} students · ${recruiterCount} recruiters`, icon: Users,         gradient: "from-rose-600/20 to-rose-500/5",     iconBg: "bg-rose-500/20",    iconColor: "text-rose-400" },
    { label: "Students",       value: studentCount,       sub: "Registered students",                                     icon: GraduationCap, gradient: "from-blue-600/20 to-blue-500/5",     iconBg: "bg-blue-500/20",    iconColor: "text-blue-400" },
    { label: "Recruiters",     value: recruiterCount,     sub: "Active recruiters",                                        icon: Building2,     gradient: "from-violet-600/20 to-violet-500/5", iconBg: "bg-violet-500/20",  iconColor: "text-violet-400" },
    { label: "Internships",    value: totalInternships,   sub: "Total listings posted",                                    icon: Briefcase,     gradient: "from-amber-600/20 to-amber-500/5",   iconBg: "bg-amber-500/20",   iconColor: "text-amber-400" },
    { label: "Applications",   value: totalApplications,  sub: "Across all internships",                                   icon: ClipboardList, gradient: "from-cyan-600/20 to-cyan-500/5",     iconBg: "bg-cyan-500/20",    iconColor: "text-cyan-400" },
    { label: "Companies",      value: totalCompanies,     sub: "Registered companies",                                     icon: Shield,        gradient: "from-emerald-600/20 to-emerald-500/5",iconBg: "bg-emerald-500/20", iconColor: "text-emerald-400" },
  ];

  // Build pie chart from real application status counts
  const pieData = applicationsByStatus
    ? Object.entries(applicationsByStatus)
        .filter(([, v]) => v > 0)
        .map(([key, value]) => ({ name: key, value, color: STATUS_PIE_COLORS[key] || "#64748b" }))
    : [];

  // Role breakdown bar data
  const roleBarData = [
    { role: "Students",   count: studentCount },
    { role: "Recruiters", count: recruiterCount },
    { role: "Admins",     count: adminCount },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Live Platform Overview</p>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin{" "}
            <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">Real-time data from your MongoDB database</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map(({ label, value, sub, icon: Icon, gradient, iconBg, iconColor }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-br ${gradient} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className={`inline-flex rounded-xl p-2 ${iconBg}`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold tracking-tight text-white">{value?.toLocaleString()}</p>
              <p className="text-xs font-medium text-slate-300">{label}</p>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-600">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* User role breakdown */}
        <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <h2 className="mb-1 font-semibold text-white">User Roles</h2>
          <p className="mb-4 text-xs text-slate-500">{totalUsers} total users</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={roleBarData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" vertical={false} />
              <XAxis dataKey="role" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {roleBarData.map((_, i) => (
                  <Cell key={i} fill={["#3b82f6", "#8b5cf6", "#f43f5e"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application status pie */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <h2 className="mb-1 font-semibold text-white">Application Status Breakdown</h2>
          <p className="mb-4 text-xs text-slate-500">{totalApplications} total applications</p>
          {pieData.length === 0 ? (
            <div className="flex h-[180px] flex-col items-center justify-center gap-2 text-center">
              <ClipboardList className="h-10 w-10 text-slate-700" />
              <p className="text-sm text-slate-500">No applications yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1a1c2e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <ul className="flex-1 space-y-2">
                {pieData.map(({ name, value, color }) => (
                  <li key={name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: color }} />
                      <span className="capitalize text-slate-400">{name}</span>
                    </span>
                    <span className="font-semibold text-white">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Recent Registrations</h2>
            <p className="mt-0.5 text-xs text-slate-500">Newest users on the platform</p>
          </div>
          <Link
            to="/admin/users"
            className="flex items-center gap-1 text-xs font-medium text-rose-400 transition-colors hover:text-rose-300"
          >
            All users <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        {recentUsers?.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Users className="h-10 w-10 text-slate-700" />
            <p className="text-sm text-slate-500">No users registered yet</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentUsers?.map((u) => (
              <div
                key={u._id}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition-all hover:border-rose-500/15 hover:bg-white/[0.04]"
              >
                <Avatar src={u.avatar?.url} name={u.name} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{u.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROLE_COLORS[u.role] || ""}`}>
                      {u.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {u.email} · {formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <span className={`hidden rounded-full px-2.5 py-0.5 text-xs font-medium sm:inline-flex ${u.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                  {u.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
