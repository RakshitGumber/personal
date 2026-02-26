import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
