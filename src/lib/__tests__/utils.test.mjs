import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Implementasi fungsi utilitas untuk testing mjs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function calculateReadingTime(text) {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const noOfWords = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return minutes > 0 ? minutes : 1;
}

function extractHeadings(markdown) {
  if (!markdown) return [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/\*\*|__|\*|_/g, "");
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

describe("Utility Functions Test Suite", () => {
  test("slugify creates URL-friendly slugs", () => {
    assert.equal(slugify("Rancang Bangun Kapal Katamaran!"), "rancang-bangun-kapal-katamaran");
    assert.equal(slugify("  IoT & Mechatronics System -- 2024  "), "iot-mechatronics-system-2024");
    assert.equal(slugify("YOLOv8 + Edge AI: Integrasi"), "yolov8-edge-ai-integrasi");
  });

  test("calculateReadingTime estimates reading minutes accurately", () => {
    assert.equal(calculateReadingTime(""), 1);
    const shortText = "Kata ".repeat(150);
    assert.equal(calculateReadingTime(shortText), 1);
    const mediumText = "Kata ".repeat(450);
    assert.equal(calculateReadingTime(mediumText), 3);
  });

  test("extractHeadings extracts H2 and H3 with clean anchors", () => {
    const md = `
# Judul Utama (Diabaikan dari TOC H2/H3)
Intro...

## Latar Belakang & Masalah
Deskripsi masalah...

### Metodologi Riset
Langkah-langkah...

## Hasil dan Pembahasan
Data pengujian...
    `;

    const headings = extractHeadings(md);
    assert.equal(headings.length, 3);
    assert.deepEqual(headings[0], {
      id: "latar-belakang-masalah",
      text: "Latar Belakang & Masalah",
      level: 2,
    });
    assert.deepEqual(headings[1], {
      id: "metodologi-riset",
      text: "Metodologi Riset",
      level: 3,
    });
    assert.deepEqual(headings[2], {
      id: "hasil-dan-pembahasan",
      text: "Hasil dan Pembahasan",
      level: 2,
    });
  });
});
