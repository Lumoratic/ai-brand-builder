import { notFound } from "next/navigation";
import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";
import { PortfolioProfileHydrator } from "@/components/portfolio/PortfolioProfileHydrator";
import {
  buildPublicPortfolioAssetMetadata,
  fetchPublishedPortfolioAsset,
} from "@/lib/assets/asset-server";
import type { Metadata } from "next";

type PublicPortfolioAssetPageProps = {
  params: Promise<{ username: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PublicPortfolioAssetPageProps): Promise<Metadata> {
  const { username, slug } = await params;
  const profile = await fetchPublishedPortfolioAsset(username, slug);

  if (!profile) {
    return {
      title: "Portfolio not found — Pflio",
      robots: { index: false, follow: false },
    };
  }

  const { title, description } = buildPublicPortfolioAssetMetadata(profile);

  return {
    title: `${title} — Pflio`,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioAssetPage({
  params,
}: PublicPortfolioAssetPageProps) {
  const { username, slug } = await params;
  const profile = await fetchPublishedPortfolioAsset(username, slug);

  if (!profile) {
    notFound();
  }

  return (
    <>
      <PortfolioProfileHydrator profile={profile} />
      <PortfolioPageContent />
    </>
  );
}
