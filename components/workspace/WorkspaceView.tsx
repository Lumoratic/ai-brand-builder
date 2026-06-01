"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AssetCard } from "@/components/workspace/AssetCard";
import { CreateAssetButtons } from "@/components/workspace/CreateAssetButtons";
import { createAsset, getUserAssets } from "@/lib/assets/asset-service";
import type { AssetRow, AssetType } from "@/lib/assets/types";

export function WorkspaceView() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [creatingType, setCreatingType] = useState<AssetType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAssets = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const rows = await getUserAssets(userId);
      setAssets(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load assets");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setAssets([]);
      setIsLoading(false);
      return;
    }

    void loadAssets(user.id);
  }, [authLoading, user, loadAssets]);

  async function handleCreate(type: AssetType) {
    if (creatingType) return;

    if (!user) {
      const message = "Sign in to create assets.";
      setError(message);
      console.error("[workspace] createAsset blocked:", message);
      return;
    }

    setCreatingType(type);
    setError(null);

    try {
      const asset = await createAsset(user.id, type);

      if (type === "portfolio") {
        if (!asset.id) {
          throw new Error("Created portfolio asset is missing an id.");
        }
        router.push(`/builder/portfolio/${asset.id}`);
        return;
      }

      setAssets((current) => [asset, ...current]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create asset";
      console.error("[workspace] createAsset failed:", err);
      setError(message);
    } finally {
      setCreatingType(null);
    }
  }

  const showEmptyState = !isLoading && assets.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
          Your assets
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Resume, portfolio, and website drafts for your account.
        </p>
      </div>

      <CreateAssetButtons
        creatingType={creatingType}
        disabled={authLoading || !user}
        onCreate={handleCreate}
        className="mb-8"
      />

      {error ? (
        <p className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      {authLoading || isLoading ? (
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Loading assets…
        </div>
      ) : showEmptyState ? (
        <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-12 text-center">
          <p className="text-sm font-medium text-zinc-300">No assets yet</p>
          <p className="mt-1 text-sm text-zinc-500">
            Create a resume, portfolio, or website to get started.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <li key={asset.id}>
              <AssetCard asset={asset} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
