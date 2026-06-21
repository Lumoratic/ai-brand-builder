import type {
  ResumeAssetData,
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguage,
  ResumeLink,
  ResumeSkill,
} from "@/lib/assets/resume-data";

export function hasResumeText(value: string): boolean {
  return value.trim().length > 0;
}

export function formatExperienceDates(entry: ResumeExperience): string | null {
  const start = entry.startDate.trim();
  const end = entry.isCurrent ? "Present" : entry.endDate.trim();

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return null;
}

export function formatEducationDates(entry: ResumeEducation): string | null {
  const start = entry.startDate.trim();
  const end = entry.endDate.trim();

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return null;
}

export function isExperienceVisible(entry: ResumeExperience): boolean {
  return (
    hasResumeText(entry.jobTitle) ||
    hasResumeText(entry.company) ||
    hasResumeText(entry.location) ||
    hasResumeText(entry.startDate) ||
    hasResumeText(entry.endDate) ||
    hasResumeText(entry.description)
  );
}

export function isEducationVisible(entry: ResumeEducation): boolean {
  return (
    hasResumeText(entry.degree) ||
    hasResumeText(entry.institution) ||
    hasResumeText(entry.location) ||
    hasResumeText(entry.startDate) ||
    hasResumeText(entry.endDate) ||
    hasResumeText(entry.description)
  );
}

export function isSkillVisible(entry: ResumeSkill): boolean {
  return hasResumeText(entry.name);
}

export function isLanguageVisible(entry: ResumeLanguage): boolean {
  return hasResumeText(entry.name) || hasResumeText(entry.level);
}

export function isCertificationVisible(entry: ResumeCertification): boolean {
  return (
    hasResumeText(entry.name) ||
    hasResumeText(entry.issuer) ||
    hasResumeText(entry.date)
  );
}

export function isLinkVisible(entry: ResumeLink): boolean {
  return hasResumeText(entry.label) || hasResumeText(entry.url);
}

export type ResumeContactItem = {
  key: string;
  label: string;
  href?: string;
};

export function getResumeContactItems(data: ResumeAssetData): ResumeContactItem[] {
  const items: ResumeContactItem[] = [];

  if (hasResumeText(data.personal.email)) {
    items.push({
      key: "email",
      label: data.personal.email.trim(),
      href: `mailto:${data.personal.email.trim()}`,
    });
  }
  if (hasResumeText(data.personal.phone)) {
    items.push({ key: "phone", label: data.personal.phone.trim() });
  }
  if (hasResumeText(data.personal.location)) {
    items.push({ key: "location", label: data.personal.location.trim() });
  }

  return items;
}

export function getResumeLinkItems(data: ResumeAssetData): ResumeLink[] {
  return data.links.filter(isLinkVisible);
}

export function resumeHasExportableContent(data: ResumeAssetData): boolean {
  const fullName = data.personal.fullName.trim();
  const professionalTitle = data.personal.professionalTitle.trim();
  const summary = data.summary.trim();

  return (
    Boolean(fullName || professionalTitle) ||
    getResumeContactItems(data).length > 0 ||
    Boolean(summary) ||
    data.experience.some(isExperienceVisible) ||
    data.education.some(isEducationVisible) ||
    data.skills.some(isSkillVisible) ||
    data.languages.some(isLanguageVisible) ||
    data.certifications.some(isCertificationVisible) ||
    data.links.some(isLinkVisible)
  );
}
