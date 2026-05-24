"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  builderFocusRing,
  builderHelperClassName,
  builderLabelClassName,
} from "@/components/builder/builder-styles";
import { readImageAsDataUrl } from "@/lib/read-image-file";
import { useSetField } from "@/lib/stores/builderStore";
import { getInitials } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

type AvatarUploadProps = {
  fullName: string;
  avatarUrl: string;
};

export function AvatarUpload({ fullName, avatarUrl }: AvatarUploadProps) {
  const setField = useSetField();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = "avatar-upload";
  const initials = getInitials(fullName);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    readImageAsDataUrl(file, (dataUrl) => setField("avatarUrl", dataUrl));
    e.target.value = "";
  }

  function clearAvatar() {
    setField("avatarUrl", "");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className={builderLabelClassName}>
        Profile photo
      </label>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative size-16 shrink-0 overflow-hidden rounded-2xl border",
            avatarUrl
              ? "border-violet-500/30 bg-white/[0.03]"
              : "border-white/[0.08] bg-[linear-gradient(145deg,oklch(0.32_0.14_280)_0%,oklch(0.22_0.1_300)_100%)] text-sm font-semibold text-white/90"
          )}
          aria-hidden={!avatarUrl}
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={fullName.trim() ? `${fullName} avatar` : "Profile avatar"}
              fill
              unoptimized
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <span className="flex size-full items-center justify-center">
              {initials}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
              builderFocusRing
            )}
            onClick={() => inputRef.current?.click()}
          >
            <Camera className="size-3.5" aria-hidden />
            Upload photo
          </Button>
          {avatarUrl ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn("text-zinc-500 hover:text-zinc-300", builderFocusRing)}
              onClick={clearAvatar}
            >
              <X className="size-3.5" aria-hidden />
              Remove
            </Button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={handleFileChange}
          aria-label="Upload profile photo"
        />
      </div>
      <p className={builderHelperClassName}>PNG, JPG or WebP · Max 2MB</p>
    </div>
  );
}
