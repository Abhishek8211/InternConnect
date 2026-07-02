import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList, Search, Building2, MapPin, DollarSign,
  Clock, CheckCircle2, XCircle, AlertCircle, Star, Eye,
  ChevronRight, Download, X, Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { applicationService } from "@/services/application.service";
import Spinner from "@/components/ui/Spinner";

// ── Status config ─────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:     { label: "Pending",      icon: AlertCircle,  cls: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25" },
  reviewed:    { label: "Under Review", icon: Eye,          cls: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25" },
  shortlisted: { label: "Shortlisted",  icon: Star,         cls: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25" },
  accepted:    { label: "Accepted",     icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25" },
  rejected:    { label: "Rejected",     icon: XCircle,      cls: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25" },
};

const TIMELINE_STEPS = {
  pending:     ["Applied", "Under Review", "Decision"],
  reviewed:    ["Applied", "Under Review", "Decision"],
  shortlisted: ["Applied", "Under Review", "Shortlisted", "Decision"],
  accepted:    ["Applied", "Under Review", "Shortlisted", "Accepted ✓"],
  rejected:    ["Applied", "Under Review", "Rejected"],
};

const STEP_DONE = {
  pending:     [1, 0, 0],
  reviewed:    [1, 1, 0],
  shortlisted: [1, 1, 1, 0],
  accepted:    [1, 1, 1, 1],
  rejected:    [1, 1, -1],
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [filter, setFilter]             = useState("all");
  const [search, setSearch]             = useState("");
  const [selected, setSelected]         = useState(null);
  const [withdrawingId, setWithdrawingId] = useState(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await applicationService.getMyApplications();
      setApplications(res.data.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const handleWithdraw = async (appId) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;
    try {
      setWithdrawingId(appId);
      await applicationService.withdraw(appId);
      setApplications((prev) => prev.filter((a) => a._id !== appId));
      if (selected === appId) setSelected(null);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to withdraw application");
    } finally {
      setWithdrawingId(null);
    }
  };

  // ── Derived data ──────────────────────────────────────────────
  const counts = {
    all: applications.length,
    pending:     applications.filter((a) => a.status === "pending").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    accepted:    applications.filter((a) => a.status === "accepted").length,
    rejected:    applications.filter((a) => a.status === "rejected").length,
  };

  const filtered = applications.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const title = a.internship?.title?.toLowerCase() || "";
      const company = a.internship?.company?.name?.toLowerCase() || "";
      if (!title.includes(q) && !company.includes(q)) return false;
    }
    return true;
  });

  // ── Render states ─────────────────────────────────────────────
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
        <p className="text-lg font-semibold text-white">Could not load applications</p>
        <p className="text-sm text-slate-400">{error}</p>
        <button onClick={fetchApplications} className="mt-2 rounded-xl bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-blue-500/30 hover:bg-blue-600/30">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Applications</h1>
          <p className="mt-1 text-sm text-slate-400">Track all your internship applications in one place</p>
        </div>
      </div>

      {/* Summary tabs */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { key: "all",         label: "Total",      value: counts.all,         color: "text-white" },
          { key: "pending",     label: "Pending",    value: counts.pending,     color: "text-amber-400" },
          { key: "shortlisted", label: "Shortlisted",value: counts.shortlisted, color: "text-cyan-400" },
          { key: "accepted",    label: "Accepted",   value: counts.accepted,    color: "text-emerald-400" },
          { key: "rejected",    label: "Rejected",   value: counts.rejected,    color: "text-red-400" },
        ].map(({ key, label, value, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-2xl border p-4 text-left transition-all ${
              filter === key
                ? "border-blue-500/40 bg-blue-500/10"
                : "border-white/[0.05] bg-[#111827] hover:bg-white/[0.04]"
            }`}
          >
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{label}</p>
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

      {/* Application list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center rounded-2xl border border-white/[0.05] bg-[#111827]">
            <ClipboardList className="mb-4 h-12 w-12 text-slate-700" />
            <p className="text-lg font-semibold text-white">
              {applications.length === 0 ? "No applications yet" : "No results found"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {applications.length === 0
                ? "Apply to internships and they'll appear here with real-time tracking."
                : `No ${filter === "all" ? "" : filter + " "}applications match your search.`}
            </p>
            {applications.length === 0 && (
              <Link to="/student/browse" className="mt-4 text-sm text-blue-400 hover:underline">
                Browse internships →
              </Link>
            )}
          </div>
        ) : (
          filtered.map((app) => {
            const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
            const StatusIcon = cfg.icon;
            const internship = app.internship;
            const company = internship?.company;
            const isOpen = selected === app._id;

            return (
              <div
                key={app._id}
                className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                  isOpen
                    ? "border-blue-500/30 bg-blue-500/5"
                    : "border-white/[0.05] bg-[#111827] hover:border-white/10 hover:bg-white/[0.03]"
                }`}
                onClick={() => setSelected(isOpen ? null : app._id)}
              >
                {/* Row */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                    {(company?.name || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-white">{internship?.title || "Unknown role"}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.cls}`}>
                        <StatusIcon className="h-3 w-3" />{cfg.label}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                      {company?.name && <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{company.name}</span>}
                      {internship?.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{internship.location}</span>}
                      {internship?.stipend?.amount > 0 && (
                        <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />₹{internship.stipend.amount.toLocaleString()}/mo</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Applied {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 flex-shrink-0 text-slate-600 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="mt-5 border-t border-white/5 pt-5 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Application Progress</p>
                    <div className="flex items-center">
                      {(TIMELINE_STEPS[app.status] || TIMELINE_STEPS.pending).map((step, idx, arr) => {
                        const done = (STEP_DONE[app.status] || [])[idx];
                        return (
                          <div key={step} className="flex flex-1 last:flex-none items-center">
                            <div className="flex flex-col items-center">
                              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                done === 1  ? "bg-emerald-500 text-white" :
                                done === -1 ? "bg-red-500 text-white" :
                                "bg-white/10 text-slate-500"
                              }`}>
                                {done === 1 ? "✓" : done === -1 ? "✕" : idx + 1}
                              </div>
                              <p className="mt-1.5 w-16 text-center text-[10px] leading-tight text-slate-500">{step}</p>
                            </div>
                            {idx < arr.length - 1 && (
                              <div className={`mb-4 h-0.5 flex-1 mx-1 ${done === 1 ? "bg-emerald-500/50" : "bg-white/10"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Recruiter note */}
                    {app.recruiterNote && (
                      <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
                        <p className="mb-1 text-xs font-semibold text-cyan-400">Recruiter Note</p>
                        <p className="text-xs text-slate-400">{app.recruiterNote}</p>
                      </div>
                    )}

                    {/* Cover letter */}
                    {app.coverLetter && (
                      <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                        <p className="mb-1 text-xs font-semibold text-slate-400">Your Cover Letter</p>
                        <p className="text-xs leading-relaxed text-slate-500 line-clamp-3">{app.coverLetter}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      {internship?._id && (
                        <Link
                          to={`/internships/${internship._id}`}
                          className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:bg-white/5 hover:text-white"
                        >
                          View Listing
                        </Link>
                      )}
                      {app.status === "pending" && (
                        <button
                          onClick={() => handleWithdraw(app._id)}
                          disabled={withdrawingId === app._id}
                          className="flex items-center gap-1.5 rounded-xl bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 ring-1 ring-red-500/20 transition-all hover:bg-red-500/20 disabled:opacity-50"
                        >
                          {withdrawingId === app._id ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyApplications;
