"use client";

import { UserMenu } from "@/components/auth/UserMenu";

export function WorkspaceAuthActions() {
  return (
    <UserMenu
      redirectTo="/workspace"
      showBuilderLink
      className="shrink-0"
    />
  );
}
