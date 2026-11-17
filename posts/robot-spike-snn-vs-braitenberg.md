---
title: "Robot yang Berpikir dengan Spike: Membandingkan SNN dan Braitenberg di PyBullet (dan Kenapa R-STDP Sederhana Tidak Membantu)"
slug: robot-spike-snn-vs-braitenberg
date: 2026-11-17
description: "Eksperimen lanjutan seri simulator: arena PyBullet 6x6 m, robot differential drive kinematik dengan 8 sensor raycast, dan perbandingan pengendali Braitenberg klasik vs SNN LIF berbasis spike — termasuk hasil negatif R-STDP yang jujur."
tags: ["SNN", "Spiking Neural Network", "PyBullet", "Robotika", "STDP", "Simulasi"]
category: "Catatan Teknis"
lang: id
status: draft
---

> **Ringkasan jujur dulu.** Ini eksperimen simulasi murni PyBullet — tidak ada hardware nyata. Saya membangun arena 3D sederhana, robot differential drive kinematik, 8 sensor jarak, lalu membandingkan pengendali Braitenberg klasik (tanpa neuron sama sekali) dengan SNN berbasis neuron *Leaky Integrate-and-Fire* (LIF) yang sinyalnya berupa spike. Temuan utama: SNN jauh lebih tahan saat dua sensor depan mati, tetapi jauh lebih buruk saat tiga sensor kiri mati; dan R-STDP (reward-modulated STDP) versi sederhana yang saya coba **tidak memberi perbaikan terukur** — itu hasil sah, bukan kegagalan yang disembunyikan.

Lanjutan dari [artikel BCI sebelumnya](/blog/bikin-simulator-bci-dari-nol): kalau decoder EEG kemarin "berpikir" dalam angka, kali ini saya bertanya apakah robot bisa "berpikir" dalam spike — dan apakah itu benar-benar lebih baik daripada logika biasa.

## Dunia 3D dan robot yang (hampir) nyata

Arena: bidang datar **6×6 meter** di PyBullet dengan rintangan berbentuk balok yang posisinya acak berdasarkan seed — jadi tiap seed menghasilkan dunia yang sedikit berbeda, tetapi deterministik (dijalankan dua kali hasilnya identik). Robotnya **differential drive kinematik**: tidak ada roda fisik yang disimulasikan, hanya kecepatan linear dan angular yang diintegrasikan. Sensor: **8 raycast** yang menembak dari tepi robot ke segala arah (rentang 2 m), menghasilkan 8 angka jarak.

Pengendali pertama adalah **Braitenberg vehicle** — konsep klasik dari Valentino Braitenberg (1984, *Vehicles*): sensor kiri yang mendeteksi rintangan menghambat motor kanan, dan sebaliknya. Tanpa satu neuron pun, kendaraan ini sudah bisa menghindar rintangan. Ini baseline penting: dibuat dulu sebelum SNN supaya perbandingannya adil.

![Arena PyBullet 6x6 m dengan rintangan acak dan robot di tengah](/images/blog/snn/arena_topdown.png)

## Harness evaluasi: baseline sebelum klaim

Sebelum membandingkan SNN, saya bangun *harness* yang mengevaluasi tiap pengendali pada:

- **20 seed** × episode **90 detik**
- **Dua kepadatan**: 6 dan 12 rintangan
- **Lima kondisi gangguan**: normal; 2 sensor depan mati; 3 sensor kiri mati; noise sensor tinggi (galat ±0,4 m); noise sangat tinggi (±0,8 m)

Metriknya: tabrakan per episode, episode tanpa tabrakan (%), jarak tempuh, cakupan area, dan sel per meter tempuh.

Dua temuan awal yang penting. Pertama, **noise sensor hampir tidak membedakan pengendali** — bahkan Braintenberg polos dengan galat ±0,8 m tetap hampir tanpa tabrakan di arena 12 rintangan (0,15 per episode). Kedua, **sensor yang benar-benar mati** adalah pembeda sesungguhnya. Dan satu koreksi yang saya catat di kode: cakupan area yang rendah (~20%) bukan karena robot muter di tempat, melainkan karena episode 90 detik membatasi jarak tempuh maksimum — batas waktu, bukan kegagalan navigasi.

## Dari jarak ke spike: rate coding

SNN butuh input berupa spike, bukan angka. Solusinya **rate coding**: jarak yang makin dekat menghasilkan laju spike yang makin tinggi — laju dasar ~5 Hz (jauh) sampai ~150 Hz (menempel), dengan fluktuasi gain per-neuron (seperti variasi elektrolit/kelelahan) dan jitter waktu spike beberapa milidetik.

![Kurva rate coding dan galat dekode jarak (RMSE) vs panjang jendela](/images/blog/snn/spike_encoding.png)

Galat dekode-nya diukur sebagai RMSE jarak terhadap panjang jendela: sekitar 0,33 m pada jendela 100 ms, 0,48 m pada 50 ms, dan 0,19 m pada 500 ms.<!-- VERIFIKASI: angka RMSE dibaca dari grafik spike_encoding.png, bukan output teks --> Artinya ada trade-off nyata: jendela pendek = respons cepat tapi jarak tak akurat; jendela panjang = akurat tapi lambat. Ini constraint yang tidak dimiliki Braitenberg — dia membaca jarak langsung, tanpa perlu "menghitung" berapa lama harus mendengar spike.

## SNN LIF dengan bobot tangan

Arsitekturnya sederhana tapi tetap spike murni (semua neuron LIF, langkah 1 ms):

- **8 neuron sensorik** — satu per sensor, spike Poisson sesuai rate coding
- **8 neuron relay** — meneruskan sinyal sensor (plus sedikit masukan tetangga untuk penghalusan spasial)
- **1 neuron "blokir"** — menyala hanya jika dua sensor depan sama-sama dekat
- **2 neuron motor** (kiri/kanan) — diberi arus bias supaya robot maju; kecepatan roda = laju spike motor dalam jendela 100 ms

Logikanya pada dasarnya versi spike dari Braitenberg: sensor kiri dekat → hambat motor kanan → belok kanan; dua sensor depan dekat → neuron blokir menyala → putar. Ada juga aturan anti-kebuntuan: jika aktivitas motor terlalu rendah (di bawah ambang diam 10%), robot berhenti sejenak lalu berputar pelan mencari jalan — lagi-lagi prinsip "diam daripada salah" dari artikel BCI.

Yang perlu saya akui: **bobot SNN ini disetel tangan**, dengan bantuan simulasi 2D sederhana buatan saya sendiri yang tidak sepenuhnya setara dengan PyBullet — dan ternyata prediksinya di kondisi sensor depan mati justru terbalik. Jadi "SNN" di sini adalah demonstrasi bahwa logika Braitenberg *bisa* ditulis dalam spike, bukan pembuktian bahwa spike lebih pintar.

## Hasil perbandingan: tabrakan per episode

Semua angka di bawah dari `harness_baseline.json` (20 seed, 90 detik/episode):

**Arena 12 rintangan:**

| Kondisi | Braitenberg | SNN bobot tangan |
|---|---|---|
| Normal | 0,90 | 0,60 |
| 2 sensor depan mati | 8,35 | **2,50** |
| 3 sensor kiri mati | 1,95 | **7,95** |
| Noise tinggi (±0,4 m) | 0,35 | 0,60 |
| Noise sangat tinggi (±0,8 m) | 0,15 | 0,40 |

**Arena 6 rintangan:** SNN — normal 0,15; 2 depan mati 1,90; 3 kiri mati 4,40; noise tinggi 0,05; noise sangat tinggi 0,25. Braitenberg — normal 0,50; 2 depan mati 3,15; 3 kiri mati 0,85; noise tinggi 0,00; noise sangat tinggi 0,05.

![Hasil harness baseline: tabrakan dan cakupan per pengendali, kepadatan, dan kondisi](/images/blog/snn/harness_baseline.png)

Dua hal yang menonjol:

1. **SNN jauh lebih tahan saat dua sensor depan mati** (2,50 vs 8,35 tabrakan di arena padat). Dugaan saya: redundansi relay + neuron blokir membuat SNN "meminjam" sensor tetangga untuk mengkompensasi, sementara Braitenberg langsung buta di sektor depan.
2. **SNN jauh lebih buruk saat tiga sensor kiri mati** (7,95 vs 1,95). Arah putar bawaan SNN cenderung ke kiri — ketika semua sensor kiri mati, ia seolah tidak "tahu" harus ke mana — tapi saya harus jujur: penyebab pastinya **belum diketahui**. Satu dugaan (bias putar) sudah saya uji dan tidak menunjukkan perubahan terukur.

Metrik turunan: tabrakan per 100 m tempuh (dihitung dari tabrakan ÷ jarak × 100) memperlihatkan pola sama — misalnya di 12 rintangan normal, SNN menempuh lebih sedikit jarak (17,8 m vs 31,7 m) dengan tabrakan lebih sedikit, tapi cakupan area juga lebih rendah (16,9% vs 22,7%): SNN lebih hati-hati dan lebih lambat.

## R-STDP: mencoba membuatnya belajar sendiri

Kalau bobot tangan adalah "jawaban yang diberikan", pertanyaan natural berikutnya: bisakah robot *belajar* bobot motor dari pengalamannya sendiri? Saya coba **R-STDP** — reward-modulated Spike-Timing-Dependent Plasticity: sinapsis yang "kausal" (pre sebelum post) menghasilkan jejak kelayakan (*eligibility trace*), lalu reward dari sensor robot sendiri (maju cepat dengan depan lapang = positif, mendekati rintangan = negatif) memutasi bobot hanya saat ada "kejutan" reward.

Yang dilatih: hanya bobot interneuron→motor (2×9); selebihnya tetap. Dua mode: mulai dari bobot Braitenberg-spike ("tangan") dan dari bobot acak ("acak"). Skenario uji: kondisi **3 sensor kiri mati** — kasus terlemah SNN — selama 60 episode, seed latih ≥200, seed uji 0–19.

Hasilnya jujur mengecewakan:

| Kondisi | Tabrakan sebelum | Tabrakan sesudah | Jarak tempuh |
|---|---|---|---|
| 6 rintangan | 4,40 | 4,10 | 39,0 → 44,7 m |
| 12 rintangan | 7,95 | 7,65 | 31,5 → 40,2 m |

![Kurva belajar R-STDP selama 60 episode](/images/blog/snn/rstdp_belajar.png)

Tabrakan turun sedikit dan jarak tempuh naik — tapi selisihnya **berada dalam selang kepercayaan**, jadi tidak bisa saya sebut perbaikan. Artinya bukan "R-STDP gagal" secara umum — hanya versi sangat sederhana ini (satu kondisi, 60 episode, reward heuristik) yang tidak cukup untuk mengubah perilaku berarti. Belajar dari reward yang datang terlambat dan ambigu ternyata jauh lebih sulit daripada kelihatannya.

## Keterbatasan

- **Simulasi murni** — robot kinematik di arena 2D datar; tidak ada roda fisik, gesekan, atau dinamika nyata.
- **Bobot SNN disetel tangan** lewat simulasi 2D buatan sendiri yang tidak setara dengan PyBullet — prediksinya bahkan terbalik di satu kondisi.
- **Hanya 20 seed per kondisi** — selang kepercayaan kadang lebar.
- **Tabrakan = kejadian kontak** — robot yang nyangkut bisa tercatat berkali-kali pada episode yang sama.
- **Noise ±0,4/0,8 m tidak membedakan pengendali** — temuan "sensor mati lebih penting dari noise" berlaku untuk rentang yang diuji saja.
- **R-STDP yang dicoba sangat sederhana** — tidak membuktikan R-STDP pada umumnya gagal.
- **Penyebab SNN lemah di sensor kiri mati belum diketahui.**
- Konsep Braitenberg merujuk pada Braitenberg (1984, *Vehicles*, MIT Press)<!-- VERIFIKASI SITASI -->; R-STDP terinspirasi Izhikevich (2007, *Cerebral Cortex*)<!-- VERIFIKASI SITASI -->.

## Yang saya pelajari & langkah berikutnya

Pengalaman paling berharga justru dari yang gagal: reward sederhana tidak cukup untuk pembelajaran spike di task navigasi, dan bobot "tangan" yang tampak masuk akal di simulasi 2D bisa berbalik di dunia yang sedikit lebih realistis. Langkah berikutnya yang masuk akal: perbaiki kasus tiga sensor kiri mati (mungkin dengan arsitektur relay yang lebih simetris atau eksplorasi eksplisit), ganti kinematik dengan **roda mecanum** di PyBullet agar gerak lebih kaya, dan yang paling menarik — menyambungkan loop ini dengan decoder BCI dari artikel sebelumnya, sehingga "pikiran" EEG benar-benar menggerakkan robot di arena yang sama.

*Semua angka pada tulisan ini dihitung langsung dari `harness_baseline.json`, `harness_baseline_uji.json`, dan `hasil_rstdp_kirimati.json`; angka yang dibaca dari grafik ditandai di sumber Markdown.*
