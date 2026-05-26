"use client";

import { useEffect } from "react";
import type { BuilderProfile } from "@/lib/stores/builderStore";
import { useBuilderStore } from "@/lib/stores/builderStore";

type PortfolioProfileHydratorProps = {
  profile: BuilderProfile;
};

export function PortfolioProfileHydrator({ profile }: PortfolioProfileHydratorProps) {
  const hydrateProfile = useBuilderStore((state) => state.hydrateProfile);

  useEffect(() => {
    hydrateProfile(profile);
  }, [profile, hydrateProfile]);

  return null;
}
