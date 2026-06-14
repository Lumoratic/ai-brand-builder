import type { Json } from "@/lib/database.types";
import type { AssetRow } from "@/lib/assets/types";
import {
  createEmptyResumeAssetData,
  isResumeAssetData,
  type ResumeAssetData,
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

export function parseResumeAssetData(value: Json | unknown): ResumeAssetData {
  const empty = createEmptyResumeAssetData();
  if (!isResumeAssetData(value)) return empty;

  return {
    ...empty,
    version: value.version,
    personal: parsePersonal(value.personal),
    summary: typeof value.summary === "string" ? value.summary : "",
    experience: Array.isArray(value.experience) ? value.experience : [],
    education: Array.isArray(value.education) ? value.education : [],
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
