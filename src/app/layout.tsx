import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/context";

// Tipografi v2.1:
// - Space Grotesk: heading (geometric, technical-editorial)
// - Inter: sans bersih untuk isi
// - JetBrains Mono: label teknis (nomor, versi, status)
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F5F0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xyzus.my.id"),
  title: {
    default: "XYZUS — Independent Engineering Studio",
    template: "%s | XYZUS",
  },
  description:
    "XYZUS adalah studio rekayasa independen yang merancang dan mengintegrasikan sistem cerdas — embedded, IoT/AIoT, otomasi, dan dashboard — untuk dunia fisik.",
  keywords: [
    "Mahesa Tirtha Agung Permana",
    "Mechatronics Engineer",
    "IoT Engineer",
    "Politeknik Industri ATMI",
    "Robotics",
    "Industrial Automation",
    "Omron PLC",
    "Raspberry Pi",
    "Embedded Systems",
    "Karya Tulis Ilmiah",
    "Waduk Cirata ASV",
    "Bekasi",
    "Indonesia",
  ],
  authors: [{ name: "Mahesa Tirtha Agung Permana", url: "https://github.com/xyzus-ni" }],
  creator: "Mahesa Tirtha Agung Permana",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.xyzus.my.id",
    siteName: "XYZUS — Independent Engineering Studio",
    title: "XYZUS — Independent Engineering Studio",
    description:
      "Engineering intelligence. Building independence. Sistem cerdas untuk dunia fisik.",
  },
  twitter: {
    card: "summary_large_image",
    title: "XYZUS — Independent Engineering Studio",
    description: "Engineering intelligence. Building independence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('site_theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-ivory text-graphite min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.xyzus.my.id/#studio",
                  name: "XYZUS",
                  alternateName: "XYZUS Independent Engineering Studio",
                  description:
                    "Independent engineering studio focused on connecting physical systems, embedded intelligence, and digital infrastructure.",
                  url: "https://www.xyzus.my.id",
                  email: "xyzus.work@gmail.com",
                  founder: { "@type": "Person", name: "Mahesa Tirtha Agung Permana" },
                  address: { "@type": "PostalAddress", addressLocality: "Bekasi", addressCountry: "ID" },
                  sameAs: [
                    "https://github.com/xyzus-ni",
                    "https://www.linkedin.com/in/mahesa-tirtha-agung-permana",
                    "https://instagram.com/xyzus.ni",
                  ],
                },
                {
                  "@type": "Person",
                  "@id": "https://www.xyzus.my.id/#founder",
                  name: "Mahesa Tirtha Agung Permana",
                  jobTitle: "Founder / Engineering Lead",
                  url: "https://www.xyzus.my.id/about",
                  sameAs: [
                    "https://github.com/xyzus-ni",
                    "https://www.linkedin.com/in/mahesa-tirtha-agung-permana",
                  ],
                },
              ],
            }),
          }}
        />
        <LanguageProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
