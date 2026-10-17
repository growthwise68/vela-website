import { Suspense } from "react";
import EarlyAccessClient from "./EarlyAccessClient";

function Fallback() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#9A8E7E" }}>
      Loading…
    </div>
  );
}

export const metadata = {
  title: "Get Early Access",
  description: "Join VÉLA early access. The rest and recovery app for long-haul cabin crew: it reads your roster and plans your sleep, light and caffeine across every duty, layover and day off.",
  alternates: {
    canonical: "https://velaforcrew.com/early-access",
  },
};

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <EarlyAccessClient />
    </Suspense>
  );
}
