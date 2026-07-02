import { useState } from "react";
import { Bookmark, MapPin, DollarSign, Clock, Building2, X, Search, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SAVED = [
  { id: 1,  company: "Google",   logo: "G", color: "from-red-500 to-yellow-400",   role: "SWE Intern",          location: "Bangalore", stipend: "₹80,000", type: "Hybrid",   deadline: "Jul 15", tags: ["React","GCP","Node.js"],   match: 94 },
  { id: 2,  company: "PhonePe",  logo: "P", color: "from-purple-600 to-violet-500","role": "iOS Intern",        location: "Remote",    stipend: "₹50,000", type: "Remote",   deadline: "Aug 10", tags: ["Swift","iOS","Firebase"],  match: 80 },
  { id: 3,  company: "Razorpay", logo: "R", color: "from-blue-700 to-indigo-600",  role: "Full Stack Intern",   location: "Bangalore", stipend: "₹60,000", type: "Hybrid",   deadline: "Aug 1",  tags: ["React","Django","SQL"],    match: 91 },
  { id: 4,  company: "Zerodha",  logo: "Z", color: "from-sky-600 to-cyan-500",     role: "Frontend Intern",     location: "Remote",    stipend: "₹35,000", type: "Remote",   deadline: "Sep 5",  tags: ["React","TypeScript"],     match: 86 },
];

const TYPE_COLORS = {
  Remote: "bg-purple-500/15 text-purple-400",
  Hybrid: "bg-cyan-500/15 text-cyan-400",
  "On-site": "bg-amber-500/15 text-amber-400",
};

const SavedInternships = () => {
  const [saved, setSaved] = useState(SAVED);
  const [search, setSearch] = useState("");

  const remove = (id) => setSaved((p) => p.filter((s) => s.id !== id));
  const filtered = saved.filter((s) =>
    !search || s.role.toLowerCase().includes(search.toLowerCase()) || s.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
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
          <p className="text-lg font-semibold text-white">No saved internships</p>
          <p className="text-sm text-slate-500 mt-1">Browse and save internships to review them later</p>
          <Link to="/student/recommended" className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
            Browse Internships
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <div key={s.id} className="group relative rounded-2xl border border-white/[0.05] bg-[#111827] p-5 transition-all hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-lg">
              <button onClick={() => remove(s.id)} className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition-all">
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-start gap-3 pr-6">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-sm font-bold text-white shadow`}>{s.logo}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm leading-tight">{s.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.company}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{s.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{s.stipend}/mo</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[s.type]}`}>{s.type}</span>
                <span className="text-xs text-slate-600">Closes {s.deadline}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {s.tags.map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">{t}</span>)}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-all">Apply</button>
                <div className="flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 text-xs font-bold text-emerald-400">{s.match}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedInternships;
