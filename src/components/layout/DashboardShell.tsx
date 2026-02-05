"use client";

import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    avatarUrl?: string | null;
  };
  veterinaryName?: string;
}

export function DashboardShell({
  children,
  user,
  veterinaryName,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen bg-bg-secondary overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar user={user} veterinaryName={veterinaryName} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
