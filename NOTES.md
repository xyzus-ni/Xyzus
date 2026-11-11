# Catatan Arsitektur & Keputusan Desain (NOTES.md)

Dokumen ini mencatat analisis awal, keputusan desain visual, arsitektur teknis, asumsi, verifikasi, dan hal-hal yang perlu dicek manual untuk sistem Website Portofolio & Blog Publikasi Karya Tulis milik **Mahesa Tirtha Agung Permana**.

---

## 1. Analisis Status Workspace Awal (Langkah 0)

1. **Eksplorasi Ruang Kerja**:
   - Direktori kerja `/home/mahesa/Dokumen/Project` awalnya kosong (tidak ditemukan repositori lama maupun file HTML/CSS/JS sebelumnya).
   - Bagian `[REFERENSI DESAIN]` pada prompt awal juga tidak menyertakan potongan kode/palet warna lama.
2. **Penerapan Aturan Cadangan (Rule 4)**:
   - Sesuai instruksi: dibuat desain modern, bersih, presisi, dan profesional bertema **Teknik/Industri & Mekatronika/IoT** (kontras tinggi, aksen warna tunggal).
3. **Design Language & Identitas Visual**:
   - **Tema & Nuansa**: *Industrial Intelligence & Precision Engineering*. Merefleksikan latar belakang Mahesa sebagai Mechatronics & IoT Engineer (D4 Mekatronika ATMI & SMK AMI Deltamas).
   - **Palet Warna**:
     - Mode Gelap (*Default*): Latar belakang Slate/Zinc pekat (`#0b0f19` / `#0f172a`), border teknis (`#1e293b`), kartu (`#111827`).
     - Mode Terang: Latar blueprint teknis/slate putih bersih (`#f8fafc` / `#ffffff`), border (`#e2e8f0`).
     - Aksen Utama: *Electric Cyan / Tech Cyan* (`#06b6d4` / `#0ea5e9`) dengan sentuhan status *Emerald Green* (`#10b981`) untuk indikator aktif/online IoT.
   - **Tipografi**:
     - Teks Body & Heading: Sans-serif modern dan bersih berbasis system font stack modern (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Inter`) untuk menghilangkan ketergantungan jaringan eksternal dan menghindari *font flicker*.
     - Elemen Teknis: Monospace presisi (`ui-monospace`, `JetBrains Mono`, `Fira Code`) untuk badge status, tag teknologi, metrik OEE/sensor, dan potongan kode.
     - Tipografi Artikel Blog: Diformat ramah pembaca ilmiah (panjang baris 65–75 karakter, line-height 1.75, margin yang teratur).
   - **Komponen & Interaksi**:
     - Sudut rounded halus (`rounded-lg` / `rounded-xl`), border presisi 1px, badge status berdenyut (*pulsing indicator*).
     - Dukungan penuh `prefers-reduced-motion` untuk animasi hemat daya dan nyaman diakses.
     - Kontras rasio teks memenuhi standar WCAG 2.1 AA.

---

## 2. Struktur Stack & Arsitektur Teknis

1. **Frontend / Web Application**:
   - Next.js 14 (App Router) + TypeScript + Tailwind CSS.
   - Plugin `@tailwindcss/typography` untuk rendering konten artikel Markdown.
   - Lucide React untuk ikon teknis yang ringan dan konsisten.
2. **Karya Ilmiah & Markdown Pipeline**:
   - `react-markdown` dengan `remark-gfm` (tabel, tasklist), `remark-math` + `rehype-katex` (rumus matematika/LaTeX ilmiah), `rehype-highlight` (syntax highlighting kode teknis), `rehype-slug` (anchor heading untuk Table of Contents).
3. **Backend & Manajemen Konten**:
   - PocketBase (self-hosted, single Go binary, database SQLite terintegrasi).
   - Migrasi skema otomatis melalui `pb/pb_migrations/*.js` dan skrip sinkronisasi `scripts/seed.mjs` sehingga skema database selalu identik di lingkungan Docker maupun lokal.
   - Hak akses API (API Rules) ketat: data publik hanya untuk artikel terbit (`status = 'published'`) dan proyek aktif (`visible = true`). Pengunjung hanya dapat mengirim pesan kontak (`messages`), sedangkan modifikasi data lainnya membutuhkan autentikasi admin.
   - Artikel berstatus `draft` terproteksi secara mutlak dari akses publik.
4. **Sistem Bilingual (i18n)**:
   - Disediakan kamus bahasa lengkap Bahasa Indonesia (`id`, default) dan English (`en`) untuk semua teks antarmuka di `src/lib/i18n/dictionaries.ts`.
   - Penyimpanan preferensi via Cookie & React Context tanpa merusak SSG/ISR.
5. **Kontainerisasi & Deployment**:
   - `Dockerfile` multi-stage untuk Next.js (standalone build).
   - `docker-compose.yml` untuk menjalankan aplikasi web + PocketBase secara harmonis dengan volume data persisten `pb_data`.

---

## 3. Ringkasan File Proyek yang Telah Dibuat

- **Konfigurasi & Lingkungan**:
  - `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.mjs`
  - `.env.example`, `.env.local`
  - `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `.gitignore`
- **Backend / PocketBase**:
  - `pb/pb_migrations/1730000000_init_schema.js` (migrasi skema PocketBase)
  - `scripts/seed.mjs` (skrip sinkronisasi skema & pengisi data profil LinkedIn, 8 proyek, kategori, dan 2 artikel contoh)
  - `src/lib/data/initialData.json` & `src/lib/data/initialData.ts` (data sumber terstruktur & type-safe fallback)
- **Logika Inti & Utilitas**:
  - `src/lib/pocketbase.ts` (klien PocketBase browser & server dengan graceful fallback data)
  - `src/lib/types.ts` (definisi tipe data TypeScript lengkap)
  - `src/lib/utils.ts` (slugify, reading time calculator, format tanggal, ekstraksi heading TOC)
  - `src/lib/__tests__/utils.test.mjs` (pengujian unit logika kritis)
  - `src/lib/i18n/dictionaries.ts` (kamus bilingual ID & EN)
  - `src/lib/i18n/context.tsx` (Language Provider & switch hook)
- **Komponen Tampilan**:
  - `src/components/Navbar.tsx` (navigasi, toggle tema, toggle bahasa, status indikator)
  - `src/components/Footer.tsx` (status ketersediaan freelance, copyright, tautan sosial)
  - `src/components/ThemeToggle.tsx` & `src/components/LanguageToggle.tsx`
  - `src/components/ProjectCard.tsx` (kartu proyek teknis, status badge, tech tags)
  - `src/components/PostCard.tsx` (kartu artikel blog dengan kategori, tanggal, reading time)
  - `src/components/MarkdownRenderer.tsx` (parser Markdown, KaTeX, copy button, syntax highlight)
  - `src/components/ReadingProgressBar.tsx` (progress bar membaca artikel)
  - `src/components/TableOfContents.tsx` (daftar isi otomatis sticky dengan active scroll detection)
  - `src/components/ShareButtons.tsx` (bagikan artikel ke LinkedIn, WhatsApp, Salin Link)
  - `src/components/PrintDownloadButton.tsx` (cetak / unduh PDF naskah)
  - `src/components/ContactForm.tsx` (form kontak dengan honeypot, validasi, dan feedback status)
  - `src/components/AdminEditor.tsx` (editor split-screen live preview, markdown toolbar, image/pdf drag-drop upload, autosave indicator)
- **Halaman Web (App Router)**:
  - `src/app/layout.tsx` (root layout, metadata SEO, Theme & i18n providers)
  - `src/app/globals.css` (Tailwind, KaTeX CSS, syntax highlighting, tech grid)
  - `src/app/page.tsx` (Beranda: Hero, Skills summary, 3 Proyek unggulan, 3 Artikel terbaru, CTA Kolaborasi)
  - `src/app/about/page.tsx` (Tentang: Profil, Pendidikan ATMI & SMK AMI Deltamas, Senat Mahasiswa, Timeline PKL QA/IT/Purchasing)
  - `src/app/skills/page.tsx` (Keahlian terstruktur: Embedded & IoT, Software, Otomasi & Industri, Desain & CAD)
  - `src/app/projects/page.tsx` & `src/app/projects/ProjectsClientList.tsx` (Katalog proyek + filter interaktif)
  - `src/app/projects/[slug]/page.tsx` (Halaman detail proyek lengkap + slot demo video/CAD)
  - `src/app/blog/page.tsx` & `src/app/blog/BlogClientList.tsx` (Katalog blog + pencarian, pagination, filter)
  - `src/app/blog/[slug]/page.tsx` (Detail artikel lengkap: Abstrak, TOC, KaTeX, Referensi, Prev/Next, Related Posts)
  - `src/app/contact/page.tsx` (Halaman kontak + form pesan + tautan langsung LinkedIn & GitHub)
  - `src/app/admin/login/page.tsx` (Login autentikasi PocketBase admin)
  - `src/app/admin/page.tsx` (Dashboard Admin: daftar artikel, status draft/terbit, aksi tambah/edit/hapus)
  - `src/app/admin/posts/new/page.tsx` & `src/app/admin/posts/[id]/edit/page.tsx` (Editor naskah baru & edit)
  - `src/app/rss.xml/route.ts` (RSS 2.0 Feed otomatis)
  - `src/app/sitemap.ts` (Peta situs XML dinamis)
  - `src/app/robots.ts` (Robots.txt)
  - `src/app/not-found.tsx` (Halaman 404 ramah pengguna bertema teknis)

---

## 4. Asumsi yang Diambil

1. **Port Layanan**:
   - PocketBase berjalan pada port `8090` (`http://127.0.0.1:8090`).
   - Aplikasi Web Next.js berjalan pada port `3000` (`http://localhost:3000`).
2. **Kredensial Admin Default**:
   - Email: `admin@mahesa.local`
   - Kata Sandi: `AdminMahesa123!Secure`
   *(Pengguna dapat mengubah kata sandi kapan saja lewat dashboard PocketBase)*.
3. **Data Resilience & Offline Fallback**:
   - Jika server PocketBase belum aktif pada tahap awal *build* statis Next.js, sistem secara cerdas membaca data cadangan type-safe di `initialData.json`, sehingga proses build (`npm run build`) tidak akan pernah gagal (*zero failure*).
4. **Proteksi Draf Tulisan**:
   - Draf tidak dibuatkan halaman statis publik saat build dan disaring oleh API Rules PocketBase `status = 'published'`. Draf hanya terlihat di dalam dasbor `/admin` oleh admin yang terotentikasi.

---

## 5. Hal-hal yang Perlu Dicek Manual oleh Pengguna

1. **Penggantian Password Admin**:
   - Disarankan masuk ke `http://127.0.0.1:8090/_/` dan mengganti email/password default dengan email pribadi Mahesa sebelum dipublikasikan ke internet.
2. **Tautan Video YouTube Nyata**:
   - Pada proyek *Simulasi Konveyor di Factory I/O*, saat ini diisi slot video embed contoh (`dQw4w9WgXcQ`). Mahesa dapat mengunggah video rekaman simulasi Factory I/O miliknya ke YouTube dan memperbarui tautan tersebut lewat panel admin.
3. **Unggah File CV Asli**:
   - Tersedia field `cv` di koleksi `profile`. Mahesa dapat mengunggah berkas PDF resume/CV terbaru melalui panel PocketBase.

---

## 6. Daftar Perubahan Dibandingkan Keadaan Awal

| Aspek | Kondisi Awal | Hasil Upgrade Baru |
| :--- | :--- | :--- |
| **Codebase & Workspace** | Direktori kosong | Aplikasi lengkap Next.js 14 App Router + PocketBase + Docker |
| **Data LinkedIn** | Belum ada | 8 Proyek lengkap, D4 ATMI, Senat Mahasiswa, PKL QA/IT/Purchasing |
| **Fitur Blog & Publikasi** | Belum ada | Sistem publikasi mandiri, dukungan KaTeX matematika, tabel, syntax highlighting, unduh PDF, TOC otomatis |
| **Dasbor Admin** | Belum ada | Rute `/admin` terproteksi, split-screen live preview editor, image & PDF upload |
| **Backend & Database** | Belum ada | PocketBase self-hosted dengan migrasi skema otomatis & persistent storage |
| **Bahasa (i18n)** | Belum ada | Sistem bilingual (ID / EN) dengan toggle instan |
| **SEO & RSS** | Belum ada | RSS 2.0 Feed (`/rss.xml`), Dynamic Sitemap (`/sitemap.xml`), JSON-LD ScholarlyArticle |
