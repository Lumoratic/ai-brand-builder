import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceView } from "@/components/workspace/WorkspaceView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace — Pflio",
  description: "Manage your resume, portfolio, and website assets.",
};

export default function WorkspacePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
      <WorkspaceHeader />
      <main className="flex-1">
        <WorkspaceView />
      </main>
    </div>
  );
}
