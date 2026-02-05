import { StatsCards, SearchBar, RecentReports } from "@/components/dashboard";
import { mockReports } from "@/lib/mocks/reports";
import { mockPatients } from "@/lib/mocks/patients";

export default async function DashboardPage() {
  // Use mock data for stats
  const totalReports = mockReports.length;
  const totalPatients = mockPatients.length;
  const activeReports = mockReports.filter(
    (r) => r.status === "pending" || r.status === "draft"
  ).length;

  // Prepare reports data for client component
  const recentReports = mockReports.slice(0, 6).map((report) => ({
    id: report.id,
    reportNumber: report.reportNumber,
    patientName: report.patientName,
    species: report.species,
    breed: report.breed,
    ownerName: report.ownerName,
    date: report.date,
    status: report.status,
    type: report.type,
    veterinarian: report.veterinarian,
    createdAt: report.createdAt,
  }));

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

      {/* Recent Reports */}
      <RecentReports reports={recentReports} />
    </div>
  );
}
