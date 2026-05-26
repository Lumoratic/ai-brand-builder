import { createClient } from "@/lib/supabase/client";
import { profileToRow, rowToProfile } from "@/lib/profile/mappers";
import type { ProfileRow } from "@/lib/profile/types";
import {
  formatUsernameConflictError,
  isUsernameConflictError,
} from "@/lib/profile/username";
import type { BuilderProfile } from "@/lib/stores/builderStore";

const PROFILE_SELECT =
  "id, full_name, role, tagline, bio, skills, avatar, username, is_published, links, projects, created_at, updated_at";

export async function fetchProfile(userId: string): Promise<BuilderProfile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_SELECT)
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
    throw new Error(
      isUsernameConflictError(error.message)
        ? formatUsernameConflictError()
        : error.message
    );
  }
}

export async function deleteProfile(userId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("profiles").delete().eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function isUsernameAvailable(
  username: string,
  currentUserId: string
): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("is_username_available", {
    p_username: username,
    p_user_id: currentUserId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}
