import { Suspense } from "react";
import BriefsClient from "./BriefsClient";

export const metadata = {
  title: "Recovery Briefs — Véla",
  description:
    "Short, practical guides for the exact moments this job tests you most. Free to download, no strings attached.",
};

function Fallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs uppercase tracking-widest text-inkFaint">
      Loading…
    </div>
  );
}

export default function BriefsPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <BriefsClient />
    </Suspense>
  );
}
