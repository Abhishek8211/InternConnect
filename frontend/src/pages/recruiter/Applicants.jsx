import { useState, useEffect, useCallback } from "react";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import {
  Search, Filter, Star, CheckCircle2, Clock, Eye,
  XCircle, Download, Mail, Phone, User, GraduationCap,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { applicationService } from "@/services/application.service";

const STATUS_CFG = {
  pending:     { label: "Pending",     class: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",   icon: Clock        },
  reviewed:    { label: "Reviewed",    class: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",      icon: Eye          },
  shortlisted: { label: "Shortlisted", class: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25",     icon: Star         },
  accepted:    { label: "Accepted",    class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25", icon: CheckCircle2 },
  rejected:    { label: "Rejected",    class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",         icon: XCircle      },
};

const Applicants = () => {
  const [apps, setApps]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSel]  = useState(null);

  const fetchApps = useCallback(async () => {
    try {
      setLoading(true);
      const res = await applicationService.getApplicationsForMyListings();
      setApps(res.data.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load applicants");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const updateStatus = async (id, status) => {
    try {
      await applicationService.updateStatus(id, { status });
      setApps((p) => p.map((a) => a._id === id ? { ...a, status } : a));
      if (selected === id) {
         // keep it selected but visually updated
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    }
  };

  const filtered = apps.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    const q = search.toLowerCase();
    if (!q) return true;
    const nameMatch = a.applicant?.name?.toLowerCase().includes(q);
    const roleMatch = a.internship?.title?.toLowerCase().includes(q);
    const collegeMatch = a.applicant?.profile?.education?.[0]?.institution?.toLowerCase().includes(q);
    return nameMatch || roleMatch || collegeMatch;
  });

  const counts = { 
    all: apps.length, 
    pending: apps.filter(a=>a.status==="pending").length, 
    shortlisted: apps.filter(a=>a.status==="shortlisted").length, 
    accepted: apps.filter(a=>a.status==="accepted").length 
  };

  const selectedApp = apps.find((a) => a._id === selected);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Applicants</h1>
          <p className="mt-1 text-sm text-slate-400">{apps.length} total applicants across all listings</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "all", label: "Total", v: counts.all, c: "text-white" },
          { k: "pending", label: "Pending", v: counts.pending, c: "text-amber-400" },
          { k: "shortlisted", label: "Shortlisted", v: counts.shortlisted, c: "text-cyan-400" },
          { k: "accepted", label: "Accepted", v: counts.accepted, c: "text-emerald-400" }
        ].map(({ k, label, v, c }) => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-2xl border p-4 text-left transition-all ${filter === k ? "border-violet-500/30 bg-violet-500/10" : "border-white/[0.05] bg-[#111827] hover:bg-white/[0.03]"}`}>
            <p className={`text-xl font-bold ${c}`}>{v}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, college…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50" />
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 min-w-0 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">No applicants found</div>
          ) : filtered.map((a) => {
            const cfg = STATUS_CFG[a.status] || STATUS_CFG.pending;
            const SI = cfg.icon;
            const applicantName = a.applicant?.name || "Unknown User";
            const latestEdu = a.applicant?.profile?.education?.[0];
            
            return (
              <div key={a._id} onClick={() => setSel(selected === a._id ? null : a._id)}
                className={`group cursor-pointer flex items-center gap-4 rounded-2xl border p-4 transition-all ${selected === a._id ? "border-violet-500/30 bg-violet-500/5" : "border-white/[0.05] bg-[#111827] hover:border-white/10"}`}>
                <Avatar src={a.applicant?.avatar?.url} name={applicantName} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{applicantName}</p>
                    {latestEdu?.grade && <span className="hidden rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-slate-400 sm:block">Grade: {latestEdu.grade}</span>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{a.internship?.title}</p>
                  <p className="text-xs text-slate-600">{latestEdu?.institution || "No college specified"} · {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}</p>
                  <div className="mt-1.5 hidden flex-wrap gap-1 sm:flex">
                    {a.applicant?.profile?.skills?.slice(0, 4).map((s) => <span key={s} className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-xs text-violet-400">{s}</span>)}
                    {(a.applicant?.profile?.skills?.length > 4) && <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-slate-500">+{a.applicant.profile.skills.length - 4}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.class}`}>
                    <SI className="h-3 w-3" />{cfg.label}
                  </span>
                  <div className="flex gap-1.5">
                    <button onClick={e => { e.stopPropagation(); updateStatus(a._id, "shortlisted") }}
                      className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400 hover:bg-cyan-500/20 transition-all">Shortlist</button>
                    <button onClick={e => { e.stopPropagation(); updateStatus(a._id, "rejected") }}
                      className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all">Reject</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        {selectedApp && (
          <div className="hidden xl:block w-80 flex-shrink-0 rounded-2xl border border-white/[0.05] bg-[#111827] p-5 h-fit sticky top-4 animate-fade-in">
            <div className="flex flex-col items-center text-center mb-5">
              <Avatar src={selectedApp.applicant?.avatar?.url} name={selectedApp.applicant?.name} size="xl" />
              <h3 className="mt-3 font-bold text-white">{selectedApp.applicant?.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedApp.applicant?.profile?.education?.[0]?.institution || "No college info"}</p>
              {selectedApp.applicant?.profile?.education?.[0]?.grade && <p className="text-xs text-slate-500">Grade: {selectedApp.applicant.profile.education[0].grade}</p>}
              <div className="mt-2 flex gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${(STATUS_CFG[selectedApp.status] || STATUS_CFG.pending).class}`}>
                  {(STATUS_CFG[selectedApp.status] || STATUS_CFG.pending).label}
                </span>
              </div>
            </div>
            <div className="space-y-3 text-xs mb-4">
              <div className="flex items-center gap-2 text-slate-400"><Mail className="h-3.5 w-3.5 text-slate-600" />{selectedApp.applicant?.email}</div>
              {selectedApp.applicant?.profile?.phone && <div className="flex items-center gap-2 text-slate-400"><Phone className="h-3.5 w-3.5 text-slate-600" />{selectedApp.applicant.profile.phone}</div>}
              <div className="flex items-center gap-2 text-slate-400"><User className="h-3.5 w-3.5 text-slate-600" />{selectedApp.internship?.title}</div>
            </div>

            {selectedApp.applicant?.profile?.resume?.url && (
              <a href={selectedApp.applicant.profile.resume.url} target="_blank" rel="noreferrer"
                 className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all mb-4">
                <Download className="h-3.5 w-3.5" /> View Resume
              </a>
            )}

            <div className="mt-4 mb-5">
              <p className="text-xs text-slate-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedApp.applicant?.profile?.skills?.map(s => <span key={s} className="rounded-xl bg-violet-500/10 px-2 py-0.5 text-xs text-violet-400">{s}</span>)}
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <button onClick={() => updateStatus(selectedApp._id, "shortlisted")} className="w-full rounded-xl bg-cyan-600/20 py-2 text-xs font-semibold text-cyan-400 ring-1 ring-cyan-500/30 hover:bg-cyan-600/30 transition-all">Shortlist</button>
              <button onClick={() => updateStatus(selectedApp._id, "accepted")} className="w-full rounded-xl bg-emerald-600/20 py-2 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-600/30 transition-all">Accept</button>
              <button onClick={() => updateStatus(selectedApp._id, "rejected")} className="w-full rounded-xl bg-red-500/10 py-2 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 hover:bg-red-500/20 transition-all">Reject</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
