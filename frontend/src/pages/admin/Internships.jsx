import Card from "@/components/ui/Card";
import { Briefcase } from "lucide-react";

const AdminInternships = () => (
  <div className="container-page py-10 page-enter">
    <h1 className="mb-2 text-2xl font-bold text-white">Manage Internships</h1>
    <p className="mb-8 text-surface-muted">Feature, hide, or remove internship listings.</p>
    <Card>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <Briefcase className="h-10 w-10 text-brand-400" />
        <h2 className="text-lg font-semibold text-white">Internship moderation coming soon</h2>
        <p className="text-sm text-surface-muted max-w-sm">Full internship moderation UI will be built in the Admin feature phase.</p>
      </div>
    </Card>
  </div>
);

export default AdminInternships;
