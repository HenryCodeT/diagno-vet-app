"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { CheckCircle, Building2, User, HelpCircle } from "lucide-react";

interface FormData {
  veterinary: {
    legalName: string;
    address: string;
    phone: string;
  };
  professional: {
    phone: string;
    title: string;
    fullName: string;
    license: string;
  };
}

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    veterinary: {
      legalName: "",
      address: "",
      phone: "",
    },
    professional: {
      phone: "",
      title: "",
      fullName: "",
      license: "",
    },
  });

  // Pre-fill fullName from session
  useEffect(() => {
    if (session?.user) {
      const firstName = session.user.firstName ?? "";
      const lastName = session.user.lastName ?? "";
      const fullName = `${firstName} ${lastName}`.trim();
      if (fullName) {
        setFormData((prev) => ({
          ...prev,
          professional: {
            ...prev.professional,
            fullName,
          },
        }));
      }
    }
  }, [session]);

  const handleVeterinaryChange = (field: keyof FormData["veterinary"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      veterinary: {
        ...prev.veterinary,
        [field]: value,
      },
    }));
  };

  const handleProfessionalChange = (field: keyof FormData["professional"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        [field]: value,
      },
    }));
  };

  const validateStep3 = () => {
    const { legalName, address, phone } = formData.veterinary;
    return legalName.trim() !== "" && address.trim() !== "" && phone.trim() !== "";
  };

  const validateStep4 = () => {
    const { phone, title, fullName } = formData.professional;
    return phone.trim() !== "" && title.trim() !== "" && fullName.trim() !== "";
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || t("errors.generic"));
        return;
      }

      // Trigger session refresh to get updated onboarding status
      await updateSession();

      // Use hard navigation to ensure fresh session data is fetched
      window.location.href = "/dashboard";
    } catch {
      setError(t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-10 to-primary-20">
      {/* Header */}
      <nav className="flex items-center justify-center px-6 py-4 bg-white shadow-soft">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-xl font-bold text-font-primary">
            {tCommon("appName")}
          </span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-medium p-8">
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    s <= step ? "bg-primary-60" : "bg-neutral-40"
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👋</span>
                </div>
                <h1 className="text-2xl font-bold text-font-primary mb-4">
                  {t("welcome.title")}
                </h1>
                <p className="text-font-tertiary mb-8">
                  {t("welcome.description")}
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 transition-all"
                >
                  {t("welcome.continue")}
                </button>
              </div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <div className="text-center">
                <h1 className="text-2xl font-bold text-font-primary mb-6">
                  {t("features.title")}
                </h1>
                <div className="space-y-4 mb-8 text-left">
                  {["feature1", "feature2", "feature3"].map((key) => (
                    <div key={key} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-60 mt-0.5 flex-shrink-0" />
                      <p className="text-font-secondary">{t(`features.${key}`)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 border border-border-secondary text-font-secondary font-medium rounded-lg hover:bg-neutral-10 transition-all"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 transition-all"
                  >
                    {t("continue")}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Veterinary Information */}
            {step === 3 && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-primary-60" />
                  </div>
                  <h1 className="text-2xl font-bold text-font-primary mb-2">
                    {t("veterinary.title")}
                  </h1>
                  <p className="text-font-tertiary">
                    {t("veterinary.subtitle")}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("veterinary.legalNameLabel")} *
                    </label>
                    <input
                      type="text"
                      value={formData.veterinary.legalName}
                      onChange={(e) => handleVeterinaryChange("legalName", e.target.value)}
                      placeholder={t("veterinary.legalNamePlaceholder")}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("veterinary.addressLabel")} *
                    </label>
                    <input
                      type="text"
                      value={formData.veterinary.address}
                      onChange={(e) => handleVeterinaryChange("address", e.target.value)}
                      placeholder={t("veterinary.addressPlaceholder")}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("veterinary.phoneLabel")} *
                    </label>
                    <input
                      type="tel"
                      value={formData.veterinary.phone}
                      onChange={(e) => handleVeterinaryChange("phone", e.target.value)}
                      placeholder={t("veterinary.phonePlaceholder")}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-neutral-10 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-60 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-font-primary mb-2">
                        {t("veterinary.whyInfo.title")}
                      </p>
                      <ul className="text-sm text-font-tertiary space-y-1">
                        <li>• {t("veterinary.whyInfo.reason1")}</li>
                        <li>• {t("veterinary.whyInfo.reason2")}</li>
                        <li>• {t("veterinary.whyInfo.reason3")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 px-4 border border-border-secondary text-font-secondary font-medium rounded-lg hover:bg-neutral-10 transition-all"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={() => {
                      if (validateStep3()) {
                        setStep(4);
                        setError(null);
                      } else {
                        setError(t("errors.requiredFields"));
                      }
                    }}
                    className="flex-1 py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 transition-all"
                  >
                    {t("continue")} →
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-error-10 border border-error-40 rounded-lg">
                    <p className="text-sm text-error-80">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Professional Profile */}
            {step === 4 && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary-60" />
                  </div>
                  <h1 className="text-2xl font-bold text-font-primary mb-2">
                    {t("professional.title")}
                  </h1>
                  <p className="text-font-tertiary">
                    {t("professional.subtitle")}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("professional.phoneLabel")} *
                    </label>
                    <input
                      type="tel"
                      value={formData.professional.phone}
                      onChange={(e) => handleProfessionalChange("phone", e.target.value)}
                      placeholder={t("professional.phonePlaceholder")}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("professional.titleLabel")} *
                    </label>
                    <select
                      value={formData.professional.title}
                      onChange={(e) => handleProfessionalChange("title", e.target.value)}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">{t("professional.titlePlaceholder")}</option>
                      <option value="dr_male">{t("professional.titleOptions.dr_male")}</option>
                      <option value="dr_female">{t("professional.titleOptions.dr_female")}</option>
                      <option value="mv">{t("professional.titleOptions.mv")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("professional.fullNameLabel")} *
                    </label>
                    <input
                      type="text"
                      value={formData.professional.fullName}
                      onChange={(e) => handleProfessionalChange("fullName", e.target.value)}
                      placeholder={t("professional.fullNamePlaceholder")}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-font-primary mb-1">
                      {t("professional.licenseLabel")}{" "}
                      <span className="text-font-tertiary font-normal">
                        {t("professional.licenseOptional")}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.professional.license}
                      onChange={(e) => handleProfessionalChange("license", e.target.value)}
                      placeholder={t("professional.licensePlaceholder")}
                      className="w-full px-4 py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-neutral-10 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-60 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-font-primary mb-2">
                        {t("professional.whyInfo.title")}
                      </p>
                      <ul className="text-sm text-font-tertiary space-y-1">
                        <li>• {t("professional.whyInfo.reason1")}</li>
                        <li>• {t("professional.whyInfo.reason2")}</li>
                        <li>• {t("professional.whyInfo.reason3")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 px-4 border border-border-secondary text-font-secondary font-medium rounded-lg hover:bg-neutral-10 transition-all"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={() => {
                      if (validateStep4()) {
                        setStep(5);
                        setError(null);
                      } else {
                        setError(t("errors.requiredFields"));
                      }
                    }}
                    className="flex-1 py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 transition-all"
                  >
                    {t("continue")} →
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-error-10 border border-error-40 rounded-lg">
                    <p className="text-sm text-error-80">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Ready */}
            {step === 5 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-success-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-success-60" />
                </div>
                <h1 className="text-2xl font-bold text-font-primary mb-4">
                  {t("ready.title")}
                </h1>
                <p className="text-font-tertiary mb-8">
                  {t("ready.description")}
                </p>

                {error && (
                  <div className="mb-6 p-3 bg-error-10 border border-error-40 rounded-lg">
                    <p className="text-sm text-error-80">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 py-3 px-4 border border-border-secondary text-font-secondary font-medium rounded-lg hover:bg-neutral-10 transition-all"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-primary-60 text-white font-medium rounded-lg hover:bg-primary-80 transition-all disabled:opacity-50"
                  >
                    {isLoading ? tCommon("loading") : t("ready.start")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
