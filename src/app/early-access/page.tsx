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
  title: "Get Early Access — VÉLA",
  description: "Be the first to know when VÉLA is ready. Built by crew, for crew.",
};

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <EarlyAccessClient />
    </Suspense>
  );
}
