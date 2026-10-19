# AGENTS.md — Kontrak Kerja Agen Qodha Aromatic

## Misi
Bangun prototipe front-end website **Sistem Pendukung Keputusan Penentuan Rekomendasi Aroma Wewangian Sunah Menggunakan Metode SAW pada Qodha Aromatic** sesuai dokumen SOT, dengan data dummy dan desain modern futuristic SaaS hitam-putih-oranye.

## Sumber kebenaran
Baca dan patuhi dokumen ini sebelum bekerja:
1. `SOT/PRD.md`
2. `SOT/UI-GUIDELINE.md`
3. `SOT/IMPLEMENTATION_PLAN.md`

Jika dokumen bertentangan, kebutuhan tidak jelas, atau ada fitur baru yang tidak tercakup, jangan menebak diam-diam. Laporkan konflik dan minta keputusan pemilik proyek.

## Kontrak persetujuan phase — wajib
- Kerjakan **hanya phase yang secara eksplisit disetujui pemilik proyek**.
- Satu persetujuan berlaku untuk satu phase saja.
- Jangan memulai phase berikutnya, menyiapkan implementasi lanjutannya, atau memasukkan fitur phase berikutnya sebagai “bonus”.
- Jika persetujuan untuk phase aktif tidak ditemukan secara eksplisit, hentikan coding dan minta persetujuan.
- Setelah phase selesai, laporkan hasil, file yang berubah, pengujian, masalah tersisa, dan minta persetujuan sebelum melanjutkan.
- Revisi pada phase yang sama boleh dikerjakan berdasarkan permintaan revisi; setelah revisi, tetap berhenti untuk review.

## Batasan produk
- Front-end first: React + Vite, JavaScript.
- Styling utama CSS biasa dengan custom properties/tokens.
- Gunakan dummy data; tidak ada backend, API, database, payment, atau autentikasi produksi.
- `localStorage` hanya untuk simulasi lokal di browser dan harus dijelaskan sebagai penyimpanan demo.
- Login admin adalah simulasi; jangan mengklaimnya aman untuk produksi.
- Hasil SAW harus dapat dijelaskan melalui matriks, normalisasi, bobot, kontribusi, dan nilai akhir.
- Filter preferensi pengunjung membatasi kandidat; ranking memakai bobot kriteria admin yang aktif, kecuali pemilik proyek menyetujui perubahan SOT.
- Aplikasi tidak menetapkan fatwa, status hukum agama, atau klaim autentisitas produk.
- Jangan menambah fitur, teknologi, atau dependensi besar di luar SOT tanpa persetujuan.

## Standar implementasi
- Buat komponen reusable hanya saat mengurangi pengulangan dengan jelas.
- Pisahkan dummy data dan fungsi SAW dari komponen halaman.
- Validasi semua nilai dan tampilkan pesan yang bisa ditindaklanjuti.
- Tangani data kosong, kesalahan form, dan konfirmasi hapus.
- Semua kontrol terlihat harus memiliki fungsi nyata; jangan membuat tombol dekoratif yang terlihat aktif.
- Gunakan label form, navigasi keyboard, focus state, dan kontras yang memadai.
- Jangan menyimpan rahasia/API key pada source front-end.
- Gunakan Bahasa Indonesia untuk label dan microcopy.
- Jangan membuat klaim bahwa data dummy adalah data asli.

## Perintah validasi
Gunakan skrip yang tersedia di repository. Minimal sebelum menyatakan phase implementasi selesai:
- `npm run build`
- uji manual alur yang termasuk dalam phase
- periksa console dan responsivitas desktop/mobile

Jangan mengarang hasil pengujian. Jika perintah gagal atau tidak dapat dijalankan, sebutkan dengan jelas.

## Format laporan akhir setiap phase
1. Status phase dan scope yang diselesaikan.
2. Daftar file utama yang dibuat/diubah.
3. Validasi yang benar-benar dijalankan dan hasilnya.
4. Batasan atau bug yang masih ada.
5. Permintaan persetujuan eksplisit untuk phase berikutnya.
