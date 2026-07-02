import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import {
  FileText, Bookmark, Star, UserCheck, TrendingUp,
  ExternalLink, Clock, CheckCircle2, XCircle, AlertCircle,
  Building2, MapPin, DollarSign, ChevronRight, Award, Eye,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/user.service";
import { internshipService } from "@/services/internship.service";
import { formatDistanceToNow } from "date-fns";

// ── Status config ─────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:     { label: "Pending",     icon: AlertCircle,  cls: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30" },
  reviewed:    { label: "Under Review",icon: Eye,          cls: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30" },
  shortlisted: { label: "Shortlisted", icon: Star,         cls: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30" },
  accepted:    { label: "Accepted",    icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30" },
  rejected:    { label: "Rejected",    icon: XCircle,      cls: "bg-red-500/15 text-red-400 ring-1 ring-red-500/30" },
};

const STATUS_PIE_COLORS = {
  pending:     "#f59e0b",
  reviewed:    "#38bdf8",
  shortlisted: "#06b6d4",
  accepted:    "#10b981",
  rejected:    "#ef4444",
};

const TYPE_CONFIG = {
  Remote:    "bg-purple-500/15 text-purple-400",
  Hybrid:    "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

// ── Custom chart tooltip ──────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1e293b] p-3 shadow-xl">
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

// ── Profile checklist item ────────────────────────────────────────
const ProfileItem = ({ label, done }) => (
  <div className="flex items-center justify-between text-xs">
    <span className={done ? "text-slate-400 line-through" : "text-slate-300"}>{label}</span>
    {done ? (
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
    ) : (
      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-400 ring-1 ring-amber-500/20">
        Pending
      </span>
    )}
  </div>
);

// ── Main component ────────────────────────────────────────────────
const StudentDashboard = () => {
  const { user } = useAuth();
  const [dashData, setDashData]         = useState(null);
  const [recommended, setRecommended]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [dashRes, recRes] = await Promise.all([
          userService.getStudentDashboard(),
          internshipService.getAll({ limit: 3, sort: "-createdAt" }),
        ]);
        setDashData(dashRes.data.data);
        setRecommended(recRes.data.data.internships || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

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
        <button onClick={() => window.location.reload()} className="mt-2 rounded-xl bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-blue-500/30 hover:bg-blue-600/30">
          Try again
        </button>
      </div>
    );
  }

  const { counts, recentApplications, trend, profileScore, savedCount } = dashData;

  // Build pie data from real counts
  const pieData = Object.entries(STATUS_PIE_COLORS)
    .filter(([key]) => counts[key] > 0)
    .map(([key, color]) => ({ name: key, value: counts[key], color }));

  const stats = [
    { label: "Applications", value: counts.total,   icon: FileText,  gradient: "from-blue-600/20 to-blue-500/5",    iconBg: "bg-blue-500/20",    iconColor: "text-blue-400" },
    { label: "Saved Jobs",   value: savedCount,      icon: Bookmark,  gradient: "from-purple-600/20 to-purple-500/5",iconBg: "bg-purple-500/20",  iconColor: "text-purple-400" },
    { label: "Shortlisted",  value: counts.shortlisted, icon: Star,   gradient: "from-cyan-600/20 to-cyan-500/5",    iconBg: "bg-cyan-500/20",    iconColor: "text-cyan-400" },
    { label: "Profile Score",value: `${profileScore}%`, icon: UserCheck, gradient: "from-emerald-600/20 to-emerald-500/5", iconBg: "bg-emerald-500/20", iconColor: "text-emerald-400" },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* ── Welcome header ─────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {user?.name?.split(" ")[0] ?? "Student"}
            </span>{" "}
            👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Here's what's happening with your internship search today.
          </p>
        </div>
        <Link
          to="/student/browse"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40"
        >
          Browse Internships
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* ── Stat cards ─────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, gradient, iconBg, iconColor }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${gradient} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className={`inline-flex rounded-xl p-2.5 ${iconBg}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
              <p className="mt-0.5 text-sm font-medium text-slate-300">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts row ─────────────────────────────────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Trend chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#111827] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Application Activity</h2>
              <p className="mt-0.5 text-xs text-slate-500">Applications vs Shortlists — Last 6 months</p>
            </div>
            <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
              {new Date().getFullYear()}
            </span>
          </div>
          {counts.total === 0 ? (
            <div className="flex h-[200px] flex-col items-center justify-center gap-2 text-center">
              <TrendingUp className="h-8 w-8 text-slate-700" />
              <p className="text-sm text-slate-500">Apply to internships to see your activity chart</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="applied" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="shortlisted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="applied" stroke="#2563eb" strokeWidth={2} fill="url(#applied)" dot={false} />
                <Area type="monotone" dataKey="shortlisted" stroke="#38bdf8" strokeWidth={2} fill="url(#shortlisted)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-blue-500" />Applied</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-cyan-400" />Shortlisted</span>
          </div>
        </div>

        {/* Status pie */}
        <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
          <h2 className="mb-1 font-semibold text-white">Application Status</h2>
          <p className="mb-4 text-xs text-slate-500">{counts.total} total applications</p>
          {counts.total === 0 ? (
            <div className="flex h-[160px] flex-col items-center justify-center gap-2 text-center">
              <FileText className="h-8 w-8 text-slate-700" />
              <p className="text-xs text-slate-500">No applications yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
          <ul className="mt-2 space-y-2">
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
      </div>

      {/* ── Recent applications + profile card ─────────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Recent applications */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#111827] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Applications</h2>
            <Link to="/student/applications" className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          {recentApplications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <FileText className="h-10 w-10 text-slate-700" />
              <p className="text-sm font-semibold text-white">No applications yet</p>
              <p className="text-xs text-slate-500">Start applying to internships to see them here</p>
              <Link to="/student/browse" className="mt-1 text-xs text-blue-400 hover:underline">Browse internships →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app) => {
                const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
                const StatusIcon = cfg.icon;
                const internship = app.internship;
                const company = internship?.company;
                return (
                  <div
                    key={app._id}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all hover:border-white/10 hover:bg-white/5"
                  >
                    {/* Company initial avatar */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                      {(company?.name || "?")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{internship?.title || "—"}</p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{company?.name || "—"}</span>
                        {internship?.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{internship.location}</span>}
                        {internship?.stipend?.amount > 0 && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />₹{internship.stipend.amount.toLocaleString()}/mo
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.cls}`}>
                        <StatusIcon className="h-3 w-3" />{cfg.label}
                      </span>
                      <span className="text-xs text-slate-600">
                        {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Profile card */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
            <div className="flex items-center gap-3">
              <Avatar src={user?.avatar?.url} name={user?.name} size="lg" />
              <div>
                <p className="font-semibold text-white">{user?.name ?? "Student"}</p>
                <p className="text-xs capitalize text-slate-500">{user?.role}</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="my-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Profile Completion</span>
                <span className="font-bold text-white">{profileScore}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700"
                  style={{ width: `${profileScore}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <ProfileItem label="Add Bio"        done={!!user?.profile?.bio} />
              <ProfileItem label="Add Skills"     done={(user?.profile?.skills?.length || 0) > 0} />
              <ProfileItem label="Add Education"  done={(user?.profile?.education?.length || 0) > 0} />
              <ProfileItem label="Upload Resume"  done={!!user?.profile?.resume?.url} />
              <ProfileItem label="Add Social Links" done={!!(user?.profile?.socialLinks?.github || user?.profile?.socialLinks?.linkedin)} />
            </div>
            <Link
              to="/student/profile"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/10 px-4 py-2.5 text-sm font-semibold text-blue-400 ring-1 ring-blue-500/20 transition-all hover:bg-blue-600/20"
            >
              <Award className="h-4 w-4" />
              Complete Profile
            </Link>
          </div>
        </div>
      </div>

      {/* ── Recommended internships ─────────────────────────── */}
      <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Latest Internships</h2>
            <p className="mt-0.5 text-xs text-slate-500">Recently posted opportunities</p>
          </div>
          <Link to="/student/browse" className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300">
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        {recommended.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <p className="text-sm text-slate-500">No internships found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((internship) => (
              <div
                key={internship._id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-white/5 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                    {(internship.company?.name || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight text-white">{internship.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{internship.company?.name}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500">
                  {internship.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{internship.location}</span>}
                  {internship.stipend?.amount > 0 && (
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />₹{internship.stipend.amount.toLocaleString()}/mo</span>
                  )}
                  {internship.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{internship.duration}</span>}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {internship.type && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_CONFIG[internship.type] || "bg-white/5 text-slate-400"}`}>
                      {internship.type}
                    </span>
                  )}
                </div>
                {internship.skillsRequired?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {internship.skillsRequired.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">{tag}</span>
                    ))}
                  </div>
                )}
                <Link
                  to={`/internships/${internship._id}`}
                  className="mt-4 block w-full rounded-xl bg-blue-600/10 py-2 text-center text-sm font-medium text-blue-400 ring-1 ring-blue-500/20 transition-all hover:bg-blue-600 hover:text-white hover:ring-blue-600"
                >
                  View & Apply
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
