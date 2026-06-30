import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

/**
 * Login page — form stub.
 * Full logic (form state, validation, API call) will be added in the Auth feature phase.
 */
const Login = () => {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16 px-4">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-brand-500/10 blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-accent-500/10 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <Card className="p-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-surface-muted">Sign in to your InternConnect account</p>
          </div>

          <form className="flex flex-col gap-5">
            <Input
              id="login-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              leftIcon={Mail}
              autoComplete="email"
            />
            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={Lock}
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-brand-400 hover:text-brand-300">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="gradient" fullWidth size="lg">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </form>

          <div className="divider mt-6">or</div>

          <p className="mt-6 text-center text-sm text-surface-muted">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-brand-400 hover:text-brand-300 transition-colors">
              Create one free
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
