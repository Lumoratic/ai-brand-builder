import { createClient } from "@/lib/supabase/client";
import { MAX_IMAGE_SIZE } from "@/lib/read-image-file";

export const AVATAR_BUCKET = "avatars";

export const ALLOWED_AVATAR_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedAvatarMimeType = (typeof ALLOWED_AVATAR_MIME_TYPES)[number];

const MIME_TO_EXT: Record<AllowedAvatarMimeType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function isAllowedAvatarMimeType(type: string): type is AllowedAvatarMimeType {
  return ALLOWED_AVATAR_MIME_TYPES.includes(type as AllowedAvatarMimeType);
}

export function validateAvatarFile(file: File): string | null {
  if (!isAllowedAvatarMimeType(file.type)) {
    return "Only JPG, PNG, or WebP images are allowed.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Image must be 2MB or smaller.";
  }
  return null;
}

export function getAvatarExtension(mimeType: AllowedAvatarMimeType): string {
  return MIME_TO_EXT[mimeType];
}

export function buildAvatarStoragePath(userId: string, ext: string): string {
  return `${userId}/avatar-${Date.now()}.${ext}`;
}

export function isDataUrlAvatar(value: string): boolean {
  return value.startsWith("data:image/");
}

export function shouldUnoptimizeAvatar(value: string): boolean {
  return isDataUrlAvatar(value) || value.startsWith("blob:");
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const validationError = validateAvatarFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const mimeType = file.type as AllowedAvatarMimeType;
  const ext = getAvatarExtension(mimeType);
  const path = buildAvatarStoragePath(userId, ext);
  const supabase = createClient();

  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: mimeType,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);

  if (!publicUrl) {
    throw new Error("Failed to resolve avatar URL.");
  }

  return publicUrl;
}
