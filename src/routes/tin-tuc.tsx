import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tin-tuc")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
