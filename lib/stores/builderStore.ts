import { create } from "zustand";
import type { ProfileLink } from "@/lib/profile/types";

export type FeaturedProject = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  thumbnailUrl: string;
  outcome: string;
};

export type BuilderProfile = {
  fullName: string;
  jobTitle: string;
  headline: string;
  bio: string;
  skills: string;
  avatarUrl: string;
  links: ProfileLink[];
  projects: FeaturedProject[];
};

export type ProfileSyncStatus =
  | "idle"
  | "loading"
  | "saving"
  | "saved"
  | "error";

type BuilderState = {
  profile: BuilderProfile;
  syncStatus: ProfileSyncStatus;
  syncError: string | null;
  isHydrated: boolean;
  setField: <K extends keyof Omit<BuilderProfile, "projects" | "links">>(
    field: K,
    value: BuilderProfile[K]
  ) => void;
  addProject: () => void;
  updateProject: (
    id: string,
    field: keyof Omit<FeaturedProject, "id">,
    value: string
  ) => void;
  removeProject: (id: string) => void;
  resetProfile: () => void;
  hydrateProfile: (profile: BuilderProfile) => void;
  setSyncStatus: (status: ProfileSyncStatus, error?: string | null) => void;
  setHydrated: (hydrated: boolean) => void;
};

export const MAX_FEATURED_PROJECTS = 3;

const defaultProfile: BuilderProfile = {
  fullName: "",
  jobTitle: "",
  headline: "",
  bio: "",
  skills: "",
  avatarUrl: "",
  links: [],
  projects: [],
};

function createEmptyProject(): FeaturedProject {
  return {
    id: `project-${Date.now()}`,
    title: "",
    description: "",
    techStack: "",
    thumbnailUrl: "",
    outcome: "",
  };
}

export function parseSkills(skills: string): string[] {
  return skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export const useBuilderStore = create<BuilderState>((set) => ({
  profile: defaultProfile,
  syncStatus: "idle",
  syncError: null,
  isHydrated: false,
  setField: (field, value) =>
    set((state) => ({
      profile: { ...state.profile, [field]: value },
    })),
  addProject: () =>
    set((state) => {
      if (state.profile.projects.length >= MAX_FEATURED_PROJECTS) {
        return state;
      }
      return {
        profile: {
          ...state.profile,
          projects: [...state.profile.projects, createEmptyProject()],
        },
      };
    }),
  updateProject: (id, field, value) =>
    set((state) => ({
      profile: {
        ...state.profile,
        projects: state.profile.projects.map((project) =>
          project.id === id ? { ...project, [field]: value } : project
        ),
      },
    })),
  removeProject: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        projects: state.profile.projects.filter((project) => project.id !== id),
      },
    })),
  resetProfile: () =>
    set({
      profile: { ...defaultProfile, projects: [], links: [] },
    }),
  hydrateProfile: (profile) =>
    set({
      profile: {
        ...defaultProfile,
        ...profile,
        links: profile.links ?? [],
        projects: profile.projects ?? [],
      },
    }),
  setSyncStatus: (status, error = null) =>
    set({ syncStatus: status, syncError: error }),
  setHydrated: (hydrated) => set({ isHydrated: hydrated }),
}));

/** Primitive/stable selectors — never return a new object from a selector. */
export const useBuilderProfile = () =>
  useBuilderStore((state) => state.profile);

export const useSetField = () => useBuilderStore((state) => state.setField);

export const useAddProject = () => useBuilderStore((state) => state.addProject);

export const useUpdateProject = () =>
  useBuilderStore((state) => state.updateProject);

export const useRemoveProject = () =>
  useBuilderStore((state) => state.removeProject);

export const useResetProfile = () =>
  useBuilderStore((state) => state.resetProfile);

export const useBuilderProjects = () =>
  useBuilderStore((state) => state.profile.projects);

export const useProfileSyncStatus = () =>
  useBuilderStore((state) => state.syncStatus);

export const useProfileSyncError = () =>
  useBuilderStore((state) => state.syncError);

export const useProfileIsHydrated = () =>
  useBuilderStore((state) => state.isHydrated);
