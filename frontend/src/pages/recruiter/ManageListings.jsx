import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Users, Eye, Edit3, Trash2, MoreHorizontal, Plus, Search, Filter, CheckCircle2, Clock, XCircle, BarChart2, Calendar } from "lucide-react";

const LISTINGS = [
  { id: 1, title: "Full Stack Developer Intern", type: "Hybrid",   location: "Bangalore",  stipend: "₹60,000", duration: "3 months", applicants: 42, views: 1240, deadline: "Jul 15, 2026", status: "active",   posted: "Jun 10, 2026", shortlisted: 8  },
  { id: 2, title: "Product Management Intern",   type: "On-site",  location: "Mumbai",     stipend: "₹55,000", duration: "6 months", applicants: 37, views: 980,  deadline: "Jul 20, 2026", status: "active",   posted: "Jun 12, 2026", shortlisted: 6  },
  { id: 3, title: "Data Science Intern",         type: "Remote",   location: "Remote",     stipend: "₹50,000", duration: "3 months", applicants: 65, views: 2140, deadline: "Jul 10, 2026", status: "active",   posted: "Jun 5, 2026",  shortlisted: 12 },
  { id: 4, title: "UI/UX Design Intern",         type: "Remote",   location: "Remote",     stipend: "₹40,000", duration: "3 months", applicants: 28, views: 410,  deadline: "Aug 1, 2026",  status: "draft",    posted: "Jun 20, 2026", shortlisted: 0  },
  { id: 5, title: "DevOps Intern",               type: "On-site",  location: "Pune",       stipend: "₹45,000", duration: "6 months", applicants: 19, views: 320,  deadline: "Jun 30, 2026", status: "closed",   posted: "May 1, 2026",  shortlisted: 4  },
  { id: 6, title: "Android Developer Intern",    type: "Hybrid",   location: "Chennai",    stipend: "₹42,000", duration: "3 months", applicants: 31, views: 560,  deadline: "Aug 10, 2026", status: "active",   posted: "Jun 18, 2026", shortlisted: 5  },
];

const STATUS_CFG = {
  active: { label: "Active",  class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25", icon: CheckCircle2 },
  draft:  { label: "Draft",   class: "bg-slate-500/15 text-slate-400 ring-1 ring-slate-500/25",       icon: Clock },
  closed: { label: "Closed",  class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",             icon: XCircle },
};

const TYPE_COLORS = {
  Remote: "bg-purple-500/15 text-purple-400", Hybrid: "bg-cyan-500/15 text-cyan-400", "On-site": "bg-amber-500/15 text-amber-400",
};

const ManageListings = () => {
  const [listings, setListings]     = useState(LISTINGS);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");
  const [openMenu, setOpenMenu]     = useState(null);

  const filtered = listings.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleStatus = (id, newStatus) => {
    setListings((p) => p.map((l) => l.id === id ? { ...l, status: newStatus } : l));
    setOpenMenu(null);
  };
  const remove = (id) => { setListings((p) => p.filter((l) => l.id !== id)); setOpenMenu(null); };

  const counts = { all: listings.length, active: listings.filter(l=>l.status==="active").length, draft: listings.filter(l=>l.status==="draft").length, closed: listings.filter(l=>l.status==="closed").length };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Internships</h1>
          <p className="mt-1 text-sm text-slate-400">{listings.length} total listings</p>
        </div>
        <Link to="/recruiter/post" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 transition-all">
          <Plus className="h-4 w-4" /> Post New
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { key: "all",    label: "All",    val: counts.all,    color: "text-white" },
          { key: "active", label: "Active", val: counts.active, color: "text-emerald-400" },
          { key: "draft",  label: "Draft",  val: counts.draft,  color: "text-slate-400" },
          { key: "closed", label: "Closed", val: counts.closed, color: "text-red-400" },
        ].map(({ key, label, val, color }) => (
          <button key={key} onClick={() => setStatus(key)}
            className={`rounded-2xl border p-4 text-left transition-all ${statusFilter === key ? "border-violet-500/30 bg-violet-500/10" : "border-white/[0.05] bg-[#111827] hover:bg-white/[0.03]"}`}>
            <p className={`text-xl font-bold ${color}`}>{val}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search listings…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.05] bg-[#111827] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Role","Type","Stipend","Applicants","Views","Deadline","Status",""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 first:pl-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-16 text-center text-slate-500 text-sm">No listings found</td></tr>
              ) : filtered.map((job) => {
                const cfg = STATUS_CFG[job.status];
                const SI = cfg.icon;
                return (
                  <tr key={job.id} className="group transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{job.title}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" />{job.location}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">Posted {job.posted}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[job.type]}`}>{job.type}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">{job.stipend}/mo</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{job.applicants}</span>
                        <span className="hidden text-xs text-cyan-400 sm:flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" />{job.shortlisted}</span>
                      </div>
                      <div className="mt-1 h-1 w-20 rounded-full bg-white/10">
                        <div className="h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                          style={{ width: `${job.applicants ? Math.round((job.shortlisted / job.applicants) * 100) : 0}%` }} />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm text-slate-400"><Eye className="h-3 w-3" />{job.views.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" />{job.deadline}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.class}`}>
                        <SI className="h-3 w-3" />{cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 relative">
                      <button onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                        className="rounded-lg p-1.5 text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-slate-300 transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {openMenu === job.id && (
                        <div className="absolute right-12 top-3 z-20 w-44 rounded-xl border border-white/10 bg-[#1a2540] shadow-xl py-1.5">
                          <button onClick={() => setOpenMenu(null)} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-all"><Edit3 className="h-3.5 w-3.5" />Edit</button>
                          <button onClick={() => toggleStatus(job.id, job.status === "active" ? "closed" : "active")}
                            className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                            {job.status === "active" ? <><XCircle className="h-3.5 w-3.5" />Close listing</> : <><CheckCircle2 className="h-3.5 w-3.5" />Reactivate</>}
                          </button>
                          <button onClick={() => remove(job.id)} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="h-3.5 w-3.5" />Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageListings;
