import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ve-chung-toi")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
