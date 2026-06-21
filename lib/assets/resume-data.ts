export const RESUME_ASSET_DATA_VERSION = 1 as const;

/** Visual resume design — controls layout identity and styling. */
export const RESUME_TEMPLATE_IDS = ["classic", "modern", "sidebar"] as const;
export type ResumeTemplateId = (typeof RESUME_TEMPLATE_IDS)[number];
export const DEFAULT_RESUME_TEMPLATE_ID: ResumeTemplateId = "classic";

/** Spacing mode — controls how much content fits per page. */
export const RESUME_DENSITY_IDS = ["professional", "compact"] as const;
export type ResumeDensityId = (typeof RESUME_DENSITY_IDS)[number];
export const DEFAULT_RESUME_DENSITY_ID: ResumeDensityId = "professional";

export type ResumePersonal = {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
};

export type ResumeExperience = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

export type ResumeEducation = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ResumeSkill = {
  id: string;
  name: string;
};

export type ResumeLanguage = {
  id: string;
  name: string;
  level: string;
};

export type ResumeCertification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type ResumeProject = {
  id: string;
  name: string;
  description: string;
  link: string;
};

export type ResumeLink = {
  id: string;
  label: string;
  url: string;
};

/** Resume editor payload stored in assets.data (jsonb). */
export type ResumeAssetData = {
  version: typeof RESUME_ASSET_DATA_VERSION;
  templateId: ResumeTemplateId;
  density: ResumeDensityId;
  personal: ResumePersonal;
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
  certifications: ResumeCertification[];
  projects: ResumeProject[];
  links: ResumeLink[];
};

const RESUME_ASSET_DATA_TOP_LEVEL_KEYS = [
  "version",
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "certifications",
  "projects",
  "links",
] as const satisfies readonly (keyof ResumeAssetData)[];

function emptyPersonal(): ResumePersonal {
  return {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
  };
}

export function createEmptyResumeAssetData(): ResumeAssetData {
  return {
    version: RESUME_ASSET_DATA_VERSION,
    templateId: DEFAULT_RESUME_TEMPLATE_ID,
    density: DEFAULT_RESUME_DENSITY_ID,
    personal: emptyPersonal(),
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    links: [],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isResumeAssetData(value: unknown): value is ResumeAssetData {
  if (!isRecord(value)) return false;
  if (value.version !== RESUME_ASSET_DATA_VERSION) return false;

  return RESUME_ASSET_DATA_TOP_LEVEL_KEYS.every((key) => key in value);
}
