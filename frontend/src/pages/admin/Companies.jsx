import { useState } from "react";
import { Search, MoreHorizontal, CheckCircle2, Star, Eye, Trash2, Building2, MapPin, Users, Globe, Calendar, Shield, XCircle, Clock, Download } from "lucide-react";

const COMPANIES = [
  { id: 1,  name: "Google India",    logo: "G", color: "from-red-500 to-yellow-400",  industry: "Technology",     size: "10,000+",  location: "Bangalore",  internships: 12, applicants: 280, joined: "Jan 5, 2026",  status: "verified",  rating: 4.9 },
  { id: 2,  name: "Microsoft",       logo: "M", color: "from-blue-500 to-cyan-400",   industry: "Technology",     size: "5,000+",   location: "Hyderabad",  internships: 9,  applicants: 215, joined: "Jan 10, 2026", status: "verified",  rating: 4.8 },
  { id: 3,  name: "Razorpay",        logo: "R", color: "from-blue-700 to-indigo-600", industry: "Fintech",        size: "1,000+",   location: "Bangalore",  internships: 7,  applicants: 168, joined: "Feb 1, 2026",  status: "verified",  rating: 4.7 },
  { id: 4,  name: "Zomato",          logo: "Z", color: "from-red-500 to-rose-600",    industry: "Food & Delivery",size: "5,000+",   location: "Gurugram",   internships: 6,  applicants: 142, joined: "Feb 15, 2026", status: "suspended", rating: 4.5 },
  { id: 5,  name: "PhonePe",         logo: "P", color: "from-purple-600 to-violet-500","industry": "Fintech",    size: "2,000+",   location: "Bangalore",  internships: 5,  applicants: 118, joined: "Mar 1, 2026",  status: "pending",   rating: 4.4 },
  { id: 6,  name: "Swiggy",          logo: "S", color: "from-orange-500 to-red-500",  industry: "Food & Delivery",size: "3,000+",   location: "Bangalore",  internships: 4,  applicants: 96,  joined: "Mar 10, 2026", status: "verified",  rating: 4.3 },
  { id: 7,  name: "TechVentures",    logo: "T", color: "from-violet-600 to-purple-500","industry": "Technology", size: "200-500",  location: "Bangalore",  internships: 3,  applicants: 54,  joined: "Apr 1, 2026",  status: "pending",   rating: 0   },
];

const STATUS_CFG = {
  verified:  { label: "Verified",  class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25", icon: CheckCircle2 },
  pending:   { label: "Pending",   class: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",      icon: Clock },
  suspended: { label: "Suspended", class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",           icon: XCircle },
};

const AdminCompanies = () => {
  const [companies, setCompanies] = useState(COMPANIES);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [openMenu, setMenu]       = useState(null);

  const filtered = companies.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
  });

  const verify   = (id) => { setCompanies((p) => p.map((c) => c.id === id ? { ...c, status: "verified" } : c)); setMenu(null); };
  const suspend  = (id) => { setCompanies((p) => p.map((c) => c.id === id ? { ...c, status: "suspended" } : c)); setMenu(null); };
  const remove   = (id) => { setCompanies((p) => p.filter((c) => c.id !== id)); setMenu(null); };
  const counts   = { all: companies.length, verified: companies.filter(c=>c.status==="verified").length, pending: companies.filter(c=>c.status==="pending").length, suspended: companies.filter(c=>c.status==="suspended").length };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <p className="mt-1 text-sm text-slate-400">{companies.length} registered companies</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all">
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[{k:"all",l:"All",v:counts.all,c:"text-white"},{k:"verified",l:"Verified",v:counts.verified,c:"text-emerald-400"},{k:"pending",l:"Pending",v:counts.pending,c:"text-amber-400"},{k:"suspended",l:"Suspended",v:counts.suspended,c:"text-red-400"}].map(({k,l,v,c})=>(
          <button key={k} onClick={()=>setStatus(k)} className={`rounded-2xl border p-4 text-left transition-all ${statusFilter===k?"border-rose-500/30 bg-rose-500/10":"border-white/[0.05] bg-[#0d0f1a] hover:bg-white/[0.03]"}`}>
            <p className={`text-xl font-bold ${c}`}>{v}</p><p className="text-xs text-slate-500">{l}</p>
          </button>
        ))}
      </div>

      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by company or industry…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#0d0f1a] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-rose-500/50" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const cfg = STATUS_CFG[c.status];
          const SI = cfg.icon;
          return (
            <div key={c.id} className="group rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-5 transition-all hover:border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-lg font-bold text-white shadow-lg`}>{c.logo}</div>
                  <div>
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.industry}</p>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={()=>setMenu(openMenu===c.id?null:c.id)} className="rounded-lg p-1.5 text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-slate-300 transition-all">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {openMenu===c.id && (
                    <div className="absolute right-0 top-8 z-20 w-44 rounded-xl border border-white/10 bg-[#1a1c2e] shadow-xl py-1.5">
                      <button className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-all"><Eye className="h-3.5 w-3.5" />View Profile</button>
                      {c.status==="pending" && <button onClick={()=>verify(c.id)} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-emerald-400 hover:bg-emerald-500/10 transition-all"><CheckCircle2 className="h-3.5 w-3.5" />Verify</button>}
                      {c.status!=="suspended" && <button onClick={()=>suspend(c.id)} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-amber-400 hover:bg-amber-500/10 transition-all"><Shield className="h-3.5 w-3.5" />Suspend</button>}
                      <button onClick={()=>remove(c.id)} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="h-3.5 w-3.5" />Remove</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.size} employees</span>
                <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{c.internships} internships</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Joined {c.joined}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.class}`}>
                  <SI className="h-3 w-3" />{cfg.label}
                </span>
                {c.rating > 0 && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                    <Star className="h-3 w-3 fill-current" />{c.rating}
                  </span>
                )}
              </div>

              {c.status === "pending" && (
                <div className="mt-3 flex gap-2 border-t border-white/[0.05] pt-3">
                  <button onClick={()=>verify(c.id)} className="flex-1 rounded-xl bg-emerald-600/15 py-2 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25 hover:bg-emerald-600/25 transition-all">Verify Now</button>
                  <button onClick={()=>suspend(c.id)} className="flex-1 rounded-xl bg-red-500/10 py-2 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 hover:bg-red-500/20 transition-all">Reject</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCompanies;
