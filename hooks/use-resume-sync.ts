"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  assetRowToResumeEditorState,
  resumeDataToAssetPayload,
} from "@/lib/assets/resume-mappers";
import { getAssetById, updateAsset } from "@/lib/assets/asset-service";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { useResumeStore } from "@/lib/stores/resumeStore";

const SAVE_DEBOUNCE_MS = 900;

function getResumeAssetIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/builder\/resume\/([^/]+)/);
  return match?.[1] ?? null;
}

export function useResumeSync() {
  const { user } = useAuth();
  const pathname = usePathname();
  const assetId = getResumeAssetIdFromPath(pathname);
  const userId = user?.id ?? null;
  const isResumeEditorRoute = Boolean(assetId);

  const data = useResumeStore((state) => state.data);
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const hydrateResume = useResumeStore((state) => state.hydrateResume);
  const resetResume = useResumeStore((state) => state.resetResume);
  const setSyncStatus = useResumeStore((state) => state.setSyncStatus);
  const setHydrated = useResumeStore((state) => state.setHydrated);
  const setActiveAssetId = useResumeStore((state) => state.setActiveAssetId);

  const skipSaveRef = useRef(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasSupabaseEnv() || !isResumeEditorRoute || !assetId) return;

    if (!userId) {
      resetResume();
      skipSaveRef.current = true;
      setSyncStatus("idle");
      return;
    }

    let cancelled = false;
    skipSaveRef.current = true;
    setHydrated(false);
    setSyncStatus("loading");
    setActiveAssetId(assetId);

    getAssetById(assetId)
      .then((asset) => {
        if (cancelled) return;

        if (!asset || asset.type !== "resume") {
          setHydrated(true);
          skipSaveRef.current = true;
          setSyncStatus("error", "Resume asset not found.");
          return;
        }

        const editorState = assetRowToResumeEditorState(asset);
        hydrateResume(editorState.data, editorState.title);
        setSyncStatus("idle");
        skipSaveRef.current = false;
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setHydrated(true);
        skipSaveRef.current = true;
        setSyncStatus(
          "error",
          error instanceof Error ? error.message : "Failed to load asset"
        );
      });

    return () => {
      cancelled = true;
    };
  }, [
    assetId,
    userId,
    isResumeEditorRoute,
    hydrateResume,
    resetResume,
    setActiveAssetId,
    setHydrated,
    setSyncStatus,
  ]);

  useEffect(() => {
    if (isResumeEditorRoute) return;

    skipSaveRef.current = true;
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    resetResume();
  }, [isResumeEditorRoute, resetResume]);

  useEffect(() => {
    if (
      !hasSupabaseEnv() ||
      !isResumeEditorRoute ||
      !assetId ||
      !userId ||
      !isHydrated ||
      skipSaveRef.current
    ) {
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    setSyncStatus("saving");

    saveTimerRef.current = setTimeout(() => {
      const payload = resumeDataToAssetPayload(data);

      updateAsset(assetId, payload)
        .then(() => {
          setSyncStatus("saved");
        })
        .catch((error: unknown) => {
          setSyncStatus(
            "error",
            error instanceof Error ? error.message : "Failed to save asset"
          );
        });
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [data, assetId, userId, isHydrated, isResumeEditorRoute, setSyncStatus]);
}
