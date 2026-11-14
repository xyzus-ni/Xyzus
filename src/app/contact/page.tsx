import React from "react";
import { ContactContent } from "./ContactContent";

export const metadata = {
  title: "Hubungi Saya & Kolaborasi | Contact & Collaboration",
  description:
    "Kirim pesan atau ajukan kolaborasi proyek IoT, otomasi industri, dan web dashboard kepada Mahesa Tirtha Agung Permana.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Kontak & Kolaborasi | Contact",
    description: "Punya masalah engineering yang layak dipecahkan? Hubungi XYZUS untuk proyek IoT, embedded, dashboard, dan otomasi.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
