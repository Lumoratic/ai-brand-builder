"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  assetRowToPortfolioEditorState,
  portfolioEditorStateToAssetPayload,
} from "@/lib/assets/mappers";
import { getAssetById, updateAsset } from "@/lib/assets/asset-service";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { useBuilderStore } from "@/lib/stores/builderStore";

const SAVE_DEBOUNCE_MS = 900;

function getPortfolioAssetIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/builder\/portfolio\/([^/]+)/);
  return match?.[1] ?? null;
}

export function useAssetSync() {
  const { user } = useAuth();
  const pathname = usePathname();
  const assetId = getPortfolioAssetIdFromPath(pathname);
  const userId = user?.id ?? null;
  const isAssetEditorRoute = Boolean(assetId);

  const profile = useBuilderStore((state) => state.profile);
  const portfolioSlug = useBuilderStore((state) => state.portfolioSlug);
  const isHydrated = useBuilderStore((state) => state.isHydrated);
  const hydrateProfile = useBuilderStore((state) => state.hydrateProfile);
  const resetProfile = useBuilderStore((state) => state.resetProfile);
  const setSyncStatus = useBuilderStore((state) => state.setSyncStatus);
  const setHydrated = useBuilderStore((state) => state.setHydrated);
  const setEditorMode = useBuilderStore((state) => state.setEditorMode);
  const setActiveAssetId = useBuilderStore((state) => state.setActiveAssetId);
  const setPortfolioSlug = useBuilderStore((state) => state.setPortfolioSlug);
  const resetAssetEditor = useBuilderStore((state) => state.resetAssetEditor);

  const skipSaveRef = useRef(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasSupabaseEnv() || !isAssetEditorRoute || !assetId) return;

    if (!userId) {
      resetProfile();
      resetAssetEditor();
      setHydrated(false);
      skipSaveRef.current = true;
      setSyncStatus("idle");
      return;
    }

    let cancelled = false;
    skipSaveRef.current = true;
    setHydrated(false);
    setSyncStatus("loading");
    setEditorMode("asset");
    setActiveAssetId(assetId);

    getAssetById(assetId)
      .then((asset) => {
        if (cancelled) return;

        if (!asset || asset.type !== "portfolio") {
          setHydrated(true);
          skipSaveRef.current = false;
          setSyncStatus("error", "Portfolio asset not found.");
          return;
        }

        const editorState = assetRowToPortfolioEditorState(asset);
        hydrateProfile(editorState.profile);
        setPortfolioSlug(editorState.portfolioSlug);
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
          error instanceof Error ? error.message : "Failed to load asset"
        );
      });

    return () => {
      cancelled = true;
    };
  }, [
    assetId,
    userId,
    isAssetEditorRoute,
    hydrateProfile,
    resetProfile,
    resetAssetEditor,
    setActiveAssetId,
    setEditorMode,
    setHydrated,
    setPortfolioSlug,
    setSyncStatus,
  ]);

  useEffect(() => {
    if (isAssetEditorRoute) return;

    resetAssetEditor();
  }, [isAssetEditorRoute, resetAssetEditor]);

  useEffect(() => {
    if (
      !hasSupabaseEnv() ||
      !isAssetEditorRoute ||
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
      const payload = portfolioEditorStateToAssetPayload({
        profile,
        portfolioSlug,
      });

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
  }, [
    profile,
    portfolioSlug,
    assetId,
    userId,
    isHydrated,
    isAssetEditorRoute,
    setSyncStatus,
  ]);
}
