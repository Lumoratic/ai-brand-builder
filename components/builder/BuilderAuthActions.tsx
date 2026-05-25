"use client";

import { UserMenu } from "@/components/auth/UserMenu";

export function BuilderAuthActions() {
  return (
    <UserMenu
      redirectTo="/builder"
      showBuilderLink={false}
      className="shrink-0"
    />
  );
}
