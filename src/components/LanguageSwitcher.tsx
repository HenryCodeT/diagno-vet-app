"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const switchLocale = (newLocale: "en" | "es") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-neutral-60" />
      <div className="flex rounded-lg border border-neutral-40 overflow-hidden">
        <button
          onClick={() => switchLocale("en")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            locale === "en"
              ? "bg-primary-60 text-white"
              : "bg-white text-neutral-80 hover:bg-neutral-10"
          }`}
          title={t("english")}
        >
          EN
        </button>
        <button
          onClick={() => switchLocale("es")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            locale === "es"
              ? "bg-primary-60 text-white"
              : "bg-white text-neutral-80 hover:bg-neutral-10"
          }`}
          title={t("spanish")}
        >
          ES
        </button>
      </div>
    </div>
  );
}
