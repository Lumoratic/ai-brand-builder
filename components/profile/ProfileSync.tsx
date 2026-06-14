"use client";

import { useProfileSync } from "@/hooks/use-profile-sync";
import { useAssetSync } from "@/hooks/use-asset-sync";
import { useResumeSync } from "@/hooks/use-resume-sync";

export function ProfileSync() {
  useProfileSync();
  useAssetSync();
  useResumeSync();
  return null;
}
