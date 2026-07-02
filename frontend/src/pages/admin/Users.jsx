import { useState, useEffect, useCallback } from "react";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import {
  Search, CheckCircle2, XCircle, Clock, Shield, GraduationCap,
  UserCheck, Ban, Eye, Loader2, Users,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { userService } from "@/services/user.service";

const ROLE_COLORS = {
  student:   "bg-blue-500/15 text-blue-400",
  recruiter: "bg-violet-500/15 text-violet-400",
  admin:     "bg-rose-500/15 text-rose-400",
};

const AdminUsers = () => {
  const [users, setUsers]         = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [search, setSearch]       = useState("");
  const [roleFilter, setRole]     = useState("all");
  const [page, setPage]           = useState(1);
  const [togglingId, setToggling] = useState(null);
  const LIMIT = 20;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await userService.getAllUsers({ page, limit: LIMIT });
      const d = res.data.data;
      setUsers(d.users || []);
      setTotal(d.total || 0);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleToggleStatus = async (userId) => {
    try {
      setToggling(userId);
      const res = await userService.toggleUserStatus(userId);
      const { isActive } = res.data.data;
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, isActive } : u));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    } finally {
      setToggling(null);
    }
  };

  // ── Client-side filter on current page ────────────────────────
  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {
    all:       users.length,
    student:   users.filter(u => u.role === "student").length,
    recruiter: users.filter(u => u.role === "recruiter").length,
    admin:     users.filter(u => u.role === "admin").length,
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">All Users</h1>
          <p className="mt-1 text-sm text-slate-400">{total} total users on the platform</p>
        </div>
      </div>

      {/* Role filter tabs */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "all",       l: "All Users",  v: total,          c: "text-white" },
          { k: "student",   l: "Students",   v: counts.student,   c: "text-blue-400" },
          { k: "recruiter", l: "Recruiters", v: counts.recruiter, c: "text-violet-400" },
          { k: "admin",     l: "Admins",     v: counts.admin,     c: "text-rose-400" },
        ].map(({ k, l, v, c }) => (
          <button
            key={k}
            onClick={() => setRole(k)}
            className={`rounded-2xl border p-4 text-left transition-all ${roleFilter === k ? "border-rose-500/30 bg-rose-500/10" : "border-white/[0.05] bg-[#0d0f1a] hover:bg-white/[0.03]"}`}
          >
            <p className={`text-xl font-bold ${c}`}>{v}</p>
            <p className="text-xs text-slate-500">{l}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#0d0f1a] pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-rose-500/50"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-lg font-semibold text-white">Failed to load users</p>
          <p className="text-sm text-slate-400">{error}</p>
          <button onClick={fetchUsers} className="mt-2 text-sm text-rose-400 hover:underline">Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl border border-white/[0.05] bg-[#0d0f1a]">
          <Users className="h-12 w-12 text-slate-700" />
          <p className="text-lg font-semibold text-white">No users found</p>
          <p className="text-sm text-slate-500">{users.length === 0 ? "No users registered yet." : "Try a different search or filter."}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {["User", "Role", "Joined", "Status", "Verified", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 first:pl-6">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filtered.map((u) => (
                  <tr key={u._id} className="group transition-colors hover:bg-white/[0.02]">
                    {/* User info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={u.avatar?.url} name={u.name} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-white">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${ROLE_COLORS[u.role] || ""}`}>
                        {u.role}
                      </span>
                    </td>
                    {/* Joined */}
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}
                    </td>
                    {/* Active status */}
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                        {u.isActive ? "Active" : "Suspended"}
                      </span>
                    </td>
                    {/* Verified */}
                    <td className="px-5 py-4">
                      {u.isVerified
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        : <Clock className="h-4 w-4 text-amber-400" />}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(u._id)}
                        disabled={togglingId === u._id || u.role === "admin"}
                        title={u.role === "admin" ? "Cannot modify admin accounts" : u.isActive ? "Suspend user" : "Activate user"}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-40 ${
                          u.isActive
                            ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                      >
                        {togglingId === u._id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : u.isActive ? (
                          <><Ban className="h-3 w-3" /> Suspend</>
                        ) : (
                          <><UserCheck className="h-3 w-3" /> Activate</>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {total > LIMIT && (
            <div className="flex items-center justify-between border-t border-white/[0.05] px-6 py-3">
              <p className="text-xs text-slate-500">
                Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, total)} of {total}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-400 hover:text-white disabled:opacity-30"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * LIMIT >= total}
                  className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-400 hover:text-white disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
