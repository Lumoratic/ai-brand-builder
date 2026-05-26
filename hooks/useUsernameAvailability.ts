"use client";

import { useEffect, useState } from "react";
import { isUsernameAvailable } from "@/lib/profile/profile-service";
import {
  isValidUsername,
  sanitizeUsername,
  type UsernameAvailabilityStatus,
} from "@/lib/profile/username";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const CHECK_DEBOUNCE_MS = 450;

export function useUsernameAvailability(
  username: string,
  userId: string | undefined
) {
  const [status, setStatus] = useState<UsernameAvailabilityStatus>("idle");

  useEffect(() => {
    const normalized = sanitizeUsername(username);

    if (!normalized) {
      setStatus("required");
      return;
    }

    if (!isValidUsername(normalized)) {
      setStatus("invalid");
      return;
    }

    if (!userId || !hasSupabaseEnv()) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    let cancelled = false;
    const timer = setTimeout(() => {
      isUsernameAvailable(normalized, userId)
        .then((available) => {
          if (cancelled) return;
          setStatus(available ? "available" : "taken");
        })
        .catch(() => {
          if (cancelled) return;
          setStatus("idle");
        });
    }, CHECK_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [username, userId]);

  return status;
}
