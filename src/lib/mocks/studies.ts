export interface Study {
  id: string;
  title: string;
  patientName: string;
  species: string;
  breed: string;
  date: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  type: string;
  veterinarian: string;
}

export const mockStudies: Study[] = [
  {
    id: "1",
    title: "Radiografía Torácica - Max",
    patientName: "Max",
    species: "Canino",
    breed: "Labrador Retriever",
    date: "2026-02-05",
    status: "completed",
    type: "Radiografía",
    veterinarian: "Dr. Juan Pérez",
  },
  {
    id: "2",
    title: "Ecografía Abdominal - Luna",
    patientName: "Luna",
    species: "Felino",
    breed: "Persa",
    date: "2026-02-04",
    status: "in-progress",
    type: "Ecografía",
    veterinarian: "Dr. María García",
  },
  {
    id: "3",
    title: "Análisis de Sangre - Rocky",
    patientName: "Rocky",
    species: "Canino",
    breed: "Bulldog",
    date: "2026-02-03",
    status: "completed",
    type: "Laboratorio",
    veterinarian: "Dr. Juan Pérez",
  },
  {
    id: "4",
    title: "Biopsia de Piel - Bella",
    patientName: "Bella",
    species: "Canino",
    breed: "Golden Retriever",
    date: "2026-02-02",
    status: "pending",
    type: "Patología",
    veterinarian: "Dr. Carlos Rodríguez",
  },
  {
    id: "5",
    title: "Endoscopia Digestiva - Simba",
    patientName: "Simba",
    species: "Felino",
    breed: "Maine Coon",
    date: "2026-02-01",
    status: "completed",
    type: "Endoscopia",
    veterinarian: "Dr. María García",
  },
  {
    id: "6",
    title: "Radiografía de Cadera - Toby",
    patientName: "Toby",
    species: "Canino",
    breed: "Pastor Alemán",
    date: "2026-01-30",
    status: "in-progress",
    type: "Radiografía",
    veterinarian: "Dr. Juan Pérez",
  },
];
