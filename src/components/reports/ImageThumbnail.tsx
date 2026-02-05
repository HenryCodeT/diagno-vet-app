"use client";

import * as React from "react";
import { X, RotateCw, Tag, AlertCircle, Loader2, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  IMAGE_LABELS,
  type ImageLabel,
  type StudyImage,
} from "@/lib/validations/report";

// Label display names
const LABEL_DISPLAY: Record<ImageLabel, { en: string; es: string }> = {
  lateral: { en: "Lateral", es: "Lateral" },
  vd: { en: "VD", es: "VD" },
  dv: { en: "DV", es: "DV" },
  oblique: { en: "Oblique", es: "Oblicuo" },
  ap: { en: "AP", es: "AP" },
  pa: { en: "PA", es: "PA" },
  other: { en: "Other", es: "Otro" },
};

interface ImageThumbnailProps {
  image: StudyImage;
  onRemove: (id: string) => void;
  onLabelChange: (id: string, label: ImageLabel | undefined) => void;
  onRotate?: (id: string) => void;
  locale?: "en" | "es";
  className?: string;
}

export function ImageThumbnail({
  image,
  onRemove,
  onLabelChange,
  onRotate,
  locale = "es",
  className,
}: ImageThumbnailProps) {
  const [showLabelMenu, setShowLabelMenu] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLabelMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    onRotate?.(image.id);
  };

  const handleLabelSelect = (label: ImageLabel | undefined) => {
    onLabelChange(image.id, label);
    setShowLabelMenu(false);
  };

  const statusIcon: Record<string, React.ReactNode> = {
    pending: null,
    uploading: <Loader2 className="w-4 h-4 animate-spin text-primary-60" />,
    complete: <Check className="w-4 h-4 text-success-60" />,
    error: <AlertCircle className="w-4 h-4 text-error-60" />,
  };

  return (
    <div
      className={cn(
        "relative group rounded-lg overflow-hidden bg-neutral-10 border-2 border-border-secondary",
        "transition-all duration-200",
        image.status === "error" && "border-error-40",
        image.status === "complete" && "border-success-40",
        className,
      )}
    >
      {/* Image Preview */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image.preview}
          alt={`Preview ${image.id}`}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            image.status === "uploading" && "opacity-50",
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        {/* Upload Progress Overlay */}
        {image.status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="text-center">
              <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
              <span className="text-xs text-white font-medium">
                {image.uploadProgress}%
              </span>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {image.status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-error-10/80">
            <div className="text-center p-2">
              <AlertCircle className="w-6 h-6 text-error-60 mx-auto mb-1" />
              <span className="text-xs text-error-80 line-clamp-2">
                {image.errorMessage || "Error al subir"}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons - Show on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            "flex items-center justify-center gap-2",
            image.status === "uploading" && "pointer-events-none",
          )}
        >
          {/* Rotate Button */}
          <button
            type="button"
            onClick={handleRotate}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-neutral-80 transition-colors"
            title="Rotar imagen"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(image.id)}
            className="p-2 rounded-full bg-white/90 hover:bg-error-10 text-neutral-80 hover:text-error-60 transition-colors"
            title="Eliminar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Bar - Label and Status */}
      <div className="p-2 flex items-center justify-between gap-2 bg-white">
        {/* Label Selector */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowLabelMenu(!showLabelMenu)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors",
              image.label
                ? "bg-primary-10 text-primary-80 hover:bg-primary-20"
                : "bg-neutral-10 text-neutral-60 hover:bg-neutral-20",
            )}
          >
            <Tag className="w-3 h-3" />
            {image.label
              ? LABEL_DISPLAY[image.label][locale]
              : locale === "es"
                ? "Etiqueta"
                : "Label"}
          </button>

          {/* Label Dropdown */}
          {showLabelMenu && (
            <div className="absolute bottom-full left-0 mb-1 w-32 bg-white rounded-lg shadow-medium border border-border-secondary py-1 z-10">
              {image.label && (
                <button
                  type="button"
                  onClick={() => handleLabelSelect(undefined)}
                  className="w-full px-3 py-1.5 text-left text-xs text-font-secondary hover:bg-neutral-10"
                >
                  {locale === "es" ? "Sin etiqueta" : "No label"}
                </button>
              )}
              {IMAGE_LABELS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleLabelSelect(label)}
                  className={cn(
                    "w-full px-3 py-1.5 text-left text-xs transition-colors",
                    image.label === label
                      ? "bg-primary-10 text-primary-80 font-medium"
                      : "text-font-secondary hover:bg-neutral-10 hover:text-font-primary",
                  )}
                >
                  {LABEL_DISPLAY[label][locale]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Indicator */}
        {image.status ? statusIcon[image.status] : null}
      </div>
    </div>
  );
}

interface ImageGalleryProps {
  images: StudyImage[];
  onRemove: (id: string) => void;
  onLabelChange: (id: string, label: ImageLabel | undefined) => void;
  onRotate?: (id: string) => void;
  locale?: "en" | "es";
  className?: string;
  emptyMessage?: string;
}

export function ImageGallery({
  images,
  onRemove,
  onLabelChange,
  onRotate,
  locale = "es",
  className,
  emptyMessage = "No hay imágenes",
}: ImageGalleryProps) {
  if (images.length === 0) {
    return (
      <div className={cn("text-center py-8 text-font-secondary", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
        className,
      )}
    >
      {images.map((image) => (
        <ImageThumbnail
          key={image.id}
          image={image}
          onRemove={onRemove}
          onLabelChange={onLabelChange}
          onRotate={onRotate}
          locale={locale}
        />
      ))}
    </div>
  );
}
