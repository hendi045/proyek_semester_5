# UI-GUIDELINE — Qodha Aromatic

**Versi:** 1.0-draft  
**Arah desain:** Modern futuristic SaaS, clean, fokus data, aksen oranye

## 1. Prinsip desain

1. **Tegas dan premium:** hitam sebagai dasar navigasi/kontras, putih sebagai area kerja, oranye untuk aksi utama.
2. **Data mudah dibaca:** gunakan hierarki heading, angka metrik yang jelas, tabel dengan ruang cukup, dan label status.
3. **SAW transparan:** jangan menyembunyikan proses normalisasi atau bobot; pengguna harus bisa menelusuri alasan ranking.
4. **Interaksi terkendali:** aksi berisiko seperti hapus data atau reset demo selalu meminta konfirmasi.
5. **Responsif:** sidebar desktop menjadi drawer/menu ringkas pada layar kecil; tabel menggunakan scroll horizontal atau layout kartu pada ponsel.

## 2. Design tokens

### Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-ink` | `#151515` | Sidebar, teks utama, heading kuat |
| `--color-black` | `#0B0B0C` | Latar aksen/area hero gelap |
| `--color-paper` | `#FFFFFF` | Kartu dan permukaan utama |
| `--color-canvas` | `#F5F5F4` | Latar halaman |
| `--color-orange` | `#FF7A1A` | Tombol utama, highlight, indikator terpilih |
| `--color-orange-soft` | `#FFF0E5` | Latar badge/aksen sekunder |
| `--color-text-muted` | `#777777` | Teks penjelas |
| `--color-border` | `#E6E6E4` | Border, divider, garis tabel |
| `--color-success` | `#23845B` | Status berhasil |
| `--color-warning` | `#B86B12` | Peringatan validasi |
| `--color-danger` | `#C83D3D` | Error/penghapusan |

Gunakan oranye secara selektif pada tombol utama, indikator aktif, badge penting, dan bagian kecil grafik. Hindari semua elemen menjadi oranye sekaligus. Pastikan kontras teks terbaca.

### Tipografi

- Font utama: `Inter`, fallback `ui-sans-serif, system-ui, sans-serif`.
- Judul halaman desktop: 28–32 px, weight 650–700.
- Judul bagian/kartu: 16–18 px, weight 600.
- Body: 14–16 px, line-height 1.5–1.65.
- Label dan metadata: 12–13 px; jangan pakai ukuran ini untuk teks panjang.
- Angka KPI: 28–36 px, gunakan angka tabular bila tersedia.

### Spasi, radius, dan elevasi

- Gunakan skala spasi berbasis 4 px: 4, 8, 12, 16, 20, 24, 32, 40.
- Radius input dan tombol: 10–12 px.
- Radius kartu: 16–20 px.
- Border tipis `1px solid var(--color-border)` lebih diutamakan daripada bayangan kuat.
- Shadow sangat ringan untuk dropdown/modal; jangan memberi shadow pada setiap kartu.

## 3. Layout utama

### Area admin desktop

- Sidebar gelap, lebar kira-kira 248 px; berisi logo teks Qodha Aromatic dan navigasi berkelompok.
- Header atas: breadcrumb/judul konteks di kiri, pencarian atau notifikasi demo opsional, profil admin demo di kanan.
- Konten utama berlatar canvas terang; lebar efektif dan jarak tepi konsisten.
- Konten menggunakan grid fleksibel; jangan memaksa semua halaman punya jumlah kartu yang sama.

### Area pengunjung

- Header sederhana dengan wordmark, tautan rekomendasi/riwayat, dan tombol utama “Mulai Rekomendasi”.
- Hero dapat memakai latar hitam dengan glow oranye yang halus, judul besar, deskripsi singkat, dan CTA.
- Hasil rekomendasi menggunakan kartu aroma terang, skor SAW yang mudah dibandingkan, dan label preferensi.
- Hindari gambar aroma yang tidak relevan. Jika tidak ada aset produk, gunakan bentuk abstrak sederhana, initial/ikon, atau placeholder visual yang konsisten.

### Responsif

- `>= 1200px`: sidebar tetap, KPI 4 kolom bila ruang cukup.
- `768–1199px`: sidebar dapat dipersempit; KPI 2 kolom.
- `< 768px`: sidebar jadi drawer, area konten satu kolom, aksi tabel mudah dijangkau, form satu kolom.
- Pada layar kecil, CTA utama terlihat tanpa perlu mencari jauh; jangan menumpuk lebih dari dua tombol utama per baris.

## 4. Komponen inti

- **Button:** primary oranye; secondary putih dengan border; danger hanya untuk penghapusan. Ukuran tinggi 40–44 px.
- **Input/select:** label selalu tampak, placeholder sebagai contoh bukan label pengganti; pesan validasi tepat di bawah kontrol.
- **Card:** gunakan untuk KPI, ringkasan proses, dan detail; konsisten pada padding 16–24 px.
- **Badge/status:** Active, Nonaktif, Benefit, Cost, Valid, Perlu perbaikan. Selalu sertakan kata, jangan warna saja.
- **Data table:** header kontras, baris 52–60 px jika memungkinkan, aksi baris dikelompokkan, header tetap bila tabel panjang.
- **Modal/form drawer:** judul, isi terstruktur, tombol Batal dan Simpan jelas; fokus keyboard terjaga.
- **Toast/feedback:** konfirmasi tindakan, kesalahan, dan perubahan tersimpan; tidak menutup informasi penting terlalu cepat.
- **Empty state:** jelaskan kenapa kosong dan berikan tindakan berikutnya.
- **Confirm dialog:** wajib untuk hapus permanen dari data dummy dan reset data demo.
- **Score display:** skor persentase, label ranking, dan ringkasan kontribusi; jangan hanya memakai warna.

## 5. Peta layar dan konten

### 5.1 Login Admin

- Panel login yang fokus, wordmark, judul “Masuk ke Admin”, email/username, kata sandi, tombol masuk.
- Informasi kecil bahwa autentikasi hanya mode demo.
- Validasi field kosong dan pesan kredensial salah.
- Tidak menampilkan kata sandi demo di UI produksi; detail kredensial demo cukup di panduan pengujian lokal jika nanti dibutuhkan.

### 5.2 Dashboard

- Header: “Dashboard” dan deskripsi konteks singkat.
- KPI: jumlah aroma aktif, jumlah kriteria, jumlah alternatif siap nilai, jumlah rekomendasi/hasil tersimpan.
- Panel “Ranking teratas” berisi nama aroma, skor, dan tautan ke hasil lengkap.
- Panel “Kesiapan perhitungan” menunjukkan valid/tidaknya bobot dan kelengkapan penilaian.
- Area aktivitas terbaru berbasis data dummy.

### 5.3 Data Aroma Wewangian

- Judul dan tombol “Tambah Aroma”.
- Pencarian nama, filter kategori/status, tabel aroma, kategori, jumlah atribut/nilai, status, tanggal demo, aksi.
- Form tambah/ubah meliputi nama, kategori/keluarga aroma, deskripsi, karakteristik/catatan, kegunaan, tag preferensi, harga dummy, status.
- Hapus melalui dialog konfirmasi.

### 5.4 Data Kriteria

- Tabel kode, nama kriteria, tipe Benefit/Cost, deskripsi/rentang nilai, status.
- Form tambah/ubah dengan validasi kode unik dan tipe kriteria.
- Ubah/hapus kriteria memunculkan peringatan bila kriteria sudah dipakai untuk penilaian.

### 5.5 Bobot Kriteria

- Daftar kriteria dengan input persentase atau slider yang tetap dapat diakses lewat keyboard.
- Total bobot ditonjolkan, misalnya “Total 100% — valid” atau “Total 90% — perlu disesuaikan”.
- Tombol simpan; proses SAW dinonaktifkan jika total tidak valid.
- Sediakan tombol “Kembalikan bobot demo” dengan konfirmasi bila tersedia.

### 5.6 Data Penilaian Aroma

- Matriks penilaian: baris = aroma, kolom = kriteria.
- Kolom bisa scroll horizontal pada layar kecil; nama aroma tetap terlihat bila layak secara teknis.
- Beri informasi skala tiap kriteria; nilai kosong atau nilai di luar batas harus terlihat.
- Tampilkan status kelengkapan sebelum proses perhitungan.

### 5.7 Proses Perhitungan SAW

- Panel ringkasan validasi: jumlah alternatif valid, jumlah kriteria aktif, total bobot.
- Tahap yang dapat dibedakan: matriks keputusan, normalisasi, perkalian bobot, nilai preferensi.
- Setiap tabel menampilkan kode alternatif/kriteria dan angka dengan pembulatan konsisten.
- Bila tidak valid, tampilkan daftar masalah dan tautan menuju bagian yang perlu diperbaiki.

### 5.8 Hasil Perangkingan

- Ranking, nama aroma, kategori, nilai preferensi, dan ringkasan status.
- Sorting/filter sederhana bila relevan; ranking utama tetap berdasarkan nilai tertinggi.
- Tautan ke detail; tombol cetak laporan.

### 5.9 Rekomendasi Aroma

- Alur ringkas: pilih keluarga/karakter aroma dan tujuan penggunaan bila atribut dummy tersedia.
- Tombol “Lihat Rekomendasi”.
- Jelaskan bahwa filter membatasi kandidat, sementara urutan ditentukan oleh skor SAW berdasarkan bobot aktif.
- Hasil: kartu kandidat terurut, skor persentase, ringkasan karakter, dan CTA “Lihat Detail”.
- Empty state untuk filter yang tidak cocok.

### 5.10 Detail Hasil Rekomendasi

- Nama aroma dan kategori, deskripsi, karakteristik/catatan, tag, serta kegunaan.
- Skor akhir dan ranking.
- Breakdown kontribusi kriteria dalam bentuk daftar/bar sederhana, dengan nilai asli, normalisasi, bobot, dan kontribusi.
- Tombol kembali ke hasil dan simpan/lihat riwayat bila sesuai.

### 5.11 Riwayat Rekomendasi

- Riwayat browser berisi tanggal/waktu, filter preferensi, rekomendasi teratas, dan skor.
- Aksi buka detail, hapus satu item, atau hapus semua dengan konfirmasi.
- Tampilkan keterangan “tersimpan di browser ini” supaya tidak dianggap tersinkron antarperangkat.

### 5.12 Cetak Laporan

- Header laporan berisi nama sistem, tanggal cetak, bobot, dan tabel hasil.
- Cetak menampilkan angka dan label tanpa bergantung pada warna.
- Sembunyikan sidebar, tombol aksi, dropdown, serta kontrol interaktif melalui print stylesheet.

## 6. Pola interaksi dan microcopy

Gunakan bahasa Indonesia singkat dan langsung:

- Sukses: “Data aroma berhasil disimpan.”
- Validasi: “Total bobot harus 100% sebelum perhitungan dijalankan.”
- Penilaian kosong: “Lengkapi nilai untuk seluruh kriteria aktif.”
- Data kosong: “Belum ada aroma. Tambahkan aroma pertama untuk memulai.”
- Konfirmasi hapus: “Data ini akan dihapus dari demo browser. Lanjutkan?”
- Rekomendasi kosong: “Belum ada aroma yang sesuai dengan filter ini. Ubah preferensi untuk melihat pilihan lain.”

Jangan memakai klaim absolut seperti “aroma terbaik untuk semua orang”. Gunakan “skor tertinggi berdasarkan kriteria dan bobot saat ini”.

## 7. Aksesibilitas dan kualitas UX

- Semua input punya label yang terhubung dan navigasi keyboard berfungsi.
- Fokus terlihat jelas; jangan menghapus outline tanpa pengganti.
- Kontras teks dan kontrol harus memadai.
- Ikon dekoratif tidak menggantikan label untuk aksi penting.
- Status hasil dan validasi disampaikan lewat teks, bukan warna saja.
- Target sentuh mobile sekitar 44 × 44 px.
- Animasi hanya berupa transisi ringan; hormati `prefers-reduced-motion`.
- Gunakan skeleton hanya jika ada jeda yang disimulasikan; jangan membuat loading palsu yang menghambat.

## 8. Panduan implementasi visual

- Framework: React + Vite.
- Styling: CSS biasa dengan custom properties/design tokens; hindari menambahkan library UI besar tanpa persetujuan.
- Ikon: `lucide-react` diperbolehkan agar gaya ikon konsisten.
- Data dummy terpisah dari komponen UI.
- Komponen yang berulang (Button, Input, Card, Badge, Modal, Table) dipakai ulang, bukan disalin ke setiap halaman.
- Buat `@media print` untuk laporan.
- Jangan memasukkan grafik kompleks atau animasi dekoratif yang tidak memperkuat keputusan pengguna.

## 9. Wireframe teks: Dashboard desktop

```text
┌────────────────────┬──────────────────────────────────────────────────────┐
│ QODHA AROMATIC     │ Dashboard                 Demo Admin       Profile  │
│                    ├──────────────────────────────────────────────────────┤
│ Overview           │ Ringkasan kondisi sistem                              │
│ Dashboard          │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│                    │ │ Aroma    │ │ Kriteria │ │ Alternatif│ │ Hasil    │    │
│ DATA MASTER        │ └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│ Aroma              │ ┌─────────────────────────┐ ┌──────────────────────┐  │
│ Kriteria           │ │ Ranking teratas         │ │ Kesiapan perhitungan │  │
│ Bobot              │ │ Nama / skor / detail    │ │ Bobot / nilai / status│ │
│ Penilaian          │ └─────────────────────────┘ └──────────────────────┘  │
│                    │ Aktivitas terbaru / pintasan kerja                    │
│ ANALISIS SAW       │                                                      │
│ Proses SAW         │                                                      │
│ Perangkingan       │                                                      │
│ Laporan            │                                                      │
└────────────────────┴──────────────────────────────────────────────────────┘
```

## 10. Wireframe teks: Rekomendasi pengunjung

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Qodha Aromatic                         Rekomendasi   Riwayat          │
├──────────────────────────────────────────────────────────────────────┤
│ TEMUKAN AROMA YANG SESUAI                                              │
│ Pilih karakter aroma, lalu bandingkan kandidat berdasarkan skor SAW.  │
│ [ Keluarga aroma ▼ ] [ Tujuan penggunaan ▼ ] [ Lihat Rekomendasi ]    │
├──────────────────────────────────────────────────────────────────────┤
│ HASIL REKOMENDASI                                                      │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────────┐ │
│ │ Nama aroma           │ │ Nama aroma           │ │ Nama aroma      │ │
│ │ Karakter ringkas     │ │ Karakter ringkas     │ │ Karakter ringkas│ │
│ │ Skor SAW: 92,40%     │ │ Skor SAW: 86,10%     │ │ Skor SAW: 81,25%│ │
│ │ [Lihat detail]       │ │ [Lihat detail]       │ │ [Lihat detail]  │ │
│ └──────────────────────┘ └──────────────────────┘ └─────────────────┘ │
│ Catatan: ranking mengikuti bobot kriteria yang sedang aktif.           │
└──────────────────────────────────────────────────────────────────────┘
```
