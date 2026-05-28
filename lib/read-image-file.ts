export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export function shouldUnoptimizeImageSrc(src: string): boolean {
  return src.startsWith("data:") || src.startsWith("blob:");
}

export function readImageAsDataUrl(
  file: File,
  onLoad: (dataUrl: string) => void
): boolean {
  if (!file.type.startsWith("image/")) return false;
  if (file.size > MAX_IMAGE_SIZE) return false;

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") onLoad(reader.result);
  };
  reader.readAsDataURL(file);
  return true;
}
