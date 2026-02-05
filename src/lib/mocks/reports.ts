export interface Report {
  id: string;
  reportNumber: string;
  patientName: string;
  species: string;
  breed: string;
  ownerName: string;
  date: string;
  status: "draft" | "pending" | "completed" | "sent";
  type: string;
  veterinarian: string;
  createdAt: string;
}

export const mockReports: Report[] = [
  {
    id: "1",
    reportNumber: "RPT-2026-001",
    patientName: "Max",
    species: "Canino",
    breed: "Labrador Retriever",
    ownerName: "Carlos Martínez",
    date: "2026-02-05",
    status: "completed",
    type: "Radiografía Torácica",
    veterinarian: "Dr. Juan Pérez",
    createdAt: "2026-02-05T10:30:00",
  },
  {
    id: "2",
    reportNumber: "RPT-2026-002",
    patientName: "Luna",
    species: "Felino",
    breed: "Persa",
    ownerName: "Ana López",
    date: "2026-02-04",
    status: "pending",
    type: "Ecografía Abdominal",
    veterinarian: "Dr. María García",
    createdAt: "2026-02-04T14:15:00",
  },
  {
    id: "3",
    reportNumber: "RPT-2026-003",
    patientName: "Rocky",
    species: "Canino",
    breed: "Bulldog",
    ownerName: "Pedro Sánchez",
    date: "2026-02-03",
    status: "sent",
    type: "Análisis de Sangre",
    veterinarian: "Dr. Juan Pérez",
    createdAt: "2026-02-03T09:20:00",
  },
  {
    id: "4",
    reportNumber: "RPT-2026-004",
    patientName: "Bella",
    species: "Canino",
    breed: "Golden Retriever",
    ownerName: "Laura Fernández",
    date: "2026-02-02",
    status: "draft",
    type: "Biopsia de Piel",
    veterinarian: "Dr. Carlos Rodríguez",
    createdAt: "2026-02-02T16:45:00",
  },
  {
    id: "5",
    reportNumber: "RPT-2026-005",
    patientName: "Simba",
    species: "Felino",
    breed: "Maine Coon",
    ownerName: "Miguel Torres",
    date: "2026-02-01",
    status: "completed",
    type: "Endoscopia Digestiva",
    veterinarian: "Dr. María García",
    createdAt: "2026-02-01T11:00:00",
  },
  {
    id: "6",
    reportNumber: "RPT-2026-006",
    patientName: "Toby",
    species: "Canino",
    breed: "Pastor Alemán",
    ownerName: "Sofia Ruiz",
    date: "2026-01-30",
    status: "pending",
    type: "Radiografía de Cadera",
    veterinarian: "Dr. Juan Pérez",
    createdAt: "2026-01-30T13:30:00",
  },
  {
    id: "7",
    reportNumber: "RPT-2026-007",
    patientName: "Mia",
    species: "Felino",
    breed: "Siamés",
    ownerName: "David Moreno",
    date: "2026-01-25",
    status: "sent",
    type: "Consulta General",
    veterinarian: "Dr. Carlos Rodríguez",
    createdAt: "2026-01-25T10:15:00",
  },
];
