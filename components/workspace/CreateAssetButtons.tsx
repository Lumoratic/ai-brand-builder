"use client";

import { FileText, Globe, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AssetType } from "@/lib/assets/types";
import { ASSET_TYPE_LABELS } from "@/lib/assets/types";
import { cn } from "@/lib/utils";

const CREATE_OPTIONS: {
  type: AssetType;
  icon: typeof FileText;
  description: string;
}[] = [
  {
    type: "resume",
    icon: FileText,
    description: "Start a resume draft",
  },
  {
    type: "portfolio",
    icon: LayoutGrid,
    description: "Start a portfolio draft",
  },
  {
    type: "website",
    icon: Globe,
    description: "Start a website draft",
  },
];

type CreateAssetButtonsProps = {
  disabled?: boolean;
  onSelectType: (type: AssetType) => void;
  className?: string;
};

export function CreateAssetButtons({
  disabled = false,
  onSelectType,
  className,
}: CreateAssetButtonsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {CREATE_OPTIONS.map(({ type, icon: Icon, description }) => (
        <Button
          key={type}
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => onSelectType(type)}
          className="h-auto min-w-[140px] flex-col items-start gap-1 border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left hover:bg-white/[0.06]"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-zinc-100">
            <Icon className="size-4 text-violet-400" aria-hidden />
            {ASSET_TYPE_LABELS[type]}
          </span>
          <span className="text-xs font-normal text-zinc-500">{description}</span>
        </Button>
      ))}
    </div>
  );
}
