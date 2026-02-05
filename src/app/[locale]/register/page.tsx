"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(t("errors.passwordMismatch"));
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t("errors.passwordTooShort"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("errors.generic"));
        return;
      }

      // Redirect to login on success
      router.push("/login");
    } catch {
      setError(t("errors.generic"));
    } finally {
      setIsLoading(false);
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

      {/* Register Form */}
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-font-secondary mb-2"
                  >
                    {t("firstNameLabel")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-60" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder={t("firstNamePlaceholder")}
                      className="block w-full pl-10 pr-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-font-secondary mb-2"
                  >
                    {t("lastNameLabel")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder={t("lastNamePlaceholder")}
                    className="block w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-font-secondary mb-2"
                >
                  {t("emailLabel")} *
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
                  {t("passwordLabel")} *
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-font-secondary mb-2"
                >
                  {t("confirmPasswordLabel")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder={t("confirmPasswordPlaceholder")}
                    className="block w-full pl-10 pr-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 focus:ring-4 focus:ring-primary-40/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("submitting") : t("submitButton")}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-font-tertiary">
              {t("haveAccount")}{" "}
              <Link
                href="/login"
                className="text-font-interactive hover:text-font-hover font-medium"
              >
                {t("signIn")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
