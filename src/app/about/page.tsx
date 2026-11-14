import React from "react";
import { AboutContent } from "./AboutContent";

export const metadata = {
  title: "Tentang Saya | About Mahesa",
  description:
    "Profil lengkap, riwayat pendidikan Politeknik Industri ATMI, kepengurusan Senat Mahasiswa, dan pengalaman PKL Mahesa Tirtha Agung Permana.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang XYZUS | About the Studio",
    description: "Studio rekayasa independen XYZUS dan pendirinya Mahesa Tirtha Agung Permana — D4 Teknologi Rekayasa Mekatronika, ATMI.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
