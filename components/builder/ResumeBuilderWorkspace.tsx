"use client";

import { ResumeEditor } from "@/components/builder/ResumeEditor";
import { ResumePreview } from "@/components/builder/ResumePreview";

export function ResumeBuilderWorkspace() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
      <aside
        className="w-full shrink-0 overflow-y-auto border-b border-white/[0.06] lg:max-h-[calc(100vh-3.5rem)] lg:w-[min(480px,42%)] lg:border-b-0 lg:border-r"
        aria-label="Resume editor"
      >
        <ResumeEditor />
      </aside>
      <main
        className="min-h-[480px] flex-1 lg:max-h-[calc(100vh-3.5rem)] lg:min-h-0"
        aria-label="Live resume preview"
      >
        <ResumePreview />
      </main>
    </div>
  );
}
