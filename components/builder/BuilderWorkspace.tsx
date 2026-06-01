"use client";

import { FormPanel } from "@/components/builder/FormPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";

type BuilderWorkspaceProps = {
  variant?: "legacy" | "asset";
};

export function BuilderWorkspace({ variant = "legacy" }: BuilderWorkspaceProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
      <aside
        className="w-full shrink-0 border-b border-white/[0.06] lg:w-[min(420px,38%)] lg:border-b-0 lg:border-r"
        aria-label="Portfolio form"
      >
        <FormPanel variant={variant} />
      </aside>
      <main
        className="min-h-[480px] flex-1 lg:min-h-0"
        aria-label="Live portfolio preview"
      >
        <PreviewPanel />
      </main>
    </div>
  );
}
