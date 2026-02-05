"use client";

import { useTranslations, useLocale } from "next-intl";
import { mockStudies } from "@/lib/mocks/studies";
import { Badge } from "@/components/ui/atoms/badge";
import { Button } from "@/components/ui/atoms/button";
import {
  Card,
  CardContent,
} from "@/components/ui/atoms/card";
import { Divider } from "@/components/ui/atoms/divider";
import { Eye, FileText, Calendar, User } from "lucide-react";

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "success";
    case "in-progress":
      return "warning";
    case "pending":
      return "info";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
}

export default function StudiesPage() {
  const locale = useLocale();
  const t = useTranslations("studies.list");
  const tLabels = useTranslations("studies.list.labels");
  const tStatus = useTranslations("studies.list.status");
  const tActions = useTranslations("studies.list.actions");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return tStatus("completed");
      case "in-progress":
        return tStatus("inProgress");
      case "pending":
        return tStatus("pending");
      case "cancelled":
        return tStatus("cancelled");
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-font-primary">{t("title")}</h1>
        <Button variant="primary">{t("newStudy")}</Button>
      </div>

      <Card variant="outlined" padding="none">
        <CardContent className="p-0">
          <div className="divide-y divide-border-secondary">
            {mockStudies.map((study) => (
              <div
                key={study.id}
                className="p-6 hover:bg-neutral-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-font-primary">
                            {study.title}
                          </h3>
                          <Badge
                            variant={getStatusColor(study.status)}
                            size="small"
                          >
                            {getStatusLabel(study.status)}
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
                          {study.patientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("speciesBreed")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {study.species}
                        </p>
                        <p className="text-xs text-font-tertiary">
                          {study.breed}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("type")}
                        </p>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-font-tertiary" />
                          <p className="text-sm text-font-primary">
                            {study.type}
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
                            {new Date(study.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Divider orientation="horizontal" />

                    <div>
                      <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                        {tLabels("veterinarian")}
                      </p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-font-tertiary" />
                        <p className="text-sm text-font-primary">
                          {study.veterinarian}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outlined" size="small">
                      <Eye className="w-4 h-4" />
                      {tActions("view")}
                    </Button>
                    <Button variant="outlined" size="small">
                      <FileText className="w-4 h-4" />
                      {tActions("report")}
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
