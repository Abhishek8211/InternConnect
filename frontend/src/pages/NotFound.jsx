import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-brand-500/15 blur-[80px]" />
      </div>

      <p className="gradient-text text-8xl font-black tracking-tight">404</p>
      <h1 className="text-2xl font-bold text-white">Page not found</h1>
      <p className="max-w-sm text-surface-muted">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-3">
        <Button as={Link} to="/" variant="primary" size="md">
          <Home className="h-4 w-4" />
          Go Home
        </Button>
        <Button onClick={() => window.history.back()} variant="ghost" size="md">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
