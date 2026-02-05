"use client";

import { useTranslations } from "next-intl";
import { FileText, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  colorScheme?: "primary" | "success" | "warning";
}

function StatCard({
  title,
  value,
  icon: Icon,
  colorScheme = "primary",
}: StatCardProps) {
  const colorClasses = {
    primary: {
      bg: "bg-primary-10",
      icon: "text-primary-60",
    },
    success: {
      bg: "bg-success-10",
      icon: "text-success-60",
    },
    warning: {
      bg: "bg-warning-10",
      icon: "text-warning-60",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className="bg-white rounded-xl border border-border-secondary p-4 flex items-center gap-4">
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          colors.bg
        )}
      >
        <Icon className={cn("w-6 h-6", colors.icon)} />
      </div>
      <div>
        <p className="text-sm text-font-tertiary">{title}</p>
        <p className="text-2xl font-bold text-font-primary">{value}</p>
      </div>
      {/* Mini sparkline placeholder */}
      <div className="ml-auto flex items-end gap-0.5 h-8">
        {[40, 60, 35, 70, 50, 80, 65].map((height, i) => (
          <div
            key={i}
            className="w-1 bg-neutral-30 rounded-full"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

interface StatsCardsProps {
  totalReports: number;
  totalPatients: number;
  activeReports: number;
}

export function StatsCards({
  totalReports,
  totalPatients,
  activeReports,
}: StatsCardsProps) {
  const t = useTranslations("dashboard.stats");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title={t("totalReports")}
        value={totalReports}
        icon={FileText}
        colorScheme="primary"
      />
      <StatCard
        title={t("totalPatients")}
        value={totalPatients}
        icon={Users}
        colorScheme="success"
      />
      <StatCard
        title={t("activeReports")}
        value={activeReports}
        icon={Clock}
        colorScheme="warning"
      />
    </div>
  );
}
