import type {
  ResumeDensityId,
  ResumeTemplateId,
} from "@/lib/assets/resume-data";
import {
  DEFAULT_RESUME_DENSITY_ID,
  DEFAULT_RESUME_TEMPLATE_ID,
} from "@/lib/assets/resume-data";

export type ResumeTemplateOption = {
  id: ResumeTemplateId;
  label: string;
  description: string;
};

export type ResumeDensityOption = {
  id: ResumeDensityId;
  label: string;
  description: string;
};

/** Visual templates available in the builder UI. */
export const RESUME_TEMPLATE_OPTIONS: ResumeTemplateOption[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Traditional resume with understated section labels.",
  },
  {
    id: "modern",
    label: "Modern",
    description: "Bold header, accent sections, and refined typography.",
  },
];

export const RESUME_DENSITY_OPTIONS: ResumeDensityOption[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Balanced spacing and readable section rhythm.",
  },
  {
    id: "compact",
    label: "Compact",
    description: "Tighter spacing to fit more content per page.",
  },
];

export type ResumeRenderSettings = {
  templateId: ResumeTemplateId;
  density: ResumeDensityId;
};

export function parseResumeTemplateId(value: unknown): ResumeTemplateId {
  if (value === "modern") return "modern";
  if (value === "classic") return "classic";
  return DEFAULT_RESUME_TEMPLATE_ID;
}

export function parseResumeDensityId(value: unknown): ResumeDensityId {
  if (value === "compact") return "compact";
  return DEFAULT_RESUME_DENSITY_ID;
}

/**
 * Migrates legacy data where templateId stored density ("professional" | "compact").
 * New format stores visual template in templateId and spacing in density.
 */
export function parseResumeRenderSettings(value: Record<string, unknown>): ResumeRenderSettings {
  const rawTemplateId = value.templateId;
  const rawDensity = value.density;

  if (rawDensity === "professional" || rawDensity === "compact") {
    return {
      templateId: parseResumeTemplateId(rawTemplateId),
      density: rawDensity,
    };
  }

  if (rawTemplateId === "compact") {
    return { templateId: "classic", density: "compact" };
  }

  if (rawTemplateId === "professional") {
    return { templateId: "classic", density: "professional" };
  }

  return {
    templateId: parseResumeTemplateId(rawTemplateId),
    density: DEFAULT_RESUME_DENSITY_ID,
  };
}

export function resolveResumeRenderSettings(
  templateId: ResumeTemplateId | undefined,
  density: ResumeDensityId | undefined
): ResumeRenderSettings {
  return {
    templateId: templateId ?? DEFAULT_RESUME_TEMPLATE_ID,
    density: density ?? DEFAULT_RESUME_DENSITY_ID,
  };
}
