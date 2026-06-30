import Card from "@/components/ui/Card";
import { List } from "lucide-react";

const ManageListings = () => (
  <div className="container-page py-10 page-enter">
    <h1 className="mb-2 text-2xl font-bold text-white">My Listings</h1>
    <p className="mb-8 text-surface-muted">View and manage all your posted internships.</p>
    <Card>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <List className="h-10 w-10 text-brand-400" />
        <h2 className="text-lg font-semibold text-white">No listings yet</h2>
        <p className="text-sm text-surface-muted max-w-sm">Post your first internship to see it here.</p>
      </div>
    </Card>
  </div>
);

export default ManageListings;
