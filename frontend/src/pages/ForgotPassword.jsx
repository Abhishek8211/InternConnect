import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { authService } from "@/services/auth.service";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      await authService.forgotPassword({ email: data.email.trim() });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          "We couldn't send the reset instructions right now.",
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-md animate-fade-in">
        <Card className="p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-white">
              Forgot password?
            </h1>
            <p className="text-sm text-surface-muted">
              Enter your email and we’ll send you a reset link.
            </p>
          </div>

          {submitted ? (
            <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              <p>
                If an account exists for that email, we’ve sent reset
                instructions.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-medium text-brand-400 hover:text-brand-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id="forgot-email"
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

              {submitError && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                variant="gradient"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
              >
                Send reset link
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-surface-muted">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-brand-400 hover:text-brand-300"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
