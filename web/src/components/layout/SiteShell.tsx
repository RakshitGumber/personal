import type { ReactNode } from "react";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <SiteHeader />
      <main className="container-shell py-8 md:py-12">{children}</main>
      <SiteFooter />
      <CommandPalette />
    </div>
  );
}
