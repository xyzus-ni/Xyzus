/**
 * Data kontak publik — semua dari env var, fallback ke nilai lama
 * agar tidak ada tautan putus bila env belum diisi.
 */
export const CONTACT = {
  email: process.env.NEXT_PUBLIC_EMAIL || "mtirtha865@gmail.com",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "62881024632318").replace(/\D/g, ""),
  github: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/xyzus-ni",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN ||
    "https://www.linkedin.com/in/mahesa-tirtha-agung-permana",
};

/** URL wa.me dengan pesan terisi; fallback ke /contact bila nomor kosong. */
export function whatsappUrl(message: string): string {
  if (!CONTACT.whatsapp) return "/contact";
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Versi pesan pembuka default untuk CTA "diskusikan proyek". */
export function defaultWhatsappMessage(locale: "id" | "en"): string {
  return locale === "en"
    ? "Hello Mahesa, I would like to discuss an IoT, embedded, or dashboard project."
    : "Halo Mahesa, saya ingin diskusi proyek IoT, embedded, atau dashboard.";
}
