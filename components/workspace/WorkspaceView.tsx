"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AssetCard } from "@/components/workspace/AssetCard";
import { CreateAssetButtons } from "@/components/workspace/CreateAssetButtons";
import { CreateAssetModal } from "@/components/workspace/CreateAssetModal";
import { DeleteAssetModal } from "@/components/workspace/DeleteAssetModal";
import {
  createAsset,
  deleteAsset,
  getUserAssets,
} from "@/lib/assets/asset-service";
import type { AssetRow, AssetType } from "@/lib/assets/types";

export function WorkspaceView() {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id ?? null;
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pendingCreateType, setPendingCreateType] = useState<AssetType | null>(
    null
  );
  const [createError, setCreateError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const createInFlightRef = useRef(false);

  const [pendingDeleteAsset, setPendingDeleteAsset] = useState<AssetRow | null>(
    null
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteInFlightRef = useRef(false);

  const loadAssets = useCallback(async (ownerId: string, signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const rows = await getUserAssets(ownerId);
      if (signal?.aborted) return;
      setAssets(rows);
    } catch (err) {
      if (signal?.aborted) return;
      setError(err instanceof Error ? err.message : "Failed to load assets");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      setAssets([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    void loadAssets(userId, controller.signal);

    return () => {
      controller.abort();
    };
  }, [authLoading, userId, loadAssets]);

  function handleOpenCreate(type: AssetType) {
    if (!userId || isCreating || pendingCreateType) return;
    setCreateError(null);
    setPendingCreateType(type);
  }

  function handleCloseCreate() {
    if (isCreating) return;
    setPendingCreateType(null);
    setCreateError(null);
  }

  async function handleConfirmCreate(title: string) {
    if (!pendingCreateType || createInFlightRef.current || !userId) return;

    createInFlightRef.current = true;
    setIsCreating(true);
    setCreateError(null);

    try {
      const asset = await createAsset(userId, pendingCreateType, title);
      setAssets((current) => [asset, ...current]);
      setPendingCreateType(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create asset";
      console.error("[workspace] createAsset failed:", err);
      setCreateError(message);
    } finally {
      createInFlightRef.current = false;
      setIsCreating(false);
    }
  }

  function handleRequestDelete(asset: AssetRow) {
    if (isDeleting || pendingDeleteAsset) return;
    setDeleteError(null);
    setPendingDeleteAsset(asset);
  }

  function handleCloseDelete() {
    if (isDeleting) return;
    setPendingDeleteAsset(null);
    setDeleteError(null);
  }

  async function handleConfirmDelete() {
    if (!pendingDeleteAsset || deleteInFlightRef.current) return;

    deleteInFlightRef.current = true;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteAsset(pendingDeleteAsset.id);
      setAssets((current) =>
        current.filter((asset) => asset.id !== pendingDeleteAsset.id)
      );
      setPendingDeleteAsset(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete asset";
      console.error("[workspace] deleteAsset failed:", err);
      setDeleteError(message);
    } finally {
      deleteInFlightRef.current = false;
      setIsDeleting(false);
    }
  }

  const showEmptyState = !isLoading && assets.length === 0;
  const createModalOpen = pendingCreateType !== null;

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
        disabled={authLoading || !userId || createModalOpen || isCreating}
        onSelectType={handleOpenCreate}
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
              <AssetCard asset={asset} onDelete={handleRequestDelete} />
            </li>
          ))}
        </ul>
      )}

      <CreateAssetModal
        type={pendingCreateType}
        isSubmitting={isCreating}
        error={createError}
        onClose={handleCloseCreate}
        onConfirm={handleConfirmCreate}
      />

      <DeleteAssetModal
        asset={pendingDeleteAsset}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
