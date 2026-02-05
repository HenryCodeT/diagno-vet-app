"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import {
  LayoutDashboard,
  FileText,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  href: string;
  icon: React.ElementType;
  labelKey: string;
  badge?: number;
}

export function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("sidebar");
  const tNav = useTranslations("navigation");
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" },
    { href: "/dashboard/studies", icon: Stethoscope, labelKey: "myStudies" },
    { href: "/dashboard/patients", icon: Users, labelKey: "patients" },
    { href: "/dashboard/reports", icon: FileText, labelKey: "reports" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-border-secondary transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border-secondary">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-60 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-font-primary">
              DiagnoVET
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                active
                  ? "bg-primary-10 text-primary-80"
                  : "text-font-secondary hover:bg-neutral-10 hover:text-font-primary"
              )}
              title={isCollapsed ? t(item.labelKey) : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  active ? "text-primary-60" : "text-neutral-60 group-hover:text-font-primary"
                )}
              />
              {!isCollapsed && (
                <span className="font-medium">{t(item.labelKey)}</span>
              )}
              {item.badge !== undefined && !isCollapsed && (
                <span className="ml-auto bg-primary-60 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-90 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {t(item.labelKey)}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* New Report Button */}
      <div className="p-3 border-t border-border-secondary">
        <Link
          href="/dashboard/reports/new"
          className={cn(
            "flex items-center justify-center gap-2 bg-primary-60 text-white rounded-lg py-2.5 hover:bg-primary-80 transition-colors font-medium",
            isCollapsed ? "px-2" : "px-4"
          )}
          title={isCollapsed ? t("newReport") : undefined}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>{t("newReport")}</span>}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center p-3 border-t border-border-secondary text-neutral-60 hover:text-font-primary hover:bg-neutral-10 transition-colors"
        title={isCollapsed ? t("expand") : t("collapse")}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </aside>
  );
}
