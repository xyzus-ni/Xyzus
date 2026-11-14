-- Seed: 2 Artikel Blog Baru + Fix Tanggal Cirata
-- Jalankan di Supabase SQL Editor

-- Fix tanggal Paper Cirata ke 2026
UPDATE public.posts
SET published_at = '2026-11-12T00:00:00Z', updated_at = now()
WHERE slug = 'rancang-bangun-kapal-katamaran-elektrik-cirata';

-- Artikel 1: Catatan Kalibrasi Sensor Tanah
INSERT INTO public.posts (title, slug, excerpt, abstract, content, tags, lang, status, category_id, published_at, reading_time)
VALUES (
  'Catatan Kalibrasi Multi-Sensor Tanah: Kelembaban, pH, dan NPK',
  'catatan-kalibrasi-multi-sensor-tanah',
  'Dokumentasi teknis proses kalibrasi sensor kapasitif kelembaban tanah, probe pH, dan sensor NPK menggunakan larutan buffer standar dan sampel tanah lapangan.',
  'Akurasi data sensor tanah adalah fondasi sistem monitoring agrikultur presisi. Catatan ini mendokumentasikan metodologi kalibrasi sensor kapasitif kelembaban VH400, probe pH analog, dan sensor NPK RS485.',
  '# Kalibrasi Multi-Sensor Tanah

## Latar Belakang

Dalam pengembangan stasiun monitoring tanah berbasis IoT, akurasi sensor adalah fondasi yang tidak bisa dikompromikan. Kesalahan kalibrasi 10% pada sensor kelembaban bisa mengakibatkan irigasi berlebih atau kekurangan air.

## Perangkat yang Dikalibrasi

| Sensor | Model | Interface | Rentang |
|--------|-------|-----------|---------|
| Kelembaban | VH400 Capacitive | Analog 0-3V | 0–100% VWC |
| pH Tanah | SEN0169 | Analog | pH 0–14 |
| NPK | RS485 Soil Sensor | RS485 Modbus | 0–1999 mg/kg |

## Metodologi Kalibrasi pH

Kalibrasi pH dilakukan dengan **metode dua titik** menggunakan larutan buffer standar pH 4.0 dan pH 7.0:

$$V_{pH} = m \cdot pH + b$$

Di mana $m$ adalah gradien kemiringan dan $b$ adalah intercept hasil regresi.

### Prosedur:
1. Bilas elektroda dengan akuades, keringkan perlahan.
2. Celupkan ke buffer pH 4.0, catat tegangan output ADC selama 60 detik.
3. Ulangi untuk buffer pH 7.0.
4. Hitung persamaan linear: $pH = \frac{V - b}{m}$

## Kalibrasi Sensor Kelembaban VH400

Sensor kapasitif dikalibrasi menggunakan **metode gravimetri**: tanah dikeringkan dalam oven 105°C selama 24 jam, lalu bertahap ditambah air terukur.

Kurva kalibrasi menunjukkan respons non-linear pada rentang 0–20% VWC:

$$VWC = a_0 + a_1 V + a_2 V^2$$

## Hasil

- Sensor pH: RMSE = 0.12 unit pH ✓
- Sensor kelembaban: RMSE = 1.8% VWC ✓
- Sensor NPK: perlu kalibrasi lanjutan dengan sampel referensi laboratorium

Kalibrasi ulang direkomendasikan setiap 3 bulan untuk deployment lapangan jangka panjang.',
  '["IoT", "Sensor", "Kalibrasi", "Agrikultur", "ESP32"]'::jsonb,
  'id',
  'published',
  'ecb25505-55da-4687-9d17-779748ae9a4b',
  '2026-09-20T00:00:00Z',
  5
)
ON CONFLICT (slug) DO UPDATE SET
  content = EXCLUDED.content,
  published_at = EXCLUDED.published_at,
  status = EXCLUDED.status;

-- Artikel 2: Simulasi Konveyor Factory I/O
INSERT INTO public.posts (title, slug, excerpt, abstract, content, tags, lang, status, category_id, published_at, reading_time)
VALUES (
  'Simulasi Konveyor Pemilah di Factory I/O: Dari Ladder Diagram ke HMI',
  'simulasi-konveyor-factory-io-plc',
  'Dokumentasi proyek simulasi sistem konveyor otomatis pemilah barang berdasarkan tinggi produk menggunakan Factory I/O, PLC virtual, dan monitoring HMI sederhana.',
  'Factory I/O memungkinkan simulasi sistem otomasi industri secara realistis tanpa hardware fisik. Proyek ini mengimplementasikan logika sortir barang berdasarkan sensor ketinggian.',
  '# Simulasi Konveyor Pemilah di Factory I/O

## Gambaran Proyek

Proyek ini mensimulasikan sistem konveyor industri yang umum dijumpai di lini sortir produk. Barang dengan ketinggian berbeda dideteksi sensor fotoelektrik dan diarahkan ke jalur yang tepat.

## Arsitektur Sistem

```
[Sensor Ketinggian] → [PLC] → [Gate Selector]
      ↓                              ↓
[Conveyor Utama] ──────────── [Conveyor Kiri / Kanan]
```

## Spesifikasi Factory I/O

| Komponen | Konfigurasi |
|----------|-------------|
| PLC Simulasi | Modbus TCP (Factory I/O built-in) |
| Sensor | Photoelectric Through-beam |
| Aktuator | Belt Conveyor + Diverter Gate |
| HMI | Panel sederhana (Start/Stop/Reset) |

## Logika Ladder Diagram

**Rung 1 — Deteksi Tinggi:**
Dua sensor dipasang pada ketinggian berbeda (100mm dan 200mm).
- Hanya sensor bawah aktif → produk kecil → Gate Kiri
- Kedua sensor aktif → produk besar → Gate Kanan

**Rung 2 — Interlock & Timer:**
Timer ON-delay 500ms memastikan produk melewati gate sepenuhnya sebelum gate kembali ke posisi netral.

## Hasil Pengujian

| Kecepatan | Akurasi Sortir | Catatan |
|-----------|---------------|---------|
| 0.5 m/s | 100% | Nominal |
| 1.0 m/s | 94% | Timer perlu disesuaikan ke 300ms |

Factory I/O sangat efektif untuk prototyping logika PLC sebelum deploy ke hardware nyata.',
  '["PLC", "Factory I/O", "Otomasi Industri", "Ladder Logic", "SCADA"]'::jsonb,
  'id',
  'published',
  'daf6646d-3fcd-4d59-966d-777f6ff6b75f',
  '2026-08-05T00:00:00Z',
  6
)
ON CONFLICT (slug) DO UPDATE SET
  content = EXCLUDED.content,
  published_at = EXCLUDED.published_at,
  status = EXCLUDED.status;
