"use client";

import { useProfileSync } from "@/hooks/use-profile-sync";
import { useAssetSync } from "@/hooks/use-asset-sync";

export function ProfileSync() {
  useProfileSync();
  useAssetSync();
  return null;
}
