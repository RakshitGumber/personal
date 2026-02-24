import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { env } from "@/utils/env";
import { trackEvent } from "@/utils/analytics";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (!env.plausibleDomain) return;
    const scriptId = "plausible-script";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.defer = true;
    script.dataset.domain = env.plausibleDomain;
    script.src = env.plausibleScriptUrl;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    trackEvent("pageview", { path: pathname });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-bg text-text">
      <SiteHeader />
      <main className="container-shell py-8 md:py-12">{children}</main>
      <SiteFooter />
      <CommandPalette />
    </div>
  );
}
