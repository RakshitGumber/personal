import { createFileRoute } from "@tanstack/react-router";
import { MainNavbar } from "../../components/MainNavbar";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MainNavbar />
    </div>
  );
}
