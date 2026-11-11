# Website Portofolio & Blog Publikasi Ilmiah — Mahesa Tirtha Agung Permana

Website portofolio rekayasa mekatronika & IoT pribadi yang dilengkapi fitur **Publikasi Karya Tulis & Paper Ilmiah (CMS)** mandiri berbasis **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **PocketBase (Self-Hosted BaaS)**.

---

## 🌟 Fitur Utama

1. **Portofolio Rekayasa Interdisipliner**:
   - Menampilkan 8 proyek rekayasa dari data terbaru LinkedIn (Raspberry Pi, ESP32, PLC Omron, Factory I/O, SolidWorks CAD, AI, UAV sawit, dan katamaran elektrik).
   - Filter interaktif berdasarkan status (*Selesai*, *Pengembangan*, *Kompetisi & Paper*) dan pencarian teknologi.
   - Slot video demonstrasi sistem (misal: simulasi sortir konveyor Factory I/O) dan visualisasi CAD 3D.
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
- Membuat akun admin default: `admin@mahesa.local` (kata sandi: `AdminMahesa123!Secure`).
- Mengisi data profil LinkedIn Mahesa.
- Mengisi 8 data proyek rekayasa.
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
2. Masukkan kredensial admin:
   - **Email**: `admin@mahesa.local`
   - **Password**: `AdminMahesa123!Secure`
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

## 🌐 Panduan Deployment ke VPS / Server Produksi

1. Siapkan VPS Debian/Ubuntu dengan Docker & Nginx/Caddy terpasang.
2. Arahkan domain ke alamat IP publik VPS Anda.
3. Kloning repositori dan sesuaikan file `.env.production`:
   ```bash
   NEXT_PUBLIC_POCKETBASE_URL=https://api.domainanda.com
   POCKETBASE_URL=http://pocketbase:8090
   NEXT_PUBLIC_SITE_URL=https://domainanda.com
   ```
4. Jalankan `docker compose up -d --build`.
5. Atur reverse proxy SSL (Let's Encrypt / Certbot) mengarah ke port `3000` untuk web dan port `8090` untuk PocketBase API.

---

## 👤 Kontak Pemilik

- **Nama**: Mahesa Tirtha Agung Permana
- **Afiliasi**: Politeknik Industri ATMI (D4 Teknik Mekatronika, Robotika & Otomasi)
- **LinkedIn**: [https://www.linkedin.com/in/mahesa-tirtha-agung-permana](https://www.linkedin.com/in/mahesa-tirtha-agung-permana)
- **GitHub**: [https://github.com/xyzus-ni](https://github.com/xyzus-ni)
