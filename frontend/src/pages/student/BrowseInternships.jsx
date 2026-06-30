import Card from "@/components/ui/Card";
import { Search } from "lucide-react";

const BrowseInternships = () => (
  <div className="container-page py-10 page-enter">
    <h1 className="mb-2 text-2xl font-bold text-white">Browse Internships</h1>
    <p className="mb-8 text-surface-muted">Find the perfect internship that matches your skills and goals.</p>
    <Card>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <Search className="h-10 w-10 text-brand-400" />
        <h2 className="text-lg font-semibold text-white">Internship listing coming soon</h2>
        <p className="text-sm text-surface-muted max-w-sm">The full search, filter, and listing UI will be built in the next phase.</p>
      </div>
    </Card>
  </div>
);

export default BrowseInternships;
