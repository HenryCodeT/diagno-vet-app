"use client";

import { useTranslations } from "next-intl";
import { FileX } from "lucide-react";

interface EmptyStateProps {
  type?: "reports" | "patients";
}

export function EmptyState({ type = "reports" }: EmptyStateProps) {
  const t = useTranslations("dashboard.emptyState");

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-neutral-10 rounded-full flex items-center justify-center mb-4">
        <FileX className="w-8 h-8 text-neutral-50" />
      </div>
      <p className="text-font-tertiary text-lg">
        {type === "reports" ? t("noReports") : t("noPatients")}
      </p>
    </div>
  );
}
