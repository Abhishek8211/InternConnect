import { Link } from "react-router-dom";
import { User, Mail, Lock, Briefcase, GraduationCap } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

/**
 * Register page — form stub.
 * Full logic (form state, role selection, validation, API call) will be added in the Auth feature phase.
 */
const Register = () => {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16 px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-accent-500/10 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <Card className="p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-white">Create your account</h1>
            <p className="text-sm text-surface-muted">Join thousands of students and recruiters</p>
          </div>

          {/* Role selector */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            {[
              { role: "student",   Icon: GraduationCap, label: "I'm a Student" },
              { role: "recruiter", Icon: Briefcase,     label: "I'm a Recruiter" },
            ].map(({ role, Icon, label }) => (
              <button
                key={role}
                type="button"
                id={`role-${role}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-surface-border bg-surface-card/60 p-4 text-sm font-medium text-surface-muted transition-all hover:border-brand-500/50 hover:text-white aria-pressed:border-brand-500 aria-pressed:bg-brand-500/15 aria-pressed:text-brand-300"
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>

          <form className="flex flex-col gap-4">
            <Input id="register-name"     label="Full Name"  type="text"     placeholder="Abhishek Kumar" leftIcon={User} autoComplete="name" />
            <Input id="register-email"    label="Email"      type="email"    placeholder="you@example.com" leftIcon={Mail} autoComplete="email" />
            <Input id="register-password" label="Password"   type="password" placeholder="Min. 8 characters" leftIcon={Lock} autoComplete="new-password" />

            <Button type="submit" variant="gradient" fullWidth size="lg" className="mt-2">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-surface-muted">
            By signing up you agree to our{" "}
            <Link to="#" className="text-brand-400 hover:underline">Terms</Link>{" "}
            and{" "}
            <Link to="#" className="text-brand-400 hover:underline">Privacy Policy</Link>.
          </p>

          <p className="mt-4 text-center text-sm text-surface-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-400 hover:text-brand-300">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
