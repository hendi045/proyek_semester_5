# PRD — Sistem Pendukung Keputusan Qodha Aromatic

**Versi:** 1.0-draft  
**Produk:** Sistem Pendukung Keputusan Penentuan Rekomendasi Aroma Wewangian Sunah Menggunakan Metode Simple Additive Weighting (SAW) pada Qodha Aromatic  
**Platform:** Website responsif  
**Fokus rilis awal:** Front-end React + Vite, data dummy

## 1. Ringkasan produk

Website membantu admin mengelola katalog aroma, kriteria, bobot, dan nilai alternatif; menjalankan perhitungan SAW; serta menampilkan hasil perangkingan. Pengunjung dapat memilih preferensi aroma dan melihat alternatif yang paling sesuai berdasarkan filter awal serta skor SAW.

Aplikasi pada rilis awal adalah prototipe front-end. Data awal menggunakan dummy data dan penyimpanan browser untuk simulasi. Tidak ada API, server, autentikasi produksi, atau database sungguhan.

## 2. Tujuan

- Memusatkan tampilan data aroma, kriteria, bobot, dan penilaian pada satu antarmuka.
- Menjelaskan proses perhitungan SAW secara transparan, bukan hanya menampilkan skor akhir.
- Membantu pengunjung membandingkan aroma berdasarkan preferensi dan hasil perangkingan.
- Menyediakan pengalaman SaaS yang modern, konsisten, responsif, dan mudah dipahami.

## 3. Pengguna dan hak akses

### Admin

Masuk melalui halaman Login Admin versi demo. Admin dapat membuka dashboard, mengelola data master, mengatur bobot, memasukkan penilaian, melihat proses SAW dan perangkingan, serta mencetak laporan.

### Pengunjung/pengguna rekomendasi

Dapat membuka halaman rekomendasi tanpa akun pada rilis awal, memilih preferensi, melihat detail hasil, dan membuka riwayat rekomendasi pada browser yang digunakan. Riwayat browser bukan akun pengguna dan tidak tersinkron antarperangkat.

### Batasan login

Login admin hanya simulasi front-end menggunakan kredensial dummy. Ini bukan autentikasi aman untuk produksi dan tidak boleh dipresentasikan sebagai sistem keamanan nyata.

## 4. Ruang lingkup fitur

| No. | Fitur | Kebutuhan dan perilaku yang diharapkan | Prioritas |
|---:|---|---|---|
| 1 | Login Admin | Form email/username dan kata sandi; validasi input; pesan gagal/sukses demo; akses ke area admin hanya untuk sesi demo. | P0 |
| 2 | Dashboard | Kartu ringkasan jumlah aroma, kriteria, alternatif aktif, serta hasil rekomendasi; ringkasan ranking teratas dan aktivitas terbaru berbasis dummy data. | P0 |
| 3 | Data Aroma Wewangian | Tabel katalog dan form tambah, lihat, ubah, hapus; atribut minimal nama, kategori/keluarga aroma, karakteristik, deskripsi, kegunaan, harga dummy, dan status aktif. | P0 |
| 4 | Data Kriteria | CRUD nama kriteria, kode, atribut benefit/cost, keterangan, dan tipe nilai yang digunakan. | P0 |
| 5 | Bobot Kriteria | Input bobot dalam persen; indikator jumlah bobot; total harus tepat 100% agar perhitungan dapat dilakukan. | P0 |
| 6 | Data Penilaian Aroma | Matriks nilai alternatif terhadap setiap kriteria; nilai tervalidasi sesuai tipe kriteria dan rentang yang ditentukan. | P0 |
| 7 | Proses Perhitungan SAW | Menampilkan matriks awal, matriks normalisasi, bobot, perkalian nilai normalisasi dengan bobot, dan nilai preferensi akhir. | P0 |
| 8 | Hasil Perangkingan | Daftar alternatif yang diurutkan dari skor preferensi tertinggi; skor, posisi ranking, dan status data ditampilkan jelas. | P0 |
| 9 | Rekomendasi Aroma | Alur rekomendasi untuk pengunjung: pilih karakter/keluarga aroma atau preferensi yang tersedia, lalu tampilkan alternatif dan skor SAW yang sesuai. | P0 |
| 10 | Detail Hasil Rekomendasi | Detail nama aroma, karakteristik, deskripsi, tag preferensi, nilai skor, serta ringkasan kontribusi nilai per kriteria. | P0 |
| 11 | Riwayat Rekomendasi | Simpan riwayat simulasi pada `localStorage`; tampilkan tanggal/waktu, filter preferensi, dan hasil teratas; sediakan hapus riwayat. | P1 |
| 12 | Cetak Laporan | Tampilan laporan yang ramah cetak melalui `window.print()`; laporan berisi bobot, nilai, normalisasi, skor, dan ranking. Unduh PDF khusus browser melalui dialog cetak, bukan layanan PDF server. | P1 |

**P0** berarti kebutuhan inti prototipe. **P1** dikerjakan setelah alur utama selesai dan disetujui.

## 5. Struktur informasi dan navigasi

### Area admin

- Login Admin
- Dashboard
- Data Master
  - Data Aroma Wewangian
  - Data Kriteria
  - Bobot Kriteria
  - Data Penilaian Aroma
- Analisis SAW
  - Proses Perhitungan SAW
  - Hasil Perangkingan
  - Cetak Laporan
- Keluar dari sesi demo

### Area pengunjung

- Beranda/rekomendasi
- Form preferensi
- Hasil rekomendasi
- Detail aroma
- Riwayat rekomendasi

Navigasi admin dan pengunjung dibedakan secara visual agar pengguna tidak keliru antara pengelolaan data dan penggunaan rekomendasi.

## 6. Alur utama

### Alur admin

1. Admin membuka Login Admin dan mengisi kredensial demo.
2. Sistem menampilkan Dashboard.
3. Admin meninjau/mengubah aroma, kriteria, bobot, dan penilaian dummy.
4. Sistem memeriksa kelengkapan nilai serta total bobot.
5. Admin membuka Proses SAW dan memeriksa matriks normalisasi serta skor.
6. Admin melihat hasil perangkingan dan membuka laporan untuk dicetak.

### Alur pengunjung

1. Pengunjung membuka Rekomendasi Aroma.
2. Pengunjung memilih preferensi yang tersedia, misalnya keluarga/karakter aroma.
3. Sistem menyaring alternatif sesuai pilihan awal (bila filter dipilih), lalu memberi peringkat kandidat yang valid menggunakan bobot kriteria aktif.
4. Pengunjung membandingkan skor dan membuka detail aroma.
5. Sistem menyimpan ringkasan rekomendasi di riwayat browser.

Jika filter tidak menghasilkan alternatif, tampilkan keadaan kosong dan tombol untuk menghapus filter. Jangan membuat skor palsu atau menyajikan hasil dari data tidak lengkap.

## 7. Aturan perhitungan SAW

### Data masukan

- Alternatif: aroma wewangian aktif yang tersedia.
- Kriteria: tiap kriteria memiliki kode, nama, tipe `benefit` atau `cost`, bobot, dan nilai setiap alternatif.
- Bobot: disimpan sebagai persentase dan dikonversi menjadi pecahan untuk perhitungan.
- Nilai kriteria: angka numerik; skala nilai wajib konsisten antaralternatif untuk kriteria yang sama.

### Normalisasi

Untuk kriteria **benefit**:

`r_ij = x_ij / max(x_j)`

Untuk kriteria **cost**:

`r_ij = min(x_j) / x_ij`

Nilai preferensi alternatif:

`V_i = Σ (w_j × r_ij)`

Alternatif diurutkan berdasarkan `V_i` dari terbesar ke terkecil. Nilai internal tetap menggunakan presisi numerik; tampilan skor dapat memakai format persentase dua angka desimal.

### Validasi wajib

- Total bobot harus tepat 100% (toleransi tampilan maksimal 0,01% hanya untuk pembulatan input; jumlah yang disimpan harus dinormalisasi/valid sesuai model data).
- Setiap alternatif yang ikut dihitung harus memiliki nilai untuk semua kriteria aktif.
- Nilai pembagi pada rumus tidak boleh nol; untuk kriteria cost, nilai wajib lebih besar dari nol.
- Jika sebuah kriteria benefit memiliki nilai maksimum nol, tandai perhitungan tidak valid dan jelaskan penyebabnya.
- Kriteria atau alternatif nonaktif tidak disertakan dalam perhitungan.
- Jangan menghitung ulang diam-diam ketika data tidak valid; tampilkan daftar masalah yang perlu diperbaiki.

### Preferensi pengguna

Preferensi pengguna pada prototipe dipakai sebagai filter kandidat awal, bukan mengubah bobot kriteria admin secara diam-diam. Ranking kandidat yang lolos filter tetap memakai bobot SAW yang saat itu aktif. Pendekatan ini menjaga hasil dapat dijelaskan dan konsisten. Perubahan ke bobot personal per pengguna memerlukan keputusan produk terpisah.

## 8. Data dummy awal

Data awal dapat memuat contoh aroma seperti Oud, Musk Putih, Amber, Rose, dan Sandalwood. Semua atribut, nilai, harga, karakteristik, dan skor contoh wajib diberi label sebagai data demo/dummy dan bukan klaim produk nyata.

Kriteria awal yang disarankan untuk demo:

| Kode | Kriteria | Tipe | Bobot awal |
|---|---|---|---:|
| C1 | Kesesuaian karakter aroma | Benefit | 25% |
| C2 | Ketahanan aroma | Benefit | 25% |
| C3 | Kesegaran aroma | Benefit | 20% |
| C4 | Kelembutan/intensitas yang nyaman | Benefit | 15% |
| C5 | Harga | Cost | 15% |
|  | **Total** |  | **100%** |

Skor C1–C4 pada data contoh memakai rentang 1–5 yang sama untuk semua alternatif. C5 menggunakan harga numerik dummy. Kriteria dan bobot tersebut merupakan nilai awal prototipe yang dapat direvisi sebelum implementasi.

## 9. Persyaratan antarmuka dan kualitas

- Bahasa antarmuka utama: Bahasa Indonesia.
- Responsif untuk desktop, tablet, dan ponsel.
- Visual: modern futuristic SaaS; kombinasi hitam, putih, dan oranye.
- Status penting ditunjukkan lewat label/teks, bukan warna saja.
- Form memiliki label, validasi, fokus keyboard, dan pesan kesalahan yang mudah dimengerti.
- Tabel menyediakan keadaan loading simulasi bila diperlukan, keadaan kosong, dan feedback tindakan.
- Interaksi CRUD menggunakan modal atau panel form dengan aksi simpan/batal yang jelas.
- Desain tidak bergantung pada gambar stok atau aset berlisensi yang tidak disediakan.

## 10. Batasan dan di luar ruang lingkup

**Termasuk:** halaman React, interaksi UI, dummy data, kalkulasi SAW di browser, simulasi login admin, penyimpanan riwayat melalui `localStorage`, dan cetak melalui browser.

**Tidak termasuk pada rilis awal:** backend, API, database, akun nyata, multi-user, autentikasi/otorisasi produksi, payment gateway, checkout, integrasi inventori, sinkronisasi cloud, AI generatif, aplikasi mobile native, analisis fatwa, serta klaim bahwa sistem menetapkan status hukum agama suatu produk.

Sistem membantu pemilihan aroma berdasarkan atribut dan kriteria yang dikelola. Sistem tidak memberi fatwa atau memverifikasi klaim keagamaan tentang produk.

## 11. Kriteria penerimaan rilis awal

- Semua 12 fitur di atas dapat ditemukan sesuai prioritas phase yang disetujui.
- Pengguna dapat berpindah antara area admin dan rekomendasi secara jelas.
- CRUD dummy tidak membutuhkan backend dan memperbarui tampilan.
- Bobot tidak dapat dipakai untuk menghitung bila totalnya tidak valid.
- Matriks normalisasi, nilai preferensi, dan ranking sesuai rumus SAW yang tertulis.
- Ranking menurun berdasarkan skor akhir dan detail menampilkan penjelasan skor.
- Riwayat tetap tersedia pada browser yang sama setelah refresh melalui `localStorage`.
- Cetak laporan menyembunyikan navigasi dan kontrol yang tidak relevan saat dicetak.
- Tidak ada data demo yang digambarkan sebagai data produksi.
- `npm run build` berhasil dan alur utama dapat diuji pada desktop serta viewport ponsel.

## 12. Asumsi yang menunggu persetujuan pemilik proyek

1. Pengunjung boleh melakukan rekomendasi tanpa login; riwayat disimpan lokal di browser.
2. Preferensi pengguna berfungsi sebagai filter kandidat, sementara bobot SAW dikelola admin.
3. Kriteria awal dan bobot pada bagian 8 hanya seed demo, bukan keputusan final.
4. Cetak/unduh laporan menggunakan dialog print browser.
5. Implementasi dilakukan per phase dan berhenti untuk meminta persetujuan sebelum phase selanjutnya.
