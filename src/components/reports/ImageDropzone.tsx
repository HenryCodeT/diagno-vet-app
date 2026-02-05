"use client";

import * as React from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { Upload, ImagePlus, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILES,
  validateImageFile,
  type StudyImage,
} from "@/lib/validations/report";

interface ImageDropzoneProps {
  images: StudyImage[];
  onImagesChange: (images: StudyImage[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  disabled?: boolean;
  className?: string;
  dropzoneText?: string;
  dropzoneActiveText?: string;
  uploadingText?: string;
}

export function ImageDropzone({
  images,
  onImagesChange,
  maxFiles = MAX_FILES,
  maxSize = MAX_FILE_SIZE,
  accept = ACCEPTED_IMAGE_TYPES,
  disabled = false,
  className,
  dropzoneText = "Arrastra imágenes aquí o haz clic para seleccionar",
  dropzoneActiveText = "Suelta las imágenes aquí...",
  uploadingText = "Procesando imágenes...",
}: ImageDropzoneProps) {
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      // Check for rejected files
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map((rejection) => {
          const errorMessages = rejection.errors
            .map((err: any) => {
              if (err.code === "file-too-large") {
                return `${rejection.file.name} excede el tamaño máximo`;
              }
              if (err.code === "file-invalid-type") {
                return `${rejection.file.name} no es un formato válido`;
              }
              return err.message;
            })
            .join(", ");
          return errorMessages;
        });
        setError(errors.join(". "));
        return;
      }

      // Check max files limit
      if (images.length + acceptedFiles.length > maxFiles) {
        setError(`Máximo ${maxFiles} imágenes permitidas`);
        return;
      }

      // Validate and create StudyImage objects
      const newImages: StudyImage[] = [];
      const validationErrors: string[] = [];

      acceptedFiles.forEach((file) => {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          validationErrors.push(validation.error!);
          return;
        }

        const studyImage: StudyImage = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview: URL.createObjectURL(file),
          uploadProgress: 0,
          status: "pending",
        };
        newImages.push(studyImage);
      });

      if (validationErrors.length > 0) {
        setError(validationErrors.join(". "));
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages]);
      }
    },
    [images, maxFiles, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles: maxFiles - images.length,
      disabled: disabled || images.length >= maxFiles,
      multiple: true,
    });

  const isLimitReached = images.length >= maxFiles;
  const uploadingCount = images.filter((img) => img.status === "uploading").length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer",
          "flex flex-col items-center justify-center min-h-[200px] text-center",
          isDragActive && !isDragReject
            ? "border-primary-60 bg-primary-10"
            : "border-border-secondary bg-bg-secondary hover:border-primary-40 hover:bg-primary-10/50",
          isDragReject && "border-error-60 bg-error-10",
          (disabled || isLimitReached) &&
            "opacity-50 cursor-not-allowed hover:border-border-secondary hover:bg-bg-secondary",
          error && "border-error-40"
        )}
      >
        <input {...getInputProps()} />

        {uploadingCount > 0 ? (
          <>
            <div className="w-12 h-12 mb-4 rounded-full bg-primary-20 flex items-center justify-center animate-pulse">
              <Upload className="w-6 h-6 text-primary-60" />
            </div>
            <p className="text-font-secondary">{uploadingText}</p>
          </>
        ) : isDragActive && !isDragReject ? (
          <>
            <div className="w-12 h-12 mb-4 rounded-full bg-primary-20 flex items-center justify-center">
              <ImagePlus className="w-6 h-6 text-primary-60" />
            </div>
            <p className="text-primary-80 font-medium">{dropzoneActiveText}</p>
          </>
        ) : isDragReject ? (
          <>
            <div className="w-12 h-12 mb-4 rounded-full bg-error-20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-error-60" />
            </div>
            <p className="text-error-80 font-medium">
              Archivo no válido
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 mb-4 rounded-full bg-neutral-20 flex items-center justify-center">
              <Upload className="w-6 h-6 text-neutral-60" />
            </div>
            <p className="text-font-secondary mb-2">{dropzoneText}</p>
            <p className="text-xs text-font-disabled">
              PNG, JPG, WEBP o DICOM • Máx. 50MB por archivo • Hasta {maxFiles}{" "}
              imágenes
            </p>
          </>
        )}

        {isLimitReached && (
          <p className="text-sm text-warning-80 mt-2">
            Límite de imágenes alcanzado
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-error-10 border border-error-40">
          <AlertCircle className="w-4 h-4 text-error-60 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error-80">{error}</p>
        </div>
      )}

      {/* Global Progress Bar */}
      {uploadingCount > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-font-secondary">
              Subiendo {uploadingCount} {uploadingCount === 1 ? "imagen" : "imágenes"}...
            </span>
            <span className="text-font-primary font-medium">
              {Math.round(
                images
                  .filter((img) => img.status === "uploading")
                  .reduce((acc, img) => acc + (img.uploadProgress ?? 0), 0) /
                  uploadingCount
              )}
              %
            </span>
          </div>
          <div className="h-2 bg-neutral-20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-60 rounded-full transition-all duration-300"
              style={{
                width: `${
                  images
                    .filter((img) => img.status === "uploading")
                    .reduce((acc, img) => acc + (img.uploadProgress ?? 0), 0) /
                  uploadingCount
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Image Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-font-secondary">
          Imágenes ({images.length}/{maxFiles})
        </span>
        {images.length > 0 && (
          <button
            type="button"
            onClick={() => onImagesChange([])}
            className="text-error-60 hover:text-error-80 transition-colors"
            disabled={disabled}
          >
            Eliminar todas
          </button>
        )}
      </div>
    </div>
  );
}
