import type { FeaturedProject } from "@/lib/stores/builderStore";

export type ProfileLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type ProfileRow = {
  id: string;
  full_name: string;
  role: string;
  tagline: string;
  bio: string;
  skills: string;
  avatar: string;
  links: ProfileLink[];
  projects: FeaturedProject[];
  created_at: string;
  updated_at: string;
};

export type ProfileInsert = Omit<ProfileRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type ProfileUpdate = Partial<
  Omit<ProfileRow, "id" | "created_at">
> & {
  id: string;
};
