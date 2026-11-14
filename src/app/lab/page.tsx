import type { Metadata } from "next";
import { LabContent } from "./LabContent";

export const metadata: Metadata = {
  title: "Lab — Nusantara Culinary Alchemist",
  description:
    "Eksperimen web interaktif: game masak Nusantara Culinary Alchemist, playable build.",
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "Laboratorium Eksperimen | Lab",
    description: "Eksperimen dan riset XYZUS — termasuk Nusantara Culinary Alchemist, playable build interaktif.",
    url: "/lab",
    type: "website",
  },
};

export default function LabPage() {
  return <LabContent />;
}
