import { useAuth } from "@/hooks/useAuth";
import Card from "@/components/ui/Card";
import { Briefcase, FileText, Star, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Applications",    value: "0",  icon: FileText,  color: "text-brand-400" },
    { label: "Saved Jobs",      value: "0",  icon: Star,      color: "text-accent-400" },
    { label: "Interviews",      value: "0",  icon: Briefcase, color: "text-emerald-400" },
    { label: "Profile Views",   value: "0",  icon: TrendingUp, color: "text-amber-400" },
  ];

  return (
    <div className="container-page py-10 page-enter">
      <h1 className="mb-2 text-2xl font-bold text-white">
        Welcome back, <span className="gradient-text">{user?.name?.split(" ")[0]}</span> 👋
      </h1>
      <p className="mb-8 text-surface-muted">Here's what's happening with your internship search.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} hover>
            <Icon className={`mb-3 h-6 w-6 ${color}`} />
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-surface-muted">{label}</p>
          </Card>
        ))}
      </div>

      {/* Placeholder for recent applications / recommended internships */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-base font-semibold text-white">Recent Applications</h2>
          <p className="text-sm text-surface-muted">No applications yet. Start browsing internships!</p>
        </Card>
        <Card>
          <h2 className="mb-4 text-base font-semibold text-white">Recommended for You</h2>
          <p className="text-sm text-surface-muted">Complete your profile to unlock AI recommendations.</p>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
