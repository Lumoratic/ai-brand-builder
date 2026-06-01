"use client";

import { useEffect, useState } from "react";
import { isAssetSlugAvailable } from "@/lib/assets/asset-service";
import {
  isValidSlug,
  sanitizeSlug,
  type SlugAvailabilityStatus,
} from "@/lib/assets/slug";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const CHECK_DEBOUNCE_MS = 450;

export function useAssetSlugAvailability(
  slug: string,
  userId: string | undefined,
  assetId: string | undefined
) {
  const [status, setStatus] = useState<SlugAvailabilityStatus>("idle");

  useEffect(() => {
    const normalized = sanitizeSlug(slug);

    if (!normalized) {
      setStatus("required");
      return;
    }

    if (!isValidSlug(normalized)) {
      setStatus("invalid");
      return;
    }

    if (!userId || !hasSupabaseEnv()) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    let cancelled = false;
    const timer = setTimeout(() => {
      isAssetSlugAvailable(userId, normalized, assetId)
        .then((available) => {
          if (cancelled) return;
          setStatus(available ? "available" : "taken");
        })
        .catch(() => {
          if (cancelled) return;
          setStatus("idle");
        });
    }, CHECK_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [slug, userId, assetId]);

  return status;
}
