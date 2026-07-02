import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, MapPin, DollarSign, Clock, Briefcase, Building2,
  Filter, SlidersHorizontal, Star, Bookmark, ArrowUpRight,
  ChevronLeft, ChevronRight, X, CheckCircle2, Zap,
} from "lucide-react";

const INTERNSHIPS = [
  { id: 1,  company: "Google",     logo: "G", color: "from-red-500 to-yellow-400",   role: "SWE Intern",                 location: "Bangalore", type: "Hybrid",   stipend: "₹80,000",  duration: "3 months",  tags: ["React","Node.js","GCP"],          match: 94, deadline: "Jul 15", featured: true,  saved: false },
  { id: 2,  company: "Microsoft",  logo: "M", color: "from-blue-500 to-cyan-400",    role: "Product Intern",             location: "Hyderabad", type: "On-site",  stipend: "₹65,000",  duration: "6 months",  tags: ["Product","Agile","SQL"],           match: 88, deadline: "Jul 20", featured: true,  saved: true  },
  { id: 3,  company: "Razorpay",   logo: "R", color: "from-blue-700 to-indigo-600",  role: "Full Stack Intern",          location: "Bangalore", type: "Hybrid",   stipend: "₹60,000",  duration: "3 months",  tags: ["React","Django","PostgreSQL"],     match: 91, deadline: "Aug 1",  featured: false, saved: false },
  { id: 4,  company: "Zomato",     logo: "Z", color: "from-red-500 to-rose-600",     role: "ML Intern",                  location: "Gurugram",  type: "On-site",  stipend: "₹55,000",  duration: "3 months",  tags: ["Python","TensorFlow","SQL"],       match: 85, deadline: "Jul 25", featured: false, saved: false },
  { id: 5,  company: "PhonePe",    logo: "P", color: "from-purple-600 to-violet-500","role": "iOS Intern",               location: "Remote",    type: "Remote",   stipend: "₹50,000",  duration: "2 months",  tags: ["Swift","Xcode","iOS"],             match: 80, deadline: "Aug 10", featured: false, saved: true  },
  { id: 6,  company: "Swiggy",     logo: "S", color: "from-orange-500 to-red-500",   role: "Backend Intern",             location: "Bangalore", type: "Hybrid",   stipend: "₹45,000",  duration: "3 months",  tags: ["Go","Redis","Kafka"],              match: 76, deadline: "Aug 5",  featured: false, saved: false },
  { id: 7,  company: "CRED",       logo: "C", color: "from-slate-600 to-slate-500",  role: "Design Intern",              location: "Bangalore", type: "Hybrid",   stipend: "₹40,000",  duration: "3 months",  tags: ["Figma","UI/UX","Prototyping"],    match: 72, deadline: "Aug 15", featured: false, saved: false },
  { id: 8,  company: "Meesho",     logo: "M", color: "from-pink-500 to-rose-500",    role: "Data Analyst Intern",        location: "Remote",    type: "Remote",   stipend: "₹38,000",  duration: "2 months",  tags: ["Python","Tableau","Excel"],        match: 68, deadline: "Aug 20", featured: false, saved: false },
  { id: 9,  company: "Flipkart",   logo: "F", color: "from-orange-600 to-yellow-500","role": "DevOps Intern",            location: "Bangalore", type: "On-site",  stipend: "₹55,000",  duration: "3 months",  tags: ["Docker","K8s","AWS"],             match: 82, deadline: "Aug 8",  featured: false, saved: false },
  { id: 10, company: "Paytm",      logo: "P", color: "from-blue-500 to-sky-500",     role: "Android Intern",             location: "Noida",     type: "On-site",  stipend: "₹42,000",  duration: "3 months",  tags: ["Kotlin","Android","Firebase"],    match: 74, deadline: "Sep 1",  featured: false, saved: false },
  { id: 11, company: "Ola",        logo: "O", color: "from-yellow-500 to-amber-500", role: "Data Science Intern",        location: "Bangalore", type: "Hybrid",   stipend: "₹50,000",  duration: "6 months",  tags: ["Python","ML","Spark"],            match: 79, deadline: "Aug 25", featured: false, saved: false },
  { id: 12, company: "Zerodha",    logo: "Z", color: "from-sky-600 to-cyan-500",     role: "Frontend Intern",            location: "Remote",    type: "Remote",   stipend: "₹35,000",  duration: "3 months",  tags: ["React","TypeScript","D3.js"],     match: 86, deadline: "Sep 5",  featured: false, saved: false },
];

const TYPE_COLORS = {
  Remote:    "bg-purple-500/15 text-purple-400",
  Hybrid:    "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

const FILTERS = {
  type:     ["All", "Remote", "Hybrid", "On-site"],
  duration: ["All", "1 month", "2 months", "3 months", "6 months"],
  stipend:  ["All", "₹30k+", "₹40k+", "₹50k+", "₹60k+"],
};

const BrowseInternships = () => {
  const [search, setSearch]       = useState("");
  const [savedIds, setSavedIds]   = useState(INTERNSHIPS.filter(i => i.saved).map(i => i.id));
  const [typeFilter, setType]     = useState("All");
  const [durFilter, setDur]       = useState("All");
  const [stipFilter, setStip]     = useState("All");
  const [showFilters, setShow]    = useState(false);
  const [page, setPage]           = useState(1);
  const PER_PAGE = 6;

  const toggleSave = (id) =>
    setSavedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const filtered = INTERNSHIPS.filter((i) => {
    const q = search.toLowerCase();
    if (q && !i.role.toLowerCase().includes(q) && !i.company.toLowerCase().includes(q)) return false;
    if (typeFilter !== "All" && i.type !== typeFilter) return false;
    if (durFilter  !== "All" && i.duration !== durFilter) return false;
    if (stipFilter !== "All") {
      const num = parseInt(i.stipend.replace(/[^0-9]/g, "")) / 1000;
      const min = parseInt(stipFilter) ;
      if (num < min) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => { setType("All"); setDur("All"); setStip("All"); setSearch(""); setPage(1); };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Browse Internships</h1>
        <p className="mt-1 text-sm text-slate-400">
          {filtered.length} internships available — find your perfect match
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by role, company…"
            className="w-full rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>
        <button
          onClick={() => setShow(!showFilters)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${showFilters ? "border-blue-500/40 bg-blue-500/10 text-blue-400" : "border-white/[0.08] bg-[#111827] text-slate-400 hover:text-white"}`}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
          {(typeFilter !== "All" || durFilter !== "All" || stipFilter !== "All") && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">!</span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-6 rounded-2xl border border-white/[0.06] bg-[#111827] p-5 animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Type",     opts: FILTERS.type,     val: typeFilter, set: setType },
              { label: "Duration", opts: FILTERS.duration,  val: durFilter,  set: setDur },
              { label: "Stipend",  opts: FILTERS.stipend,   val: stipFilter, set: setStip },
            ].map(({ label, opts, val, set }) => (
              <div key={label}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {opts.map((o) => (
                    <button
                      key={o}
                      onClick={() => { set(o); setPage(1); }}
                      className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${val === o ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={clearFilters} className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors">
            <X className="h-3.5 w-3.5" /> Clear all filters
          </button>
        </div>
      )}

      {/* Featured Banner */}
      {page === 1 && search === "" && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Featured Picks</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {INTERNSHIPS.filter((i) => i.featured).map((i) => (
              <div key={i.id} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.04] p-3">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${i.color} text-sm font-bold text-white`}>
                  {i.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">{i.role}</p>
                  <p className="text-xs text-slate-400">{i.company} · {i.stipend}/mo</p>
                </div>
                <span className="hidden rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400 sm:block">
                  {i.match}% match
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Search className="h-12 w-12 text-slate-700 mb-4" />
          <p className="text-lg font-semibold text-white">No results found</p>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="mt-4 text-sm text-blue-400 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((i) => (
            <div
              key={i.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.05] bg-[#111827] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Match badge */}
              <span className="absolute right-4 top-4 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/20">
                {i.match}% match
              </span>

              {/* Header */}
              <div className="flex items-start gap-3 pr-16">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${i.color} text-sm font-bold text-white shadow-lg`}>
                  {i.logo}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white leading-tight">{i.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Building2 className="h-3 w-3" />{i.company}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{i.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{i.stipend}/mo</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{i.duration}</span>
              </div>

              {/* Type + Deadline */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[i.type]}`}>{i.type}</span>
                <span className="text-xs text-slate-600">Closes {i.deadline}</span>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {i.tags.map((t) => (
                  <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">{t}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-500">
                  Apply Now
                </button>
                <button
                  onClick={() => toggleSave(i.id)}
                  className={`rounded-xl border px-3 py-2 transition-all ${savedIds.includes(i.id) ? "border-blue-500/40 bg-blue-500/15 text-blue-400" : "border-white/10 text-slate-500 hover:text-white"}`}
                  title={savedIds.includes(i.id) ? "Unsave" : "Save"}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${savedIds.includes(i.id) ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          {Array.from({ length: totalPages }, (_, k) => k + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-xl text-sm font-medium transition-all ${n === page ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-30"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseInternships;
