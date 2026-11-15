# Website Portofolio & Blog Publikasi Ilmiah — Mahesa Tirtha Agung Permana

Website portofolio rekayasa mekatronika & IoT pribadi yang dilengkapi fitur **Publikasi Karya Tulis & Paper Ilmiah (CMS)** mandiri berbasis **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **PocketBase (Self-Hosted BaaS)**.

---

## 🌟 Fitur Utama

1. **Portofolio Rekayasa Interdisipliner**:
   - Menampilkan proyek rekayasa dari PocketBase (saat ini 8 proyek: asisten tunanetra Raspberry Pi, node sensor tanah OPBVS-001/LoRaWAN, desain rangka tempat tidur modular Fusion 360, deteksi hama sawit UAV+YOLOv8, katamaran ASV otomatis Cirata, sistem monitoring OEE berbasis Flask, asisten multi-agen CrewAI, dan logika kontrol klasifikasi material PLC Siemens).
   - Filter interaktif berdasarkan tahap proyek (*Field-Tested*, *Simulation-Validated*, *Prototype*, *In Development*, *Research*) dan kategori.
   - Slot video demonstrasi (HTML5 video lokal atau embed YouTube) dan dokumentasi teknis opsional per proyek (diagram arsitektur, skema wiring, daftar komponen/BOM, metode pengujian, keterbatasan).
2. **Publikasi Karya Tulis Ilmiah & Blog**:
   - Render Markdown lengkap dengan tabel data teknis, blok kutipan (*blockquote*), syntax highlighting kode program, dan rendering formula matematika KaTeX ($\LaTeX$) untuk persamaan hidrodinamika, daya, dan kalkulasi OEE.
   - Daftar Isi (*Table of Contents*) otomatis terindeks dari heading artikel.
   - Kotak *Abstrak / Ringkasan Eksekutif* formal untuk karya ilmiah.
   - Bagian *Daftar Pustaka & Referensi* terformat.
   - Tombol unduh / cetak naskah dokumen (PDF) dan tombol bagikan cepat (*LinkedIn*, *WhatsApp*, *Salin Link*).
   - Estimasi waktu baca (*reading time*) dan bilah kemajuan membaca (*reading progress bar*).
   - Navigasi artikel sebelumnya/berikutnya dan rekomendasi tulisan terkait berdasarkan kesamaan tag.
   - RSS Feed di `/rss.xml`, peta situs dinamis di `/sitemap.xml`, dan `robots.txt`.
   - Optimasi SEO lengkap dengan skema metadata `ScholarlyArticle` / `Article` JSON-LD.
3. **Admin Publication CMS (`/admin`)**:
   - Autentikasi aman akun admin tunggal (tanpa registrasi publik).
   - Dasbor ringkasan artikel (*Diterbitkan* vs *Draf Pribadi*).
   - Editor Markdown split-screen dengan *live preview* berdampingan.
   - Toolbar pemformatan cepat (Bold, Italic, H2, H3, Link, Code, Table, Quote, Formula KaTeX).
   - Upload gambar langsung (*drag-and-drop* / *paste*) ke penyimpanan berkas PocketBase dan sisip otomatis ke naskah.
   - Upload berkas lampiran PDF (naskah paper utuh).
   - Mekanisme *autosave* lokal berkala dan deteksi pencegah halaman tertutup tanpa sengaja.
   - **Keamanan Ketat**: Tulisan berstatus `draft` dijamin tidak bisa diakses oleh publik baik via halaman web maupun REST API PocketBase.
4. **Desain & Aksesibilitas**:
   - Tema *Industrial Intelligence & Precision Engineering* dengan kontras tinggi berstandar WCAG 2.1 AA.
   - Mode Gelap (*default*) dan Mode Terang dengan toggle instan.
   - Sistem Bilingual: Bahasa Indonesia (*default*) dan English dengan kamus lokalisasi tanpa membengkakkan ukuran bundle.
   - Ringan dan responsif penuh di perangkat seluler maupun laptop RAM 8GB.

---

## 📋 Persyaratan Sistem

- **Node.js**: Versi 18+ (atau 20 LTS)
- **PocketBase**: Biner mandiri (telah disertakan di `./pb/pocketbase`) atau melalui Docker
- **Docker & Docker Compose** (opsional untuk deployment produksi)

---

## 🚀 Panduan Memulai Cepat (Lokal)

### 1. Kloning Repositori & Instal Dependensi

```bash
cd /home/mahesa/Dokumen/Project

# Salin konfigurasi environment
cp .env.example .env.local

# Instal dependensi Node.js
npm install
```

### 2. Jalankan Backend PocketBase & Seeding Awal

Jalankan PocketBase di satu terminal:

```bash
npm run pb
```

> PocketBase akan aktif di `http://127.0.0.1:8090`.
> Panel antarmuka PocketBase dapat diakses di `http://127.0.0.1:8090/_/`.

Buka terminal kedua dan jalankan skrip sinkronisasi skema & seed data awal:

```bash
npm run seed
```

Skrip ini akan otomatis:
- Memverifikasi skema dan aturan API untuk koleksi `posts`, `categories`, `projects`, `profile`, dan `messages`.
- Mengisi data profil LinkedIn Mahesa.
- Mengisi data proyek rekayasa.
- Mengisi 6 kategori karya tulis.
- Mengisi 2 artikel contoh (1 naskah ilmiah katamaran Cirata berstatus `published` dan 1 catatan teknis Edge AI berstatus `draft`).

### 3. Jalankan Server Web Next.js

```bash
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## 🐳 Menjalankan dengan Docker Compose (Satu Perintah)

Untuk menyalakan sistem secara utuh menggunakan kontainer Docker:

```bash
docker compose up -d --build
```

Setelah kontainer berjalan:
- **Aplikasi Web**: `http://localhost:3000`
- **PocketBase Admin & API**: `http://localhost:8090/_/`
- Data database tersimpan di volume Docker persisten bernama `pb_data`.

Untuk menjalankan seed data di lingkungan Docker:

```bash
docker compose exec web npm run seed
```

---

## 🔐 Manajemen Admin & Penulisan Karya Pertama

### 1. Masuk ke Dasbor Admin
1. Buka tautan `/admin` atau klik tombol **CMS** di navbar kanan atas.
2. Masukkan kredensial admin PocketBase Anda (lihat `PB_ADMIN_EMAIL` / `PB_ADMIN_PASSWORD` di `.env.local`; akun dibuat otomatis oleh `npm run seed` bila belum ada).
   *(Catatan: Anda dapat mengubah email dan password melalui panel admin PocketBase di `http://localhost:8090/_/`)*

### 2. Menulis dan Menerbitkan Artikel Baru
1. Di halaman `/admin`, klik tombol **+ Tulis Karya Baru**.
2. Masukkan judul artikel. URL slug akan terbuat secara otomatis.
3. Pilih kategori (misal: *Paper & Laporan*, *Karya Tulis Ilmiah*, atau *Catatan Teknis*).
4. Masukkan tag (pisahkan dengan koma, contoh: `IoT, ESP32, Robotika`).
5. Tulis naskah pada kolom editor di sebelah kiri. Pratinjau langsung (*live preview*) akan ter-render di sebelah kanan secara real-time.
   - Gunakan tombol $\Sigma$ untuk rumus matematika KaTeX: `$$ F_d = \frac{1}{2} \rho v^2 C_d A $$`.
   - Sisipkan tabel atau blok kode bahasa pemrograman yang didukung.
   - Drag & drop gambar langsung ke area editor untuk menyisipkan ilustrasi.
6. Unggah dokumen PDF jika naskah memiliki lampiran riset lengkap.
7. Pilih status **Diterbitkan (Publik)** untuk menayangkan ke publik, atau **Draf Pribadi** untuk menyimpan sementara.
8. Klik **Simpan Publikasi**.

---

## 🗂️ Menambah / Mengelola Proyek via PocketBase

Semua konten proyek dikelola lewat panel PocketBase (`http://localhost:8090/_/` → koleksi **projects**), bukan dengan mengedit file:

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `title`, `slug`, `summary` | text | Judul, URL slug (unik), ringkasan |
| `description` | text (markdown) | Deskripsi lengkap, dirender sebagai Markdown |
| `tech` | json (array string) | Tag teknologi, mis. `["ESP32","LoRaWAN"]` |
| `cover`, `gallery` | file | Gambar sampul & galeri (maks 5 MB/file) |
| `video_url` | text | URL YouTube embed, atau path lokal `/videos/...` untuk hero video |
| `repo_url`, `demo_url` | text | Tombol "Lihat repo" / "Lihat demo" |
| `architecture_image`, `wiring_image` | file | Diagram arsitektur & skema wiring (opsional) |
| `components` | json (array string) | Daftar komponen / BOM (opsional) |
| `test_method`, `limitations` | text (markdown) | Metode pengujian & keterbatasan (opsional) |
| `status`, `featured`, `visible`, `order` | — | Status, tampil di beranda, visibilitas publik, urutan |

Semua field dokumentasi bersifat **opsional** — bagian yang kosong tidak ditampilkan di halaman detail. Perubahan tampil setelah ISR revalidate (~1–2 menit).

> **Migrasi skema**: field dokumentasi ditambahkan lewat `pb/pb_migrations/1794701148_updated_projects.js`. PocketBase menjalankannya otomatis saat start. Untuk PocketBase produksi, salin file migrasi yang sama ke `pb_migrations/` instance tersebut (atau `pocketbase migrate up`).

---

## 💾 Backup & Pemulihan Data Database (`pb_data`)

Seluruh data tersimpan dalam berkas database SQLite terpadu di dalam folder `./pb/pb_data` (atau volume `pb_data` pada Docker).

### Cara Backup Manual:
```bash
# Matikan PocketBase sementara untuk snapshot konsisten
# Kemudian salin folder pb_data ke arsip backup
tar -czvf backup_pb_data_$(date +%Y%m%d).tar.gz ./pb/pb_data
```

### Cara Restore dari Backup:
```bash
tar -xzvf backup_pb_data_YYYYMMDD.tar.gz -C ./pb/
```

---

## 🧪 Pengujian Unit & Verifikasi Kode

Untuk memverifikasi logika kritis (slugify, reading time calculator, TOC extractor):

```bash
npm test
```

Untuk memverifikasi type-check dan produksi build Next.js:

```bash
npm run build
```

---

## 🚀 Panduan Deployment ke Vercel + PocketBase Produksi

Situs live: **https://www.xyzus.my.id** — frontend di Vercel, backend PocketBase di `https://xyzus.pockethost.io`.

### 1. Frontend (Vercel)

1. Import repo `xyzus-ni/Xyzus` di Vercel (framework Next.js terdeteksi otomatis; `output: standalone` sudah dikonfigurasi).
2. Atur Environment Variables di Project Settings:
   ```
   NEXT_PUBLIC_SITE_URL=https://www.xyzus.my.id
   NEXT_PUBLIC_POCKETBASE_URL=https://xyzus.pockethost.io
   POCKETBASE_URL=https://xyzus.pockethost.io
   ```
   `NEXT_PUBLIC_*` dibundel ke client; `POCKETBASE_URL` dipakai server-side (ISR/SSG).
3. Deploy. Pastikan apex `xyzus.my.id` redirect ke `www` (Atur di Vercel Domains atau DNS).

### 2. Backend PocketBase Produksi

1. Di `https://xyzus.pockethost.io`, buat koleksi sesuai skema (jalankan `pb/pb_migrations/*` via `pocketbase migrate up` pada instance tersebut, atau buat manual via UI `_`).
2. Terapkan API rules yang sama dengan koleksi lokal (lihat `pb/pb_migrations/1730000000_init_schema.js`).
3. Ulangi data proyek lewat panel admin atau `npm run seed` dengan `POCKETBASE_URL` mengarah ke produksi dan `PB_ADMIN_*` produksi.
4. Untuk field dokumentasi proyek, pastikan migrasi `1794701148_updated_projects.js` sudah diterapkan.

### 3. Alternatif: VPS + Docker Compose

```bash
docker compose up -d --build
```

Lalu atur reverse proxy SSL (Caddy/NGINX + Let's Encrypt) ke port `3000` (web) dan `8090` (PocketBase). Detail env produksi:

```bash
NEXT_PUBLIC_POCKETBASE_URL=https://api.domainanda.com
POCKETBASE_URL=http://pocketbase:8090
NEXT_PUBLIC_SITE_URL=https://domainanda.com
```

---

## 👤 Kontak Pemilik

- **Nama**: Mahesa Tirtha Agung Permana
- **Afiliasi**: Politeknik Industri ATMI (D4 Teknologi Rekayasa Mekatronika)
- **LinkedIn**: [https://www.linkedin.com/in/mahesa-tirtha-agung-permana](https://www.linkedin.com/in/mahesa-tirtha-agung-permana)
- **GitHub**: [https://github.com/xyzus-ni](https://github.com/xyzus-ni)
