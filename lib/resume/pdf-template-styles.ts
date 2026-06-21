import type {
  ResumeDensityId,
  ResumeTemplateId,
} from "@/lib/assets/resume-data";
import {
  createClassicCompactDensityPdfStyles,
  createClassicProfessionalDensityPdfStyles,
} from "@/lib/resume/templates/classic-pdf-styles";
import {
  createModernCompactDensityPdfStyles,
  createModernProfessionalDensityPdfStyles,
} from "@/lib/resume/templates/modern-pdf-styles";

export type { ResumePdfLayout } from "@/lib/resume/templates/pdf-types";

export type ResumePdfTemplateStyles =
  | ReturnType<typeof createClassicProfessionalDensityPdfStyles>
  | ReturnType<typeof createClassicCompactDensityPdfStyles>
  | ReturnType<typeof createModernProfessionalDensityPdfStyles>
  | ReturnType<typeof createModernCompactDensityPdfStyles>;

function getClassicPdfDensityStyles(density: ResumeDensityId) {
  return density === "compact"
    ? createClassicCompactDensityPdfStyles()
    : createClassicProfessionalDensityPdfStyles();
}

function getModernPdfDensityStyles(density: ResumeDensityId) {
  return density === "compact"
    ? createModernCompactDensityPdfStyles()
    : createModernProfessionalDensityPdfStyles();
}

/** Resolves PDF styles from visual template + density. */
export function getPdfTemplateStyles(
  templateId: ResumeTemplateId,
  density: ResumeDensityId
) {
  switch (templateId) {
    case "modern":
      return getModernPdfDensityStyles(density);
    case "classic":
    default:
      return getClassicPdfDensityStyles(density);
  }
}
