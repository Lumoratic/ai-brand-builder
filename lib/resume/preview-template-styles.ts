import type {
  ResumeDensityId,
  ResumeTemplateId,
} from "@/lib/assets/resume-data";
import {
  classicCompactDensityPreviewClasses,
  classicProfessionalDensityPreviewClasses,
} from "@/lib/resume/templates/classic-preview-styles";
import {
  modernCompactDensityPreviewClasses,
  modernProfessionalDensityPreviewClasses,
} from "@/lib/resume/templates/modern-preview-styles";

export type {
  ResumePreviewLayout,
  ResumePreviewTemplateClasses,
} from "@/lib/resume/templates/preview-types";

function getClassicPreviewDensityClasses(density: ResumeDensityId) {
  return density === "compact"
    ? classicCompactDensityPreviewClasses
    : classicProfessionalDensityPreviewClasses;
}

function getModernPreviewDensityClasses(density: ResumeDensityId) {
  return density === "compact"
    ? modernCompactDensityPreviewClasses
    : modernProfessionalDensityPreviewClasses;
}

/** Resolves preview classes from visual template + density. */
export function getPreviewTemplateClasses(
  templateId: ResumeTemplateId,
  density: ResumeDensityId
) {
  switch (templateId) {
    case "modern":
      return getModernPreviewDensityClasses(density);
    case "classic":
    default:
      return getClassicPreviewDensityClasses(density);
  }
}
