import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList, Search, Filter, Building2, MapPin, DollarSign,
  Clock, CheckCircle2, XCircle, AlertCircle, Star, Eye,
  ChevronRight, ArrowUpRight, MoreHorizontal, X, Download,
} from "lucide-react";

const APPLICATIONS = [
  { id: 1,  company: "Google",     logo: "G", color: "from-red-500 to-yellow-400",   role: "SWE Intern",             location: "Bangalore", stipend: "₹80,000", type: "Hybrid",   status: "shortlisted", appliedAt: "Jun 25, 2026", deadline: "Jul 15", notes: "Technical interview scheduled for Jul 5" },
  { id: 2,  company: "Microsoft",  logo: "M", color: "from-blue-500 to-cyan-400",    role: "Product Intern",         location: "Hyderabad", stipend: "₹65,000", type: "On-site",  status: "pending",     appliedAt: "Jun 28, 2026", deadline: "Jul 20", notes: "" },
  { id: 3,  company: "Flipkart",   logo: "F", color: "from-orange-600 to-yellow-500","role": "Data Analyst Intern",  location: "Bangalore", stipend: "₹45,000", type: "On-site",  status: "accepted",    appliedAt: "Jun 10, 2026", deadline: "—",      notes: "Offer letter received. Joining Jul 15." },
  { id: 4,  company: "Swiggy",     logo: "S", color: "from-orange-500 to-red-500",   role: "Backend Intern",         location: "Remote",    stipend: "₹35,000", type: "Remote",   status: "rejected",    appliedAt: "Jun 5, 2026",  deadline: "—",      notes: "Position filled internally." },
  { id: 5,  company: "Razorpay",   logo: "R", color: "from-blue-700 to-indigo-600",  role: "Full Stack Intern",      location: "Bangalore", stipend: "₹60,000", type: "Hybrid",   status: "reviewing",   appliedAt: "Jun 29, 2026", deadline: "Aug 1",  notes: "" },
  { id: 6,  company: "PhonePe",    logo: "P", color: "from-purple-600 to-violet-500","role": "iOS Intern",           location: "Remote",    stipend: "₹50,000", type: "Remote",   status: "pending",     appliedAt: "Jul 1, 2026",  deadline: "Aug 10", notes: "" },
];

const STATUS_CONFIG = {
  pending:     { label: "Pending",     icon: Clock,        class: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",   dot: "bg-amber-400" },
  reviewing:   { label: "Under Review",icon: Eye,          class: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",      dot: "bg-blue-400" },
  shortlisted: { label: "Shortlisted", icon: Star,         class: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25",      dot: "bg-cyan-400" },
  accepted:    { label: "Accepted",    icon: CheckCircle2, class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25", dot: "bg-emerald-400" },
  rejected:    { label: "Rejected",    icon: XCircle,      class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",         dot: "bg-red-400" },
};

const TIMELINE = {
  pending:     ["Applied", "Under Review", "Decision"],
  reviewing:   ["Applied", "Under Review", "Decision"],
  shortlisted: ["Applied", "Under Review", "Shortlisted", "Decision"],
  accepted:    ["Applied", "Under Review", "Shortlisted", "Accepted ✓"],
  rejected:    ["Applied", "Under Review", "Rejected"],
};

const STEP_STATUS = {
  pending:     [1, 0, 0],
  reviewing:   [1, 1, 0],
  shortlisted: [1, 1, 1, 0],
  accepted:    [1, 1, 1, 1],
  rejected:    [1, 1, -1],
};

const MyApplications = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = APPLICATIONS.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !a.role.toLowerCase().includes(search.toLowerCase()) &&
        !a.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: APPLICATIONS.length,
    pending: APPLICATIONS.filter((a) => a.status === "pending").length,
    shortlisted: APPLICATIONS.filter((a) => a.status === "shortlisted").length,
    accepted: APPLICATIONS.filter((a) => a.status === "accepted").length,
    rejected: APPLICATIONS.filter((a) => a.status === "rejected").length,
  };

  const selected_app = APPLICATIONS.find((a) => a.id === selected);

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Applications</h1>
          <p className="mt-1 text-sm text-slate-400">Track all your internship applications in one place</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all">
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {[
          { key: "all",         label: "Total",       value: counts.all,         color: "text-white",        bg: "bg-white/5" },
          { key: "pending",     label: "Pending",      value: counts.pending,     color: "text-amber-400",    bg: "bg-amber-500/10" },
          { key: "shortlisted", label: "Shortlisted",  value: counts.shortlisted, color: "text-cyan-400",     bg: "bg-cyan-500/10" },
          { key: "accepted",    label: "Accepted",     value: counts.accepted,    color: "text-emerald-400",  bg: "bg-emerald-500/10" },
          { key: "rejected",    label: "Rejected",     value: counts.rejected,    color: "text-red-400",      bg: "bg-red-500/10" },
        ].map(({ key, label, value, color, bg }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-2xl border p-4 text-left transition-all ${filter === key ? "border-blue-500/40 bg-blue-500/10" : "border-white/[0.05] bg-[#111827] hover:bg-white/[0.04]"}`}
          >
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by role or company…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 space-y-3 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center rounded-2xl border border-white/[0.05] bg-[#111827]">
              <ClipboardList className="h-12 w-12 text-slate-700 mb-4" />
              <p className="text-lg font-semibold text-white">No applications found</p>
              <p className="text-sm text-slate-500 mt-1">
                {filter === "all" ? "You haven't applied to any internships yet." : `No ${filter} applications.`}
              </p>
              <Link to="/student/recommended" className="mt-4 text-sm text-blue-400 hover:underline">
                Browse internships →
              </Link>
            </div>
          ) : filtered.map((app) => {
            const cfg = STATUS_CONFIG[app.status];
            const StatusIcon = cfg.icon;
            const isSelected = selected === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelected(isSelected ? null : app.id)}
                className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${isSelected ? "border-blue-500/30 bg-blue-500/5" : "border-white/[0.05] bg-[#111827] hover:border-white/10 hover:bg-white/[0.03]"}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${app.color} text-sm font-bold text-white shadow-lg`}>
                    {app.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-white">{app.role}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.class}`}>
                        <StatusIcon className="h-3 w-3" />{cfg.label}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{app.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{app.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{app.stipend}/mo</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Applied {app.appliedAt}</span>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-slate-600 flex-shrink-0 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                </div>

                {/* Progress Timeline */}
                {isSelected && (
                  <div className="mt-5 border-t border-white/5 pt-5 animate-fade-in">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Application Progress</p>
                    <div className="flex items-center">
                      {(TIMELINE[app.status] || []).map((step, idx, arr) => {
                        const stepStatus = (STEP_STATUS[app.status] || [])[idx];
                        return (
                          <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center">
                              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                                stepStatus === 1  ? "bg-emerald-500 text-white" :
                                stepStatus === -1 ? "bg-red-500 text-white" :
                                "bg-white/10 text-slate-500"
                              }`}>
                                {stepStatus === 1 ? "✓" : stepStatus === -1 ? "✕" : idx + 1}
                              </div>
                              <p className="mt-1.5 text-center text-[10px] text-slate-500 w-16 leading-tight">{step}</p>
                            </div>
                            {idx < arr.length - 1 && (
                              <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${stepStatus === 1 ? "bg-emerald-500/50" : "bg-white/10"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {app.notes && (
                      <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
                        <p className="text-xs font-semibold text-cyan-400 mb-1">Recruiter Note</p>
                        <p className="text-xs text-slate-400">{app.notes}</p>
                      </div>
                    )}
                    <div className="mt-4 flex gap-2">
                      <button className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        View Listing
                      </button>
                      {app.status === "accepted" && (
                        <button className="rounded-xl bg-emerald-600/20 px-4 py-2 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-600/30 transition-all">
                          View Offer Letter
                        </button>
                      )}
                      {app.status !== "accepted" && app.status !== "rejected" && (
                        <button className="rounded-xl bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 ring-1 ring-red-500/20 hover:bg-red-500/20 transition-all">
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
