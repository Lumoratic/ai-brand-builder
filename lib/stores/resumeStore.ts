import { create } from "zustand";
import {
  createEmptyResumeAssetData,
  type ResumeAssetData,
  type ResumePersonal,
  type ResumeSkill,
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
  addSkill: () => void;
  updateSkill: (id: string, name: string) => void;
  removeSkill: (id: string) => void;
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

export const useAddResumeSkill = () => useResumeStore((state) => state.addSkill);

export const useUpdateResumeSkill = () =>
  useResumeStore((state) => state.updateSkill);

export const useRemoveResumeSkill = () =>
  useResumeStore((state) => state.removeSkill);
