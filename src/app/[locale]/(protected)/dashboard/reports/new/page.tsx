import { getTranslations } from "next-intl/server";
import { NewReportForm } from "./NewReportForm";

interface NewReportPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: NewReportPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reports.new" });

  return {
    title: t("pageTitle"),
  };
}

export default async function NewReportPage({ params }: NewReportPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reports.new" });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-font-primary">
          {t("pageTitle")}
        </h1>
        <p className="text-font-secondary mt-1">
          {t("pageDescription")}
        </p>
      </div>

      {/* Form */}
      <NewReportForm locale={locale} />
    </div>
  );
}
