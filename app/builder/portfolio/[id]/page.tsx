import { PortfolioAssetShell } from "@/components/builder/PortfolioAssetShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Asset — Pflio",
  description: "Edit a portfolio asset in your workspace.",
};

type PortfolioAssetBuilderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PortfolioAssetBuilderPage({
  params,
}: PortfolioAssetBuilderPageProps) {
  const { id } = await params;

  return <PortfolioAssetShell assetId={id} />;
}
