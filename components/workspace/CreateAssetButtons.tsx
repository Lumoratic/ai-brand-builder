"use client";

import { FileText, Globe, LayoutGrid, Loader2 } from "lucide-react";
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
  creatingType: AssetType | null;
  disabled?: boolean;
  onCreate: (type: AssetType) => void;
  className?: string;
};

export function CreateAssetButtons({
  creatingType,
  disabled = false,
  onCreate,
  className,
}: CreateAssetButtonsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {CREATE_OPTIONS.map(({ type, icon: Icon, description }) => {
        const isCreating = creatingType === type;

        return (
          <Button
            key={type}
            type="button"
            variant="outline"
            disabled={disabled || creatingType !== null}
            onClick={() => onCreate(type)}
            className="h-auto min-w-[140px] flex-col items-start gap-1 border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-100">
              {isCreating ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <Icon className="size-4 text-violet-400" aria-hidden />
              )}
              {ASSET_TYPE_LABELS[type]}
            </span>
            <span className="text-xs font-normal text-zinc-500">{description}</span>
          </Button>
        );
      })}
    </div>
  );
}
