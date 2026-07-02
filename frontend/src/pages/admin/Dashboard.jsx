import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Shield,
  Eye,
  UserPlus,
  Activity,
  Globe,
  Star,
  Zap,
  ChevronRight,
  Download,
  RefreshCw,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const userGrowth = [
  { month: "Jan", students: 120, recruiters: 18, total: 138 },
  { month: "Feb", students: 210, recruiters: 31, total: 241 },
  { month: "Mar", students: 310, recruiters: 45, total: 355 },
  { month: "Apr", students: 480, recruiters: 62, total: 542 },
  { month: "May", students: 620, recruiters: 78, total: 698 },
  { month: "Jun", students: 810, recruiters: 95, total: 905 },
  { month: "Jul", students: 940, recruiters: 110, total: 1050 },
];

const internshipActivity = [
  { month: "Jan", posted: 14,  applications: 80,  placements: 6 },
  { month: "Feb", posted: 22,  applications: 140, placements: 11 },
  { month: "Mar", posted: 31,  applications: 210, placements: 18 },
  { month: "Apr", posted: 45,  applications: 310, placements: 27 },
  { month: "May", posted: 58,  applications: 420, placements: 35 },
  { month: "Jun", posted: 72,  applications: 560, placements: 48 },
  { month: "Jul", posted: 89,  applications: 680, placements: 62 },
];

const applicationStatus = [
  { name: "Pending",     value: 38, color: "#f59e0b" },
  { name: "Shortlisted", value: 25, color: "#06b6d4" },
  { name: "Accepted",    value: 22, color: "#10b981" },
  { name: "Rejected",    value: 15, color: "#ef4444" },
];

const platformHealth = [
  { subject: "Performance", A: 92 },
  { subject: "Uptime",      A: 99 },
  { subject: "Security",    A: 87 },
  { subject: "Coverage",    A: 78 },
  { subject: "Engagement",  A: 84 },
  { subject: "Retention",   A: 71 },
];

const topCompanies = [
  { id: 1,  name: "Google",    logo: "G", color: "from-red-500 to-yellow-500",  internships: 12, applications: 280, hired: 8,  rating: 4.9, status: "verified" },
  { id: 2,  name: "Microsoft", logo: "M", color: "from-blue-500 to-cyan-400",   internships: 9,  applications: 215, hired: 6,  rating: 4.8, status: "verified" },
  { id: 3,  name: "Razorpay",  logo: "R", color: "from-blue-700 to-indigo-600", internships: 7,  applications: 168, hired: 5,  rating: 4.7, status: "verified" },
  { id: 4,  name: "Zomato",    logo: "Z", color: "from-red-500 to-rose-600",    internships: 6,  applications: 142, hired: 4,  rating: 4.5, status: "verified" },
  { id: 5,  name: "PhonePe",   logo: "P", color: "from-purple-600 to-violet-500",internships: 5, applications: 118, hired: 3,  rating: 4.4, status: "pending" },
];

const recentActivities = [
  { id: 1,  type: "user_join",     icon: UserPlus,    color: "text-emerald-400", bg: "bg-emerald-500/10", text: "Arjun Sharma registered as a student",              time: "2 min ago",  meta: "IIT Delhi" },
  { id: 2,  type: "internship",    icon: Briefcase,   color: "text-violet-400",  bg: "bg-violet-500/10",  text: "Google posted Full Stack Developer Intern",          time: "8 min ago",  meta: "₹80,000/mo" },
  { id: 3,  type: "company",       icon: Building2,   color: "text-blue-400",    bg: "bg-blue-500/10",    text: "PhonePe Inc. submitted company verification",        time: "22 min ago", meta: "Pending review" },
  { id: 4,  type: "application",   icon: ClipboardList,color: "text-amber-400",  bg: "bg-amber-500/10",   text: "120 new applications across 8 internships",          time: "1 hr ago",   meta: "Today" },
  { id: 5,  type: "flagged",       icon: AlertTriangle,color: "text-red-400",    bg: "bg-red-500/10",     text: "Suspicious activity flagged on account #4821",       time: "3 hr ago",   meta: "High priority" },
  { id: 6,  type: "placement",     icon: CheckCircle2, color: "text-cyan-400",   bg: "bg-cyan-500/10",    text: "Priya Patel accepted offer at Microsoft",             time: "5 hr ago",   meta: "Data Science" },
  { id: 7,  type: "report",        icon: Shield,      color: "text-rose-400",    bg: "bg-rose-500/10",    text: "Weekly compliance report generated",                 time: "6 hr ago",   meta: "Auto-generated" },
];

const weeklyStats = [
  { day: "Mon", signups: 42, logins: 310 },
  { day: "Tue", signups: 58, logins: 420 },
  { day: "Wed", signups: 51, logins: 380 },
  { day: "Thu", signups: 73, logins: 510 },
  { day: "Fri", signups: 65, logins: 470 },
  { day: "Sat", signups: 38, logins: 260 },
  { day: "Sun", signups: 29, logins: 190 },
];

const recentUsers = [
  { id: 1, name: "Arjun Sharma",   role: "student",   college: "IIT Delhi",    joined: "2 min ago",  status: "active",   avatar: null },
  { id: 2, name: "TechCorp HR",    role: "recruiter",  college: "TechCorp Ltd", joined: "18 min ago", status: "pending",  avatar: null },
  { id: 3, name: "Priya Patel",    role: "student",   college: "NIT Trichy",   joined: "1 hr ago",   status: "active",   avatar: null },
  { id: 4, name: "Infosys Talent", role: "recruiter",  college: "Infosys",      joined: "2 hr ago",   status: "active",   avatar: null },
  { id: 5, name: "Rohit Kumar",    role: "student",   college: "BITS Pilani",  joined: "3 hr ago",   status: "active",   avatar: null },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const ROLE_COLORS = {
  student:   "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",
  recruiter: "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/25",
  admin:     "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25",
};

const USER_STATUS = {
  active:  "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
  banned:  "bg-red-500/15 text-red-400",
};

const CustomTooltip = ({ active, payload, label }) => {
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

// ── Mini Sparkline ────────────────────────────────────────────────────────────

const Sparkline = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={40}>
    <LineChart data={data}>
      <Line type="monotone" dataKey="total" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

// ── Main Component ────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState("7d");

  const statCards = [
    {
      label: "Total Users",
      value: "1,050",
      sub: "940 students · 110 recruiters",
      change: "+15.8%",
      up: true,
      icon: Users,
      gradient: "from-rose-600/20 to-rose-500/5",
      iconBg: "bg-rose-500/20",
      iconColor: "text-rose-400",
      border: "hover:border-rose-500/30",
      sparkData: userGrowth,
      sparkColor: "#f43f5e",
    },
    {
      label: "Total Students",
      value: "940",
      sub: "82 new this week",
      change: "+16.0%",
      up: true,
      icon: GraduationCap,
      gradient: "from-blue-600/20 to-blue-500/5",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      border: "hover:border-blue-500/30",
      sparkData: userGrowth,
      sparkColor: "#3b82f6",
    },
    {
      label: "Companies",
      value: "84",
      sub: "7 awaiting verification",
      change: "+12.0%",
      up: true,
      icon: Building2,
      gradient: "from-amber-600/20 to-amber-500/5",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      border: "hover:border-amber-500/30",
      sparkData: userGrowth,
      sparkColor: "#f59e0b",
    },
    {
      label: "Internships",
      value: "312",
      sub: "89 posted this month",
      change: "+24.1%",
      up: true,
      icon: Briefcase,
      gradient: "from-violet-600/20 to-violet-500/5",
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-400",
      border: "hover:border-violet-500/30",
      sparkData: internshipActivity,
      sparkColor: "#8b5cf6",
    },
    {
      label: "Applications",
      value: "4,821",
      sub: "680 this month",
      change: "+21.4%",
      up: true,
      icon: ClipboardList,
      gradient: "from-cyan-600/20 to-cyan-500/5",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      border: "hover:border-cyan-500/30",
      sparkData: internshipActivity,
      sparkColor: "#06b6d4",
    },
    {
      label: "Placements",
      value: "212",
      sub: "62 this month",
      change: "+29.2%",
      up: true,
      icon: CheckCircle2,
      gradient: "from-emerald-600/20 to-emerald-500/5",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      border: "hover:border-emerald-500/30",
      sparkData: internshipActivity,
      sparkColor: "#10b981",
    },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Live Platform Overview
            </p>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin{" "}
            <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            InternConnect platform — real-time metrics & management
          </p>
        </div>
        <div className="flex items-center gap-3">
          {["7d", "30d", "90d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                period === p
                  ? "bg-rose-600/20 text-rose-400 ring-1 ring-rose-500/30"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:text-white">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:text-white">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stat Cards (6-grid) ─────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map(({ label, value, sub, change, up, icon: Icon, gradient, iconBg, iconColor, border, sparkData, sparkColor }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-br ${gradient} p-4 transition-all duration-300 ${border} hover:-translate-y-1 hover:shadow-lg cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-2 ${iconBg}`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
              <span className={`text-xs font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                {change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold tracking-tight text-white">{value}</p>
              <p className="text-xs font-medium text-slate-300">{label}</p>
              <p className="mt-0.5 text-[11px] text-slate-600 line-clamp-1">{sub}</p>
            </div>
            {/* Sparkline */}
            <div className="mt-2 opacity-60">
              <Sparkline data={sparkData} color={sparkColor} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Platform Alert Banner ───────────────────────── */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-3.5">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-400" />
        <p className="text-sm text-amber-300">
          <span className="font-semibold">7 companies</span> are pending verification review ·{" "}
          <span className="font-semibold">1 flagged account</span> needs attention
        </p>
        <Link
          to="/admin/companies"
          className="ml-auto flex-shrink-0 rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 transition-all hover:bg-amber-500/30"
        >
          Review Now
        </Link>
      </div>

      {/* ── User Growth + Internship Activity ──────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* User Growth — 2/3 */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">User Growth</h2>
              <p className="text-xs text-slate-500 mt-0.5">Students & recruiters over time</p>
            </div>
            <span className="rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400 ring-1 ring-rose-500/20">
              Jan – Jul 2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userGrowth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRecruiters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="students"   stroke="#3b82f6" strokeWidth={2} fill="url(#gStudents)"   dot={false} />
              <Area type="monotone" dataKey="recruiters" stroke="#8b5cf6" strokeWidth={2} fill="url(#gRecruiters)" dot={false} />
              <Area type="monotone" dataKey="total"      stroke="#f43f5e" strokeWidth={2} fill="url(#gTotal)"      dot={false} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-blue-500" />Students</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-violet-500" />Recruiters</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-rose-500" />Total</span>
          </div>
        </div>

        {/* Application Status Donut — 1/3 */}
        <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-white">Application Status</h2>
            <p className="text-xs text-slate-500 mt-0.5">4,821 total applications</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={applicationStatus}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {applicationStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1a1c2e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-3 space-y-2">
            {applicationStatus.map(({ name, value, color }) => (
              <li key={name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: color }} />
                  <span className="text-slate-400">{name}</span>
                </span>
                <span className="font-semibold text-white">{value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Internship Chart + Platform Radar ──────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Internship Activity Bars — 2/3 */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">Internship Activity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Posted, applications & placements per month</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <Filter className="h-3 w-3" /> Filter
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={internshipActivity} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={10} barGap={2}>
              <defs>
                <linearGradient id="bPosted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#8b5cf680" />
                </linearGradient>
                <linearGradient id="bApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#06b6d480" />
                </linearGradient>
                <linearGradient id="bPlaced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b98180" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="posted"       fill="url(#bPosted)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="applications" fill="url(#bApps)"   radius={[4, 4, 0, 0]} />
              <Bar dataKey="placements"   fill="url(#bPlaced)"  radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-violet-500" />Posted</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-cyan-400" />Applications</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-emerald-400" />Placements</span>
          </div>
        </div>

        {/* Platform Health Radar — 1/3 */}
        <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-white">Platform Analytics</h2>
            <p className="text-xs text-slate-500 mt-0.5">Health score across key dimensions</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={platformHealth} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#ffffff08" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 10 }} />
              <Radar name="Score" dataKey="A" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          {/* Score pills */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {platformHealth.map(({ subject, A }) => (
              <div key={subject} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-xs">
                <span className="text-slate-500">{subject}</span>
                <span className={`font-bold ${A >= 90 ? "text-emerald-400" : A >= 80 ? "text-cyan-400" : "text-amber-400"}`}>
                  {A}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Weekly Signups Bar + Recent Activity ────────── */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Weekly Signups — 1/3 */}
        <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-white">This Week</h2>
            <p className="text-xs text-slate-500 mt-0.5">Daily signups vs logins</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyStats} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={8} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="signups" fill="#f43f5e" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
              <Bar dataKey="logins"  fill="#475569" radius={[4, 4, 0, 0]} fillOpacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Avg Signups/day", value: "51" },
              { label: "Avg Logins/day",  value: "363" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-white/[0.03] p-3 text-center">
                <p className="text-base font-bold text-white">{value}</p>
                <p className="text-[11px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed — 2/3 */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent Activity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live platform events</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500">Live</span>
            </div>
          </div>
          <ul className="space-y-4">
            {recentActivities.map(({ id, icon: Icon, color, bg, text, time, meta }) => (
              <li key={id} className="flex items-start gap-3 group">
                {/* Timeline dot + line */}
                <div className="relative flex flex-col items-center">
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${color}`} />
                  </div>
                  {id !== recentActivities[recentActivities.length - 1].id && (
                    <div className="mt-1 h-4 w-px bg-white/[0.05]" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <p className="text-xs font-medium text-slate-200 leading-relaxed">{text}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-slate-600">{time}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-[11px] text-slate-500">{meta}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 rounded-lg p-1 text-slate-700 opacity-0 transition-all group-hover:opacity-100 hover:text-slate-400">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Top Companies Table ─────────────────────────── */}
      <div className="mb-8 rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Top Companies</h2>
            <p className="text-xs text-slate-500 mt-0.5">By applications and placements</p>
          </div>
          <Link
            to="/admin/companies"
            className="flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors"
          >
            Manage all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Company", "Internships", "Applications", "Hired", "Rating", "Status", ""].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {topCompanies.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-sm font-bold text-white shadow`}>
                        {c.logo}
                      </div>
                      <span className="text-sm font-semibold text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm text-slate-300">{c.internships}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <div>
                      <span className="text-sm font-semibold text-white">{c.applications}</span>
                      <div className="mt-1 h-1 w-24 rounded-full bg-white/10">
                        <div
                          className="h-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-400"
                          style={{ width: `${Math.round((c.applications / 280) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm font-semibold text-emerald-400">{c.hired}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-white">{c.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        c.status === "verified"
                          ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25"
                          : "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25"
                      }`}
                    >
                      {c.status === "verified" ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <Clock className="mr-1 h-3 w-3" />
                      )}
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="rounded-lg p-1.5 text-slate-700 opacity-0 transition-all hover:bg-white/10 hover:text-slate-300 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Recent Users Table ──────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Recent Registrations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Newest users on the platform</p>
          </div>
          <Link
            to="/admin/users"
            className="flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors"
          >
            All users <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {recentUsers.map((u) => (
            <div
              key={u.id}
              className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition-all hover:border-rose-500/15 hover:bg-white/[0.04]"
            >
              <Avatar name={u.name} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-white">{u.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROLE_COLORS[u.role]}`}>
                    {u.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{u.college} · {u.joined}</p>
              </div>
              <span className={`hidden rounded-full px-2.5 py-0.5 text-xs font-medium capitalize sm:inline-flex ${USER_STATUS[u.status]}`}>
                {u.status}
              </span>
              <div className="hidden items-center gap-1.5 lg:flex">
                <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition-all hover:bg-white/10 hover:text-white">
                  View
                </button>
                <button className="rounded-lg border border-red-500/25 px-3 py-1.5 text-xs text-red-400 transition-all hover:bg-red-500/10">
                  Suspend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
