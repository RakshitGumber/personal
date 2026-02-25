import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { CommandPalette } from "@/components/navigation/CommandPalette";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main className="container-shell py-8 md:py-12">
        <Outlet />
      </main>
      <Footer />
      {/* <CommandPalette /> */}
    </div>
  );
}
