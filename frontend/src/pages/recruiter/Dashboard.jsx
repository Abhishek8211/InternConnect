import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  Briefcase,
  CheckCircle2,
  Users,
  Star,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  ChevronRight,
  RefreshCw,
  Building2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { userService } from "@/services/user.service";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await userService.getRecruiterDashboard();
      setStats(res.data.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <div className="flex justify-center py-24"><Spinner size="lg" /></div>;

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-lg font-semibold text-white">Could not load dashboard</p>
        <p className="text-sm text-slate-400">{error}</p>
        <button onClick={fetchStats} className="mt-2 rounded-xl bg-violet-600/20 px-4 py-2 text-sm font-medium text-violet-400 ring-1 ring-violet-500/30 hover:bg-violet-600/30">
          Retry
        </button>
      </div>
    );
  }

  const { totalListings, activeListings, totalApplications, shortlisted, hired, recentApplications } = stats;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">Here's what's happening with your internship listings today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <Link
            to="/recruiter/post"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
          >
            <Plus className="h-4 w-4" /> Post Internship
          </Link>
        </div>
      </div>

      {/* Main Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Listings", val: activeListings, icon: Briefcase, color: "text-violet-400", bg: "bg-violet-500/20", trend: totalListings + " total" },
          { label: "Total Applications", val: totalApplications, icon: Users, color: "text-blue-400", bg: "bg-blue-500/20", trend: "Across all listings" },
          { label: "Shortlisted", val: shortlisted, icon: Star, color: "text-cyan-400", bg: "bg-cyan-500/20", trend: "Pending review" },
          { label: "Hired", val: hired, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/20", trend: "Accepted offers" },
        ].map((s, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{s.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-white">{s.val}</p>
              </div>
              <div className={`rounded-xl p-2.5 ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications list */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">Recent Applications</h2>
              <p className="mt-0.5 text-xs text-slate-500">Latest candidates who applied to your listings</p>
            </div>
            <Link to="/recruiter/applicants" className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplications?.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <Users className="h-10 w-10 text-slate-700" />
                <p className="text-sm text-slate-500">No applications yet</p>
              </div>
            ) : (
              recentApplications?.map((app) => (
                <div key={app._id} className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-all hover:border-violet-500/20 hover:bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <Avatar src={app.applicant?.avatar?.url} name={app.applicant?.name} size="md" />
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">{app.applicant?.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{app.internship?.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>Applied {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/recruiter/applicants`} className="hidden rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white sm:block">
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="rounded-2xl border border-white/[0.05] bg-[#0d0f1a] p-6">
          <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/recruiter/post" className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-500/20 p-2 text-violet-400"><Plus className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-slate-300">Post new listing</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500" />
            </Link>
            <Link to="/recruiter/listings" className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400"><Briefcase className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-slate-300">Manage listings</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500" />
            </Link>
            <Link to="/recruiter/company" className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400"><Building2 className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-slate-300">Update company profile</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500" />
            </Link>
          </div>
          
          <div className="mt-8 rounded-xl bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 p-4 ring-1 ring-violet-500/20">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" /> Tip of the day
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Listings with detailed requirements and a clear stipend range receive 40% more qualified applicants. 
              Keep your listings updated to attract top talent!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
