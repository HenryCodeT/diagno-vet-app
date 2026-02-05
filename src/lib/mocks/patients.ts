export interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: "male" | "female" | "unknown";
  ownerName: string;
  ownerPhone: string;
  lastVisit: string;
  status: "active" | "inactive";
  microchip?: string;
}

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Max",
    species: "Canino",
    breed: "Labrador Retriever",
    age: "5 años",
    gender: "male",
    ownerName: "Carlos Martínez",
    ownerPhone: "+34 600 123 456",
    lastVisit: "2026-02-05",
    status: "active",
    microchip: "ES123456789012",
  },
  {
    id: "2",
    name: "Luna",
    species: "Felino",
    breed: "Persa",
    age: "3 años",
    gender: "female",
    ownerName: "Ana López",
    ownerPhone: "+34 600 234 567",
    lastVisit: "2026-02-04",
    status: "active",
    microchip: "ES234567890123",
  },
  {
    id: "3",
    name: "Rocky",
    species: "Canino",
    breed: "Bulldog",
    age: "7 años",
    gender: "male",
    ownerName: "Pedro Sánchez",
    ownerPhone: "+34 600 345 678",
    lastVisit: "2026-02-03",
    status: "active",
  },
  {
    id: "4",
    name: "Bella",
    species: "Canino",
    breed: "Golden Retriever",
    age: "4 años",
    gender: "female",
    ownerName: "Laura Fernández",
    ownerPhone: "+34 600 456 789",
    lastVisit: "2026-02-02",
    status: "active",
    microchip: "ES345678901234",
  },
  {
    id: "5",
    name: "Simba",
    species: "Felino",
    breed: "Maine Coon",
    age: "2 años",
    gender: "male",
    ownerName: "Miguel Torres",
    ownerPhone: "+34 600 567 890",
    lastVisit: "2026-02-01",
    status: "active",
  },
  {
    id: "6",
    name: "Toby",
    species: "Canino",
    breed: "Pastor Alemán",
    age: "6 años",
    gender: "male",
    ownerName: "Sofia Ruiz",
    ownerPhone: "+34 600 678 901",
    lastVisit: "2026-01-30",
    status: "active",
    microchip: "ES456789012345",
  },
  {
    id: "7",
    name: "Mia",
    species: "Felino",
    breed: "Siamés",
    age: "1 año",
    gender: "female",
    ownerName: "David Moreno",
    ownerPhone: "+34 600 789 012",
    lastVisit: "2026-01-25",
    status: "active",
  },
  {
    id: "8",
    name: "Charlie",
    species: "Canino",
    breed: "Beagle",
    age: "8 años",
    gender: "male",
    ownerName: "Elena Gómez",
    ownerPhone: "+34 600 890 123",
    lastVisit: "2026-01-20",
    status: "inactive",
  },
];
