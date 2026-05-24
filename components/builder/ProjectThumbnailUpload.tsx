"use client";

import { useRef } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  builderFocusRing,
  builderLabelClassName,
} from "@/components/builder/builder-styles";
import { readImageAsDataUrl } from "@/lib/read-image-file";
import { cn } from "@/lib/utils";

type ProjectThumbnailUploadProps = {
  thumbnailUrl: string;
  projectTitle: string;
  onChange: (url: string) => void;
};

export function ProjectThumbnailUpload({
  thumbnailUrl,
  projectTitle,
  onChange,
}: ProjectThumbnailUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = `thumbnail-${projectTitle.replace(/\s+/g, "-").slice(0, 20) || "project"}`;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    readImageAsDataUrl(file, onChange);
    e.target.value = "";
  }

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className={builderLabelClassName}>
        Thumbnail
      </label>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "relative aspect-[16/10] w-full max-w-[140px] shrink-0 overflow-hidden rounded-lg border",
            thumbnailUrl
              ? "border-white/[0.06] bg-white/[0.02]"
              : "border-dashed border-white/[0.08] bg-white/[0.02]"
          )}
        >
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={
                projectTitle.trim()
                  ? `${projectTitle} thumbnail`
                  : "Project thumbnail"
              }
              fill
              unoptimized
              sizes="140px"
              className="object-cover"
            />
          ) : (
            <div
              className="flex size-full items-center justify-center text-zinc-500"
              aria-hidden
            >
              <ImagePlus className="size-5" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-0.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "h-8 border-white/10 bg-transparent text-xs text-zinc-400 hover:bg-white/5 hover:text-white",
              builderFocusRing
            )}
            onClick={() => inputRef.current?.click()}
          >
            Upload image
          </Button>
          {thumbnailUrl ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 justify-start px-2 text-xs text-zinc-500 hover:text-zinc-300",
                builderFocusRing
              )}
              onClick={() => {
                onChange("");
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <X className="size-3" aria-hidden />
              Remove
            </Button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFileChange}
          aria-label="Upload project thumbnail"
        />
      </div>
    </div>
  );
}
