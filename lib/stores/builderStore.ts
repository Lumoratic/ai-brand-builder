import { create } from "zustand";

export type FeaturedProject = {
  id: string;
  title: string;
  description: string;
  link: string;
  techStack: string;
};

export type BuilderProfile = {
  fullName: string;
  jobTitle: string;
  headline: string;
  bio: string;
  skills: string;
  avatarUrl: string;
  projects: FeaturedProject[];
};

type BuilderState = {
  profile: BuilderProfile;
  setField: <K extends keyof Omit<BuilderProfile, "projects">>(
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
};

export const MAX_FEATURED_PROJECTS = 3;

const defaultProfile: BuilderProfile = {
  fullName: "",
  jobTitle: "",
  headline: "",
  bio: "",
  skills: "",
  avatarUrl: "",
  projects: [],
};

function createEmptyProject(): FeaturedProject {
  return {
    id: `project-${Date.now()}`,
    title: "",
    description: "",
    link: "",
    techStack: "",
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
  resetProfile: () => set({ profile: { ...defaultProfile, projects: [] } }),
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
