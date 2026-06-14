import type { Json } from "@/lib/database.types";
import type { AssetRow } from "@/lib/assets/types";
import {
  createEmptyResumeAssetData,
  isResumeAssetData,
  type ResumeAssetData,
  type ResumeEducation,
  type ResumeExperience,
  type ResumePersonal,
} from "@/lib/assets/resume-data";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePersonal(value: unknown): ResumePersonal {
  const empty = createEmptyResumeAssetData().personal;
  if (!isRecord(value)) return empty;

  return {
    fullName: typeof value.fullName === "string" ? value.fullName : empty.fullName,
    professionalTitle:
      typeof value.professionalTitle === "string"
        ? value.professionalTitle
        : empty.professionalTitle,
    email: typeof value.email === "string" ? value.email : empty.email,
    phone: typeof value.phone === "string" ? value.phone : empty.phone,
    location: typeof value.location === "string" ? value.location : empty.location,
    website: typeof value.website === "string" ? value.website : empty.website,
    linkedin: typeof value.linkedin === "string" ? value.linkedin : empty.linkedin,
  };
}

function parseExperience(value: unknown): ResumeExperience[] {
  if (!Array.isArray(value)) return [];

  return value.map((item, index) => {
    if (!isRecord(item)) {
      return {
        id: `experience-${index}`,
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      };
    }

    const isCurrent = item.isCurrent === true;

    return {
      id: typeof item.id === "string" ? item.id : `experience-${index}`,
      jobTitle: typeof item.jobTitle === "string" ? item.jobTitle : "",
      company: typeof item.company === "string" ? item.company : "",
      location: typeof item.location === "string" ? item.location : "",
      startDate: typeof item.startDate === "string" ? item.startDate : "",
      endDate: isCurrent
        ? ""
        : typeof item.endDate === "string"
          ? item.endDate
          : "",
      isCurrent,
      description: typeof item.description === "string" ? item.description : "",
    };
  });
}

function parseEducation(value: unknown): ResumeEducation[] {
  if (!Array.isArray(value)) return [];

  return value.map((item, index) => {
    if (!isRecord(item)) {
      return {
        id: `education-${index}`,
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      };
    }

    return {
      id: typeof item.id === "string" ? item.id : `education-${index}`,
      degree: typeof item.degree === "string" ? item.degree : "",
      institution: typeof item.institution === "string" ? item.institution : "",
      location: typeof item.location === "string" ? item.location : "",
      startDate: typeof item.startDate === "string" ? item.startDate : "",
      endDate: typeof item.endDate === "string" ? item.endDate : "",
      description: typeof item.description === "string" ? item.description : "",
    };
  });
}

export function parseResumeAssetData(value: Json | unknown): ResumeAssetData {
  const empty = createEmptyResumeAssetData();
  if (!isResumeAssetData(value)) return empty;

  return {
    ...empty,
    version: value.version,
    personal: parsePersonal(value.personal),
    summary: typeof value.summary === "string" ? value.summary : "",
    experience: parseExperience(value.experience),
    education: parseEducation(value.education),
    skills: Array.isArray(value.skills) ? value.skills : [],
    languages: Array.isArray(value.languages) ? value.languages : [],
    certifications: Array.isArray(value.certifications) ? value.certifications : [],
    projects: Array.isArray(value.projects) ? value.projects : [],
    links: Array.isArray(value.links) ? value.links : [],
  };
}

export type ResumeEditorState = {
  data: ResumeAssetData;
  title: string;
};

export function assetRowToResumeEditorState(asset: AssetRow): ResumeEditorState {
  return {
    data: parseResumeAssetData(asset.data),
    title: asset.title,
  };
}

export function resumeDataToAssetPayload(data: ResumeAssetData): { data: ResumeAssetData } {
  return { data };
}
