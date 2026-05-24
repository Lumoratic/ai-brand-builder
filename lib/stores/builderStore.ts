import { create } from "zustand";

export type BuilderProfile = {
  fullName: string;
  jobTitle: string;
  bio: string;
  skills: string;
};

type BuilderState = {
  profile: BuilderProfile;
  setField: <K extends keyof BuilderProfile>(
    field: K,
    value: BuilderProfile[K]
  ) => void;
  resetProfile: () => void;
};

const defaultProfile: BuilderProfile = {
  fullName: "",
  jobTitle: "",
  bio: "",
  skills: "",
};

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
  resetProfile: () => set({ profile: { ...defaultProfile } }),
}));

/** Primitive/stable selectors — never return a new object from a selector. */
export const useBuilderProfile = () =>
  useBuilderStore((state) => state.profile);

export const useSetField = () => useBuilderStore((state) => state.setField);

export const useResetProfile = () =>
  useBuilderStore((state) => state.resetProfile);
