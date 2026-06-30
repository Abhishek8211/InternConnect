import Card from "@/components/ui/Card";
import { FileText } from "lucide-react";

const MyApplications = () => (
  <div className="container-page py-10 page-enter">
    <h1 className="mb-2 text-2xl font-bold text-white">My Applications</h1>
    <p className="mb-8 text-surface-muted">Track the status of all your internship applications.</p>
    <Card>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <FileText className="h-10 w-10 text-brand-400" />
        <h2 className="text-lg font-semibold text-white">No applications yet</h2>
        <p className="text-sm text-surface-muted max-w-sm">When you apply to internships, they'll appear here with real-time status updates.</p>
      </div>
    </Card>
  </div>
);

export default MyApplications;
