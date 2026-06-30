import Card from "@/components/ui/Card";
import { Users, Briefcase, Building2, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users",       value: "—", icon: Users,     color: "text-brand-400" },
    { label: "Internships",       value: "—", icon: Briefcase, color: "text-accent-400" },
    { label: "Companies",         value: "—", icon: Building2, color: "text-emerald-400" },
    { label: "Applications",      value: "—", icon: BarChart3, color: "text-amber-400" },
  ];

  return (
    <div className="container-page py-10 page-enter">
      <h1 className="mb-2 text-2xl font-bold text-white">Admin Dashboard</h1>
      <p className="mb-8 text-surface-muted">Overview of the InternConnect platform.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} hover>
            <Icon className={`mb-3 h-6 w-6 ${color}`} />
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-surface-muted">{label}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <h2 className="mb-4 text-base font-semibold text-white">Platform Stats</h2>
        <p className="text-sm text-surface-muted">Live stats and charts will be connected to the API in the next phase.</p>
      </Card>
    </div>
  );
};

export default AdminDashboard;
