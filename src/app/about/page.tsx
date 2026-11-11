import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Tentang Saya",
  description:
    "Profil lengkap, riwayat pendidikan Politeknik Industri ATMI, kepengurusan Senat Mahasiswa, dan pengalaman PKL Mahesa Tirtha Agung Permana.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* HEADER SECTION */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <span>PROFIL &amp; PERJALANAN REKAYASA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tentang Mahesa
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Mechatronics &amp; IoT Engineer yang berdedikasi menjembatani dunia rekayasa fisik perangkat keras dengan kecerdasan sistem komputasi perangkat lunak modern.
        </p>
      </div>

      {/* STORY SECTION */}
      <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Cerita Singkat</span>
        </h2>
        <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            Perjalanan saya di dunia teknologi berakar kuat pada pemahaman perangkat keras elektronika industri yang saya pelajari sejak di bangku SMK AMI Deltamas. Ketertarikan tersebut mendorong saya untuk mendalami spektrum mekatronika yang lebih luas—menggabungkan mekanika presisi, kontroler logika terprogram (PLC), sensor fisika, dan kecerdasan buatan di <strong>Politeknik Industri ATMI</strong>.
          </p>
          <p>
            Bagi saya, rekayasa yang bernilai adalah rekayasa yang teruji di lapangan. Filosofi kerja saya berfokus pada pendekatan <em>sensor-to-cloud</em>: bagaimana data analog di titik pengukuran fisik dapat dikalibrasi secara presisi, ditransmisikan secara handal, diproses oleh model komputasi tepi (*Edge AI*), dan divisualisasikan dalam dasbor pemantauan yang bermakna bagi pengambil keputusan industri.
          </p>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pendidikan Formal</h2>
            <p className="text-xs text-slate-500 font-mono">Fondasi akademis dan disiplin keilmuan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span className="font-semibold">PENDIDIKAN TINGGI</span>
              <span>Agustus 2024 - Sekarang</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Politeknik Industri ATMI
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              D4 Teknik Mekatronika, Robotika &amp; Otomasi
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Fokus pada otomasi pabrik, kontrol PLC Omron, pemrograman sistem berorientasi objek (PBO), analisis CAD SolidWorks, dan robotika industri berstandar ATMI.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span className="font-semibold">PENDIDIKAN VOKASI</span>
              <span>Lulus 2024</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              SMK Ananda Mitra Industri Deltamas
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Jurusan Elektronika Industri
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Keahlian inti pada perancangan PCB, soldering presisi, analisis skematik elektronika daya, pengukuran instrumen listrik, dan pengenalan mikrokontroler.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & ORGANIZATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pengalaman Organisasi</h2>
            <p className="text-xs text-slate-500 font-mono">Kepemimpinan dan advokasi mahasiswa</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-2 gap-1">
            <span className="font-semibold uppercase">Senat Mahasiswa ATMI</span>
            <span>April 2025 - Maret 2026</span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Advokat &bull; Senat Mahasiswa Politeknik Industri ATMI
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Menjalankan fungsi representasi dan advokasi hak-hak akademis serta kesejahteraan mahasiswa di tingkat institusi. Mengkoordinasikan penyelesaian isu kemahasiswaan dengan manajemen politeknik serta merumuskan tata tertib internal organisasi.
          </p>
        </div>
      </section>

      {/* PKL INTERNSHIP TIMELINE (2021 - 2023) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Pengalaman Praktik Kerja Lapangan (PKL)
            </h2>
            <p className="text-xs text-slate-500 font-mono">Periode 2021 – 2023 di Lingkungan Industri Manufaktur</p>
          </div>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-8">
          {/* QA Role */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-[#0b0f19]" />
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-1">
              <span className="font-semibold">QUALITY ASSURANCE (QA)</span>
              <span>&bull; Industri Manufaktur</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Inspeksi Kontrol Kualitas &amp; Verifikasi Dimensi
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Melakukan inspeksi kepatuhan dimensi benda kerja dengan alat ukur presisi (micrometer, vernier caliper, height gauge). Menganalisis laporan deviasi produk serta mencatat dokumen QC produk sebelum pengiriman ke lini produksi berikutnya.
            </p>
          </div>

          {/* IT Support / Networking */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#0b0f19]" />
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">
              <span className="font-semibold">IT SUPPORT &amp; NETWORKING</span>
              <span>&bull; Infrastruktur Komputasi</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Infrastruktur Jaringan &amp; Pemeliharaan Sistem
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Instalasi kabel jaringan lokal (LAN), crimping RJ45, routing switch, konfigurasi subnetting IP address, perbaikan workstation karyawan pabrik, serta pemeliharaan berkala periferal sistem industri.
            </p>
          </div>

          {/* Purchasing */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white dark:ring-[#0b0f19]" />
            <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 mb-1">
              <span className="font-semibold">PURCHASING &amp; PENGADAAN</span>
              <span>&bull; Logistik Komponen</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Pengadaan Komponen Teknik &amp; Negosiasi Vendor
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Memproses Purchase Requisition (PR) menjadi Purchase Order (PO) untuk komponen elektronika dan suku cadang mekanik mesin. Mengkoordinasikan perbandingan harga antar vendor penyedia dan memastikan ketepatan jadwal kedatangan barang material.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Tertarik Mengetahui Portofolio Proyek Saya?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Jelajahi implementasi prototipe mekatronika dan sistem IoT di halaman proyek.</p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-sm"
        >
          <span>Lihat Katalog Proyek</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
