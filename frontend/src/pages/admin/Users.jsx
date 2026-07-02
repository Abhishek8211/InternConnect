import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, Shield, GraduationCap, Users, Building2, UserCheck, Ban, Eye, Download } from "lucide-react";

const USERS = [
  { id: 1,  name: "Arjun Sharma",    email: "arjun@example.com",   role: "student",   college: "IIT Delhi",    joined: "Jul 1, 2026",   status: "active",   verified: true  },
  { id: 2,  name: "Priya Patel",     email: "priya@example.com",   role: "student",   college: "NIT Trichy",   joined: "Jun 30, 2026",  status: "active",   verified: true  },
  { id: 3,  name: "TechCorp HR",     email: "hr@techcorp.com",     role: "recruiter", college: "TechCorp Ltd", joined: "Jun 28, 2026",  status: "pending",  verified: false },
  { id: 4,  name: "Infosys Talent",  email: "talent@infosys.com",  role: "recruiter", college: "Infosys",      joined: "Jun 25, 2026",  status: "active",   verified: true  },
  { id: 5,  name: "Rohit Kumar",     email: "rohit@example.com",   role: "student",   college: "BITS Pilani",  joined: "Jun 22, 2026",  status: "active",   verified: true  },
  { id: 6,  name: "Sneha Reddy",     college: "VIT Vellore",       email:"sneha@example.com", role:"student",  joined:"Jun 20, 2026",   status:"active",    verified: true  },
  { id: 7,  name: "Karan Mehta",     email: "karan@example.com",   role: "student",   college: "DTU Delhi",    joined: "Jun 18, 2026",  status: "active",   verified: false },
  { id: 8,  name: "Zomato HR",       email: "hr@zomato.com",       role: "recruiter", college: "Zomato",       joined: "Jun 15, 2026",  status: "suspended",verified: true  },
  { id: 9,  name: "Ananya Singh",    email: "ananya@example.com",  role: "student",   college: "IIIT Hyd",     joined: "Jun 10, 2026",  status: "active",   verified: true  },
  { id: 10, name: "Super Admin",     email: "admin@internconnect.com",role:"admin",   college: "InternConnect",joined: "Jan 1, 2026",   status: "active",   verified: true  },
];

const ROLE_COLORS = { student:"bg-blue-500/15 text-blue-400", recruiter:"bg-violet-500/15 text-violet-400", admin:"bg-rose-500/15 text-rose-400" };
const STATUS_COLORS = { active:"bg-emerald-500/15 text-emerald-400", pending:"bg-amber-500/15 text-amber-400", suspended:"bg-red-500/15 text-red-400" };

const AdminUsers = () => {
  const [users, setUsers]     = useState(USERS);
  const [search, setSearch]   = useState("");
  const [roleFilter, setRole] = useState("all");
  const [openMenu, setMenu]   = useState(null);

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const toggleStatus = (id) => setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
  const toggleVerify = (id) => setUsers((p) => p.map((u) => u.id === id ? { ...u, verified: !u.verified } : u));
  const counts = { all: users.length, student: users.filter(u=>u.role==="student").length, recruiter: users.filter(u=>u.role==="recruiter").length, admin: users.filter(u=>u.role==="admin").length };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">All Users</h1>
          <p className="mt-1 text-sm text-slate-400">{users.length} total users on the platform</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all">
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      </div>

      {/* Role filter */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[{k:"all",l:"All Users",v:counts.all,c:"text-white"},{k:"student",l:"Students",v:counts.student,c:"text-blue-400"},{k:"recruiter",l:"Recruiters",v:counts.recruiter,c:"text-violet-400"},{k:"admin",l:"Admins",v:counts.admin,c:"text-rose-400"}].map(({k,l,v,c})=>(
          <button key={k} onClick={()=>setRole(k)} className={`rounded-2xl border p-4 text-left transition-all ${roleFilter===k?"border-rose-500/30 bg-rose-500/10":"border-white/[0.05] bg-[#0d0f1a] hover:bg-white/[0.03]"}`}>
            <p className={`text-xl font-bold ${c}`}>{v}</p><p className="text-xs text-slate-500">{l}</p>
          </button>
        ))}
      </div>

      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#0d0f1a] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-rose-500/50" />
      </div>

      <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["User","Role","Institution","Joined","Status","Verified",""].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 first:pl-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filtered.map((u)=>(
                <tr key={u.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div><p className="text-sm font-semibold text-white">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${ROLE_COLORS[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">{u.college}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{u.joined}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    {u.verified ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Clock className="h-4 w-4 text-amber-400" />}
                  </td>
                  <td className="px-5 py-4 relative">
                    <button onClick={()=>setMenu(openMenu===u.id?null:u.id)} className="rounded-lg p-1.5 text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-slate-300 transition-all">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {openMenu===u.id && (
                      <div className="absolute right-10 top-3 z-20 w-44 rounded-xl border border-white/10 bg-[#1a1c2e] shadow-xl py-1.5">
                        <button className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white"><Eye className="h-3.5 w-3.5" />View Profile</button>
                        <button onClick={()=>{toggleVerify(u.id);setMenu(null)}} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white">
                          {u.verified?<><XCircle className="h-3.5 w-3.5"/>Unverify</>:<><CheckCircle2 className="h-3.5 w-3.5"/>Verify</>}
                        </button>
                        <button onClick={()=>{toggleStatus(u.id);setMenu(null)}} className={`flex w-full items-center gap-2.5 px-4 py-2 text-xs transition-all hover:bg-white/5 ${u.status==="active"?"text-amber-400":"text-emerald-400"}`}>
                          {u.status==="active"?<><Ban className="h-3.5 w-3.5"/>Suspend</>:<><UserCheck className="h-3.5 w-3.5"/>Activate</>}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
