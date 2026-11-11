export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-alphanumeric selain -
    .replace(/\-\-+/g, "-") // Ganti double hyphens
    .replace(/^-+/, "") // Trim hyphens di awal
    .replace(/-+$/, ""); // Trim hyphens di akhir
}

export function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const noOfWords = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return minutes > 0 ? minutes : 1;
}

export function formatDate(dateString?: string, locale: "id" | "en" = "id"): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  if (!markdown) return [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/\*\*|__|\*|_/g, "");
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}
