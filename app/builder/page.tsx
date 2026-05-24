import { BuilderLayout } from "@/components/builder/BuilderLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Builder — BrandSpark",
  description: "Build and preview your personal portfolio in real time.",
};

export default function BuilderPage() {
  return <BuilderLayout />;
}
