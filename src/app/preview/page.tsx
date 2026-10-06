import type { Metadata } from "next";
import PreviewHomeClient from "./PreviewHomeClient";

export const metadata: Metadata = {
  title: "Preview",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PreviewPage() {
  return <PreviewHomeClient />;
}
