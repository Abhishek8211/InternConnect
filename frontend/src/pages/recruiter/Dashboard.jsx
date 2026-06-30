import { useAuth } from "@/hooks/useAuth";
import Card from "@/components/ui/Card";
import { PlusCircle, List, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const stats = [
    { label: "Active Listings",  value: "0", icon: List,       color: "text-brand-400" },
    { label: "Total Applicants", value: "0", icon: Users,      color: "text-accent-400" },
    { label: "Hired",            value: "0", icon: TrendingUp, color: "text-emerald-400" },
  ];

  return (
    <div className="container-page py-10 page-enter">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Recruiter Dashboard</h1>
          <p className="text-surface-muted">Manage your internship listings and applicants.</p>
        </div>
        <Button as={Link} to="/recruiter/post" variant="gradient" size="md">
          <PlusCircle className="h-4 w-4" /> Post Internship
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} hover>
            <Icon className={`mb-3 h-6 w-6 ${color}`} />
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-surface-muted">{label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-4 text-base font-semibold text-white">Recent Applications</h2>
        <p className="text-sm text-surface-muted">Applications will appear here once students apply to your listings.</p>
      </Card>
    </div>
  );
};

export default RecruiterDashboard;
