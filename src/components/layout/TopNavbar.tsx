"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import {
  LogOut,
  ChevronDown,
  User,
  Settings,
  Building2,
  ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    avatarUrl?: string | null;
  };
  veterinaryName?: string;
}

export function TopNavbar({ user, veterinaryName }: TopNavbarProps) {
  const t = useTranslations("navbar");
  const tNav = useTranslations("navigation");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user.email;

  const initials = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : user.email.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) {
      setIsSettingsOpen(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-border-secondary">
      <div className="h-full px-4 sm:px-6 flex items-center justify-end">
        {/* Right side - Language Switcher and User Profile */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isDropdownOpen
                  ? "bg-neutral-10"
                  : "hover:bg-neutral-10"
              )}
            >
              {/* Avatar */}
              <div className="w-9 h-9 bg-primary-60 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {initials}
                  </span>
                )}
              </div>

              {/* Name and Clinic */}
              <div className="text-left hidden md:block max-w-[180px]">
                <p className="text-sm font-semibold text-font-primary leading-tight truncate">
                  {displayName}
                </p>
                {veterinaryName && (
                  <p className="text-xs text-font-secondary leading-tight truncate">
                    {veterinaryName}
                  </p>
                )}
              </div>

              <ChevronDown
                className={cn(
                  "w-4 h-4 text-neutral-60 transition-transform",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border-secondary py-2 z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-border-secondary md:hidden">
                  <p className="text-sm font-semibold text-font-primary truncate">
                    {displayName}
                  </p>
                  {veterinaryName && (
                    <p className="text-xs text-font-secondary truncate">
                      {veterinaryName}
                    </p>
                  )}
                </div>

                {/* Settings with Submenu */}
                <div className="relative">
                  <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-2.5 text-sm text-font-secondary hover:bg-neutral-10 hover:text-font-primary transition-colors",
                      isSettingsOpen && "bg-neutral-10 text-font-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      <span>{t("settings")}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isSettingsOpen && "rotate-90"
                      )}
                    />
                  </button>

                  {/* Settings Submenu - Inline instead of hover */}
                  {isSettingsOpen && (
                    <div className="bg-neutral-10 border-y border-border-secondary">
                      <Link
                        href="/dashboard/settings/personal"
                        className="flex items-center gap-3 w-full px-4 py-2.5 pl-11 text-sm text-font-secondary hover:bg-neutral-20 hover:text-font-primary transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>{t("settingsPersonal")}</span>
                      </Link>
                      <Link
                        href="/dashboard/settings/veterinary"
                        className="flex items-center gap-3 w-full px-4 py-2.5 pl-11 text-sm text-font-secondary hover:bg-neutral-20 hover:text-font-primary transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>{t("settingsVeterinary")}</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Logout */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-font-secondary hover:bg-error-10 hover:text-error-80 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{tNav("logout")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
