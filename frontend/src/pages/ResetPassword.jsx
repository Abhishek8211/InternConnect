import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { authService } from "@/services/auth.service";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password", "");
  const isTokenMissing = useMemo(() => !token, [token]);

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      await authService.resetPassword({ token, password: data.password });
      navigate("/login");
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          "Your password could not be reset. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-md animate-fade-in">
        <Card className="p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-white">
              Set a new password
            </h1>
            <p className="text-sm text-surface-muted">
              Choose a strong password for your account.
            </p>
          </div>

          {isTokenMissing ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              The reset link is missing or invalid. Please request a new one.
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id="reset-password"
                label="New password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                leftIcon={Lock}
                autoComplete="new-password"
                rightIcon={showPassword ? EyeOff : Eye}
                rightIconProps={{
                  onClick: () => setShowPassword((prev) => !prev),
                  "aria-label": showPassword
                    ? "Hide password"
                    : "Show password",
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

              <Input
                id="reset-confirm-password"
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                leftIcon={Lock}
                autoComplete="new-password"
                rightIcon={showConfirmPassword ? EyeOff : Eye}
                rightIconProps={{
                  onClick: () => setShowConfirmPassword((prev) => !prev),
                  "aria-label": showConfirmPassword
                    ? "Hide password"
                    : "Show password",
                }}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
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
                Reset password
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-surface-muted">
            <Link
              to="/login"
              className="font-semibold text-brand-400 hover:text-brand-300"
            >
              Back to sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
