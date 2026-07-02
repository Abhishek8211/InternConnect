import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  Briefcase,
  CheckCircle2,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  MapPin,
  Clock,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Building2,
  Calendar,
  Filter,
  Download,
  AlertCircle,
  CheckCheck,
  XCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const applicationTrend = [
  { week: "W1 May", applications: 14, shortlisted: 5, hired: 1 },
  { week: "W2 May", applications: 22, shortlisted: 8, hired: 2 },
  { week: "W3 May", applications: 18, shortlisted: 6, hired: 1 },
  { week: "W4 May", applications: 31, shortlisted: 11, hired: 3 },
  { week: "W1 Jun", applications: 27, shortlisted: 9, hired: 2 },
  { week: "W2 Jun", applications: 40, shortlisted: 14, hired: 4 },
  { week: "W3 Jun", applications: 35, shortlisted: 12, hired: 3 },
  { week: "W4 Jun", applications: 52, shortlisted: 18, hired: 6 },
];

const internshipViews = [
  { month: "Jan", views: 120 },
  { month: "Feb", views: 210 },
  { month: "Mar", views: 180 },
  { month: "Apr", views: 310 },
  { month: "May", views: 270 },
  { month: "Jun", views: 420 },
];

const sourceData = [
  { name: "Direct Apply", value: 48, color: "#7c3aed" },
  { name: "Recommended",  value: 27, color: "#06b6d4" },
  { name: "Email Alert",  value: 15, color: "#10b981" },
  { name: "Referral",     value: 10, color: "#f59e0b" },
];

const topInternships = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    type: "Hybrid",
    location: "Bangalore",
    stipend: "₹60,000/mo",
    applicants: 42,
    shortlisted: 8,
    deadline: "Jul 15, 2026",
    status: "active",
    views: 1240,
  },
  {
    id: 2,
    title: "Product Management Intern",
    type: "On-site",
    location: "Mumbai",
    stipend: "₹55,000/mo",
    applicants: 37,
    shortlisted: 6,
    deadline: "Jul 20, 2026",
    status: "active",
    views: 980,
  },
  {
    id: 3,
    title: "Data Science Intern",
    type: "Remote",
    location: "Remote",
    stipend: "₹50,000/mo",
    applicants: 65,
    shortlisted: 12,
    deadline: "Jul 10, 2026",
    status: "active",
    views: 2140,
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    type: "Remote",
    location: "Remote",
    stipend: "₹40,000/mo",
    applicants: 28,
    shortlisted: 5,
    deadline: "Aug 1, 2026",
    status: "draft",
    views: 410,
  },
];

const recentApplicants = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Full Stack Developer Intern",
    college: "IIT Delhi",
    cgpa: "8.9",
    skills: ["React", "Node.js", "MongoDB"],
    status: "shortlisted",
    appliedAt: "2 hours ago",
    avatar: null,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Data Science Intern",
    college: "NIT Trichy",
    cgpa: "9.2",
    skills: ["Python", "ML", "TensorFlow"],
    status: "pending",
    appliedAt: "5 hours ago",
    avatar: null,
  },
  {
    id: 3,
    name: "Rohit Kumar",
    role: "Product Management Intern",
    college: "BITS Pilani",
    cgpa: "8.4",
    skills: ["Figma", "Analytics", "SQL"],
    status: "reviewing",
    appliedAt: "1 day ago",
    avatar: null,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Full Stack Developer Intern",
    college: "VIT Vellore",
    cgpa: "8.7",
    skills: ["Vue.js", "Django", "PostgreSQL"],
    status: "rejected",
    appliedAt: "2 days ago",
    avatar: null,
  },
  {
    id: 5,
    name: "Karan Mehta",
    role: "Data Science Intern",
    college: "DTU Delhi",
    cgpa: "8.1",
    skills: ["Python", "R", "Tableau"],
    status: "shortlisted",
    appliedAt: "3 days ago",
    avatar: null,
  },
];

const notifications = [
  {
    id: 1,
    icon: Users,
    iconColor: "text-violet-400",
    bg: "bg-violet-500/10",
    title: "42 new applications",
    message: "Full Stack Developer Intern received new applications today",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    icon: CheckCheck,
    iconColor: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Offer accepted",
    message: "Arjun Sharma accepted the internship offer for SWE role",
    time: "5h ago",
    unread: true,
  },
  {
    id: 3,
    icon: AlertCircle,
    iconColor: "text-amber-400",
    bg: "bg-amber-500/10",
    title: "Deadline approaching",
    message: "Data Science Intern closes in 3 days — 65 applicants pending review",
    time: "1 day ago",
    unread: false,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:     { label: "Pending",     class: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",    icon: Clock },
  reviewing:   { label: "Reviewing",   class: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",       icon: Eye },
  shortlisted: { label: "Shortlisted", class: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25",       icon: Star },
  accepted:    { label: "Accepted",    class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25", icon: CheckCircle2 },
  rejected:    { label: "Rejected",    class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",          icon: XCircle },
};

const JOB_STATUS = {
  active: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25",
  draft:  "bg-slate-500/15 text-slate-400 ring-1 ring-slate-500/25",
  closed: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",
};

const TYPE_COLORS = {
  Remote:    "bg-purple-500/15 text-purple-400",
  Hybrid:    "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1a2540] p-3 shadow-xl">
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

// ── Main Component ────────────────────────────────────────────────────────────

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");

  const stats = [
    {
      label: "Total Internships",
      value: "12",
      sub: "4 drafts",
      change: "+2 this month",
      up: true,
      icon: Briefcase,
      gradient: "from-violet-600/20 to-violet-500/5",
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-400",
      border: "hover:border-violet-500/30",
      glow: "#7c3aed",
    },
    {
      label: "Active Jobs",
      value: "8",
      sub: "2 closing soon",
      change: "+1 this week",
      up: true,
      icon: CheckCircle2,
      gradient: "from-emerald-600/20 to-emerald-500/5",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      border: "hover:border-emerald-500/30",
      glow: "#10b981",
    },
    {
      label: "Applications",
      value: "239",
      sub: "64 unreviewed",
      change: "+52 this week",
      up: true,
      icon: Users,
      gradient: "from-cyan-600/20 to-cyan-500/5",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      border: "hover:border-cyan-500/30",
      glow: "#06b6d4",
    },
    {
      label: "Shortlisted",
      value: "31",
      sub: "6 offers sent",
      change: "+8 this week",
      up: true,
      icon: Star,
      gradient: "from-amber-600/20 to-amber-500/5",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      border: "hover:border-amber-500/30",
      glow: "#f59e0b",
    },
  ];

  const filteredApplicants =
    activeFilter === "all"
      ? recentApplicants
      : recentApplicants.filter((a) => a.status === activeFilter);

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* ── Welcome Header ─────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Recruiter Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              {user?.name?.split(" ")[0] ?? "Recruiter"}
            </span>{" "}
            🚀
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            You have{" "}
            <span className="font-semibold text-amber-400">64 unreviewed</span>{" "}
            applications waiting.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10">
            <Download className="h-4 w-4" />
            Export
          </button>
          <Link
            to="/recruiter/post"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
          >
            <Plus className="h-4 w-4" />
            Post Internship
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, sub, change, up, icon: Icon, gradient, iconBg, iconColor, border }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${gradient} p-5 transition-all duration-300 ${border} hover:-translate-y-1 hover:shadow-lg cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-xl p-2.5 ${iconBg}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
              <p className="mt-0.5 text-sm font-medium text-slate-300">{label}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <p className="text-xs text-slate-500">{sub}</p>
                <p className={`text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>{change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ─────────────────────────────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Application Trend — 2/3 */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0f1929] p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">Application Trend</h2>
              <p className="text-xs text-slate-500 mt-0.5">Weekly applications, shortlists & hires</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400 ring-1 ring-violet-500/20">
                May – Jun 2026
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={applicationTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gShort" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gHired" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applications" stroke="#7c3aed" strokeWidth={2} fill="url(#gApps)" dot={false} />
              <Area type="monotone" dataKey="shortlisted"  stroke="#06b6d4" strokeWidth={2} fill="url(#gShort)" dot={false} />
              <Area type="monotone" dataKey="hired"        stroke="#10b981" strokeWidth={2} fill="url(#gHired)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-violet-500" />Applications</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-cyan-400" />Shortlisted</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-emerald-400" />Hired</span>
          </div>
        </div>

        {/* Source Breakdown — 1/3 */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0f1929] p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-white">Application Sources</h2>
            <p className="text-xs text-slate-500 mt-0.5">Where applicants come from</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={76}
                paddingAngle={3}
                dataKey="value"
              >
                {sourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1a2540", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 space-y-2">
            {sourceData.map(({ name, value, color }) => (
              <li key={name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-slate-400">{name}</span>
                </span>
                <span className="font-semibold text-white">{value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bar Chart + Notifications ──────────────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Monthly Views Bar */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0f1929] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Internship Views</h2>
              <p className="text-xs text-slate-500 mt-0.5">Total listing views per month</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <Filter className="h-3 w-3" /> Filter
            </button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={internshipViews} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={20}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#9333ea80" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="views" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Quick stats row */}
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
            {[
              { label: "Avg. Views/Job", value: "183" },
              { label: "Click-through",  value: "24%" },
              { label: "Conversion",     value: "8.3%" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-base font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0f1929] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Notifications</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400">
              2
            </span>
          </div>
          <ul className="space-y-4">
            {notifications.map(({ id, icon: Icon, iconColor, bg, title, message, time, unread }) => (
              <li key={id} className="flex items-start gap-3">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs font-semibold text-white">{title}</p>
                    {unread && <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{message}</p>
                  <p className="mt-1 text-[11px] text-slate-600">{time}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/recruiter/applicants"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/20 py-2 text-xs font-medium text-violet-400 transition-all hover:bg-violet-500/10"
          >
            View all activity <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── Active Internships Table ────────────────────── */}
      <div className="mb-8 rounded-2xl border border-white/[0.06] bg-[#0f1929] p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Active Internships</h2>
            <p className="text-xs text-slate-500 mt-0.5">{topInternships.length} listings total</p>
          </div>
          <Link
            to="/recruiter/listings"
            className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            Manage all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hidden sm:table-cell">Stipend</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Applicants</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">Views</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Deadline</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {topInternships.map((job) => (
                <tr key={job.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-4">
                    <div>
                      <p className="text-sm font-medium text-white">{job.title}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />{job.location}
                      </p>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[job.type]}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 hidden sm:table-cell">
                    <span className="text-sm text-slate-300">{job.stipend}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{job.applicants}</span>
                      <div className="hidden items-center gap-1 text-xs text-emerald-400 sm:flex">
                        <CheckCircle2 className="h-3 w-3" />
                        {job.shortlisted}
                      </div>
                    </div>
                    {/* Mini progress bar */}
                    <div className="mt-1 h-1 w-20 rounded-full bg-white/10">
                      <div
                        className="h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        style={{ width: `${Math.round((job.shortlisted / job.applicants) * 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 hidden md:table-cell">
                    <span className="text-sm text-slate-400">{job.views.toLocaleString()}</span>
                  </td>
                  <td className="py-3.5 pr-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {job.deadline}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${JOB_STATUS[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="rounded-lg p-1.5 text-slate-600 opacity-0 transition-all hover:bg-white/10 hover:text-slate-300 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Recent Applicants ──────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0f1929] p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Recent Applicants</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest candidates across all internships</p>
          </div>
          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
            {["all", "pending", "shortlisted", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-lg px-3 py-1 text-xs font-medium capitalize transition-all ${
                  activeFilter === f
                    ? "bg-violet-600/80 text-white shadow-sm"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredApplicants.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No applicants in this category.</p>
          ) : (
            filteredApplicants.map((applicant) => {
              const cfg = STATUS_CONFIG[applicant.status];
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={applicant.id}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.04]"
                >
                  <Avatar name={applicant.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white">{applicant.name}</p>
                      <span className="hidden text-slate-600 sm:block">·</span>
                      <p className="hidden text-xs text-slate-500 sm:block">{applicant.college}</p>
                      <span className="hidden rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-slate-400 sm:block">
                        CGPA {applicant.cgpa}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{applicant.role}</p>
                    <div className="mt-1.5 hidden flex-wrap gap-1 sm:flex">
                      {applicant.skills.map((s) => (
                        <span key={s} className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-xs text-violet-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.class}`}>
                      <StatusIcon className="h-3 w-3" />
                      {cfg.label}
                    </span>
                    <span className="text-xs text-slate-600">{applicant.appliedAt}</span>
                  </div>
                  <div className="hidden gap-1.5 lg:flex">
                    <button className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-500/20">
                      Shortlist
                    </button>
                    <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:bg-white/10 hover:text-white">
                      View
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Link
          to="/recruiter/applicants"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-violet-500/30 hover:text-violet-400"
        >
          View all {recentApplicants.length} applicants
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
