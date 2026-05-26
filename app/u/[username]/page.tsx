import { notFound } from "next/navigation";
import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";
import { PortfolioProfileHydrator } from "@/components/portfolio/PortfolioProfileHydrator";
import {
  buildPublicPortfolioMetadata,
  fetchPublishedProfileByUsername,
} from "@/lib/profile/profile-server";
import type { Metadata } from "next";

type PublicPortfolioPageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({
  params,
}: PublicPortfolioPageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await fetchPublishedProfileByUsername(username);

  if (!profile) {
    return {
      title: "Portfolio not found — BrandSpark",
      robots: { index: false, follow: false },
    };
  }

  const { title, description } = buildPublicPortfolioMetadata(profile);

  return {
    title: `${title} — BrandSpark`,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({
  params,
}: PublicPortfolioPageProps) {
  const { username } = await params;
  const profile = await fetchPublishedProfileByUsername(username);

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
