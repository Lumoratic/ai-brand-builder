import { createClient } from "@/lib/supabase/client";
import { profileToRow, rowToProfile } from "@/lib/profile/mappers";
import type { ProfileRow } from "@/lib/profile/types";
import type { BuilderProfile } from "@/lib/stores/builderStore";

export async function fetchProfile(userId: string): Promise<BuilderProfile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, full_name, role, tagline, bio, skills, avatar, links, projects, created_at, updated_at"
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  return rowToProfile(data as ProfileRow);
}

export async function saveProfile(
  userId: string,
  profile: BuilderProfile
): Promise<void> {
  const supabase = createClient();
  const row = profileToRow(userId, profile);

  const { error } = await supabase.from("profiles").upsert(row, {
    onConflict: "id",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteProfile(userId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("profiles").delete().eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
