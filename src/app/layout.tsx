import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/context";

// Tipografi "Sovereign Minimalism":
// - Fraunces: serif display yang tenang untuk heading
// - Inter: sans bersih untuk isi
// - JetBrains Mono: label teknis (nomor, versi, status)
const display = Fraunces({
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
  themeColor: "#F3F0E8",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Mahesa Tirtha Agung Permana | Mechatronics & IoT Engineer",
    template: "%s | Mahesa Tirtha A. P.",
  },
  description:
    "Portofolio rekayasa dan blog publikasi ilmiah Mahesa Tirtha Agung Permana — Mechatronics & IoT Engineer (sensor → cloud → dashboard), robotika, dan otomasi industri terpadu.",
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
    siteName: "Mahesa Tirtha Agung Permana Portfolio & Publications",
    title: "Mahesa Tirtha Agung Permana | Mechatronics & IoT Engineer",
    description:
      "Membangun sistem cerdas end-to-end (sensor → cloud → dashboard) dan solusi otomasi industri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahesa Tirtha Agung Permana | Mechatronics & IoT Engineer",
    description: "Sistem cerdas end-to-end, IoT, otomasi industri, dan karya tulis ilmiah.",
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
