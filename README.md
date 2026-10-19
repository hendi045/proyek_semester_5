# Sistem Pendukung Keputusan Penentuan Rekomendasi Aroma Wewangian Sunah Menggunakan Metode Simple Additive Weighting (SAW) pada Qodha Aromatic Kota Bogor

> **Sistem Pendukung Keputusan (SPK)** penentuan rekomendasi aroma wewangian sunah berbasis web menggunakan metode **Simple Additive Weighting (SAW)** pada **Qodha Aromatic Kota Bogor**. Dikembangkan untuk memenuhi tugas Proyek Pemrograman Web (Semester 5).

---

## 📌 Ringkasan Proyek

**Qodha Aromatic Kota Bogor** adalah aplikasi web interaktif yang membantu pengguna (pengunjung/pembeli) menemukan wewangian sunah yang paling sesuai dengan preferensi mereka, sekaligus menyediakan portal manajemen bagi administrator toko untuk mengelola data master wewangian, parameter kriteria, bobot keputusan, serta memantau audit perhitungan algoritma SAW secara transparan hingga pencetakan dokumen laporan resmi.

---

## ✨ Fitur Utama (12 Modul SOT)

Aplikasi dibangun mengacu pada Dokumen *Single Source of Truth* (SOT) dengan 12 fitur terintegrasi:

### A. Area Pengunjung (Public Portal)
1. **Rekomendasi Wewangian Interaktif**: Menampilkan daftar alternatif wewangian sunah terurut otomatis berdasarkan skor preferensi SAW tertinggi ($V_{\max}$). Dilengkapi filter keluarga aroma, tujuan penggunaan, dan badge peringkat.
2. **Detail Kontribusi Kriteria**: Modal rincian yang membedah nilai asli, nilai normalisasi ($r_{ij}$), bobot kriteria ($w_j$), serta persentase kontribusi parsial tiap kriteria terhadap skor akhir.
3. **Riwayat Simulasi Rekomendasi**: Penyimpanan riwayat rekomendasi di sisi peramban (`localStorage`) dengan stempel waktu, tombol simpan instan, hapus satuan, dan pembersihan seluruh riwayat.

### B. Area Administrator (Admin Management & SPK Analytics)
4. **Login Admin (Simulasi Demo)**: Autentikasi sesi demo lokal dengan tombol *Isi Otomatis* (`admin` / `admin123`).
5. **Dashboard Overview**: Ringkasan metrik data master, kesiapan perhitungan matematis, widget top rekomendasi SAW, dan log aktivitas terbaru.
6. **Data Master Aroma Wewangian**: CRUD katalog wewangian lengkap dengan filter kategori, modal formulir, konfirmasi hapus, dan indikator status aktif.
7. **Data Master Kriteria SAW**: Manajemen parameter kriteria (C1–C5), kode, nama, sifat atribut (*Benefit* / *Cost*), dan skala nilai.
8. **Pengaturan Bobot Kriteria**: Penyesuaian persentase bobot dengan validasi matematis ketat ($\sum W = 100\%$) dan tombol reset ke bobot standar.
9. **Matriks Penilaian Aroma**: Matriks nilai mentah ($X$) alternatif terhadap kriteria dengan validasi rentang dan indikator kelengkapan data.
10. **Proses Perhitungan SAW (Transparansi 4 Tahap)**:
    - **Tahap 1**: Matriks Keputusan Awal ($X$) & Penentuan Nilai Ekstrem ($\max x_j$ / $\min x_j$).
    - **Tahap 2**: Matriks Ternormalisasi ($R$) sesuai kaidah Benefit/Cost.
    - **Tahap 3**: Matriks Perkalian Terbobot ($W \times R$).
    - **Tahap 4**: Perhitungan Nilai Preferensi Akhir ($V_i$) & Urutan Peringkat.
11. **Hasil Perangkingan Alternatif**: Visualisasi podium Top 3 (Emas, Perak, Perunggu), KPI strip, tabel perankingan lengkap dengan pencarian, dan tautan langsung ke cetak laporan.
12. **Cetak Dokumen Laporan**: Halaman dokumen resmi berstandar A4 lengkap dengan kop surat formal, metadata dokumen, tabel kriteria, tabel perankingan, catatan teknis, lembar pengesahan tanda tangan, serta stylesheet cetak `@media print` untuk cetak printer fisik atau ekspor ke PDF.

### C. Kemampuan Progressive Web App (PWA)
13. **Installable Web App (PWA)**: Dapat dipasang langsung ke layar beranda (*Home Screen*) pada perangkat Android, iOS, Windows, macOS, dan ChromeOS tanpa melalui app store.
14. **Dukungan Akses Offline (Service Worker)**: Aplikasi tetap dapat dibuka dan digunakan untuk simulasi rekomendasi serta peninjauan riwayat wewangian meskipun tanpa koneksi internet.
15. **Indikator Offline & Update Otomatis**: Dilengkapi banner status jaringan real-time dan notifikasi pembaruan versi baru.

---

## 🧮 Metodologi Simple Additive Weighting (SAW)

Metode SAW (sering dikenal sebagai metode penjumlahan terbobot) mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif di semua atribut:

1. **Normalisasi Matriks ($R$)**:
   - Untuk kriteria **Benefit** (semakin besar semakin baik):
     $$r_{ij} = \frac{x_{ij}}{\max_i(x_{ij})}$$
   - Untuk kriteria **Cost** (semakin kecil semakin baik):
     $$r_{ij} = \frac{\min_i(x_{ij})}{x_{ij}}$$
2. **Nilai Preferensi Alternatif ($V_i$)**:
   $$V_i = \sum_{j=1}^{n} w_j \cdot r_{ij}$$
   Alternatif dengan nilai $V_i$ terbesar dipilih sebagai rekomendasi wewangian sunah terbaik.

### Parameter Kriteria Default
| Kode | Nama Kriteria | Sifat Atribut | Bobot ($W$) | Keterangan |
| :---: | :--- | :---: | :---: | :--- |
| **C1** | Kesesuaian Riwayat Sunah | Benefit | 25% | Hadis / atsar wewangian |
| **C2** | Ketahanan Aroma (Longevity) | Benefit | 20% | Daya tahan pemakaian |
| **C3** | Kelembutan Karakter Aroma | Benefit | 20% | Karakter aroma tidak menyengat |
| **C4** | Popularitas & Kesukaan Pengguna | Benefit | 15% | Rating & preferensi jamaah |
| **C5** | Tingkat Harga / Ekonomis | Cost | 20% | Efisiensi biaya |
| **TOTAL** | | | **100%** | **Valid & Siap Hitung** |

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Prasyarat Sistem
- **Node.js** versi 18.x atau lebih baru
- **npm** versi 9.x atau lebih baru

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Akses aplikasi melalui peramban web pada alamat:
`http://localhost:5173/`

### 4. Menjalankan Linter Kode
```bash
npm run lint
```

### 5. Membangun Bundle Produksi (Build)
```bash
npm run build
```

---

## 🔑 Kredensial Demo Administrator

Untuk mengakses portal administrasi dan pengujian fitur internal:
- **URL Login**: `http://localhost:5173/#login` (atau klik tombol *Portal Admin (Demo)* di sudut kanan atas)
- **Nama Pengguna / Email**: `admin` atau `admin@qodha.id`
- **Kata Sandi**: `admin123`
*(Tersedia tombol pintas **Isi Otomatis** pada kartu formulir login)*

---

## 📁 Struktur Direktori Proyek

```text
proyek_semester_5/
├── dist/                   # Output bundle produksi Vite
├── public/                 # Aset statis & logo
├── qodha-aromatic-sot-v1/  # Dokumen Single Source of Truth (PRD, UI-Guideline, Plan)
├── src/
│   ├── components/ui/      # Komponen UI atomik (Button, Input, Card, Badge, Modal, Toast)
│   ├── context/            # DataContext (State reaktif, SAW memoized, CRUD, Riwayat)
│   ├── data/               # dummyData.js (Seed data wewangian, kriteria, nilai mentah)
│   ├── layouts/            # AdminLayout & PublicLayout (Sidebar, Navbar, Breadcrumb)
│   ├── lib/                # sawEngine.js (Mesin perhitungan SAW murni)
│   ├── pages/
│   │   ├── admin/          # Login, Dashboard, Aroma, Kriteria, Bobot, Penilaian, SAW, Ranking, Laporan
│   │   └── public/         # PublicRekomendasiPage, PublicRiwayatPage
│   ├── styles/             # tokens.css (Design system warna, tipografi, spacing) & index.css
│   ├── App.jsx             # Hash router & proteksi demo route
│   └── main.jsx            # Entry point React
├── index.html              # HTML shell & font Inter
├── package.json
└── vite.config.js
```

---

## 📄 Lisensi & Hak Cipta

Dikembangkan oleh Mahasiswa untuk Proyek Pemrograman Web (Semester 5) — Dosen Pengampu: Pak Suhendro. Seluruh hak cipta dan merek demo adalah milik Qodha Aromatic.
