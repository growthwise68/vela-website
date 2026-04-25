import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

function ThankYouFallback() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#9A8E7E" }}>
      Loading…
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouFallback />}>
      <ThankYouClient />
    </Suspense>
  );
}
