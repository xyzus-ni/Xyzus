import React from "react";
import { SkillsContent } from "./SkillsContent";

export const metadata = {
  title: "Kemampuan & Kapabilitas Engineering | Capabilities",
  description:
    "Kemampuan engineering XYZUS: IoT & embedded monitoring, industrial automation, robotics prototyping, AIoT edge, engineering dashboard, dan integrasi hardware-software.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Kapabilitas Engineering | Capabilities",
    description: "Kemampuan engineering XYZUS: IoT & embedded, industrial automation, robotics prototyping, AIoT edge, dashboard, integrasi hardware-software.",
    url: "/skills",
    type: "website",
  },
};

export default function SkillsPage() {
  return <SkillsContent />;
}
