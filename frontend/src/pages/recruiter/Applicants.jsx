import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import {
  Search, Filter, Star, CheckCircle2, Clock, Eye,
  XCircle, ChevronDown, Download, Mail, Phone, User,
  GraduationCap, Code2, ArrowUpRight, MoreHorizontal,
} from "lucide-react";

const APPLICANTS = [
  { id: 1,  name: "Arjun Sharma",    college: "IIT Delhi",    cgpa: "8.9", role: "Full Stack Developer Intern", skills: ["React","Node.js","MongoDB"],     status: "shortlisted", appliedAt: "2 hrs ago",  email: "arjun@example.com", phone: "+91 98765 43210" },
  { id: 2,  name: "Priya Patel",     college: "NIT Trichy",   cgpa: "9.2", role: "Data Science Intern",         skills: ["Python","ML","TensorFlow"],     status: "pending",     appliedAt: "5 hrs ago",  email: "priya@example.com", phone: "+91 87654 32109" },
  { id: 3,  name: "Rohit Kumar",     college: "BITS Pilani",  cgpa: "8.4", role: "Product Management Intern",   skills: ["Figma","Analytics","SQL"],      status: "reviewing",   appliedAt: "1 day ago",  email: "rohit@example.com", phone: "+91 76543 21098" },
  { id: 4,  name: "Sneha Reddy",     college: "VIT Vellore",  cgpa: "8.7", role: "Full Stack Developer Intern", skills: ["Vue.js","Django","PostgreSQL"],  status: "rejected",    appliedAt: "2 days ago", email: "sneha@example.com", phone: "+91 65432 10987" },
  { id: 5,  name: "Karan Mehta",     college: "DTU Delhi",    cgpa: "8.1", role: "Data Science Intern",         skills: ["Python","R","Tableau"],          status: "shortlisted", appliedAt: "3 days ago", email: "karan@example.com", phone: "+91 54321 09876" },
  { id: 6,  name: "Ananya Singh",    college: "IIIT Hyderabad",cgpa: "9.0",role: "UI/UX Design Intern",         skills: ["Figma","Framer","CSS"],          status: "pending",     appliedAt: "3 days ago", email: "ananya@example.com",phone: "+91 43210 98765" },
  { id: 7,  name: "Vikram Nair",     college: "IIT Bombay",   cgpa: "8.6", role: "Full Stack Developer Intern", skills: ["React","TypeScript","AWS"],      status: "accepted",    appliedAt: "4 days ago", email: "vikram@example.com", phone: "+91 32109 87654" },
  { id: 8,  name: "Divya Krishnan",  college: "IIT Madras",   cgpa: "9.1", role: "Data Science Intern",         skills: ["PyTorch","NLP","Python"],        status: "reviewing",   appliedAt: "5 days ago", email: "divya@example.com",  phone: "+91 21098 76543" },
];

const STATUS_CFG = {
  pending:     { label: "Pending",     class: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",   icon: Clock        },
  reviewing:   { label: "Reviewing",   class: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",     icon: Eye          },
  shortlisted: { label: "Shortlisted", class: "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25",     icon: Star         },
  accepted:    { label: "Accepted",    class: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25", icon: CheckCircle2 },
  rejected:    { label: "Rejected",    class: "bg-red-500/15 text-red-400 ring-1 ring-red-500/25",         icon: XCircle      },
};

const Applicants = () => {
  const [apps, setApps]     = useState(APPLICANTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSel]  = useState(null);

  const filtered = apps.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    const q = search.toLowerCase();
    return !q || a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.college.toLowerCase().includes(q);
  });

  const updateStatus = (id, status) => setApps((p) => p.map((a) => a.id === id ? { ...a, status } : a));
  const counts = { all: apps.length, pending: apps.filter(a=>a.status==="pending").length, shortlisted: apps.filter(a=>a.status==="shortlisted").length, accepted: apps.filter(a=>a.status==="accepted").length };

  const selectedApp = apps.find((a) => a.id === selected);

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
        {[{ k:"all",label:"Total",v:counts.all,c:"text-white"},{k:"pending",label:"Pending",v:counts.pending,c:"text-amber-400"},{k:"shortlisted",label:"Shortlisted",v:counts.shortlisted,c:"text-cyan-400"},{k:"accepted",label:"Accepted",v:counts.accepted,c:"text-emerald-400"}].map(({k,label,v,c})=>(
          <button key={k} onClick={()=>setFilter(k)} className={`rounded-2xl border p-4 text-left transition-all ${filter===k?"border-violet-500/30 bg-violet-500/10":"border-white/[0.05] bg-[#111827] hover:bg-white/[0.03]"}`}>
            <p className={`text-xl font-bold ${c}`}>{v}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, role, college…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#111827] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50" />
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 min-w-0 space-y-3">
          {filtered.map((a) => {
            const cfg = STATUS_CFG[a.status];
            const SI = cfg.icon;
            return (
              <div key={a.id} onClick={() => setSel(selected===a.id?null:a.id)}
                className={`group cursor-pointer flex items-center gap-4 rounded-2xl border p-4 transition-all ${selected===a.id?"border-violet-500/30 bg-violet-500/5":"border-white/[0.05] bg-[#111827] hover:border-white/10"}`}>
                <Avatar name={a.name} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{a.name}</p>
                    <span className="hidden rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-slate-400 sm:block">CGPA {a.cgpa}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{a.role}</p>
                  <p className="text-xs text-slate-600">{a.college} · {a.appliedAt}</p>
                  <div className="mt-1.5 hidden flex-wrap gap-1 sm:flex">
                    {a.skills.map((s)=><span key={s} className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-xs text-violet-400">{s}</span>)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.class}`}>
                    <SI className="h-3 w-3" />{cfg.label}
                  </span>
                  <div className="flex gap-1.5">
                    <button onClick={e=>{e.stopPropagation();updateStatus(a.id,"shortlisted")}}
                      className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400 hover:bg-cyan-500/20 transition-all">Shortlist</button>
                    <button onClick={e=>{e.stopPropagation();updateStatus(a.id,"rejected")}}
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
              <Avatar name={selectedApp.name} size="xl" />
              <h3 className="mt-3 font-bold text-white">{selectedApp.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedApp.college}</p>
              <p className="text-xs text-slate-500">CGPA: {selectedApp.cgpa}</p>
              <div className="mt-2 flex gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CFG[selectedApp.status].class}`}>{STATUS_CFG[selectedApp.status].label}</span>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400"><Mail className="h-3.5 w-3.5 text-slate-600" />{selectedApp.email}</div>
              <div className="flex items-center gap-2 text-slate-400"><Phone className="h-3.5 w-3.5 text-slate-600" />{selectedApp.phone}</div>
              <div className="flex items-center gap-2 text-slate-400"><User className="h-3.5 w-3.5 text-slate-600" />{selectedApp.role}</div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedApp.skills.map(s=><span key={s} className="rounded-xl bg-violet-500/10 px-2 py-0.5 text-xs text-violet-400">{s}</span>)}
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <button onClick={()=>updateStatus(selectedApp.id,"shortlisted")} className="w-full rounded-xl bg-cyan-600/20 py-2 text-xs font-semibold text-cyan-400 ring-1 ring-cyan-500/30 hover:bg-cyan-600/30 transition-all">Shortlist</button>
              <button onClick={()=>updateStatus(selectedApp.id,"accepted")} className="w-full rounded-xl bg-emerald-600/20 py-2 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-600/30 transition-all">Accept</button>
              <button onClick={()=>updateStatus(selectedApp.id,"rejected")} className="w-full rounded-xl bg-red-500/10 py-2 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 hover:bg-red-500/20 transition-all">Reject</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
