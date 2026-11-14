# CONTENT_NEEDED — XYZUS Website v2.1

Daftar data yang hilang/dibutuhkan. Tidak ada yang dirender palsu — semua item di bawah masuk UI hanya setelah kamu konfirmasi.

## Proyek — media & bukti
- [ ] **Foto/screenshot per proyek** (8 proyek). Saat ini tidak ada `cover` → blok media disembunyikan. Upload via PocketBase admin (`projects.cover`).
- [ ] **PRJ-002 soil sensor**: konteks validasi ±8,4% → ±1,8% — konfirmasi: jumlah sampel (katanya 15?), metode referensi (probe komersial?), tanggal pengujian lapangan. Dipakai untuk blok "Validation & limitations".
- [ ] **PRJ-003 Factory I/O**: status "simulation-validated" — konfirmasi apakah ada video/screenshot run simulasi.
- [ ] **Video demo**: `autonomous-weed-harvester` masih pakai URL YouTube contoh (`dQw4w9WgXcQ`) — ganti dengan video asli atau kosongkan.
- [ ] **repo_url/demo_url** per proyek yang belum ada — untuk tautan "Source Code"/"Demo" di detail.

## Klaim yang perlu konfirmasi
- [ ] Handover promises (5 item di homepage): source code & firmware, skematik & wiring, arsitektur terdokumentasi, protokol terbuka, catatan serah terima — semua bisa kamu penuhi untuk proyek klien?
- [ ] Label stage per proyek (FIELD-TESTED / SIMULATION-VALIDATED / PROTOTYPE / IN DEVELOPMENT / RESEARCH) — cek `src/lib/status.ts`, koreksi bila ada yang salah.
- [ ] Blog Cirata: tanggal benar **12 November 2026** (sudah saya set di PocketBase + seed). Judul/naskah lain yang tanggalnya perlu dicek?

## Kontak & bisnis
- [ ] **Budget range** opsional di form kontak (select) — perlu daftar range yang kamu mau (mis. <5jt / 5–15jt / 15–50jt / >50jt).
- [ ] **Timeline/price model** — blueprint melarang menampilkan tanpa data; kalau ada paket harga, kirim dan saya tambahkan.
- [ ] Foto founder (opsional — saat ini sengaja tidak dipasang).

## Teknis
- [ ] `NEXT_PUBLIC_SITE_URL` di Vercel env → `https://www.xyzus.my.id` (canonical host www).
- [ ] Redirect apex `xyzus.my.id` → `www.xyzus.my.id` (301) — atur di DNS/Vercel.
- [ ] Lighthouse run setelah deploy (target ≥90).
