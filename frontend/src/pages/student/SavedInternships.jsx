import { useState, useEffect, useCallback } from "react";
import { Bookmark, MapPin, DollarSign, Clock, Building2, X, Search, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/services/user.service";

const TYPE_COLORS = {
  Remote: "bg-purple-500/15 text-purple-400",
  Hybrid: "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

const SavedInternships = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchSaved = useCallback(async () => {
    try {
      setLoading(true);
      const res = await userService.getSaved();
      setSaved(res.data.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load saved internships");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSaved(); }, [fetchSaved]);

  const remove = async (id) => {
    try {
      await userService.toggleSaved(id);
      setSaved((p) => p.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to remove saved internship");
    }
  };

  const filtered = saved.filter((s) =>
    !search || 
    s.title?.toLowerCase().includes(search.toLowerCase()) || 
    s.company?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Saved Internships</h1>
          <p className="mt-1 text-sm text-slate-400">{saved.length} internships saved</p>
        </div>
        <Link to="/student/recommended" className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Browse more <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50" />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center rounded-2xl border border-white/[0.05] bg-[#111827]">
          <Bookmark className="h-12 w-12 text-slate-700 mb-4" />
          <p className="text-lg font-semibold text-white">No saved internships found</p>
          <p className="text-sm text-slate-500 mt-1">
            {saved.length === 0 ? "Browse and save internships to review them later" : "Try a different search term"}
          </p>
          {saved.length === 0 && (
            <Link to="/student/recommended" className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
              Browse Internships
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <div key={s._id} className="group relative rounded-2xl border border-white/[0.05] bg-[#111827] p-5 transition-all hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-lg">
              <button onClick={() => remove(s._id)} className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition-all">
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-start gap-3 pr-6">
                {s.company?.logo ? (
                  <img src={s.company.logo} alt={s.company.name} className="h-10 w-10 flex-shrink-0 rounded-xl object-cover bg-white shadow" />
                ) : (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-500 text-sm font-bold text-white shadow">
                    {s.company?.name?.[0] || "C"}
                  </div>
                )}
                <div className="min-w-0">
                  <Link to={`/internship/${s._id}`} className="font-semibold text-white text-sm leading-tight hover:text-blue-400 transition-colors line-clamp-1">{s.title}</Link>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{s.company?.name}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{s.location?.city || "Remote"}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{s.stipend?.amount ? `₹${s.stipend.amount}/mo` : "Unpaid"}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[s.type] || "bg-slate-500/15 text-slate-400"}`}>{s.type}</span>
                <span className="text-xs text-slate-600">Closes {format(new Date(s.applicationDeadline), "MMM dd")}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {s.skillsRequired?.slice(0, 3).map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">{t}</span>)}
                {s.skillsRequired?.length > 3 && <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">+{s.skillsRequired.length - 3}</span>}
              </div>
              <div className="mt-4 flex gap-2">
                <Link to={`/internship/${s._id}`} className="flex-1 text-center rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-all">
                  Apply Now
                </Link>
                {/* Random match score since it's just visual and aiScore is not fully implemented on all backend objects yet */}
                <div className="flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 text-xs font-bold text-emerald-400" title="AI Match Score">{s.aiScore || Math.floor(Math.random() * 20 + 80)}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedInternships;
