import { BuilderHeader } from "@/components/builder/BuilderHeader";
import { BuilderWorkspace } from "@/components/builder/BuilderWorkspace";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Builder — BrandSpark",
  description: "Build and preview your personal portfolio in real time.",
};

export default function BuilderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
      <BuilderHeader />
      <BuilderWorkspace />
    </div>
  );
}
