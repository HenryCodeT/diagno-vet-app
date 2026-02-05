"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(t("errors.invalidCredentials"));
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch {
      setError(t("errors.invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch {
      setError(t("errors.invalidCredentials"));
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-10 to-primary-20">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-soft">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-xl font-bold text-font-primary">
            {tCommon("appName")}
          </span>
        </div>
        <LanguageSwitcher />
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-medium p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-font-primary mb-2">
                {t("title")}
              </h1>
              <p className="text-font-tertiary">{t("description")}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-error-10 border border-error-40 rounded-lg">
                <p className="text-sm text-error-80">{error}</p>
              </div>
            )}

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-border-secondary rounded-lg hover:bg-neutral-10 focus:ring-4 focus:ring-neutral-20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-font-secondary font-medium">
                {isGoogleLoading ? tCommon("loading") : t("googleButton")}
              </span>
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-secondary"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-font-tertiary">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleCredentialsLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-font-secondary mb-2"
                >
                  {t("emailLabel")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-60" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("emailPlaceholder")}
                    className="block w-full pl-10 pr-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-font-secondary mb-2"
                >
                  {t("passwordLabel")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder={t("passwordPlaceholder")}
                    className="block w-full pl-10 pr-12 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-neutral-60 hover:text-neutral-80" />
                    ) : (
                      <Eye className="h-5 w-5 text-neutral-60 hover:text-neutral-80" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData({ ...formData, rememberMe: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-border-secondary text-primary-60 focus:ring-primary-60"
                  />
                  <span className="text-sm text-font-tertiary">
                    {t("rememberMe")}
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-font-interactive hover:text-font-hover font-medium"
                >
                  {t("forgotPassword")}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 focus:ring-4 focus:ring-primary-40/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("submitting") : t("submitButton")}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-font-tertiary">
              {t("noAccount")}{" "}
              <Link
                href="/register"
                className="text-font-interactive hover:text-font-hover font-medium"
              >
                {t("signUp")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
