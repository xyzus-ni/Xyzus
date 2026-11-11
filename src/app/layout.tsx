import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/context";

export const viewport: Viewport = {
  themeColor: "#0b0f19",
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
    url: "https://mahesatirtha.dev",
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
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('site_theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
