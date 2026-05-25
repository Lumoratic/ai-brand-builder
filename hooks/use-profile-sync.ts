"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { fetchProfile, saveProfile } from "@/lib/profile/profile-service";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { useBuilderStore } from "@/lib/stores/builderStore";

const SAVE_DEBOUNCE_MS = 900;

export function useProfileSync() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const profile = useBuilderStore((state) => state.profile);
  const isHydrated = useBuilderStore((state) => state.isHydrated);
  const hydrateProfile = useBuilderStore((state) => state.hydrateProfile);
  const resetProfile = useBuilderStore((state) => state.resetProfile);
  const setSyncStatus = useBuilderStore((state) => state.setSyncStatus);
  const setHydrated = useBuilderStore((state) => state.setHydrated);

  const skipSaveRef = useRef(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasSupabaseEnv()) return;

    if (!userId) {
      resetProfile();
      setHydrated(false);
      skipSaveRef.current = true;
      setSyncStatus("idle");
      return;
    }

    let cancelled = false;
    skipSaveRef.current = true;
    setHydrated(false);
    setSyncStatus("loading");

    fetchProfile(userId)
      .then((savedProfile) => {
        if (cancelled) return;

        if (savedProfile) {
          hydrateProfile(savedProfile);
        } else {
          resetProfile();
        }

        setHydrated(true);
        setSyncStatus("idle");
        skipSaveRef.current = false;
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setHydrated(true);
        skipSaveRef.current = false;
        setSyncStatus(
          "error",
          error instanceof Error ? error.message : "Failed to load profile"
        );
      });

    return () => {
      cancelled = true;
    };
  }, [
    userId,
    hydrateProfile,
    resetProfile,
    setHydrated,
    setSyncStatus,
  ]);

  useEffect(() => {
    if (!hasSupabaseEnv() || !userId || !isHydrated || skipSaveRef.current) {
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    setSyncStatus("saving");

    saveTimerRef.current = setTimeout(() => {
      saveProfile(userId, profile)
        .then(() => {
          setSyncStatus("saved");
        })
        .catch((error: unknown) => {
          setSyncStatus(
            "error",
            error instanceof Error ? error.message : "Failed to save profile"
          );
        });
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [profile, userId, isHydrated, setSyncStatus]);
}
