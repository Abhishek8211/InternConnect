import { useAuth } from "@/hooks/useAuth";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";

const StudentProfile = () => {
  const { user } = useAuth();
  return (
    <div className="container-page py-10 page-enter">
      <h1 className="mb-8 text-2xl font-bold text-white">My Profile</h1>
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Avatar src={user?.avatar?.url} name={user?.name} size="xl" />
          <div>
            <p className="text-lg font-semibold text-white">{user?.name}</p>
            <p className="text-sm text-surface-muted">{user?.email}</p>
            <span className="badge-brand mt-1 capitalize">{user?.role}</span>
          </div>
        </div>
        <p className="text-sm text-surface-muted">Full profile editing UI will be built in the next phase.</p>
      </Card>
    </div>
  );
};

export default StudentProfile;
