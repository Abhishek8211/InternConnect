import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Search, MapPin, DollarSign, Clock, Building2,
  SlidersHorizontal, Bookmark, ChevronLeft, ChevronRight, X, Loader2,
} from "lucide-react";
import { internshipService } from "@/services/internship.service";
import { applicationService } from "@/services/application.service";
import { userService } from "@/services/user.service";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import Spinner from "@/components/ui/Spinner";

const TYPE_COLORS = {
  Remote:    "bg-purple-500/15 text-purple-400",
  Hybrid:    "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

// Apply modal component
const ApplyModal = ({ internship, onClose, onSuccess }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const handleApply = async () => {
    try {
      setSubmitting(true);
      setErr("");
      const form = new FormData();
      form.append("internshipId", internship._id);
      if (coverLetter.trim()) form.append("coverLetter", coverLetter.trim());
      await applicationService.apply(form);
      onSuccess(internship._id);
      onClose();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to apply");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-lg font-bold text-white">Apply to {internship.title}</h2>
        <p className="mb-5 text-sm text-slate-400">{internship.company?.name}</p>

        <label className="mb-1.5 block text-xs font-medium text-slate-400">Cover Letter <span className="text-slate-600">(optional)</span></label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Tell the recruiter why you're a great fit…"
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
        />
        <p className="mt-2 text-xs text-slate-500">Your saved resume will be attached automatically.</p>

        {err && <p className="mt-3 text-xs text-red-400">{err}</p>}

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-all">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
          >
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</> : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BrowseInternships = () => {
  const { user } = useAuth();
  const [internships, setInternships]     = useState([]);
  const [total, setTotal]                 = useState(0);
  const [pages, setPages]                 = useState(1);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState("");
  const [typeFilter, setTypeFilter]       = useState("");
  const [page, setPage]                   = useState(1);
  const [showFilters, setShowFilters]     = useState(false);
  const [savedIds, setSavedIds]           = useState(new Set());
  const [savingId, setSavingId]           = useState(null);
  const [appliedIds, setAppliedIds]       = useState(new Set());
  const [applyTarget, setApplyTarget]     = useState(null);

  const debouncedSearch = useDebounce(search, 400);
  const PER_PAGE = 9;

  // Load saved internship IDs on mount
  useEffect(() => {
    if (user?.role === "student") {
      userService.getSaved()
        .then((res) => {
          const ids = (res.data.data || []).map((i) => i._id);
          setSavedIds(new Set(ids));
        })
        .catch(() => {});
    }
  }, [user]);

  // Load applied IDs on mount so Apply button shows "Applied" correctly
  useEffect(() => {
    if (user?.role === "student") {
      applicationService.getMyApplications()
        .then((res) => {
          const ids = (res.data.data || []).map((a) => a.internship?._id).filter(Boolean);
          setAppliedIds(new Set(ids));
        })
        .catch(() => {});
    }
  }, [user]);

  const fetchInternships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await internshipService.getAll({
        search: debouncedSearch || undefined,
        type:   typeFilter || undefined,
        page,
        limit: PER_PAGE,
        sort: "-createdAt",
      });
      const d = res.data.data;
      setInternships(d.internships || []);
      setTotal(d.total || 0);
      setPages(d.pages || 1);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load internships");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, typeFilter, page]);

  useEffect(() => { fetchInternships(); }, [fetchInternships]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [debouncedSearch, typeFilter]);

  const handleToggleSave = async (internshipId, e) => {
    e.stopPropagation();
    if (!user) return;
    try {
      setSavingId(internshipId);
      await userService.toggleSaved(internshipId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (next.has(internshipId)) next.delete(internshipId); else next.add(internshipId);
        return next;
      });
    } catch {
      // silently fail
    } finally {
      setSavingId(null);
    }
  };

  const handleApplySuccess = (internshipId) => {
    setAppliedIds((prev) => new Set([...prev, internshipId]));
  };

  const clearFilters = () => { setSearch(""); setTypeFilter(""); setPage(1); };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Browse Internships</h1>
        <p className="mt-1 text-sm text-slate-400">
          {loading ? "Loading…" : `${total} internship${total !== 1 ? "s" : ""} available`}
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, company, or skill…"
            className="w-full rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
            showFilters || typeFilter
              ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
              : "border-white/[0.08] bg-[#111827] text-slate-400 hover:text-white"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
          {typeFilter && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">1</span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-6 rounded-2xl border border-white/[0.06] bg-[#111827] p-5 animate-fade-in">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Work Type</p>
            <div className="flex flex-wrap gap-2">
              {["", "Remote", "Hybrid", "On-site"].map((opt) => (
                <button
                  key={opt || "all"}
                  onClick={() => setTypeFilter(opt)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                    typeFilter === opt ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {opt || "All Types"}
                </button>
              ))}
            </div>
          </div>
          {(search || typeFilter) && (
            <button onClick={clearFilters} className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors">
              <X className="h-3.5 w-3.5" /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl border border-white/[0.05] bg-[#111827]">
          <p className="text-lg font-semibold text-white">Something went wrong</p>
          <p className="text-sm text-slate-400">{error}</p>
          <button onClick={fetchInternships} className="mt-2 text-sm text-blue-400 hover:underline">Try again</button>
        </div>
      ) : internships.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Search className="h-12 w-12 text-slate-700" />
          <p className="text-lg font-semibold text-white">No internships found</p>
          <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="mt-2 text-sm text-blue-400 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {internships.map((internship) => {
            const isSaved   = savedIds.has(internship._id);
            const isApplied = appliedIds.has(internship._id);
            return (
              <div
                key={internship._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.05] bg-[#111827] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Featured badge */}
                {internship.isFeatured && (
                  <span className="absolute left-4 top-4 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-400 ring-1 ring-amber-500/20">
                    Featured
                  </span>
                )}

                {/* Header */}
                <div className={`flex items-start gap-3 ${internship.isFeatured ? "pt-7" : ""}`}>
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                    {(internship.company?.name || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight text-white">{internship.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <Building2 className="h-3 w-3" />{internship.company?.name || "—"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500">
                  {internship.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{internship.location}</span>}
                  {internship.stipend?.amount > 0 && (
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />₹{internship.stipend.amount.toLocaleString()}/mo</span>
                  )}
                  {internship.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{internship.duration}</span>}
                </div>

                {/* Type + deadline */}
                <div className="mt-3 flex items-center gap-2">
                  {internship.type && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[internship.type] || "bg-white/5 text-slate-400"}`}>
                      {internship.type}
                    </span>
                  )}
                  {internship.applicationDeadline && (
                    <span className="text-xs text-slate-600">
                      Closes {new Date(internship.applicationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>

                {/* Skills */}
                {internship.skillsRequired?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {internship.skillsRequired.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto pt-4 flex gap-2">
                  {isApplied ? (
                    <span className="flex-1 rounded-xl bg-emerald-600/10 py-2 text-center text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                      ✓ Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setApplyTarget(internship)}
                      className="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-500"
                    >
                      Apply Now
                    </button>
                  )}
                  <button
                    onClick={(e) => handleToggleSave(internship._id, e)}
                    disabled={savingId === internship._id}
                    className={`rounded-xl border px-3 py-2 transition-all ${
                      isSaved
                        ? "border-blue-500/40 bg-blue-500/15 text-blue-400"
                        : "border-white/10 text-slate-500 hover:text-white"
                    }`}
                    title={isSaved ? "Unsave" : "Save"}
                  >
                    {savingId === internship._id
                      ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      : <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          {Array.from({ length: pages }, (_, k) => k + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-xl text-sm font-medium transition-all ${n === page ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-30"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Apply modal */}
      {applyTarget && (
        <ApplyModal
          internship={applyTarget}
          onClose={() => setApplyTarget(null)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
};

export default BrowseInternships;
