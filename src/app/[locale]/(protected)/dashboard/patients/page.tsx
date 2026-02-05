"use client";

import { useTranslations, useLocale } from "next-intl";
import { mockPatients } from "@/lib/mocks/patients";
import { Badge } from "@/components/ui/atoms/badge";
import { Button } from "@/components/ui/atoms/button";
import {
  Card,
  CardContent,
} from "@/components/ui/atoms/card";
import { Divider } from "@/components/ui/atoms/divider";
import { Eye, Edit, Phone } from "lucide-react";

export default function PatientsPage() {
  const locale = useLocale();
  const t = useTranslations("patients.list");
  const tLabels = useTranslations("patients.list.labels");
  const tGender = useTranslations("patients.list.gender");
  const tStatus = useTranslations("patients.list.status");
  const tActions = useTranslations("patients.list.actions");

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case "male":
        return tGender("male");
      case "female":
        return tGender("female");
      default:
        return tGender("unknown");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-font-primary">{t("title")}</h1>
        <Button variant="primary">{t("newPatient")}</Button>
      </div>

      <Card variant="outlined" padding="none">
        <CardContent className="p-0">
          <div className="divide-y divide-border-secondary">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-6 hover:bg-neutral-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-font-primary">
                            {patient.name}
                          </h3>
                          <Badge
                            variant={
                              patient.status === "active"
                                ? "success"
                                : "default"
                            }
                            size="small"
                          >
                            {patient.status === "active"
                              ? tStatus("active")
                              : tStatus("inactive")}
                          </Badge>
                        </div>
                        {patient.microchip && (
                          <p className="text-xs text-font-tertiary mt-1">
                            Chip: {patient.microchip}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("speciesBreed")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {patient.species}
                        </p>
                        <p className="text-xs text-font-tertiary">
                          {patient.breed}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("age")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {patient.age}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("gender")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {getGenderLabel(patient.gender)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("lastVisit")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {new Date(patient.lastVisit).toLocaleDateString(
                            locale === "es" ? "es-ES" : "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <Divider orientation="horizontal" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("owner")}
                        </p>
                        <p className="text-sm text-font-primary">
                          {patient.ownerName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-font-secondary uppercase tracking-wider mb-1">
                          {tLabels("phone")}
                        </p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-font-tertiary" />
                          <p className="text-sm text-font-primary">
                            {patient.ownerPhone}
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
