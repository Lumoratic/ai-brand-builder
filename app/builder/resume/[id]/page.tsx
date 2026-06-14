import { ResumeAssetShell } from "@/components/builder/ResumeAssetShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Asset — Pflio",
  description: "Edit a resume asset in your workspace.",
};

export default function ResumeAssetBuilderPage() {
  return <ResumeAssetShell />;
}
