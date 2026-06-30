import Card from "@/components/ui/Card";
import { Users } from "lucide-react";

const AdminUsers = () => (
  <div className="container-page py-10 page-enter">
    <h1 className="mb-2 text-2xl font-bold text-white">Manage Users</h1>
    <p className="mb-8 text-surface-muted">View, activate, and deactivate platform users.</p>
    <Card>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <Users className="h-10 w-10 text-brand-400" />
        <h2 className="text-lg font-semibold text-white">User management table coming soon</h2>
        <p className="text-sm text-surface-muted max-w-sm">Full user listing with search and filters will be built in the Admin feature phase.</p>
      </div>
    </Card>
  </div>
);

export default AdminUsers;
