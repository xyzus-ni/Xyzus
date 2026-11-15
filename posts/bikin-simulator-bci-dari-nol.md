---
title: "Bikin Simulator Brain-Computer Interface dari Nol: Kenapa BCI Gagal di Hari Kedua"
slug: bikin-simulator-bci-dari-nol
date: 2026-11-15
description: "Eksplorasi mandiri membangun simulator BCI open source: dari EEG sintetis, decoder CSP/Riemann, data asli BCI Competition IV 2a, robot closed-loop, sampai recentering kovarians — dan kenapa sistem yang mulus di hari pertama rapuh di hari kedua."
tags: ["BCI", "EEG", "Riemannian Geometry", "Motor Imagery", "Open Source", "Simulasi"]
category: "Catatan Teknis"
lang: id
status: draft
---

> **Ringkasan jujur dulu.** Ini proyek eksplorasi mandiri memakai tools open source — bukan riset besar, bukan temuan baru. Yang saya uji: decoder motor imagery (CSP+LDA, Riemann tangent space+LR, Riemann MDM) di data EEG sintetis dan data asli BCI Competition IV 2a (9 subjek, via MOABB); robot closed-loop 1D dengan ambang keyakinan; dan *recentering* matriks kovarians sebagai penangkal drift. Hasil utama: recentering menaikkan akurasi perintah robot "hari ke-2" dari ~48% menjadi ~70% pada sapuan 20 seed. **Catatan penting: semua eksperimen robot dan drift memakai data EEG sintetis dengan pergeseran sinyal yang disimulasikan — bukan rekaman manusia.** Hanya bagian decoder di data asli (Level 2 dan Level 4) yang memakai data manusia.

## Pembuka: BCI yang bagus di hari pertama sering gagal di hari kedua

Kalau kamu pernah coba brain-computer interface (BCI), pola yang sering muncul itu sama: demo pertama kelihatan ajaib, lalu besoknya akurasinya anjlok. Bukan karena decoder-nya jelek — tapi karena sinyal EEG itu *tidak stabil*. Posisi elektroda bergeser sedikit, impedansi kulit berubah, subjek lelah, suasana hati beda. Decoder yang dilatih kemarin pagi bisa jadi sampah hari ini sore.

Saya penasaran seberapa parah masalah ini dalam praktik, jadi saya bangun simulator BCI dari nol — dari generator sinyal EEG sintetis sampai robot yang "digerakkan" lewat decoder, semuanya pakai tools open source (BrainFlow, MNE-Python, pyRiemann, MOABB, scikit-learn). Tulisan ini merangkum apa yang terjadi, level per level, termasuk bagian yang gagal.

## Level 1: EEG sintetis yang tidak membosankan

Sebelum pakai data manusia (yang ribet diunduh dan diolah), saya buat generator EEG sintetis 8 kanal (Fp1, Fp2, F3, F4, C3, Cz, C4, Pz) pada 250 Hz. Isinya bukan noise putih sembarangan:

- **Ritme mu (8–12 Hz) dan beta (15–25 Hz)** — osilasi sensorimotor yang benar-benar dipakai decoder motor imagery.
- **ERD (Event-Related Desynchronization)** — penurunan amplitudo mu/beta di hemisphere yang berlawanan dengan tangan yang dibayangkan. Bayangkan tangan kanan → ERD dominan di C3; tangan kiri → di C4.
- **Noise realistis**: pink noise per kanal, artefak kedip mata (gaussian burst di sumber frontal), noise listrik 50 Hz, dan semburan EMG sesekali.
- **Volume conduction sederhana**: tiap "sumber" otak memancar ke elektroda dengan peluruhan jarak spasial.

Hasilnya trial 6 detik: 0–2 s baseline, 2–5 s imagery, 5–6 s istirahat. Gambar di bawah menunjukkan PSD (power spectral density — distribusi daya sinyal per frekuensi) baseline vs imagery; terlihat jelas penurunan daya di pita mu saat imagery.

![PSD sinyal EEG sintetis: perbandingan baseline dan imagery untuk tangan kanan dan kiri, dengan penekanan ERD di C3/C4](/images/blog/bci/eeg_sintetis.png)

## Level 2: Tiga decoder, lalu disiksa dengan noise

Decoder pertama yang saya coba adalah trio klasik:

- **CSP + LDA** — Common Spatial Patterns mencari kombinasi kanal yang memaksimalkan varians satu kelas vs kelas lain, lalu Linear Discriminant Analysis mengklasifikasikannya.
- **Riemann TS + LR** — tiap window sinyal diringkas jadi matriks kovarians, diproyeksikan ke *tangent space* (ruang singgung di manifold matriks definit positif), lalu Logistic Regression.
- **Riemann MDM** — *Minimum Distance to Mean*: klasifikasi berdasarkan jarak geodesik ke rata-rata kovarians tiap kelas.

Di data sintetis bersih, ketiganya mencapai akurasi ~100% pada cross-validation — terlalu mudah, seperti dugaan. Jadi saya siksaan: tambahkan noise putih sebesar *k* × standar deviasi sinyal, dengan *k* dari 0 sampai 6.<!-- VERIFIKASI: angka akurasi per level noise dibaca dari grafik decode_level2.png, bukan dari output teks --> Hasilnya kira-kira: ~100% di noise rendah, ~76–89% di noise ×3–×4, dan ~60% di ×6.<!-- VERIFIKASI --> Pola spasial CSP yang muncul memang didominasi C3 dan C4 — sesuai harapan, karena itulah elektroda di atas motor cortex.

![Akurasi decoder vs level noise tambahan, dan pola spasial CSP yang didominasi C3/C4](/images/blog/bci/decode_level2.png)

## Ujian di data asli: BCI Competition IV 2a

Data sintetis hanya membuktikan pipeline tidak rusak. Ujian sesungguhnya: **BCI Competition IV Dataset 2a** via MOABB — 9 subjek, motor imagery tangan kiri vs kanan, 22 kanal EEG, 2 sesi per subjek. Saya evaluasi dua cara:

- **Within-session**: 5-fold CV mencampur kedua sesi — mirip "latihan dan ujian dari materi yang sama".
- **Cross-session**: latih di sesi 1, uji di sesi 2 — lebih jujur, mirip pemakaian nyata.

Hasil rata-rata kira-kira: TS+LR ~77%, CSP+LDA ~73%, MDM ~73% untuk cross-session.<!-- VERIFIKASI: angka dibaca dari grafik moabb_real.png --> Yang paling menarik adalah variasi antar subjek — dan subjek S7 yang anjlok dari ~86% (within) ke ~51% (cross-sesi).<!-- VERIFIKASI --> Ini bukti nyata dari "gagal di hari kedua": model yang tampak bagus tiba-tiba runtuh begitu sesi berganti.

![Akurasi within-session vs cross-session per subjek untuk tiga decoder](/images/blog/bci/moabb_real.png)

## Level 3: Robot closed-loop di koridor 1D

Dengan decoder Riemann TS+LR, saya bangun simulator robot di koridor satu dimensi (posisi diskrit −4 sampai +4). Alurnya: user "membayangkan" gerak → EEG sintetis + noise → jendela decoding 1,5 detik bergeser tiap 0,25 detik → probabilitas decoder → akumulasi bukti dengan smoothing → perintah kiri/kanan → robot bergerak satu sel.

Detail yang menurut saya penting: sistem memakai **ambang keyakinan** (THR = 0,70). Kalau probabilitas tidak pernah melewati ambang, sistem memilih **timeout — diam** — daripada menebak. Filosofinya: lebih baik tidak bergerak daripada salah gerak. Saya juga menyapu nilai THR untuk melihat trade-off akurasi vs latensi vs timeout.

![Lintasan robot di koridor 1D untuk tiga profil user, plus hasil sapuan ambang keyakinan](/images/blog/bci/level3_closed_loop.png)

Latensi minimum sistem ~1,5 detik — itu panjang jendela decoding, bukan something yang bisa dihilangkan begitu saja. Untuk BCI motor imagery, angka segini sebenarnya wajar; untuk aplikasi realtime seperti game, ini masih lambat.

## Level 4: Recentering kovarians — penangkal drift

Masalah cross-session punya solusi elegan yang sudah dikenal di literatur (pendekatan Riemannian alignment, misalnya Zanini dkk., 2018<!-- VERIFIKASI SITASI -->): sebelum klasifikasi, "pusatkan" matriks kovarians tiap sesi sehingga rata-rata Riemann-nya menjadi identitas:

```python
def recenter(C):
    """Geser kovarians C (n, ch, ch) agar rata-rata Riemann-nya = identitas."""
    M = mean_covariance(C, metric="riemann")   # rata-rata Riemann sesi
    A = invsqrtm(M)                            # M^(-1/2)
    return np.einsum("ij,njk,lk->nil", A, C, A)  # C' = M^(-1/2) C M^(-1/2)
```

Intuisinya: kalau sinyal hari ini "bergeser" secara statistik, geser semua pengukurannya kembali ke titik acuan yang sama. Tidak butuh label sama sekali — cukup trial mentah. Penting dicatat: **recenter­ing ini bukan temuan saya** — kontribusi saya hanya implementasi dan evaluasinya di simulator sendiri.

Di data asli BCI IV 2a, TS+LR cross-session naik rata-rata sekitar 4 poin (~77% → ~81%).<!-- VERIFIKASI --> Subjek S7 yang tadi anjlok justru pulih dari ~57% ke ~85%.<!-- VERIFIKASI --> Tapi tidak semua tertolong: S2 dan S5 yang sinyalnya memang lemah tetap di sekitar tebakan. Versi *online* — referensi diperbarui kausal tiap trial datang, tanpa melihat masa depan — hampir menyamai versi *batch* yang melihat semua trial sekaligus.

![Hasil recentering batch dan online pada data asli BCI IV 2a per subjek](/images/blog/bci/level4b_real.png)

## Level 5: Hari ke-2 di simulator — dan sapuan 20 seed

Semua level sebelumnya adalah "latihan". Level terakhir menguji skenario yang jadi judul tulisan ini: decoder dilatih di "hari 1", lalu robot dipakai di "hari 2" ketika sinyal sudah bergeser.

Drift-nya disimulasikan sebagai **campuran spasial antar elektroda** (matriks campuran acak 8×8) **plus perubahan gain** 0,8 — meniru kombinasi pergeseran posisi elektroda dan perubahan amplitudo. Kekuatan drift DRIFT = 1,0, dan noise tambahan level sedang (×3 dari std sinyal). Kalibrasi recentering memakai 20 trial singkat tanpa label (cue kiri/kanan bergantian, labelnya tidak dipakai).

Hasil sapuan **20 seed acak** (masing-masing 10 misi per kondisi):

| Kondisi | Akurasi perintah rata-rata |
|---|---|
| Hari 1 (tanpa drift, batas atas) | tinggi — referensi |
| Hari 2 tanpa adaptasi | **~48%** |
| Hari 2 + recentering online | **~70%** |

Selisihnya **+22,6 poin** (interval kepercayaan 95%: +13,7 sampai +31,7). Recentering lebih baik di **16 dari 20 seed**. Jumlah perintah yang dibutuhkan robot untuk sampai goal juga turun rata-rata 4,8 per misi.<!-- angka dari sweep_seed.json, terverifikasi -->

![Hasil sapuan 20 seed: akurasi perintah hari ke-2 tanpa vs dengan recentering](/images/blog/bci/sweep_seed.png)

![Perbandingan lintasan robot hari 1 vs hari 2 tanpa adaptasi vs dengan recentering](/images/blog/bci/level5_robot_drift.png)

## Keterbatasan — dibaca dulu sebelum percaya

Ada beberapa hal yang harus saya akui terang-terangan:

- **Drift-nya buatan dan cukup kuat.** DRIFT = 1,0 dengan campuran spasial penuh + gain 0,8 adalah skenario yang cukup ekstrem. Pada drift ringan, manfaat recentering jelas lebih kecil — metode ini bukan obat mujarab.
- **"Akurasi perintah" menghitung timeout sebagai salah.** Sistem yang memilih diam dinilai sama dengan yang salah gerak — konservatif, tapi mungkin terlalu keras.
- **Recentering mengasumsikan kalibrasi seimbang kiri/kanan.** Versi awal yang tidak memakai asumsi ini malah lebih buruk dari tanpa adaptasi — detail kecil yang mengubah hasil secara dramatis.
- **Recentering tidak membantu di 4 dari 20 seed.** Ada kondisi drift di mana referensi "pusat" yang salah malah menyesatkan.
- **Data robot 100% sintetis.** Tidak ada rekaman EEG manusia di eksperimen robot/drift — hanya pergeseran sinyal yang disimulasikan.
- **Data asli hanya satu dataset**, hanya motor imagery kiri vs kanan, dan subjek dengan sinyal lemah (S2, S5) tidak tertolong sama sekali.

## Kredit & langkah berikutnya

Tools: **BrainFlow, MNE-Python, pyRiemann, MOABB, scikit-learn**, dan dataset **BCI Competition IV 2a** (BNCI Horizon 2020). Recentering/Riemannian alignment adalah metode literatur yang sudah dikenal — saya hanya mengevaluasinya di simulator sendiri.

Kalau lanjut, urutan yang masuk akal: decoder adaptif yang belajar dari umpan balik benar/salah (bukan cuma recentering tanpa label), robot di **PyBullet** dengan model mecanum wheel biar tidak 1D lagi, dan yang paling penting — hardware murah (misalnya OpenBCI atau bahkan headband konsumen) untuk menguji apakah drift di dunia nyata mirip dengan yang saya simulasikan. Kalau hasilnya ternyata sangat berbeda, ya sudah — itulah gunanya simulasi: gagal murah dulu sebelum gagal mahal.

---

*Kode dan data pendukung proyek ini tersimpan di repository saya. Semua angka pada tulisan ini diverifikasi terhadap output skrip; angka yang dibaca dari grafik ditandai di sumber Markdown.*
