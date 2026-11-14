import type { Metadata } from "next";
import { LabContent } from "./LabContent";

export const metadata: Metadata = {
  title: "Lab — Nusantara Culinary Alchemist",
  description:
    "Eksperimen web interaktif: game masak Nusantara Culinary Alchemist, playable build.",
};

export default function LabPage() {
  return <LabContent />;
}
