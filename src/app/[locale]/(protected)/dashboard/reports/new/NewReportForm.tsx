"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, ArrowRight, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/atoms/card/card";
import { Input } from "@/components/ui/form-controls/primitive-inputs/input";
import { Checkbox } from "@/components/ui/form-controls/primitive-inputs/checkbox";
import { FormField } from "@/components/ui/form-controls/field-components/form-field";
import { ComboboxField, type ComboboxOption } from "@/components/ui/form-controls/composite-inputs/combobox-field";
import { SmartAgeField } from "@/components/ui/form-controls/composite-inputs/smart-age-field";
import { ImageDropzone, ImageGallery } from "@/components/reports";

import {
  newReportSchema,
  type NewReportFormData,
  type StudyImage,
  type ImageLabel,
  STUDY_TYPES,
  GENDERS,
} from "@/lib/validations/report";
import {
  SPECIES,
  getBreedsForSpecies,
  type Species,
  type Breed,
} from "@/lib/constants/species-breeds";

interface NewReportFormProps {
  locale: string;
}

export function NewReportForm({ locale }: NewReportFormProps) {
  const t = useTranslations("reports.new");
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [images, setImages] = React.useState<StudyImage[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(newReportSchema),
    mode: "onChange",
    defaultValues: {
      patient: {
        date: new Date(),
        name: "",
        species: "",
        breed: "",
        weightUnit: "kg" as const,
        isNeutered: false,
        studyType: undefined as any,
      },
      contact: {
        referringProfessional: "",
        referringEmail: "",
        guardianName: "",
        guardianEmail: "",
      },
      images: [] as StudyImage[],
    },
  });

  const selectedSpecies = watch("patient.species");

  // Update images in form when they change
  React.useEffect(() => {
    setValue("images", images, { shouldValidate: true });
  }, [images, setValue]);

  // Get species options for combobox
  const speciesOptions: ComboboxOption[] = React.useMemo(() => {
    return SPECIES.map((species) => ({
      value: species.id,
      label: locale === "en" ? species.nameEn : species.nameEs,
    }));
  }, [locale]);

  // Get breed options based on selected species
  const breedOptions: ComboboxOption[] = React.useMemo(() => {
    if (!selectedSpecies) return [];
    const breeds = getBreedsForSpecies(selectedSpecies);
    return breeds.map((breed) => ({
      value: breed.id,
      label: locale === "en" ? breed.nameEn : breed.nameEs,
    }));
  }, [selectedSpecies, locale]);

  // Study type options
  const studyTypeOptions: ComboboxOption[] = React.useMemo(() => {
    const labels: Record<string, { en: string; es: string }> = {
      radiography: { en: "Radiography", es: "Radiografía" },
      ultrasound: { en: "Ultrasound", es: "Ecografía" },
      ct_scan: { en: "CT Scan", es: "Tomografía" },
      mri: { en: "MRI", es: "Resonancia Magnética" },
      endoscopy: { en: "Endoscopy", es: "Endoscopía" },
      echocardiogram: { en: "Echocardiogram", es: "Ecocardiograma" },
      other: { en: "Other", es: "Otro" },
    };
    return STUDY_TYPES.map((type) => ({
      value: type,
      label: labels[type][locale as "en" | "es"] || type,
    }));
  }, [locale]);

  // Gender options
  const genderOptions: ComboboxOption[] = React.useMemo(() => {
    const labels: Record<string, { en: string; es: string }> = {
      male: { en: "Male", es: "Macho" },
      female: { en: "Female", es: "Hembra" },
      unknown: { en: "Unknown", es: "Desconocido" },
    };
    return GENDERS.map((gender) => ({
      value: gender,
      label: labels[gender][locale as "en" | "es"] || gender,
    }));
  }, [locale]);

  // Handle image label change
  const handleLabelChange = (id: string, label: ImageLabel | undefined) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, label } : img))
    );
  };

  // Handle image removal
  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  // Handle form reset
  const handleReset = () => {
    // Revoke all image URLs
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    reset();
    setIsContactOpen(false);
  };

  // Handle form submit
  const onSubmit = async (data: NewReportFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement actual submission logic
  };

  // Check if form can be submitted
  const canSubmit = isValid && images.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Patient Information Card */}
          <Card variant="outlined">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{t("patientInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date */}
              <Controller
                name="patient.date"
                control={control}
                render={({ field }) => (
                  <FormField
                    label={t("date")}
                    hasError={!!errors.patient?.date}
                    errorMessage={errors.patient?.date?.message}
                  >
                    <Input
                      type="date"
                      value={field.value ? field.value.toISOString().split("T")[0] : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormField>
                )}
              />

              {/* Patient Name */}
              <Controller
                name="patient.name"
                control={control}
                render={({ field }) => (
                  <FormField
                    label={`${t("patientName")} *`}
                    hasError={!!errors.patient?.name}
                    errorMessage={errors.patient?.name?.message}
                  >
                    <Input
                      {...field}
                      placeholder={t("patientNamePlaceholder")}
                    />
                  </FormField>
                )}
              />

              {/* Species */}
              <Controller
                name="patient.species"
                control={control}
                render={({ field }) => (
                  <ComboboxField
                    label={t("species")}
                    required
                    options={speciesOptions}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      // Reset breed when species changes
                      setValue("patient.breed", "");
                    }}
                    placeholder={t("speciesPlaceholder")}
                    hasError={!!errors.patient?.species}
                    errorMessage={errors.patient?.species?.message}
                  />
                )}
              />

              {/* Breed */}
              <Controller
                name="patient.breed"
                control={control}
                render={({ field }) => (
                  <ComboboxField
                    label={t("breed")}
                    options={breedOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t("breedPlaceholder")}
                    disabled={!selectedSpecies}
                    emptyMessage={t("noBreeds")}
                  />
                )}
              />

              {/* Birth Date / Age */}
              <Controller
                name="patient.birthDate"
                control={control}
                render={({ field }) => (
                  <SmartAgeField
                    label={t("birthDate")}
                    value={field.value}
                    onChange={field.onChange}
                    agePrefix={t("age")}
                    hasError={!!errors.patient?.birthDate}
                    errorMessage={errors.patient?.birthDate?.message}
                  />
                )}
              />

              {/* Weight */}
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="patient.weight"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      label={t("weight")}
                      hasError={!!errors.patient?.weight}
                      errorMessage={errors.patient?.weight?.message}
                    >
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseFloat(e.target.value) : undefined
                          )
                        }
                        placeholder="0.0"
                      />
                    </FormField>
                  )}
                />
                <Controller
                  name="patient.weightUnit"
                  control={control}
                  render={({ field }) => (
                    <ComboboxField
                      label={t("unit")}
                      options={[
                        { value: "kg", label: "kg" },
                        { value: "lb", label: "lb" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      clearable={false}
                    />
                  )}
                />
              </div>

              {/* Gender and Neutered */}
              <div className="space-y-3">
                <Controller
                  name="patient.gender"
                  control={control}
                  render={({ field }) => (
                    <ComboboxField
                      label={t("gender")}
                      options={genderOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("genderPlaceholder")}
                    />
                  )}
                />
                <Controller
                  name="patient.isNeutered"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm text-font-secondary">
                        {t("neutered")}
                      </span>
                    </label>
                  )}
                />
              </div>

              {/* Study Type */}
              <Controller
                name="patient.studyType"
                control={control}
                render={({ field }) => (
                  <ComboboxField
                    label={t("studyType")}
                    required
                    options={studyTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t("studyTypePlaceholder")}
                    hasError={!!errors.patient?.studyType}
                    errorMessage={errors.patient?.studyType?.message}
                  />
                )}
              />
            </CardContent>
          </Card>

          {/* Contact Information Card - Collapsible */}
          <Card variant="outlined">
            <button
              type="button"
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="w-full"
            >
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{t("contactInfo")}</CardTitle>
                {isContactOpen ? (
                  <ChevronUp className="w-5 h-5 text-neutral-60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-60" />
                )}
              </CardHeader>
            </button>

            {isContactOpen && (
              <CardContent className="space-y-4 pt-0">
                {/* Referring Professional */}
                <Controller
                  name="contact.referringProfessional"
                  control={control}
                  render={({ field }) => (
                    <FormField label={t("referringProfessional")}>
                      <Input
                        {...field}
                        placeholder={t("referringProfessionalPlaceholder")}
                      />
                    </FormField>
                  )}
                />

                {/* Referring Email */}
                <Controller
                  name="contact.referringEmail"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      label={t("referringEmail")}
                      hasError={!!errors.contact?.referringEmail}
                      errorMessage={errors.contact?.referringEmail?.message}
                    >
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("emailPlaceholder")}
                      />
                    </FormField>
                  )}
                />

                {/* Guardian */}
                <Controller
                  name="contact.guardianName"
                  control={control}
                  render={({ field }) => (
                    <FormField label={t("guardian")}>
                      <Input
                        {...field}
                        placeholder={t("guardianPlaceholder")}
                      />
                    </FormField>
                  )}
                />

                {/* Guardian Email */}
                <Controller
                  name="contact.guardianEmail"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      label={t("guardianEmail")}
                      hasError={!!errors.contact?.guardianEmail}
                      errorMessage={errors.contact?.guardianEmail?.message}
                    >
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("emailPlaceholder")}
                      />
                    </FormField>
                  )}
                />
              </CardContent>
            )}
          </Card>

          {/* Clear Form Button - Text style, positioned safely */}
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-font-secondary hover:text-error-60 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            {t("clearForm")}
          </button>
        </div>

        {/* Right Column - Image Upload (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="outlined" className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{t("images")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dropzone */}
              <ImageDropzone
                images={images}
                onImagesChange={setImages}
                dropzoneText={t("dropzoneText")}
                dropzoneActiveText={t("dropzoneActiveText")}
              />

              {/* Image Gallery */}
              {images.length > 0 && (
                <ImageGallery
                  images={images}
                  onRemove={handleRemoveImage}
                  onLabelChange={handleLabelChange}
                  locale={locale as "en" | "es"}
                  emptyMessage={t("noImages")}
                />
              )}

              {/* Form Error for Images */}
              {errors.images && (
                <p className="text-sm text-error-60">{errors.images.message}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Button - Fixed at bottom on mobile */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={!canSubmit || isSubmitting}
          isLoading={isSubmitting}
          className="w-full sm:w-auto"
        >
          {t("continue")}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </form>
  );
}
