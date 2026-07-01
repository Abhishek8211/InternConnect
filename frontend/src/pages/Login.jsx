import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      const user = await login({
        email: data.email.trim(),
        password: data.password,
      });

      const redirectPath =
        user.role === "recruiter"
          ? "/recruiter/dashboard"
          : user.role === "admin"
            ? "/admin/dashboard"
            : "/student/dashboard";

      navigate(redirectPath);
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "Unable to sign in. Please try again.",
      );
    }
  };

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
            <p className="text-sm text-surface-muted">
              Sign in to your InternConnect account
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="login-email"
              label="Email address"
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
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={Lock}
              autoComplete="current-password"
              rightIcon={showPassword ? EyeOff : Eye}
              rightIconProps={{
                onClick: () => setShowPassword((prev) => !prev),
                "aria-label": showPassword ? "Hide password" : "Show password",
              }}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            {submitError && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {submitError}
              </p>
            )}

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-brand-400 hover:text-brand-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="gradient"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </form>

          <div className="divider mt-6">or</div>

          <p className="mt-6 text-center text-sm text-surface-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand-400 hover:text-brand-300 transition-colors"
            >
              Create one free
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
