import { z } from "zod";

// Image label options for diagnostic images
export const IMAGE_LABELS = [
  "lateral",
  "vd", // Ventrodorsal
  "dv", // Dorsoventral
  "oblique",
  "ap", // Anteroposterior
  "pa", // Posteroanterior
  "other",
] as const;

export type ImageLabel = (typeof IMAGE_LABELS)[number];

// Study type options
export const STUDY_TYPES = [
  "radiography",
  "ultrasound",
  "ct_scan",
  "mri",
  "endoscopy",
  "echocardiogram",
  "other",
] as const;

export type StudyType = (typeof STUDY_TYPES)[number];

// Gender options
export const GENDERS = ["male", "female", "unknown"] as const;
export type Gender = (typeof GENDERS)[number];

// Schema for a single uploaded image
export const studyImageSchema = z.object({
  id: z.string(),
  file: z.instanceof(File),
  preview: z.string(), // URL.createObjectURL result
  label: z.enum(IMAGE_LABELS).optional(),
  uploadProgress: z.number().min(0).max(100).optional(),
  status: z.enum(["pending", "uploading", "complete", "error"]).optional(),
  errorMessage: z.string().optional(),
});

export type StudyImage = z.infer<typeof studyImageSchema>;

// Schema for patient information
export const patientInfoSchema = z.object({
  date: z.date(),
  name: z
    .string()
    .min(1, "El nombre del paciente es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  species: z.string().min(1, "La especie es requerida"),
  breed: z.string().optional(),
  birthDate: z.date().optional(),
  weight: z.number().positive("El peso debe ser mayor a 0").optional(),
  weightUnit: z.enum(["kg", "lb"]),
  gender: z.enum(GENDERS).optional(),
  isNeutered: z.boolean(),
  studyType: z.enum(STUDY_TYPES),
});

export type PatientInfo = z.infer<typeof patientInfoSchema>;

// Schema for contact information
export const contactInfoSchema = z.object({
  referringProfessional: z.string().optional(),
  referringEmail: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
  guardianName: z.string().optional(),
  guardianEmail: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

// Combined schema for the entire form
export const newReportSchema = z.object({
  patient: patientInfoSchema,
  contact: contactInfoSchema,
  images: z.array(studyImageSchema).min(1, "Debes subir al menos una imagen"),
});

export type NewReportFormData = z.infer<typeof newReportSchema>;

// Helper function to calculate age from birth date
export function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  display: string;
} {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  // Adjust if day of month hasn't passed yet
  if (today.getDate() < birthDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  let display: string;
  if (years === 0) {
    display = `${months} ${months === 1 ? "mes" : "meses"}`;
  } else if (months === 0) {
    display = `${years} ${years === 1 ? "año" : "años"}`;
  } else {
    display = `${years} ${years === 1 ? "año" : "años"}, ${months} ${months === 1 ? "mes" : "meses"}`;
  }

  return { years, months, display };
}

// Validation helper for file types
export const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/dicom": [".dcm", ".dicom"],
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per file
export const MAX_FILES = 20;

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `El archivo ${file.name} excede el tamaño máximo de 50MB`,
    };
  }

  const validTypes = Object.keys(ACCEPTED_IMAGE_TYPES);
  if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".dcm")) {
    return {
      valid: false,
      error: `El archivo ${file.name} no es un formato válido`,
    };
  }

  return { valid: true };
}
