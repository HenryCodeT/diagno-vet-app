import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { StatsCards, SearchBar, EmptyState } from "@/components/dashboard";

export default async function DashboardPage() {
  const session = await auth();

  // Fetch counts for stats
  const [totalReports, totalPatients, activeReports] = await Promise.all([
    // For now, return 0 since we don't have Report model yet
    Promise.resolve(0),
    // Count patients associated with the user's veterinary
    prisma.user
      .findUnique({
        where: { id: session?.user?.id },
        include: { veterinary: true },
      })
      .then((user) => {
        // Placeholder - will be replaced when Patient model is added
        return 4;
      }),
    // Active reports count
    Promise.resolve(0),
  ]);

  return (
    <div className="space-y-6">
      {/* Stats Cards Row */}
      <StatsCards
        totalReports={totalReports}
        totalPatients={totalPatients}
        activeReports={activeReports}
      />

      {/* Search and Action Bar */}
      <SearchBar />

      {/* Reports Table / Empty State */}
      <div className="bg-white rounded-xl border border-border-secondary">
        <EmptyState type="reports" />
      </div>
    </div>
  );
}
