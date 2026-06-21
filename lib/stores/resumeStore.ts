import { create } from "zustand";
import {
  createEmptyResumeAssetData,
  type ResumeAssetData,
  type ResumeCertification,
  type ResumeEducation,
  type ResumeExperience,
  type ResumeLanguage,
  type ResumeLink,
  type ResumePersonal,
  type ResumeSkill,
  type ResumeTemplateId,
  type ResumeDensityId,
} from "@/lib/assets/resume-data";

export type ResumeSyncStatus =
  | "idle"
  | "loading"
  | "saving"
  | "saved"
  | "error";

type ResumeState = {
  data: ResumeAssetData;
  assetTitle: string;
  activeAssetId: string | null;
  syncStatus: ResumeSyncStatus;
  syncError: string | null;
  isHydrated: boolean;
  setPersonalField: <K extends keyof ResumePersonal>(
    field: K,
    value: ResumePersonal[K]
  ) => void;
  setSummary: (summary: string) => void;
  setTemplateId: (templateId: ResumeTemplateId) => void;
  setDensity: (density: ResumeDensityId) => void;
  addExperience: () => void;
  updateExperience: (
    id: string,
    field: keyof Omit<ResumeExperience, "id">,
    value: ResumeExperience[keyof Omit<ResumeExperience, "id">]
  ) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (
    id: string,
    field: keyof Omit<ResumeEducation, "id">,
    value: ResumeEducation[keyof Omit<ResumeEducation, "id">]
  ) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, name: string) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (
    id: string,
    field: keyof Omit<ResumeLanguage, "id">,
    value: ResumeLanguage[keyof Omit<ResumeLanguage, "id">]
  ) => void;
  removeLanguage: (id: string) => void;
  addCertification: () => void;
  updateCertification: (
    id: string,
    field: keyof Omit<ResumeCertification, "id">,
    value: ResumeCertification[keyof Omit<ResumeCertification, "id">]
  ) => void;
  removeCertification: (id: string) => void;
  addLink: () => void;
  updateLink: (
    id: string,
    field: keyof Omit<ResumeLink, "id">,
    value: ResumeLink[keyof Omit<ResumeLink, "id">]
  ) => void;
  removeLink: (id: string) => void;
  hydrateResume: (data: ResumeAssetData, assetTitle: string) => void;
  resetResume: () => void;
  setActiveAssetId: (assetId: string | null) => void;
  setSyncStatus: (status: ResumeSyncStatus, error?: string | null) => void;
  setHydrated: (hydrated: boolean) => void;
};

function createEmptySkill(): ResumeSkill {
  return {
    id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
  };
}

function createEmptyExperience(): ResumeExperience {
  return {
    id: `experience-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  };
}

function createEmptyEducation(): ResumeEducation {
  return {
    id: `education-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };
}

function createEmptyLanguage(): ResumeLanguage {
  return {
    id: `language-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    level: "",
  };
}

function createEmptyCertification(): ResumeCertification {
  return {
    id: `certification-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    issuer: "",
    date: "",
  };
}

function createEmptyLink(): ResumeLink {
  return {
    id: `link-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    label: "",
    url: "",
  };
}

export const useResumeStore = create<ResumeState>((set) => ({
  data: createEmptyResumeAssetData(),
  assetTitle: "",
  activeAssetId: null,
  syncStatus: "idle",
  syncError: null,
  isHydrated: false,
  setPersonalField: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        personal: { ...state.data.personal, [field]: value },
      },
    })),
  setSummary: (summary) =>
    set((state) => ({
      data: { ...state.data, summary },
    })),
  setTemplateId: (templateId) =>
    set((state) => ({
      data: { ...state.data, templateId },
    })),
  setDensity: (density) =>
    set((state) => ({
      data: { ...state.data, density },
    })),
  addExperience: () =>
    set((state) => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, createEmptyExperience()],
      },
    })),
  updateExperience: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((entry) => {
          if (entry.id !== id) return entry;

          const updated: ResumeExperience = { ...entry, [field]: value };
          if (field === "isCurrent" && value === true) {
            updated.endDate = "";
          }

          return updated;
        }),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((entry) => entry.id !== id),
      },
    })),
  addEducation: () =>
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, createEmptyEducation()],
      },
    })),
  updateEducation: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        ),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((entry) => entry.id !== id),
      },
    })),
  addSkill: () =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, createEmptySkill()],
      },
    })),
  updateSkill: (id, name) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((skill) =>
          skill.id === id ? { ...skill, name } : skill
        ),
      },
    })),
  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill.id !== id),
      },
    })),
  addLanguage: () =>
    set((state) => ({
      data: {
        ...state.data,
        languages: [...state.data.languages, createEmptyLanguage()],
      },
    })),
  updateLanguage: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: state.data.languages.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        ),
      },
    })),
  removeLanguage: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: state.data.languages.filter((entry) => entry.id !== id),
      },
    })),
  addCertification: () =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: [...state.data.certifications, createEmptyCertification()],
      },
    })),
  updateCertification: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: state.data.certifications.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        ),
      },
    })),
  removeCertification: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: state.data.certifications.filter((entry) => entry.id !== id),
      },
    })),
  addLink: () =>
    set((state) => ({
      data: {
        ...state.data,
        links: [...state.data.links, createEmptyLink()],
      },
    })),
  updateLink: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        links: state.data.links.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        ),
      },
    })),
  removeLink: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        links: state.data.links.filter((entry) => entry.id !== id),
      },
    })),
  hydrateResume: (data, assetTitle) =>
    set({
      data,
      assetTitle,
      isHydrated: true,
    }),
  resetResume: () =>
    set({
      data: createEmptyResumeAssetData(),
      assetTitle: "",
      activeAssetId: null,
      syncStatus: "idle",
      syncError: null,
      isHydrated: false,
    }),
  setActiveAssetId: (assetId) => set({ activeAssetId: assetId }),
  setSyncStatus: (status, error = null) =>
    set({ syncStatus: status, syncError: error }),
  setHydrated: (hydrated) => set({ isHydrated: hydrated }),
}));

export const useResumeData = () => useResumeStore((state) => state.data);

export const useResumeAssetTitle = () =>
  useResumeStore((state) => state.assetTitle);

export const useResumeSyncStatus = () =>
  useResumeStore((state) => state.syncStatus);

export const useResumeSyncError = () =>
  useResumeStore((state) => state.syncError);

export const useResumeIsHydrated = () =>
  useResumeStore((state) => state.isHydrated);

export const useSetResumePersonalField = () =>
  useResumeStore((state) => state.setPersonalField);

export const useSetResumeSummary = () =>
  useResumeStore((state) => state.setSummary);

export const useSetResumeTemplateId = () =>
  useResumeStore((state) => state.setTemplateId);

export const useSetResumeDensity = () =>
  useResumeStore((state) => state.setDensity);

export const useAddResumeExperience = () =>
  useResumeStore((state) => state.addExperience);

export const useUpdateResumeExperience = () =>
  useResumeStore((state) => state.updateExperience);

export const useRemoveResumeExperience = () =>
  useResumeStore((state) => state.removeExperience);

export const useAddResumeEducation = () =>
  useResumeStore((state) => state.addEducation);

export const useUpdateResumeEducation = () =>
  useResumeStore((state) => state.updateEducation);

export const useRemoveResumeEducation = () =>
  useResumeStore((state) => state.removeEducation);

export const useAddResumeSkill = () => useResumeStore((state) => state.addSkill);

export const useUpdateResumeSkill = () =>
  useResumeStore((state) => state.updateSkill);

export const useRemoveResumeSkill = () =>
  useResumeStore((state) => state.removeSkill);

export const useAddResumeLanguage = () =>
  useResumeStore((state) => state.addLanguage);

export const useUpdateResumeLanguage = () =>
  useResumeStore((state) => state.updateLanguage);

export const useRemoveResumeLanguage = () =>
  useResumeStore((state) => state.removeLanguage);

export const useAddResumeCertification = () =>
  useResumeStore((state) => state.addCertification);

export const useUpdateResumeCertification = () =>
  useResumeStore((state) => state.updateCertification);

export const useRemoveResumeCertification = () =>
  useResumeStore((state) => state.removeCertification);

export const useAddResumeLink = () => useResumeStore((state) => state.addLink);

export const useUpdateResumeLink = () =>
  useResumeStore((state) => state.updateLink);

export const useRemoveResumeLink = () =>
  useResumeStore((state) => state.removeLink);
