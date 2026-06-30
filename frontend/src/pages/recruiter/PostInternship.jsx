import Card from "@/components/ui/Card";
import { PlusCircle } from "lucide-react";

const PostInternship = () => (
  <div className="container-page py-10 page-enter">
    <h1 className="mb-2 text-2xl font-bold text-white">Post an Internship</h1>
    <p className="mb-8 text-surface-muted">Create a new listing to attract top student talent.</p>
    <Card>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <PlusCircle className="h-10 w-10 text-brand-400" />
        <h2 className="text-lg font-semibold text-white">Internship form coming soon</h2>
        <p className="text-sm text-surface-muted max-w-sm">The full multi-step internship creation form will be built in the next phase.</p>
      </div>
    </Card>
  </div>
);

export default PostInternship;
