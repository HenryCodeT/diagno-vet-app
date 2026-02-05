"use client";

import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/atoms/badge";
import { Button } from "@/components/ui/atoms/button";
import {
  Card,
  CardContent,
} from "@/components/ui/atoms/card";
import { Divider } from "@/components/ui/atoms/divider";
import { Eye, Edit, Download, Calendar, User, FileText } from "lucide-react";
import type { Report } from "@/lib/mocks/reports";

interface RecentReportsProps {
  reports: Report[];
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "success";
    case "sent":
      return "success";
    case "pending":
      return "warning";
    case "draft":
      return "info";
    default:
      return "default";
  }
}

export function RecentReports({ reports = [] }: RecentReportsProps) {
  const locale = useLocale();
  const t = useTranslations("dashboard.recentReports");
  const tLabels = useTranslations("reports.list.labels");
  const tStatus = useTranslations("reports.list.status");
  const tActions = useTranslations("reports.list.actions");

  if (!reports || reports.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-font-primary">
          {t("title")}
        </h2>
        <p className="text-font-tertiary">{t("noReports")}</p>
      </div>
    );
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return tStatus("completed");
      case "sent":
        return tStatus("sent");
      case "pending":
        return tStatus("pending");
      case "draft":
        return tStatus("draft");
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-font-primary">
        {t("title")}
      </h2>
      <Card variant="outlined" padding="none">
        <CardContent className="p-0">
          <div className="divide-y divide-border-secondary">
            {reports.slice(0, 6).map((report) => (
              <div
                key={report.id}
                className="p-6 hover:bg-neutral-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-font-primary">
                            {report.reportNumber}
                          </h3>
                          <Badge
                            variant={getStatusColor(report.status)}
                            size="small"
                          >
                            {getStatusLabel(report.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("patient")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {report.patientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("speciesBreed")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {report.species}
                        </p>
                        <p className="text-xs text-font-tertiary">
                          {report.breed}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("type")}
                        </p>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-font-tertiary" />
                          <p className="text-sm text-font-primary">
                            {report.type}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("date")}
                        </p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-font-tertiary" />
                          <p className="text-sm text-font-primary">
                            {new Date(report.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Divider orientation="horizontal" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("owner")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {report.ownerName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("veterinarian")}
                        </p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-font-tertiary" />
                          <p className="text-sm text-font-primary">
                            {report.veterinarian}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outlined" size="small">
                      <Eye className="w-4 h-4" />
                      {tActions("view")}
                    </Button>
                    <Button variant="outlined" size="small">
                      <Edit className="w-4 h-4" />
                      {tActions("edit")}
                    </Button>
                    <Button variant="outlined" size="small">
                      <Download className="w-4 h-4" />
                      {tActions("download")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
