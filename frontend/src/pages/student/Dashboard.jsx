import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import {
  FileText,
  Bookmark,
  Star,
  UserCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  MapPin,
  DollarSign,
  ExternalLink,
  ChevronRight,
  Bell,
  Award,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAuth } from "@/hooks/useAuth";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const applicationTrend = [
  { month: "Jan", applied: 2, shortlisted: 1 },
  { month: "Feb", applied: 4, shortlisted: 2 },
  { month: "Mar", applied: 3, shortlisted: 1 },
  { month: "Apr", applied: 7, shortlisted: 3 },
  { month: "May", applied: 5, shortlisted: 4 },
  { month: "Jun", applied: 9, shortlisted: 5 },
];

const statusData = [
  { name: "Pending",     value: 4, color: "#f59e0b" },
  { name: "Shortlisted", value: 3, color: "#38bdf8" },
  { name: "Accepted",    value: 2, color: "#10b981" },
  { name: "Rejected",    value: 1, color: "#ef4444" },
];

const profileData = [
  { name: "Completion", value: 72, fill: "#2563eb" },
];

const recentApplications = [
  {
    id: 1,
    company: "Google",
    role: "SWE Intern",
    location: "Bangalore, India",
    stipend: "₹80,000/mo",
    status: "shortlisted",
    applied: "2 days ago",
    logo: "G",
    logoColor: "from-red-500 to-yellow-500",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Product Intern",
    location: "Hyderabad, India",
    stipend: "₹65,000/mo",
    status: "pending",
    applied: "5 days ago",
    logo: "M",
    logoColor: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    company: "Flipkart",
    role: "Data Analyst Intern",
    location: "Bengaluru, India",
    stipend: "₹45,000/mo",
    status: "accepted",
    applied: "1 week ago",
    logo: "F",
    logoColor: "from-orange-500 to-yellow-400",
  },
  {
    id: 4,
    company: "Swiggy",
    role: "Backend Intern",
    location: "Remote",
    stipend: "₹35,000/mo",
    status: "rejected",
    applied: "2 weeks ago",
    logo: "S",
    logoColor: "from-orange-600 to-red-500",
  },
];

const recommendedInternships = [
  {
    id: 1,
    company: "Razorpay",
    role: "Full Stack Developer Intern",
    location: "Bangalore",
    type: "Hybrid",
    stipend: "₹60,000/mo",
    tags: ["React", "Node.js", "MongoDB"],
    match: 94,
    logo: "R",
    logoColor: "from-blue-600 to-indigo-600",
    deadline: "Jul 15",
  },
  {
    id: 2,
    company: "Zomato",
    role: "Machine Learning Intern",
    location: "Gurugram",
    type: "On-site",
    stipend: "₹55,000/mo",
    tags: ["Python", "TensorFlow", "SQL"],
    match: 89,
    logo: "Z",
    logoColor: "from-red-500 to-rose-600",
    deadline: "Jul 20",
  },
  {
    id: 3,
    company: "PhonePe",
    role: "iOS Developer Intern",
    location: "Remote",
    type: "Remote",
    stipend: "₹50,000/mo",
    tags: ["Swift", "Xcode", "iOS"],
    match: 83,
    logo: "P",
    logoColor: "from-purple-600 to-violet-600",
    deadline: "Aug 1",
  },
];

const notifications = [
  {
    id: 1,
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Application Accepted!",
    message: "Flipkart has accepted your Data Analyst application.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    icon: Star,
    iconColor: "text-blue-400",
    bg: "bg-blue-500/10",
    title: "Shortlisted at Google",
    message: "You've been shortlisted for the SWE Intern role.",
    time: "2 days ago",
    unread: true,
  },
  {
    id: 3,
    icon: Bell,
    iconColor: "text-amber-400",
    bg: "bg-amber-500/10",
    title: "Deadline Approaching",
    message: "Razorpay internship deadline is in 3 days.",
    time: "3 days ago",
    unread: false,
  },
];

// ── Status Helpers ────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:     { label: "Pending",     icon: AlertCircle,   class: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30" },
  reviewed:    { label: "Reviewed",    icon: Clock,          class: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30" },
  shortlisted: { label: "Shortlisted", icon: Star,           class: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30" },
  accepted:    { label: "Accepted",    icon: CheckCircle2,   class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30" },
  rejected:    { label: "Rejected",    icon: XCircle,        class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/30" },
};

const TYPE_CONFIG = {
  Remote:  "bg-purple-500/15 text-purple-400",
  Hybrid:  "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

// ── Custom Tooltip ────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1e293b] p-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold text-slate-400">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="font-semibold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Applications",
      value: "10",
      change: "+3 this month",
      up: true,
      icon: FileText,
      gradient: "from-blue-600/20 to-blue-500/5",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      border: "hover:border-blue-500/30",
    },
    {
      label: "Saved Jobs",
      value: "24",
      change: "+8 this week",
      up: true,
      icon: Bookmark,
      gradient: "from-purple-600/20 to-purple-500/5",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      border: "hover:border-purple-500/30",
    },
    {
      label: "Recommended",
      value: "47",
      change: "Based on your profile",
      up: null,
      icon: Star,
      gradient: "from-amber-600/20 to-amber-500/5",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      border: "hover:border-amber-500/30",
    },
    {
      label: "Profile Score",
      value: "72%",
      change: "+12% last week",
      up: true,
      icon: UserCheck,
      gradient: "from-emerald-600/20 to-emerald-500/5",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      border: "hover:border-emerald-500/30",
    },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* ── Welcome Header ─────────────────────────────── */}
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
          to="/internships"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40"
        >
          Browse Internships
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* ── Stat Cards ─────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, change, up, icon: Icon, gradient, iconBg, iconColor, border }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${gradient} p-5 transition-all duration-300 ${border} hover:-translate-y-1 hover:border-opacity-100 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-xl p-2.5 ${iconBg}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              {up !== null && (
                <div className={`flex items-center gap-1 text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
                  <TrendingUp className={`h-3 w-3 ${!up && "rotate-180"}`} />
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
              <p className="mt-0.5 text-sm font-medium text-slate-300">{label}</p>
              <p className="mt-1 text-xs text-slate-500">{change}</p>
            </div>
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40"
              style={{ background: iconColor.replace("text-", "").includes("blue") ? "#2563eb" : iconColor.replace("text-", "").includes("purple") ? "#9333ea" : iconColor.replace("text-", "").includes("amber") ? "#f59e0b" : "#10b981" }}
            />
          </div>
        ))}
      </div>

      {/* ── Charts Row ─────────────────────────────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Application Trend - takes 2/3 */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#111827] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Application Activity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Applications vs Shortlists — Last 6 months</p>
            </div>
            <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
              2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={applicationTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applied" stroke="#2563eb" strokeWidth={2} fill="url(#applied)" dot={false} />
              <Area type="monotone" dataKey="shortlisted" stroke="#38bdf8" strokeWidth={2} fill="url(#shortlisted)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-blue-500" />Applied</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-cyan-400" />Shortlisted</span>
          </div>
        </div>

        {/* Application Status Pie */}
        <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-white">Application Status</h2>
            <p className="text-xs text-slate-500 mt-0.5">10 total applications</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 space-y-2">
            {statusData.map(({ name, value, color }) => (
              <li key={name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-slate-400">{name}</span>
                </span>
                <span className="font-semibold text-white">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Recent Applications + Profile Card ─────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Recent Applications - 2/3 */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#111827] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Applications</h2>
            <Link
              to="/student/applications"
              className="flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentApplications.map((app) => {
              const statusCfg = STATUS_CONFIG[app.status];
              const StatusIcon = statusCfg.icon;
              return (
                <div
                  key={app.id}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-white/10 hover:bg-white/5"
                >
                  {/* Company Logo */}
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${app.logoColor} text-sm font-bold text-white shadow-lg`}>
                    {app.logo}
                  </div>
                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white">{app.role}</p>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{app.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{app.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{app.stipend}</span>
                    </div>
                  </div>
                  {/* Status + Time */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusCfg.class}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusCfg.label}
                    </span>
                    <span className="text-xs text-slate-600">{app.applied}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Completion + Notifications */}
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
            <div className="flex items-center gap-3">
              <Avatar src={user?.avatar?.url} name={user?.name} size="lg" />
              <div>
                <p className="font-semibold text-white">{user?.name ?? "Student"}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
            {/* Radial progress */}
            <div className="my-4 flex items-center justify-center">
              <div className="relative">
                <ResponsiveContainer width={120} height={120}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={profileData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} fill="#2563eb" background={{ fill: "#1e293b" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">72%</span>
                  <span className="text-xs text-slate-500">Complete</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <ProfileItem label="Add Skills" done={true} />
              <ProfileItem label="Upload Resume" done={true} />
              <ProfileItem label="Add Projects" done={false} />
              <ProfileItem label="Add Experience" done={false} />
            </div>
            <Link
              to="/student/profile"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/10 px-4 py-2.5 text-sm font-semibold text-blue-400 ring-1 ring-blue-500/20 transition-all hover:bg-blue-600/20"
            >
              <Award className="h-4 w-4" />
              Complete Profile
            </Link>
          </div>

          {/* Recent Notifications */}
          <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">Notifications</h2>
              <Link to="/student/notifications" className="text-xs font-medium text-blue-400 hover:text-blue-300">
                See all
              </Link>
            </div>
            <ul className="space-y-3">
              {notifications.map(({ id, icon: Icon, iconColor, bg, title, message, time, unread }) => (
                <li key={id} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-xs font-semibold text-white">{title}</p>
                      {unread && <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{message}</p>
                    <p className="mt-1 text-[11px] text-slate-600">{time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Recommended Internships ─────────────────────── */}
      <div className="rounded-2xl border border-white/5 bg-[#111827] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Recommended Internships</h2>
            <p className="text-xs text-slate-500 mt-0.5">Tailored picks based on your skills and profile</p>
          </div>
          <Link
            to="/student/recommended"
            className="flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedInternships.map((internship) => (
            <div
              key={internship.id}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-white/5 hover:shadow-lg hover:shadow-blue-500/5"
            >
              {/* Match badge */}
              <div className="absolute right-4 top-4 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
                {internship.match}% match
              </div>
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${internship.logoColor} text-sm font-bold text-white shadow-lg`}>
                  {internship.logo}
                </div>
                <div className="min-w-0 flex-1 pr-16">
                  <p className="font-semibold text-white leading-tight">{internship.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{internship.company}</p>
                </div>
              </div>
              {/* Details */}
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{internship.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{internship.stipend}</span>
              </div>
              {/* Type + Deadline */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_CONFIG[internship.type]}`}>
                  {internship.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <Clock className="h-3 w-3" />
                  Closes {internship.deadline}
                </span>
              </div>
              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {internship.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              {/* CTA */}
              <button className="mt-4 w-full rounded-xl bg-blue-600/10 py-2 text-sm font-medium text-blue-400 ring-1 ring-blue-500/20 transition-all hover:bg-blue-600 hover:text-white hover:ring-blue-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Profile Item Helper ────────────────────────────────────────────────────────

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

export default StudentDashboard;
