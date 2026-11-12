import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";

/** Sends first-time visitors to the welcome screen once saved settings have loaded. */
export function useOnboardingGuard() {
  const { hydrated, state } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (hydrated && !state) navigate({ to: "/welcome", replace: true });
  }, [hydrated, state, navigate]);
  return hydrated && !!state;
}
