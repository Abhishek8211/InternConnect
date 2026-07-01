import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Briefcase, GraduationCap, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      const user = await registerUser({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        role,
      });

      const redirectPath =
        user.role === "recruiter"
          ? "/recruiter/dashboard"
          : user.role === "admin"
            ? "/admin/dashboard"
            : "/student/dashboard";

      navigate(redirectPath);
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Unable to create your account right now.");
    }
  };

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
              { roleValue: "student", Icon: GraduationCap, label: "I'm a Student" },
              { roleValue: "recruiter", Icon: Briefcase, label: "I'm a Recruiter" },
            ].map(({ roleValue, Icon, label }) => (
              <button
                key={roleValue}
                type="button"
                id={`role-${roleValue}`}
                aria-pressed={role === roleValue}
                onClick={() => setRole(roleValue)}
                className="flex flex-col items-center gap-2 rounded-xl border border-surface-border bg-surface-card/60 p-4 text-sm font-medium text-surface-muted transition-all hover:border-brand-500/50 hover:text-white aria-pressed:border-brand-500 aria-pressed:bg-brand-500/15 aria-pressed:text-brand-300"
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="register-name"
              label="Full Name"
              type="text"
              placeholder="Abhishek Kumar"
              leftIcon={User}
              autoComplete="name"
              error={errors.name?.message}
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
            />
            <Input
              id="register-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={Mail}
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <Input
              id="register-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              leftIcon={Lock}
              autoComplete="new-password"
              rightIcon={showPassword ? EyeOff : Eye}
              rightIconProps={{
                onClick: () => setShowPassword((prev) => !prev),
                "aria-label": showPassword ? "Hide password" : "Show password",
              }}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
            />
            <Input
              id="register-confirm-password"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              leftIcon={Lock}
              autoComplete="new-password"
              rightIcon={showConfirmPassword ? EyeOff : Eye}
              rightIconProps={{
                onClick: () => setShowConfirmPassword((prev) => !prev),
                "aria-label": showConfirmPassword ? "Hide password" : "Show password",
              }}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />

            {submitError && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {submitError}
              </p>
            )}

            <Button type="submit" variant="gradient" fullWidth size="lg" className="mt-2" isLoading={isSubmitting}>
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
