import type { Session } from "@supabase/supabase-js";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProfileSync } from "@/components/profile/ProfileSync";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type AuthShellProps = {
  children: React.ReactNode;
};

export async function AuthShell({ children }: AuthShellProps) {
  let initialSession: Session | null = null;

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    initialSession = session;
  }

  return (
    <AuthProvider initialSession={initialSession}>
      <ProfileSync />
      {children}
    </AuthProvider>
  );
}
