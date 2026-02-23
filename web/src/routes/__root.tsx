import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </React.Fragment>
  );
}
