-- Seed Data: Categories, Profile, Projects, Posts

-- 1. Categories
INSERT INTO public.categories (name, slug, description) VALUES
('Karya Tulis Ilmiah', 'karya-tulis-ilmiah', 'Paper penelitian, metodologi eksperimen, dan karya ilmiah akademik'),
('Paper & Laporan', 'paper-laporan', 'Laporan teknis proyek, studi kelayakan, dan analisis sistem'),
('Catatan Teknis', 'catatan-teknis', 'Dokumentasi teknis seputar mikrokontroler, IoT, PLC, dan software engineering'),
('Proyek & Dokumentasi', 'proyek-dokumentasi', 'Dokumentasi pengerjaan dan arsitektur proyek mekatronika'),
('Opini & Refleksi', 'opini-refleksi', 'Pemikiran dan pandangan mengenai perkembangan teknologi otomasi dan AI'),
('Lainnya', 'lainnya', 'Kategori tulisan lainnya')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Profile
INSERT INTO public.profile (name, headline, bio, location, social_links)
VALUES (
    'Mahesa Tirtha Agung Permana',
    'Mechatronics & IoT Engineer, membangun sistem cerdas end-to-end (sensor → cloud → dashboard)',
    'Mahasiswa D4 Teknologi Rekayasa Mekatronika di Politeknik Industri ATMI. Berpengalaman dalam pengembangan sistem embedded, IoT, otomatisasi industri, dan web dashboard.',
    'Bekasi, Jawa Barat, Indonesia',
    '{"linkedin": "https://www.linkedin.com/in/mahesa-tirtha-agung-permana", "github": "https://github.com/xyzus-ni", "email": "mtirtha865@gmail.com"}'::jsonb
);

-- 3. Projects
INSERT INTO public.projects (title, slug, summary, description, tech, status, featured, visible, "order") VALUES
(
    'Asisten Raspberry Pi untuk Penyandang Buta Warna',
    'asisten-raspberry-pi-buta-warna',
    'Sistem embedded portabel berbasis kamera dan computer vision untuk membantu mengenali dan mendikte warna objek secara real-time via audio.',
    'Proyek asisten tunanetra/buta warna berbasis Raspberry Pi dengan modul kamera dan algoritma color classification HSV. Sistem memproses feed kamera dan mengeluarkan deskripsi warna melalui text-to-speech speaker.',
    '["Raspberry Pi", "Python", "OpenCV", "Embedded Linux", "TTS"]'::jsonb,
    'completed',
    true,
    true,
    1
),
(
    'Kalibrasi Multi-Sensor Tanah & Pengujian Lapangan',
    'kalibrasi-sensor-tanah-lapangan',
    'Riset kalibrasi kurva sensor kelembaban, pH, dan NPK tanah untuk memastikan akurasi data sebelum integrasi ke stasiun IoT agrikultur.',
    'Melakukan kalibrasi komparatif multi-sensor soil moisture kapasitif dan probe pH menggunakan larutan buffer standar dan sampel tanah beragam tekstur. Data dianalisis untuk koreksi error non-linear.',
    '["IoT", "Sensor Calibration", "ESP32", "Python Data Analysis"]'::jsonb,
    'completed',
    true,
    true,
    2
),
(
    'Simulasi Konveyor Otomasi Industri di Factory I/O',
    'simulasi-konveyor-factory-io',
    'Pemrograman logika sortir barang otomatis multi-jalur menggunakan PLC simulasi dan Factory I/O.',
    'Implementasi logika sekuensial otomasi industri menggunakan ladder diagram / logic control untuk konveyor pemilah barang berdasarkan ukuran dan bahan.',
    '["Factory I/O", "PLC", "Otomasi Industri", "Ladder Logic"]'::jsonb,
    'completed',
    true,
    true,
    3
),
(
    'Desain Rangka Tempat Tidur Modular CAD + Visualisasi AI',
    'desain-rangka-tempat-tidur-cad-ai',
    'Desain teknik struktural rangka tempat tidur ergonomis modular dengan evaluasi visual dan perenderan material berbasis AI.',
    'Perancangan mekanikal 3D menggunakan CAD dengan sambungan knockdown efisien. Visualisasi estetika dan pemilihan finishing material dibantu generative AI rendering.',
    '["CAD", "SolidWorks", "AI Visualization", "Desain Manufaktur"]'::jsonb,
    'completed',
    false,
    true,
    4
),
(
    'Sistem Deteksi Dini Hama Sawit Presisi (UAV + YOLO + Sensor)',
    'deteksi-dini-hama-sawit-uav-yolo',
    'Sistem pemantauan kesehatan kelapa sawit menggabungkan citra udara drone dengan model deteksi objek YOLO dan telemetry sensor lingkungan.',
    'Proyek penelitian integrasi UAV multispektral dengan deep learning YOLOv8 untuk mendeteksi gejala serangan hama ulat api dan kumbang badak secara presisi.',
    '["Computer Vision", "YOLOv8", "PyTorch", "UAV/Drone", "IoT"]'::jsonb,
    'in_progress',
    false,
    true,
    5
),
(
    'Kapal Pemanen Eceng Gondok Otonom Waduk Cirata (Katamaran)',
    'kapal-katamaran-pemanen-eceng-gondok-cirata',
    'Perancangan kapal katamaran bertenaga listrik surya dengan sistem navigasi otonom untuk mengatasi invasi gulma air waduk PLTA.',
    'Paper dan rancangan teknik kapal pembersih gulma otomatis dengan conveyor mesh intake, sensor LiDAR anti-kandas, dan penggerak dual thruster listrik ramah lingkungan.',
    '["Robotics", "Marine Tech", "Renewable Energy", "Autonomous Navigation"]'::jsonb,
    'in_progress',
    true,
    true,
    6
),
(
    'Sistem OEE (Overall Equipment Effectiveness) Berbasis Web',
    'sistem-oee-web-flask',
    'Aplikasi dashboard pemantauan efektivitas mesin manufaktur (Availability, Performance, Quality) real-time.',
    'Dikembangkan sebagai implementasi PBO lanjutan menggunakan Flask dan Chart.js untuk menghitung metrik OEE dari input sensor line produksi ATMI.',
    '["Flask", "Python", "PostgreSQL", "Tailwind CSS", "Chart.js"]'::jsonb,
    'completed',
    false,
    true,
    7
),
(
    'Asisten AI Multi-Agent via Telegram (CrewAI)',
    'asisten-ai-multi-agent-telegram',
    'Bot cerdas kolaboratif dengan multi-agen otonom untuk riset teknis, rangkuman jurnal, dan manajemen tugas teknik.',
    'Menggunakan arsitektur CrewAI dengan peran agen Peneliti, Analis Kode, dan Technical Writer yang berinteraksi langsung melalui antarmuka Telegram Bot.',
    '["Python", "CrewAI", "LLM", "Telegram Bot API"]'::jsonb,
    'in_progress',
    false,
    true,
    8
)
ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    description = EXCLUDED.description,
    tech = EXCLUDED.tech,
    status = EXCLUDED.status,
    featured = EXCLUDED.featured,
    visible = EXCLUDED.visible,
    "order" = EXCLUDED."order";

-- 4. Sample Post
INSERT INTO public.posts (title, slug, excerpt, abstract, content, tags, lang, status, published_at, reading_time)
VALUES (
    'Rancang Bangun Kapal Katamaran Elektrik Otonom untuk Pembersihan Gulma Air Waduk Cirata',
    'rancang-bangun-kapal-katamaran-elektrik-cirata',
    'Kajian desain sistem propulsi listrik dan kendali navigasi otonom kapal katamaran dalam upaya mitigasi eutrofikasi dan menjaga debit air PLTA Cirata.',
    'Waduk Cirata menghadapi tantangan sedimentasi dan penurunan kapasitas akibat pesatnya populasi eceng gondok. Makalah ini mengkaji perancangan kapal pemanen gulma katamaran elektrik dengan kendali waypoint otomatis.',
    '# Pendahuluan

Waduk Cirata merupakan salah satu pembangkit listrik tenaga air (PLTA) krusial di pulau Jawa. Eutrofikasi akibat populasi eceng gondok (*Eichhornia crassipes*) menghambat aliran air dan mempercepat pendangkalan.

## Metodologi Desain
Desain lambung katamaran dipilih karena stabilitas transversal yang unggul:
$$GM = \\frac{I}{V} - BG$$

Di mana $GM$ adalah tinggi metasentrik, $I$ adalah momen inersia penampang air, dan $V$ adalah volume benaman.

## Arsitektur Sistem Otomasi
Sistem kendali menggunakan Raspberry Pi terintegrasi dengan sensor GPS-RTK dan IMU 9-DOF untuk menjaga haluan kapal (*heading angle* $\\psi$).',
    '["Mekatronika", "Robotika Laut", "Karya Ilmiah", "IoT"]'::jsonb,
    'id',
    'published',
    NOW(),
    6
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    abstract = EXCLUDED.abstract,
    content = EXCLUDED.content,
    tags = EXCLUDED.tags,
    status = EXCLUDED.status;
