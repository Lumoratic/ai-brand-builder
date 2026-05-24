"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { builderInputClassName, builderLabelClassName } from "@/components/builder/builder-styles";
import { useSetField } from "@/lib/stores/builderStore";
import { getInitials } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

type AvatarUploadProps = {
  fullName: string;
  avatarUrl: string;
};

export function AvatarUpload({ fullName, avatarUrl }: AvatarUploadProps) {
  const setField = useSetField();
  const inputRef = useRef<HTMLInputElement>(null);
  const initials = getInitials(fullName);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_FILE_SIZE) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setField("avatarUrl", reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function clearAvatar() {
    setField("avatarUrl", "");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      <span className={builderLabelClassName}>Profile photo</span>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
            avatarUrl
              ? "border-violet-500/30 bg-white/[0.03]"
              : "border-white/[0.08] bg-white/[0.03] text-sm font-semibold text-zinc-500"
          )}
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={fullName.trim() ? `${fullName} avatar` : "Profile avatar"}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="flex flex-1 flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
            onClick={() => inputRef.current?.click()}
          >
            <Camera className="size-3.5" />
            Upload photo
          </Button>
          {avatarUrl ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-zinc-500 hover:text-zinc-300"
              onClick={clearAvatar}
            >
              <X className="size-3.5" />
              Remove
            </Button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-xs text-zinc-600">PNG, JPG or WebP · Max 2MB</p>
    </div>
  );
}
