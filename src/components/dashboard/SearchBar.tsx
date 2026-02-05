"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const t = useTranslations("dashboard.search");
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-50" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full pl-10 pr-4 py-2.5 border border-border-secondary rounded-lg focus:ring-2 focus:ring-primary-60 focus:border-transparent transition-all text-font-primary placeholder:text-neutral-50"
        />
      </div>

      {/* Create New Report Button - Secondary style since primary CTA is in navbar */}
      <Link
        href="/dashboard/reports/new"
        className="inline-flex items-center justify-center gap-2 border-2 border-primary-60 text-primary-60 px-4 py-2.5 rounded-lg hover:bg-primary-10 hover:border-primary-80 hover:text-primary-80 transition-colors font-medium whitespace-nowrap"
      >
        <Plus className="w-5 h-5" />
        <span>{t("createReport")}</span>
      </Link>
    </div>
  );
}
